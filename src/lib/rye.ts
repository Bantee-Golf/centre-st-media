/**
 * Rye API client — both Universal Checkout (REST) and GraphQL (Sell Anything).
 * Same patterns as Bantee's RyeService + RyeSyncService.
 */

// ─── Universal Checkout (REST) ───────────────────────────────────────────────
// Works with ANY merchant URL (Shopify, Amazon, Fanatics, NetSuite, etc.)

const RYE_BASE =
  process.env.RYE_ENVIRONMENT === "production"
    ? "https://api.rye.com"
    : "https://staging.api.rye.com";

const RYE_GRAPHQL = "https://graphql.api.rye.com/v1/query";

function restHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Basic ${process.env.RYE_API_KEY}`,
  };
}

function graphqlHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: process.env.RYE_GRAPHQL_AUTH || `Basic ${process.env.RYE_API_KEY}`,
    "Rye-Shopper-IP": "127.0.0.1",
  };
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Buyer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface CheckoutIntent {
  id: string;
  state: string;
  product_url: string;
  pricing?: {
    subtotal_cents: number;
    tax_cents: number;
    shipping_cents: number;
    total_cents: number;
    currency: string;
  };
  shipping_options?: Array<{
    id: string;
    name: string;
    price_cents: number;
  }>;
}

export interface RyeProduct {
  id: string;
  title: string;
  description?: string;
  vendor?: string;
  images: Array<{ url: string }>;
  variants: Array<{
    id: string;
    title: string;
    availableForSale: boolean;
    image?: { url: string };
    price: { value: number; currency: string; displayValue: string };
    selectedOptions?: Array<{ name: string; value: string }>;
  }>;
  price: { value: number; currency: string; displayValue: string };
}

// ─── GraphQL Execution ───────────────────────────────────────────────────────

async function gql<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(RYE_GRAPHQL, {
    method: "POST",
    headers: graphqlHeaders(),
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Rye GraphQL error ${res.status}: ${text}`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(`Rye GraphQL: ${json.errors[0].message}`);
  }

  return json.data;
}

// ─── Product Fetching (GraphQL — Shopify/Amazon only) ────────────────────────

/**
 * Request a product by URL via Rye Sell Anything.
 * Returns productId + variantId that can be used with productByID.
 * Works for Shopify and Amazon URLs.
 */
export async function requestProductByURL(productUrl: string) {
  const data = await gql<{
    requestProductByURL: {
      productID: string;
      marketplace: string;
    };
  }>(
    `mutation RequestProduct($url: URL!, $marketplace: Marketplace!) {
      requestProductByURL(input: { url: $url, marketplace: $marketplace }) {
        productID
        marketplace
      }
    }`,
    { url: productUrl, marketplace: "SHOPIFY" }
  );

  return data.requestProductByURL;
}

/**
 * Fetch full product details by Rye product ID.
 */
export async function getProductByID(productId: string): Promise<RyeProduct | null> {
  const data = await gql<{
    productByID: RyeProduct | null;
  }>(
    `query GetProduct($id: ID!) {
      productByID(input: { id: $id, marketplace: SHOPIFY }) {
        ... on ShopifyProduct {
          id
          title
          descriptionHTML
          vendor
          images { url }
          variants {
            id
            title
            availableForSale
            image { url }
            price { value currency displayValue }
            selectedOptions { name value }
          }
          price { value currency displayValue }
        }
      }
    }`,
    { id: productId }
  );

  return data.productByID;
}

/**
 * Fetch product data from a URL.
 * For Shopify: uses GraphQL to get full product catalog data (images, variants, price).
 * For other stores: returns null (use Universal Checkout at purchase time).
 */
export async function fetchProductFromURL(productUrl: string): Promise<RyeProduct | null> {
  try {
    const result = await requestProductByURL(productUrl);
    if (!result?.productID) return null;

    return await getProductByID(result.productID);
  } catch {
    // Non-Shopify URLs will fail requestProductByURL — that's expected
    return null;
  }
}

// ─── Universal Checkout (REST — any merchant) ────────────────────────────────

/** Create a checkout intent for any product URL */
export async function createCheckoutIntent(
  productUrl: string,
  buyer: Buyer,
  quantity: number = 1
): Promise<CheckoutIntent> {
  const res = await fetch(`${RYE_BASE}/api/v1/checkout-intents`, {
    method: "POST",
    headers: restHeaders(),
    body: JSON.stringify({
      product_url: productUrl,
      quantity,
      buyer: {
        first_name: buyer.firstName,
        last_name: buyer.lastName,
        email: buyer.email,
        phone: buyer.phone,
        shipping_address: {
          address_1: buyer.address.address1,
          address_2: buyer.address.address2 || "",
          city: buyer.address.city,
          state: buyer.address.state,
          postal_code: buyer.address.postalCode,
          country: buyer.address.country,
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Rye createCheckoutIntent failed: ${res.status} — ${err}`);
  }

  return res.json();
}

/** Poll a checkout intent for status updates */
export async function getCheckoutIntent(intentId: string): Promise<CheckoutIntent> {
  const res = await fetch(`${RYE_BASE}/api/v1/checkout-intents/${intentId}`, {
    headers: restHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Rye getCheckoutIntent failed: ${res.status}`);
  }

  return res.json();
}

/** Confirm a checkout intent with a Stripe payment token */
export async function confirmCheckoutIntent(
  intentId: string,
  stripeToken: string
): Promise<CheckoutIntent> {
  const res = await fetch(`${RYE_BASE}/api/v1/checkout-intents/${intentId}/confirm`, {
    method: "POST",
    headers: restHeaders(),
    body: JSON.stringify({ stripe_token: stripeToken }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Rye confirmCheckoutIntent failed: ${res.status} — ${err}`);
  }

  return res.json();
}

/**
 * Rye Sell Anything (Universal Checkout) API client.
 * Same approach as Bantee's RyeService — direct REST calls, no SDK.
 */

const RYE_BASE =
  process.env.RYE_ENVIRONMENT === "production"
    ? "https://api.rye.com"
    : "https://staging.api.rye.com";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Basic ${process.env.RYE_API_KEY}`,
  };
}

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

/** Create a checkout intent for any product URL */
export async function createCheckoutIntent(
  productUrl: string,
  buyer: Buyer,
  quantity: number = 1
): Promise<CheckoutIntent> {
  const res = await fetch(`${RYE_BASE}/api/v1/checkout-intents`, {
    method: "POST",
    headers: headers(),
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
export async function getCheckoutIntent(
  intentId: string
): Promise<CheckoutIntent> {
  const res = await fetch(
    `${RYE_BASE}/api/v1/checkout-intents/${intentId}`,
    { headers: headers() }
  );

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
  const res = await fetch(
    `${RYE_BASE}/api/v1/checkout-intents/${intentId}/confirm`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ stripe_token: stripeToken }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(
      `Rye confirmCheckoutIntent failed: ${res.status} — ${err}`
    );
  }

  return res.json();
}

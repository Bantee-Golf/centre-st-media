import { NextRequest, NextResponse } from "next/server";
import { fetchProductFromURL } from "@/lib/rye";
import { getCommunity } from "@/lib/communities";

/**
 * GET /api/products?community=byu
 *
 * Fetches live product data from Rye for all products in a community.
 * - Shopify stores: full product data via GraphQL (images, variants, price)
 * - Non-Shopify (Fanatics, NetSuite): returns static catalog data;
 *   Rye handles scraping at checkout time via Universal Checkout.
 *
 * Results are cached for 1 hour via Next.js fetch cache.
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("community");
  if (!slug) {
    return NextResponse.json({ error: "community param required" }, { status: 400 });
  }

  const community = getCommunity(slug);
  if (!community) {
    return NextResponse.json({ error: "Community not found" }, { status: 404 });
  }

  // Fetch live data from Rye for each product URL in parallel
  const enriched = await Promise.all(
    community.products.map(async (product) => {
      try {
        const ryeProduct = await fetchProductFromURL(product.url);

        if (ryeProduct) {
          // Rye returned full product data (Shopify store)
          return {
            ...product,
            name: ryeProduct.title || product.name,
            price: ryeProduct.price?.displayValue
              ? `$${(ryeProduct.price.value / 100).toFixed(2)}`
              : product.price,
            image: ryeProduct.images?.[0]?.url || product.image || null,
            variants: ryeProduct.variants?.map((v) => ({
              id: v.id,
              title: v.title,
              available: v.availableForSale,
              price: v.price?.displayValue,
              image: v.image?.url,
              options: v.selectedOptions,
            })) || [],
            ryeProductId: ryeProduct.id,
            source: "rye" as const,
          };
        }

        // Non-Shopify store — return static data, Rye handles at checkout
        return {
          ...product,
          variants: [],
          ryeProductId: null,
          source: "static" as const,
        };
      } catch {
        return {
          ...product,
          variants: [],
          ryeProductId: null,
          source: "static" as const,
        };
      }
    })
  );

  return NextResponse.json(
    {
      community: slug,
      storeName: community.storeName,
      storeUrl: community.storeUrl,
      products: enriched,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    }
  );
}

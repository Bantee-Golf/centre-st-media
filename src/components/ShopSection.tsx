"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Community, Product } from "@/lib/communities";
import CheckoutModal from "./CheckoutModal";

interface EnrichedProduct extends Product {
  variants?: Array<{
    id: string;
    title: string;
    available: boolean;
    price?: string;
    image?: string;
    options?: Array<{ name: string; value: string }>;
  }>;
  ryeProductId?: string | null;
  source?: "rye" | "static";
}

interface Props {
  community: Community;
}

export default function ShopSection({ community }: Props) {
  const [products, setProducts] = useState<EnrichedProduct[]>(community.products);
  const [selected, setSelected] = useState<EnrichedProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products?community=${community.slug}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (!cancelled && data.products) {
          setProducts(data.products);
        }
      } catch {
        // Fall back to static product data (already set)
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();
    return () => { cancelled = true; };
  }, [community.slug]);

  return (
    <section id="shop">
      <div className="flex items-end justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Shop</h2>
          {loading && (
            <div className="w-3.5 h-3.5 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
          )}
        </div>
        <a
          href={community.storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white transition-colors group"
        >
          {community.storeName}
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="group flex gap-3 rounded-xl bg-white/[0.03] border border-white/[0.04] overflow-hidden hover:border-white/[0.12] hover:bg-white/[0.05] transition-all"
          >
            {/* Thumbnail */}
            <div className="relative w-24 h-24 shrink-0 bg-white/[0.02] overflow-hidden">
              {product.tag && (
                <span
                  className="absolute top-1 left-1 px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-full z-10"
                  style={{
                    backgroundColor: product.tag === "Sale" ? "#dc2626" : "#fff",
                    color: product.tag === "Sale" ? "#fff" : "#000",
                  }}
                >
                  {product.tag}
                </span>
              )}
              {product.source === "rye" && (
                <span className="absolute bottom-1 right-1 px-1 py-0.5 text-[8px] font-bold uppercase rounded bg-emerald-500/20 text-emerald-400 z-10">
                  Live
                </span>
              )}

              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                  sizes="96px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 py-2.5 pr-3 flex flex-col justify-between min-w-0">
              <h3 className="text-xs font-medium leading-snug line-clamp-2 text-white/70 group-hover:text-white/90 transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-sm font-bold">{product.price}</span>
                <button
                  onClick={() => setSelected(product)}
                  className="px-3 py-1 text-[11px] font-semibold rounded-full bg-white text-black hover:shadow-lg transition-all"
                >
                  Buy
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="text-[10px] text-white/20 mt-4 text-center">
        Checkout by{" "}
        <a href="https://rye.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/40 transition-colors">
          Rye
        </a>
        {" "}&middot; {community.storeName}
      </p>

      {selected && (
        <CheckoutModal product={selected} community={community} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

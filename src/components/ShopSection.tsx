"use client";

import { useState } from "react";
import Image from "next/image";
import { Community, Product } from "@/lib/communities";
import CheckoutModal from "./CheckoutModal";

interface Props {
  community: Community;
}

export default function ShopSection({ community }: Props) {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section id="shop" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-2">
              Official Gear
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">Shop</h2>
          </div>
          <a
            href={community.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
          >
            {community.storeName}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {community.products.map((product) => (
            <article
              key={product.id}
              className="group rounded-2xl bg-white/[0.03] border border-white/[0.04] overflow-hidden hover:border-white/[0.12] hover:bg-white/[0.05] transition-all"
            >
              {/* Product image */}
              <div className="relative aspect-square overflow-hidden bg-white/[0.02]">
                {product.tag && (
                  <span
                    className="absolute top-3 left-3 px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase rounded-full z-10"
                    style={{
                      backgroundColor: product.tag === "Sale" ? "#dc2626" : "#fff",
                      color: product.tag === "Sale" ? "#fff" : "#000",
                    }}
                  >
                    {product.tag}
                  </span>
                )}

                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${community.colors.accent}15` }}
                    >
                      <svg className="w-10 h-10 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-medium text-sm leading-snug line-clamp-2 mb-4 text-white/80 group-hover:text-white/95 transition-colors min-h-[2.5rem]">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{product.price}</span>
                  <button
                    onClick={() => setSelected(product)}
                    className="px-5 py-2 text-sm font-semibold rounded-full bg-white text-black hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-[11px] text-white/25 mt-10">
          Checkout powered by{" "}
          <a href="https://rye.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/50 transition-colors">
            Rye
          </a>
          {" "}&middot; Orders fulfilled by {community.storeName}
        </p>
      </div>

      {selected && (
        <CheckoutModal product={selected} community={community} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

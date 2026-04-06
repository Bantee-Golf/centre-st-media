"use client";

import { useState } from "react";
import { PRODUCTS, Product } from "@/lib/products";
import CheckoutModal from "./CheckoutModal";

export default function ShopSection() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section id="shop" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">Shop Gear</h2>
          <p className="text-muted mt-1">
            Officially licensed Penn State merchandise &mdash; checkout powered
            by Rye
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-card-bg border border-border overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Product image placeholder */}
              <div className="relative aspect-square bg-gradient-to-br from-surface-light to-surface flex items-center justify-center overflow-hidden">
                {product.tag && (
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-white text-[#041E42] z-10">
                    {product.tag}
                  </span>
                )}
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-muted"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-muted">Penn State Official</p>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-3 text-white/90">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{product.price}</span>
                  <button
                    onClick={() => setSelected(product)}
                    className="px-4 py-2 text-sm font-semibold rounded-full bg-white text-[#041E42] hover:bg-blue-50 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted mt-8">
          Checkout powered by{" "}
          <a
            href="https://rye.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Rye
          </a>{" "}
          &mdash; orders fulfilled by the official Penn State team shop
        </p>
      </div>

      {selected && (
        <CheckoutModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}

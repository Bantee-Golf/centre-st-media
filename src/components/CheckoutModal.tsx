"use client";

import { useState } from "react";
import { Product, Community } from "@/lib/communities";

interface Props {
  product: Product;
  community: Community;
  onClose: () => void;
}

type Step = "address" | "processing" | "confirmed" | "error";

export default function CheckoutModal({ product, community, onClose }: Props) {
  const [step, setStep] = useState<Step>("address");
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleCheckout = async () => {
    setStep("processing");
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          productUrl: product.url,
          quantity: 1,
          buyer: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            address: {
              address1: form.address1,
              address2: form.address2,
              city: form.city,
              state: form.state,
              postalCode: form.postalCode,
              country: "US",
            },
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      setStep("confirmed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("error");
    }
  };

  const isFormValid =
    form.firstName && form.lastName && form.email && form.address1 && form.city && form.state && form.postalCode;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-md rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden"
        style={{ backgroundColor: community.colors.dark }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 pb-4 border-b border-white/[0.06]">
          <div className="pr-4">
            <h3 className="text-base font-bold">Checkout</h3>
            <p className="text-xs text-white/40 mt-1 line-clamp-1">{product.name}</p>
          </div>
          <button onClick={onClose} className="p-1.5 -mr-1.5 -mt-0.5 rounded-lg hover:bg-white/[0.06] transition-colors text-white/40 hover:text-white/80">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          {step === "address" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name" value={form.firstName} onChange={(v) => update("firstName", v)} />
                <Field label="Last name" value={form.lastName} onChange={(v) => update("lastName", v)} />
              </div>
              <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} />
              <Field label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} />
              <Field label="Address" value={form.address1} onChange={(v) => update("address1", v)} />
              <Field label="Apt / Suite" value={form.address2} onChange={(v) => update("address2", v)} />
              <div className="grid grid-cols-3 gap-3">
                <Field label="City" value={form.city} onChange={(v) => update("city", v)} />
                <Field label="State" value={form.state} onChange={(v) => update("state", v)} />
                <Field label="ZIP" value={form.postalCode} onChange={(v) => update("postalCode", v)} />
              </div>

              <div className="flex items-center justify-between pt-4 mt-1 border-t border-white/[0.06]">
                <span className="text-lg font-bold">{product.price}</span>
                <button
                  onClick={handleCheckout}
                  disabled={!isFormValid}
                  className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="text-center py-16">
              <div className="w-10 h-10 mx-auto mb-4 border-[3px] border-white/10 border-t-white rounded-full animate-spin" />
              <p className="text-sm text-white/40">Creating checkout&hellip;</p>
            </div>
          )}

          {step === "confirmed" && (
            <div className="text-center py-16">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2">Checkout Created</h4>
              <p className="text-xs text-white/40 max-w-xs mx-auto leading-relaxed">
                In production this proceeds to Stripe payment. Order fulfilled by {community.storeName} via Rye.
              </p>
              <button onClick={onClose} className="mt-6 px-5 py-2 rounded-full border border-white/10 text-sm hover:bg-white/[0.06] transition-all">
                Done
              </button>
            </div>
          )}

          {step === "error" && (
            <div className="text-center py-16">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/15 flex items-center justify-center">
                <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2">Checkout Failed</h4>
              <p className="text-xs text-white/40 max-w-xs mx-auto">{error}</p>
              <p className="text-[11px] text-white/20 mt-1">Ensure RYE_API_KEY is configured.</p>
              <button onClick={() => setStep("address")} className="mt-6 px-5 py-2 rounded-full border border-white/10 text-sm hover:bg-white/[0.06] transition-all">
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-[11px] text-white/30 mb-1 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/15 transition-all"
      />
    </div>
  );
}

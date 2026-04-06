"use client";

import { useState } from "react";
import { Product } from "@/lib/products";

interface Props {
  product: Product;
  onClose: () => void;
}

type Step = "address" | "processing" | "confirmed" | "error";

export default function CheckoutModal({ product, onClose }: Props) {
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

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      // In production, this would poll for status then confirm with Stripe.
      // For demo, we show the intent was created successfully.
      setStep("confirmed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("error");
    }
  };

  const isFormValid =
    form.firstName &&
    form.lastName &&
    form.email &&
    form.address1 &&
    form.city &&
    form.state &&
    form.postalCode;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-bold">Checkout</h3>
            <p className="text-sm text-muted mt-0.5 line-clamp-1">
              {product.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {step === "address" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="First name"
                  value={form.firstName}
                  onChange={(v) => update("firstName", v)}
                />
                <Input
                  label="Last name"
                  value={form.lastName}
                  onChange={(v) => update("lastName", v)}
                />
              </div>
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
              />
              <Input
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(v) => update("phone", v)}
              />
              <Input
                label="Address"
                value={form.address1}
                onChange={(v) => update("address1", v)}
              />
              <Input
                label="Apt / Suite (optional)"
                value={form.address2}
                onChange={(v) => update("address2", v)}
              />
              <div className="grid grid-cols-3 gap-3">
                <Input
                  label="City"
                  value={form.city}
                  onChange={(v) => update("city", v)}
                />
                <Input
                  label="State"
                  value={form.state}
                  onChange={(v) => update("state", v)}
                />
                <Input
                  label="ZIP"
                  value={form.postalCode}
                  onChange={(v) => update("postalCode", v)}
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-lg font-bold">{product.price}</span>
                <button
                  onClick={handleCheckout}
                  disabled={!isFormValid}
                  className="px-6 py-3 rounded-full bg-white text-[#041E42] font-semibold hover:bg-blue-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="text-center py-12">
              <div className="w-12 h-12 mx-auto mb-4 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-muted">
                Creating checkout with Rye&hellip;
              </p>
            </div>
          )}

          {step === "confirmed" && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">
                Checkout Intent Created
              </h4>
              <p className="text-muted text-sm max-w-xs mx-auto">
                In production, this would proceed to Stripe payment
                confirmation. The order would be fulfilled by the Penn State
                team shop via Rye.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 rounded-full border border-white/25 text-sm hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          )}

          {step === "error" && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Checkout Failed</h4>
              <p className="text-muted text-sm max-w-xs mx-auto">
                {error || "Something went wrong. Please try again."}
              </p>
              <p className="text-muted text-xs mt-2">
                Ensure RYE_API_KEY is set in environment variables.
              </p>
              <button
                onClick={() => setStep("address")}
                className="mt-6 px-6 py-2 rounded-full border border-white/25 text-sm hover:bg-white/10 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-muted mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-card-bg border border-border text-sm text-white placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-white/20"
      />
    </div>
  );
}

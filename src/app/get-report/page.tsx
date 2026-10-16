// PATH: src/app/get-report/page.tsx
// REPLACES existing file. Clean layout: no overlap, hero and card are separate with clear spacing.
"use client";

import { useState } from "react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

interface FormState {
  address: string;
  firstName: string;
  email: string;
  phone: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function GetReportPage() {
  const [form, setForm] = useState<FormState>({
    address: "",
    firstName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [smsConsent, setSmsConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.address.trim()) next.address = "Home address is required.";
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) {
      next.phone = "Phone number is required.";
    } else if (!/^[\d\s()+-]{7,}$/.test(form.phone)) {
      next.phone = "Enter a valid phone number.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/property-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: form.address,
          latitude: null,
          longitude: null,
          firstName: form.firstName,
          email: form.email,
          phone: form.phone,
          smsConsent,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error ?? "Could not generate your report. Please try again.",
        );
      }

      const data = await res.json();
      window.location.href = `/?leadId=${data.leadId}`;
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError?: string) =>
    `${inter.className} w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0B1E33] outline-none placeholder:text-gray-400 focus:border-[#1FAE9F] ${
      hasError ? "border-[#E85D75]" : "border-[#0B1E33]/10"
    }`;

  const labelClass = `${inter.className} mb-2 block text-sm font-medium text-[#0B1E33]`;

  return (
    <main className="min-h-screen bg-[#F3F5F7]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B1E33] px-4 pt-[140px] pb-[64px] text-center">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.18]"
          style={{ backgroundImage: "url('/bgg.png')" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(31,174,159,0.22)_0%,rgba(11,30,51,0)_70%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[760px]">
          <span
            className={`${inter.className} inline-flex items-center gap-2 rounded-full bg-[#1FAE9F]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1FAE9F]`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#1FAE9F]" />
            Free &amp; Instant
          </span>
          <h1
            className={`${playfair.className} mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl`}
          >
            Get Your Free{" "}
            <span className="text-[#1FAE9F]">Home Value Report.</span>
          </h1>
          <p
            className={`${inter.className} mx-auto mt-4 max-w-[520px] text-sm leading-relaxed text-white/65 sm:text-base`}
          >
            Enter your details to see your instant home value, Signal Score, and
            comparable sales.
          </p>
        </div>
      </section>

      {/* Form card (separate from hero, no overlap) */}
      <section className="mx-auto w-full max-w-[560px] px-4 pt-[40px] pb-[80px]">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl bg-white p-6 ring-1 ring-[#0B1E33]/[0.06] shadow-[0_30px_70px_-40px_rgba(11,30,51,0.35)] sm:p-8"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="address" className={labelClass}>
                Home Address
              </label>
              <input
                id="address"
                type="text"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Enter your home address"
                autoComplete="street-address"
                className={inputClass(errors.address)}
              />
              {errors.address && (
                <p className={`${inter.className} mt-1 text-xs text-[#E85D75]`}>
                  {errors.address}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="firstName" className={labelClass}>
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="e.g. Sarah"
                autoComplete="given-name"
                className={inputClass(errors.firstName)}
              />
              {errors.firstName && (
                <p className={`${inter.className} mt-1 text-xs text-[#E85D75]`}>
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
                className={inputClass(errors.email)}
              />
              {errors.email && (
                <p className={`${inter.className} mt-1 text-xs text-[#E85D75]`}>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="(702) 000-0000"
                autoComplete="tel"
                className={inputClass(errors.phone)}
              />
              {errors.phone && (
                <p className={`${inter.className} mt-1 text-xs text-[#E85D75]`}>
                  {errors.phone}
                </p>
              )}
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-[#F3F5F7] px-4 py-4">
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#1FAE9F]"
              />
              <span
                className={`${inter.className} text-xs leading-[1.65] text-[#0B1E33]/70`}
              >
                I agree to receive text messages from LISTING SIGNAL about my
                home value report, appointment reminders and market updates.
                Message frequency varies (up to 4 msgs/month). Message &amp;
                data rates may apply. Reply STOP to opt out or HELP for help.
                Consent is not a condition of purchase. See our{" "}
                <a
                  href="/privacy-policy"
                  className="underline hover:text-[#1FAE9F]"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/terms-of-service"
                  className="underline hover:text-[#1FAE9F]"
                >
                  Terms of Service
                </a>
                .
              </span>
            </label>

            {submitError && (
              <p
                className={`${inter.className} text-center text-xs text-[#E85D75]`}
              >
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${inter.className} flex w-full items-center justify-center gap-2 rounded-xl bg-[#1FAE9F] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1a9a8c] disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {isSubmitting ? "Generating your report..." : "Get My Report"}
            </button>

            <p
              className={`${inter.className} text-center text-xs text-[#0B1E33]/50`}
            >
              We never sell your data. No spam — ever.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

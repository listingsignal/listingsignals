"use client";

import { useState } from "react";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field in errors) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) next.message = "Please add a short message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // TODO: wire up submission endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <main className="bg-[#F3F5F7]">
      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative overflow-hidden bg-[#0B1E33]">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.18]"
          style={{ backgroundImage: "url('/bgg.png')" }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_80%_35%,rgba(31,174,159,0.14),transparent_65%)]" />

        <div className="relative mx-auto max-w-[900px] px-4 pb-16 pt-32 text-center sm:px-6 sm:pt-36 md:pb-20 md:pt-40 xl:px-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.16] bg-[#0B1E33]/45 px-3.5 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1FAE9F] shadow-[0_0_12px_rgba(31,174,159,0.75)]" />
            <span className={`${inter.className} text-[11px] font-medium tracking-wide text-white/90`}>
              Contact Us
            </span>
          </div>

          <h1
            className={`${playfair.className} font-semibold text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]`}
            style={{ fontSize: "clamp(1.9rem, 5vw, 3.1rem)", lineHeight: 1.25, letterSpacing: "-0.01em" }}
          >
            Let&apos;s talk about <span className="text-[#1FAE9F]">your home.</span>
          </h1>
        </div>
      </section>

      {/* ============================================================
          BODY — two-column: dark info panel (left) + form (right)
          ============================================================ */}
      <section className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 xl:px-10">
        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-40px_rgba(11,30,51,0.35)] ring-1 ring-[#0B1E33]/[0.05]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.25fr]">
            {/* Left — dark info panel */}
            <div className="relative overflow-hidden bg-[#0B1E33] px-7 py-10 sm:px-10 md:py-14">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_15%,rgba(31,174,159,0.16),transparent_60%)]" />

              <span className={`${inter.className} relative mb-5 inline-flex w-fit items-center rounded-full bg-[#1FAE9F]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1FAE9F]`}>
                Get In Touch
              </span>

              <p className={`${inter.className} relative mb-8 text-[15px] leading-relaxed text-white/60`}>
                Your Signal Score is just the beginning. If you have questions about your results, want to
                understand what the data means for your specific situation, or you&apos;re simply ready to take
                the next step — we&apos;re here.
              </p>

              <div className="relative flex flex-col gap-5">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-[#1FAE9F]">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className={`${inter.className} text-[13px] font-semibold text-white`}>Email</p>
                    <a
                      href="mailto:info@listingsignal.com"
                      className={`${inter.className} text-[13px] text-white/50 transition-colors hover:text-[#1FAE9F]`}
                    >
                      info@listingsignal.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-[#1FAE9F]">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 21s-7-5.8-7-11a7 7 0 1114 0c0 5.2-7 11-7 11z" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  <div>
                    <p className={`${inter.className} text-[13px] font-semibold text-white`}>Service Area</p>
                    <p className={`${inter.className} text-[13px] text-white/50`}>Henderson, NV &amp; surrounding areas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-[#1FAE9F]">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className={`${inter.className} text-[13px] font-semibold text-white`}>Response Time</p>
                    <p className={`${inter.className} text-[13px] text-white/50`}>Usually within a few hours</p>
                  </div>
                </div>
              </div>

              <div className="relative mt-10 flex items-center gap-2 border-t border-white/10 pt-6">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1FAE9F" strokeWidth="2.5" className="shrink-0">
                  <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className={`${inter.className} text-[13px] font-semibold text-white/80`}>
                  A real person. A real response. Fast.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div className="px-7 py-10 sm:px-10 md:py-14">
              {isSubmitted ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#1FAE9F]/10 text-[#1FAE9F]">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h2 className={`${playfair.className} mb-2 text-2xl font-bold text-[#0B1E33]`}>Message sent.</h2>
                  <p className={`${inter.className} text-[#0B1E33]/60`}>A real person will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label className={`${inter.className} mb-2 block text-sm font-medium text-[#0B1E33]`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="e.g. Sarah Johnson"
                    className={`${inter.className} mb-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0B1E33] outline-none placeholder:text-gray-400 focus:border-[#1FAE9F] ${
                      errors.name ? "border-[#E85D75]" : "border-[#0B1E33]/10"
                    }`}
                  />
                  {errors.name && <p className={`${inter.className} mb-4 text-xs text-[#E85D75]`}>{errors.name}</p>}
                  {!errors.name && <div className="mb-4" />}

                  <label className={`${inter.className} mb-2 block text-sm font-medium text-[#0B1E33]`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@email.com"
                    className={`${inter.className} mb-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0B1E33] outline-none placeholder:text-gray-400 focus:border-[#1FAE9F] ${
                      errors.email ? "border-[#E85D75]" : "border-[#0B1E33]/10"
                    }`}
                  />
                  {errors.email && <p className={`${inter.className} mb-4 text-xs text-[#E85D75]`}>{errors.email}</p>}
                  {!errors.email && <div className="mb-4" />}

                  <label className={`${inter.className} mb-2 block text-sm font-medium text-[#0B1E33]`}>
                    Phone Number <span className="font-normal text-[#0B1E33]/40">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="(702) 000-0000"
                    className={`${inter.className} mb-4 w-full rounded-xl border border-[#0B1E33]/10 bg-white px-4 py-3 text-sm text-[#0B1E33] outline-none placeholder:text-gray-400 focus:border-[#1FAE9F]`}
                  />

                  <label className={`${inter.className} mb-2 block text-sm font-medium text-[#0B1E33]`}>
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="How can we help?"
                    rows={5}
                    className={`${inter.className} mb-1 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-[#0B1E33] outline-none placeholder:text-gray-400 focus:border-[#1FAE9F] ${
                      errors.message ? "border-[#E85D75]" : "border-[#0B1E33]/10"
                    }`}
                  />
                  {errors.message && <p className={`${inter.className} mb-4 text-xs text-[#E85D75]`}>{errors.message}</p>}
                  {!errors.message && <div className="mb-6" />}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${inter.className} group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#1FAE9F] py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_22px_-8px_rgba(31,174,159,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#189184] disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.32)_50%,transparent_65%)] transition-transform duration-700 ease-out group-hover:translate-x-full" />
                    <span className="relative">{isSubmitting ? "Sending..." : "Send Message"}</span>
                    {!isSubmitting && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
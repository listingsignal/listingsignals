import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

export const metadata = {
  title: "About Us | Listing Signal",
  description:
    "Listing Signal gives homeowners a real-time read on their home's value and whether market conditions are working in their favor right now.",
};

const factors = [
  {
    title: "Price Momentum",
    desc: "Where values are heading",
    icon: (
      <path d="M3 11.5L12 4l9 7.5M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9M10 20v-6h4v6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Days on Market",
    desc: "How fast homes are moving",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Inventory Levels",
    desc: "How much competition exists",
    icon: (
      <>
        <rect x="4" y="14" width="3" height="6" />
        <rect x="10.5" y="10" width="3" height="10" />
        <rect x="17" y="6" width="3" height="14" />
      </>
    ),
  },
  {
    title: "Value Position",
    desc: "Where your home stands against the market",
    icon: (
      <>
        <path d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 13l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export default function AboutPage() {
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_20%_35%,rgba(31,174,159,0.14),transparent_65%)]" />

        <div className="relative mx-auto max-w-[1440px] px-4 pb-20 pt-32 text-center sm:px-6 sm:pt-36 md:pb-24 md:pt-40 xl:px-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.16] bg-[#0B1E33]/45 px-3.5 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1FAE9F] shadow-[0_0_12px_rgba(31,174,159,0.75)]" />
            <span className={`${inter.className} text-[11px] font-medium tracking-wide text-white/90`}>
              About Us
            </span>
          </div>

          <h1
            className={`${playfair.className} font-semibold text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]`}
            style={{ fontSize: "clamp(1.9rem, 5vw, 3.1rem)", lineHeight: 1.25, letterSpacing: "-0.01em" }}
          >
            The right move starts with
            <br />
            <span className="text-[#1FAE9F]">the right moment.</span>
          </h1>
        </div>
      </section>

      {/* ============================================================
          BODY — client's exact copy, in one clean card
          ============================================================ */}
      <section className="mx-auto max-w-[1440px] px-4 xl:py-[100px] md:py-[80px] py-[50px] md:px-6 xl:px-10">
        <div className="rounded-3xl bg-white p-7 shadow-[0_30px_70px_-40px_rgba(11,30,51,0.35)] ring-1 ring-[#0B1E33]/[0.05] sm:p-12">
          <div className={`${inter.className} space-y-5 text-[16px] leading-relaxed text-[#0B1E33]/70 sm:text-[17px]`}>
            <p>
              Most homeowners only think about selling when something forces the decision. By then, the market has
              already moved — and so has the opportunity.
            </p>
            <p className={`${playfair.className} text-xl font-semibold text-[#0B1E33] sm:text-2xl`}>
              The market doesn&apos;t wait. And neither does opportunity.
            </p>
            <p>Listing Signal was built for the homeowner who wants to stay ahead of it.</p>
            <p>
              Your Signal Score gives you a real-time read on your home&apos;s value and whether market conditions
              are working in your favor right now. Not eventually. Not when it&apos;s too late.{" "}
              <strong className="text-[#0B1E33]">Right now.</strong>
            </p>
            <p>Because knowing your worth and knowing your timing are two different things. We give you both.</p>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOUR FACTORS
          ============================================================ */}
      <section className="bg-white xl:py-[90px] md:py-[70px] py-[40px]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 xl:px-10">
          <h2 className={`${playfair.className} mb-[5vh] text-center text-2xl font-bold text-[#0B1E33] sm:text-[32px]`}>
            Your Signal Score is built on four market factors
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {factors.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-[#F7F9FA] p-6 ring-1 ring-[#0B1E33]/[0.06] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_30px_70px_-40px_rgba(11,30,51,0.35)]"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#1FAE9F] shadow-[0_0_0_1px_rgba(31,174,159,0.2)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {f.icon}
                  </svg>
                </span>
                <h3 className={`${inter.className} mb-1 text-[15px] font-bold text-[#0B1E33]`}>{f.title}</h3>
                <p className={`${inter.className} text-sm text-[#0B1E33]/55`}>{f.desc}</p>
              </div>
            ))}
          </div>

          <p className={`${inter.className} mt-10 text-center text-base font-semibold text-[#0B1E33]/70`}>
            One score. Four signals. <span className="text-[#1FAE9F]">The full picture.</span>
          </p>
        </div>
      </section>

      {/* ============================================================
          CTA
          ============================================================ */}
      <section className="px-4 xl:py-[90px] md:py-[70px] py-[40px] text-center sm:px-6 xl:px-10">
        <h2 className={`${playfair.className} mb-6 text-3xl font-bold text-[#0B1E33] sm:text-4xl`}>It&apos;s time.</h2>
        <a
          href="/"
          className={`${inter.className} group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#1FAE9F] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_22px_-8px_rgba(31,174,159,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#189184] hover:shadow-[0_18px_34px_-10px_rgba(31,174,159,0.85)]`}
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.32)_50%,transparent_65%)] transition-transform duration-700 ease-out group-hover:translate-x-full" />
          <span className="relative">Check Your Home&apos;s Value</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>
    </main>
  );
}
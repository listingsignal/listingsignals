// PATH: src/app/booked/page.tsx
// NEW file. Thank You page shown after a free home visit is booked (GHL calendar redirects here).
// Its only extra job is to fire the Meta "Schedule" event, once.
import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import ScheduleTracker from "@/components/ScheduleTracker";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "You're Booked | Listing Signal™",
  robots: { index: false, follow: false },
};

export default function BookedPage() {
  return (
    <main className="min-h-screen bg-[#F3F5F7]">
      <ScheduleTracker />
      <section className="mx-auto flex max-w-[640px] flex-col items-center px-4 pb-20 pt-[140px] text-center sm:px-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1FAE9F]/12 text-2xl text-[#1FAE9F]">
          ✓
        </span>
        <h1
          className={`${playfair.className} mt-6 font-semibold text-[#0B1E33]`}
          style={{ fontSize: "clamp(1.9rem, 5vw, 2.6rem)", lineHeight: 1.2 }}
        >
          You&apos;re booked.
        </h1>
        <p className={`${inter.className} mt-4 text-base leading-relaxed text-[#0B1E33]/70`}>
          Your free home visit is confirmed. We&apos;ve sent your confirmation details. Your full home report unlocks
          after your visit.
        </p>
        <Link
          href="/"
          className={`${inter.className} mt-8 inline-flex items-center rounded-xl bg-[#0B1E33] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#12304f]`}
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
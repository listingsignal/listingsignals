import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Footer() {
  return (
    <footer id="site-footer" className="border-t border-white/10 bg-[#0B1E33]">
      <div className="px-4 md:px-6 xl:px-10 max-w-[1440px] mx-auto py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 md:col-span-1">
            <img src="/logo.png" alt="Listing Signal" className="mb-3 h-auto w-[150px]" />
            <p className={`${inter.className} max-w-xs text-sm leading-relaxed text-white/50`}>
              Instant home value estimates and market insight for homeowners — powered by live sales data.
            </p>
          </div>

          {/* Company links */}
          <div>
            <p className={`${inter.className} mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/40`}>
              Company
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="/" className={`${inter.className} text-sm text-white/60 transition-colors hover:text-[#1FAE9F]`}>
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className={`${inter.className} text-sm text-white/60 transition-colors hover:text-[#1FAE9F]`}>
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className={`${inter.className} text-sm text-white/60 transition-colors hover:text-[#1FAE9F]`}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <p className={`${inter.className} mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/40`}>
              Legal
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="/privacy-policy"
                  className={`${inter.className} text-sm text-white/60 transition-colors hover:text-[#1FAE9F]`}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className={`${inter.className} text-sm text-white/60 transition-colors hover:text-[#1FAE9F]`}
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Get in touch */}
          <div className="md:ml-[-3vw] lg:ml-0">
            <p className={`${inter.className} mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/40`}>
              Get In Touch
            </p>
            <a
              href="mailto:info@listingsignal.com"
              className={`${inter.className} flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#1FAE9F]`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              info@listingsignal.com
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className={`${inter.className} text-xs text-white/40`}>
            © {new Date().getFullYear()} Listing Signal™. All rights reserved.
          </p>
          <p className={`${inter.className} text-xs text-white/30 md:text-start text-center`}>
            Not a formal appraisal. Automated estimate based on comparable sales &amp; public data.
          </p>
        </div>
      </div>
    </footer>
  );
}
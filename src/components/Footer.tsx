import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Footer() {
  return (
    <footer className="border-t border-[#0B1E33]/10 bg-white px-4 py-6 md:px-6">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className={`${inter.className} text-xs text-[#0B1E33]/50`}>
          © {new Date().getFullYear()} Listing Signal™. All rights reserved.
        </p>
        <div className={`${inter.className} flex items-center gap-4 text-xs text-[#0B1E33]/50`}>
          <a href="/privacy-policy" className="hover:text-[#1FAE9F] hover:underline">
            Privacy Policy
          </a>
          <span className="text-[#0B1E33]/20">|</span>
          <a href="/terms-of-service" className="hover:text-[#1FAE9F] hover:underline">
            Terms of Service
          </a>
          <span className="text-[#0B1E33]/20">|</span>
          <a href="mailto:info@listingsignal.com" className="hover:text-[#1FAE9F] hover:underline">
            info@listingsignal.com
          </a>
        </div>
      </div>
    </footer>
  );
}
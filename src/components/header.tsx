"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import gsap from "gsap";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!logoRef.current || !infoRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        logoRef.current,
        { yPercent: -100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.6 },
      );

      if (navRef.current) {
        tl.fromTo(
          navRef.current,
          { yPercent: -100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.6 },
          "<0.08",
        );
      }

      tl.fromTo(
        infoRef.current,
        { yPercent: -100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.6 },
        "<0.08",
      );
    }, barRef);

    return () => ctx.revert();
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div
      id="site-header"
      ref={barRef}
      className="fixed top-0 inset-x-0 z-50 w-full border-b border-white/[0.06] bg-[#0B1E33]/95 py-4 backdrop-blur-md"
    >
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-4 md:px-6 xl:px-10">
        {/* Logo */}
        <Link href={"/"} ref={logoRef} className="flex shrink-0 items-center gap-2.5">
          <img src="/logo.png" alt="Listing Signal" className="h-auto w-[160px] lg:w-[200px]" />
        </Link>

        {/* Nav links — desktop */}
        <nav ref={navRef} className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${inter.className} relative rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                  active ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute inset-0 rounded-full border border-[#1FAE9F]/30 bg-[#1FAE9F]/10" />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side info */}
        <div ref={infoRef} className="flex items-center gap-3 text-xs text-white md:gap-4">
          {/* Live data */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1FAE9F] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1FAE9F]" />
            </span>
            <span className="hidden whitespace-nowrap font-semibold tracking-widest text-white/90 xs:inline">
              LIVE DATA
            </span>
          </div>

          {/* Homeowners checked */}
          <div className="hidden items-center gap-2 border-l border-white/10 pl-4 sm:flex">
            <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z"
                stroke="#1FAE9F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M8.5 12L11 14.5L15.8 9.7" stroke="#1FAE9F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="whitespace-nowrap leading-tight">
              <div className="font-semibold text-white">2,847 homeowners</div>
              <div className="text-white/50">checked this month</div>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/[0.08] md:hidden"
          >
            {mobileOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Nav links — mobile dropdown */}
      {mobileOpen && (
        <nav className="mt-4 border-t border-white/[0.06] px-4 pt-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${inter.className} rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors ${
                    active ? "bg-[#1FAE9F]/10 text-white" : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
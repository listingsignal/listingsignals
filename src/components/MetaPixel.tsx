// PATH: src/components/MetaPixel.tsx
// NEW file. Loads the Meta Pixel on public pages only. It is NOT loaded on /agent/* (those URLs hold a secret token)
// or /api/*. Needs NEXT_PUBLIC_META_PIXEL_ID in the environment.
"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { META_PIXEL_ID } from "@/lib/meta-pixel";

const EXCLUDED_PREFIXES = ["/agent", "/api"];

export default function MetaPixel() {
  const pathname = usePathname();
  const skipFirst = useRef(true);
  const excluded = EXCLUDED_PREFIXES.some((p) => pathname?.startsWith(p));
  const enabled = Boolean(META_PIXEL_ID) && !excluded;

  // The first PageView is sent by the init snippet below. This sends one on every later client-side route change.
  useEffect(() => {
    if (!enabled) return;
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname, enabled]);

  if (!enabled) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
      }}
    />
  );
}
// PATH: src/lib/meta-pixel.ts
// NEW file. Small safe wrapper around the Meta Pixel (fbq). Never throws, does nothing if the pixel is not loaded.
// Rule: never pass names, emails, phones or addresses in event params.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  try {
    window.fbq("track", name, params ?? {});
  } catch {
    // tracking must never break the page
  }
}

// Fires an event only once per browser session for the given key (stops double counting on refresh).
export function trackEventOnce(key: string, name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
  } catch {
    // sessionStorage can be blocked; fall through and track once for this page load
  }
  trackEvent(name, params);
}
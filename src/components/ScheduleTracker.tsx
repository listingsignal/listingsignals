// PATH: src/components/ScheduleTracker.tsx
// REPLACES existing file. Change: Meta Schedule event label renamed to "Free Home Evaluation". Fires once when the booking Thank You page opens.
"use client";

import { useEffect } from "react";
import { trackEventOnce } from "@/lib/meta-pixel";

export default function ScheduleTracker() {
  useEffect(() => {
    // The pixel script loads after the page is interactive, so wait for it before firing.
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (typeof window.fbq === "function") {
        window.clearInterval(timer);
        trackEventOnce("ls_schedule_tracked", "Schedule", { content_name: "Free Home Evaluation" });
      } else if (tries > 40) {
        window.clearInterval(timer);
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, []);

  return null;
}
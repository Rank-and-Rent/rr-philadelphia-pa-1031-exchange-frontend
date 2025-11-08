"use client";

import { useEffect, useState } from "react";
import { PHONE_DISPLAY, PHONE_E164 } from "../lib/config/site";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 180);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-full max-w-[320px] -translate-x-1/2 rounded-full border border-outline/15 bg-white px-4 py-3 shadow-2xl sm:max-w-lg sm:translate-x-0 sm:left-auto sm:right-6">
      <div className="flex items-center justify-between gap-3">
        <div className="hidden flex-1 sm:block">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Need guidance?</p>
          <p className="text-sm text-[#1B1B1B]">Schedule your 1031 consultation today.</p>
        </div>
        <a
          className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:inline-flex"
          href="/contact#lead-form"
        >
          Contact Advisor
        </a>
        <a
          className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:hidden"
          href={`tel:${PHONE_E164}`}
        >
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}


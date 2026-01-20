"use client";

import { useEffect, useState } from "react";
import { PHONE_DISPLAY, PHONE_E164 } from "../lib/config/site";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div className="fixed bottom-4 left-1/2 z-40 w-full max-w-[320px] -translate-x-1/2 sm:max-w-lg sm:translate-x-0 sm:left-auto sm:right-6">
      {/* Mobile: Collapsible CTA */}
      <div className="sm:hidden">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full border border-[#5D5838]/20 bg-white px-4 py-3 shadow-2xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Need guidance?</p>
                <p className="text-sm font-semibold text-[#1B1B1B]">{PHONE_DISPLAY}</p>
              </div>
              <span className="text-2xl text-[#5D5838]">+</span>
            </div>
          </button>
        ) : (
          <div className="border border-[#5D5838]/20 bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="text-left">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Need guidance?</p>
                <p className="text-sm font-semibold text-[#1B1B1B]">{PHONE_DISPLAY}</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-2xl text-[#5D5838] transition-colors hover:text-[#7A7654] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${PHONE_E164}`}
                className="flex items-center justify-center bg-[#5D5838] px-4 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#454326] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]"
              >
                Call {PHONE_DISPLAY}
              </a>
              <a
                href="/contact#contact-form"
                className="flex items-center justify-center border border-[#5D5838] px-4 py-3 text-xs font-medium uppercase tracking-[0.1em] text-[#5D5838] transition-colors hover:bg-[#5D5838] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]"
              >
                Get In Touch
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Desktop: Always visible */}
      <div className="hidden sm:block border border-[#5D5838]/20 bg-white px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Need guidance?</p>
            <p className="text-sm text-[#1B1B1B]">Schedule your 1031 consultation today.</p>
          </div>
          <a
            className="bg-[#5D5838] px-5 py-2 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#454326] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D5838]"
            href="/contact#contact-form"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}


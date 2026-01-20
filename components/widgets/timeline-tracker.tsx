"use client";

import { addDays, format, parseISO } from "date-fns";
import { useMemo, useState } from "react";

const milestones = [
  { label: "Relinquished closing", offset: 0, description: "Sale of relinquished property. Exchange funds move to the qualified intermediary." },
  { label: "Identification midpoint reminder", offset: 23, description: "Confirm site tours, financing, and due diligence before day forty five." },
  { label: "Identification deadline", offset: 45, description: "Deliver written identification list to the qualified intermediary by midnight local time." },
  { label: "Financing confirmation", offset: 90, description: "Lock interest rate, order updated estoppels, and confirm lender closing conditions." },
  { label: "Final walkthrough scheduling", offset: 160, description: "Complete inspections, walkthroughs, and closing document reviews." },
  { label: "Exchange completion deadline", offset: 180, description: "Close on at least one replacement property within one hundred eighty days." },
];

export function TimelineTracker() {
  const [closeDate, setCloseDate] = useState(() => new Date().toISOString().split("T")[0]);

  const schedule = useMemo(() => {
    const base = parseISO(closeDate);
    return milestones.map((milestone) => ({
      ...milestone,
      date: format(addDays(base, milestone.offset), "MMMM d, yyyy"),
    }));
  }, [closeDate]);

  return (
    <section className="border border-[#5D5838]/20 bg-white p-8">
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Milestone Tracking</p>
      <h3 className="mt-3 text-xl font-normal tracking-wide text-[#5D5838]">EXCHANGE TIMELINE TRACKER</h3>
      <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
        Map critical milestones relative to the relinquished closing date. Adjust the schedule as contingencies shift.
      </p>
      <label className="mt-6 flex w-full max-w-xs flex-col text-sm font-medium text-[#5D5838]">
        Relinquished closing date
        <input
          type="date"
          value={closeDate}
          onChange={(event) => setCloseDate(event.target.value)}
          className="mt-2 border border-[#5D5838]/20 px-4 py-3 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-[#5D5838]"
        />
      </label>
      <ul className="mt-6 space-y-0 divide-y divide-[#5D5838]/10">
        {schedule.map((milestone) => (
          <li key={milestone.label} className="py-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-[#5D5838]">{milestone.label}</p>
              <p className="text-sm font-medium text-[#5D5838]">{milestone.date}</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#3F3F3F]">{milestone.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

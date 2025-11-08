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
    <section className="rounded-3xl border border-outline/15 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-heading">Exchange Timeline Tracker</h3>
      <p className="mt-2 text-sm text-[#3F3F3F]">
        Map critical milestones relative to the relinquished closing date. Adjust the schedule as contingencies shift.
      </p>
      <label className="mt-4 flex w-full max-w-xs flex-col text-sm font-semibold text-heading">
        Relinquished closing date
        <input
          type="date"
          value={closeDate}
          onChange={(event) => setCloseDate(event.target.value)}
          className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>
      <ul className="mt-4 space-y-3">
        {schedule.map((milestone) => (
          <li key={milestone.label} className="rounded-2xl border border-outline/15 bg-panel px-4 py-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-heading">{milestone.label}</p>
              <p className="text-sm text-primary">{milestone.date}</p>
            </div>
            <p className="mt-2 text-xs text-[#3F3F3F]">{milestone.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}


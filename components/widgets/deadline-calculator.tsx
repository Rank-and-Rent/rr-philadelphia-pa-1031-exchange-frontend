"use client";

import { addDays, format, parseISO } from "date-fns";
import { useMemo, useState } from "react";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function DeadlineCalculator() {
  const [closeDate, setCloseDate] = useState(() => new Date().toISOString().split("T")[0]);

  const deadlines = useMemo(() => {
    const parsed = parseISO(closeDate);
    const identification = addDays(parsed, 45);
    const completion = addDays(parsed, 180);
    return {
      close: parsed,
      identification,
      completion,
    };
  }, [closeDate]);

  return (
    <section className="border border-[#5D5838]/20 bg-white p-8">
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Calculate Deadlines</p>
      <h3 className="mt-3 text-xl font-normal tracking-wide text-[#5D5838]">45 DAY AND 180 DAY DEADLINE CALCULATOR</h3>
      <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
        Enter the scheduled closing date for the relinquished property. Deadlines adjust to the {timeZone} time zone.
      </p>
      <form className="mt-6 grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col text-sm font-medium text-[#5D5838]">
          Relinquished closing date
          <input
            type="date"
            value={closeDate}
            onChange={(event) => setCloseDate(event.target.value)}
            className="mt-2 border border-[#5D5838]/20 px-4 py-3 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-[#5D5838]"
          />
        </label>
        <div className="border border-[#5D5838]/20 bg-[#F8F7F4] px-4 py-4 text-sm text-[#1B1B1B]">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Calculated deadlines</p>
          <p className="mt-3">
            Identification: <span className="font-semibold text-[#5D5838]">{format(deadlines.identification, "MMMM d, yyyy")}</span>
          </p>
          <p className="mt-1">
            Completion: <span className="font-semibold text-[#5D5838]">{format(deadlines.completion, "MMMM d, yyyy")}</span>
          </p>
        </div>
      </form>
    </section>
  );
}

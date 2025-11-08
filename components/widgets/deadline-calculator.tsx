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
    <section className="rounded-3xl border border-outline/15 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-heading">45 Day and 180 Day Deadline Calculator</h3>
      <p className="mt-2 text-sm text-[#3F3F3F]">
        Enter the scheduled closing date for the relinquished property. Deadlines adjust to the {timeZone} time zone.
      </p>
      <form className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-sm font-semibold text-heading">
          Relinquished closing date
          <input
            type="date"
            value={closeDate}
            onChange={(event) => setCloseDate(event.target.value)}
            className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-[#1B1B1B]">
          <p className="font-semibold text-heading">Calculated deadlines</p>
          <p className="mt-2">
            Identification deadline: <span className="font-semibold text-heading">{format(deadlines.identification, "MMMM d, yyyy")}</span>
          </p>
          <p className="mt-1">
            Exchange completion deadline: <span className="font-semibold text-heading">{format(deadlines.completion, "MMMM d, yyyy")}</span>
          </p>
        </div>
      </form>
    </section>
  );
}


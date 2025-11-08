"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { PRIMARY_CITY, PRIMARY_STATE_ABBR, SITE_NAME } from "../../lib/config/site";

export function IdentificationLetterHelper() {
  const [taxpayer, setTaxpayer] = useState("");
  const [qiName, setQiName] = useState("");
  const [exchangeId, setExchangeId] = useState("");
  const [properties, setProperties] = useState(
    ["1. ", "2. ", "3. "].join("\n")
  );

  const today = format(new Date(), "MMMM d, yyyy");

  const letter = useMemo(() => {
    const propertyLines = properties
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join("\n");

    return [
      today,
      "",
      qiName || "[Qualified Intermediary Name]",
      "Attention: Exchange Officer",
      "",
      "Subject: Identification of Replacement Property",
      "",
      `To the Qualified Intermediary for ${exchangeId || "[Exchange ID]"}`,
      "",
      `I, ${taxpayer || "[Taxpayer Name]"}, hereby identify the following real property as potential replacement property under Section 1031 for the above referenced exchange.`,
      "",
      propertyLines || "[Insert property descriptions with legal addresses and contract values]",
      "",
      "Each property is held for investment or productive use in a trade or business. I acknowledge the forty five day identification deadline and confirm that this notice is delivered timely.",
      "",
      "Sincerely,",
      "",
      taxpayer || "[Taxpayer Name]",
      SITE_NAME,
      `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
    ].join("\n");
  }, [exchangeId, properties, qiName, taxpayer, today]);

  return (
    <section className="rounded-3xl border border-outline/15 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-heading">Identification Letter Helper</h3>
      <p className="mt-2 text-sm text-[#3F3F3F]">
        Draft a compliant identification letter for delivery to your qualified intermediary. Replace placeholders with final legal descriptions and execution details.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col text-sm font-semibold text-heading">
          Taxpayer name
          <input
            type="text"
            value={taxpayer}
            onChange={(event) => setTaxpayer(event.target.value)}
            className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Investor or entity name"
          />
        </label>
        <label className="flex flex-col text-sm font-semibold text-heading">
          Qualified intermediary
          <input
            type="text"
            value={qiName}
            onChange={(event) => setQiName(event.target.value)}
            className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="QI company"
          />
        </label>
        <label className="flex flex-col text-sm font-semibold text-heading">
          Exchange ID or reference
          <input
            type="text"
            value={exchangeId}
            onChange={(event) => setExchangeId(event.target.value)}
            className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="QI reference number"
          />
        </label>
        <label className="flex flex-col text-sm font-semibold text-heading md:col-span-2">
          Replacement properties
          <textarea
            value={properties}
            onChange={(event) => setProperties(event.target.value)}
            rows={5}
            className="mt-2 w-full rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="1. Property description, address, estimated value"
          />
        </label>
      </div>
      <div className="mt-4">
        <label htmlFor="identification-letter-output" className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Draft letter
        </label>
        <textarea
          id="identification-letter-output"
          readOnly
          value={letter}
          rows={10}
          className="mt-2 w-full rounded-xl border border-outline/20 bg-panel px-3 py-2 text-sm font-mono text-[#1B1B1B]"
        />
      </div>
    </section>
  );
}


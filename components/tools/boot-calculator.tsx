"use client";

import { useMemo, useState } from "react";

export function BootCalculator() {
  const [relinquishedValue, setRelinquishedValue] = useState("");
  const [replacementValue, setReplacementValue] = useState("");
  const [cashReceived, setCashReceived] = useState("");
  const [oldMortgage, setOldMortgage] = useState("");
  const [newMortgage, setNewMortgage] = useState("");

  const calculations = useMemo(() => {
    const relValue = parseFloat(relinquishedValue) || 0;
    const repValue = parseFloat(replacementValue) || 0;
    const cash = parseFloat(cashReceived) || 0;
    const oldMort = parseFloat(oldMortgage) || 0;
    const newMort = parseFloat(newMortgage) || 0;

    const mortgageBoot = Math.max(0, oldMort - newMort);
    const totalBoot = cash + mortgageBoot;
    const estimatedTax = totalBoot * 0.20;

    return {
      mortgageBoot,
      totalBoot,
      estimatedTax,
      hasBoot: totalBoot > 0,
      isValid: relValue > 0 && repValue > 0,
    };
  }, [relinquishedValue, replacementValue, cashReceived, oldMortgage, newMortgage]);

  const inputClasses = "mt-2 w-full border border-[#5D5838]/20 px-4 py-3 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-[#5D5838]";

  return (
    <div className="space-y-8">
      <div className="border border-[#5D5838]/20 bg-white p-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Calculator</p>
        <h2 className="mt-3 text-xl font-normal tracking-wide text-[#5D5838]">CALCULATE BOOT</h2>
        <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
          Boot is cash or other non-like-kind property received during an exchange. It is subject to immediate taxation and cannot be deferred.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <label className="flex flex-col text-sm font-medium text-[#5D5838]">
            Relinquished Property Value
            <input
              type="number"
              value={relinquishedValue}
              onChange={(e) => setRelinquishedValue(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className={inputClasses}
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Sale price of property being sold</span>
          </label>
          <label className="flex flex-col text-sm font-medium text-[#5D5838]">
            Replacement Property Value
            <input
              type="number"
              value={replacementValue}
              onChange={(e) => setReplacementValue(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className={inputClasses}
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Purchase price of replacement property</span>
          </label>
          <label className="flex flex-col text-sm font-medium text-[#5D5838]">
            Cash Received
            <input
              type="number"
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className={inputClasses}
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Cash received at closing</span>
          </label>
          <label className="flex flex-col text-sm font-medium text-[#5D5838]">
            Old Mortgage Balance
            <input
              type="number"
              value={oldMortgage}
              onChange={(e) => setOldMortgage(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className={inputClasses}
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Mortgage on relinquished property</span>
          </label>
          <label className="flex flex-col text-sm font-medium text-[#5D5838]">
            New Mortgage Balance
            <input
              type="number"
              value={newMortgage}
              onChange={(e) => setNewMortgage(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className={inputClasses}
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Mortgage on replacement property</span>
          </label>
        </div>
      </div>

      {calculations.isValid && (
        <div className="border border-[#5D5838]/20 bg-white p-8">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Results</p>
          <h3 className="mt-3 text-lg font-normal tracking-wide text-[#5D5838]">BOOT CALCULATION RESULTS</h3>
          <div className="mt-6 space-y-4">
            <div className="border border-[#5D5838]/20 bg-[#F8F7F4] px-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#3F3F3F]">Cash Boot</span>
                <span className="text-lg font-semibold text-[#5D5838]">
                  ${parseFloat(cashReceived || "0").toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="border border-[#5D5838]/20 bg-[#F8F7F4] px-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#3F3F3F]">Mortgage Boot</span>
                <span className="text-lg font-semibold text-[#5D5838]">
                  ${calculations.mortgageBoot.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-xs text-[#3F3F3F] mt-2">
                {calculations.mortgageBoot > 0
                  ? "Debt relief when new mortgage is less than old mortgage"
                  : "No mortgage boot (new mortgage equals or exceeds old mortgage)"}
              </p>
            </div>
            <div className="border-2 border-[#5D5838] bg-[#5D5838]/10 px-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-[#5D5838]">Total Boot</span>
                <span className="text-xl font-bold text-[#5D5838]">
                  ${calculations.totalBoot.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            {calculations.hasBoot && (
              <div className="border border-[#7A7654]/30 bg-[#7A7654]/10 px-4 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#3F3F3F]">Estimated Tax on Boot (20%)</span>
                  <span className="text-lg font-semibold text-[#5D5838]">
                    ${calculations.estimatedTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-xs text-[#3F3F3F] mt-2">
                  This is an illustrative estimate. Actual tax rates depend on your income bracket, state taxes, and other factors. Consult a tax advisor.
                </p>
              </div>
            )}
            {!calculations.hasBoot && (
              <div className="border border-green-500/30 bg-green-500/10 px-4 py-4">
                <p className="text-sm font-semibold text-green-700">No boot detected. All proceeds appear to be reinvested in like-kind property.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

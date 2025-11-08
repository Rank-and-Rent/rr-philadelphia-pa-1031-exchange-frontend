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

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-outline/15 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-heading mb-4">Calculate Boot</h2>
        <p className="text-sm text-[#3F3F3F] mb-6">
          Boot is cash or other non-like-kind property received during an exchange. It is subject to immediate taxation and cannot be deferred.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col text-sm font-semibold text-heading">
            Relinquished Property Value
            <input
              type="number"
              value={relinquishedValue}
              onChange={(e) => setRelinquishedValue(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Sale price of property being sold</span>
          </label>
          <label className="flex flex-col text-sm font-semibold text-heading">
            Replacement Property Value
            <input
              type="number"
              value={replacementValue}
              onChange={(e) => setReplacementValue(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Purchase price of replacement property</span>
          </label>
          <label className="flex flex-col text-sm font-semibold text-heading">
            Cash Received
            <input
              type="number"
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Cash received at closing</span>
          </label>
          <label className="flex flex-col text-sm font-semibold text-heading">
            Old Mortgage Balance
            <input
              type="number"
              value={oldMortgage}
              onChange={(e) => setOldMortgage(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Mortgage on relinquished property</span>
          </label>
          <label className="flex flex-col text-sm font-semibold text-heading">
            New Mortgage Balance
            <input
              type="number"
              value={newMortgage}
              onChange={(e) => setNewMortgage(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Mortgage on replacement property</span>
          </label>
        </div>
      </div>

      {calculations.isValid && (
        <div className="rounded-3xl border border-outline/15 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-heading mb-4">Boot Calculation Results</h3>
          <div className="space-y-4">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#3F3F3F]">Cash Boot</span>
                <span className="text-lg font-semibold text-heading">
                  ${parseFloat(cashReceived || "0").toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#3F3F3F]">Mortgage Boot</span>
                <span className="text-lg font-semibold text-heading">
                  ${calculations.mortgageBoot.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-xs text-[#3F3F3F] mt-1">
                {calculations.mortgageBoot > 0
                  ? "Debt relief when new mortgage is less than old mortgage"
                  : "No mortgage boot (new mortgage equals or exceeds old mortgage)"}
              </p>
            </div>
            <div className="rounded-2xl border-2 border-primary bg-primary/10 px-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-heading">Total Boot</span>
                <span className="text-xl font-bold text-heading">
                  ${calculations.totalBoot.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            {calculations.hasBoot && (
              <div className="rounded-2xl border border-[#B68F40]/30 bg-[#B68F40]/10 px-4 py-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#3F3F3F]">Estimated Tax on Boot (20%)</span>
                  <span className="text-lg font-semibold text-heading">
                    ${calculations.estimatedTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-xs text-[#3F3F3F] mt-2">
                  This is an illustrative estimate. Actual tax rates depend on your income bracket, state taxes, and other factors. Consult a tax advisor.
                </p>
              </div>
            )}
            {!calculations.hasBoot && (
              <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3">
                <p className="text-sm font-semibold text-green-700">No boot detected. All proceeds appear to be reinvested in like-kind property.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


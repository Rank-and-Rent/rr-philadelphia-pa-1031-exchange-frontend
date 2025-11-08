"use client";

import { useMemo, useState } from "react";

export function ExchangeCostEstimator() {
  const [propertyValue, setPropertyValue] = useState("");
  const [qiFeePercentage, setQiFeePercentage] = useState("0.75");
  const [escrowFee, setEscrowFee] = useState("500");
  const [titleInsuranceRate, setTitleInsuranceRate] = useState("0.5");
  const [recordingFees, setRecordingFees] = useState("200");

  const calculations = useMemo(() => {
    const propValue = parseFloat(propertyValue) || 0;
    const qiRate = parseFloat(qiFeePercentage) || 0;
    const escrow = parseFloat(escrowFee) || 0;
    const titleRate = parseFloat(titleInsuranceRate) || 0;
    const recording = parseFloat(recordingFees) || 0;

    const qiFee = propValue * (qiRate / 100);
    const titleInsurance = propValue * (titleRate / 100);
    const totalCosts = qiFee + escrow + titleInsurance + recording;

    return {
      qiFee,
      escrow,
      titleInsurance,
      recording,
      totalCosts,
      isValid: propValue > 0,
    };
  }, [propertyValue, qiFeePercentage, escrowFee, titleInsuranceRate, recordingFees]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-outline/15 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-heading mb-4">Estimate Exchange Costs</h2>
        <p className="text-sm text-[#3F3F3F] mb-6">
          Calculate estimated costs for a 1031 exchange in Philadelphia, PA. Pennsylvania does not impose a state real estate transfer tax, but recording fees and title insurance still apply.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col text-sm font-semibold text-heading">
            Property Value
            <input
              type="number"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Sale or purchase price</span>
          </label>
          <label className="flex flex-col text-sm font-semibold text-heading">
            QI Fee Percentage
            <input
              type="number"
              value={qiFeePercentage}
              onChange={(e) => setQiFeePercentage(e.target.value)}
              placeholder="0.75"
              min="0"
              max="5"
              step="0.1"
              className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Typical range: 0.5% to 1.5%</span>
          </label>
          <label className="flex flex-col text-sm font-semibold text-heading">
            Escrow Fee
            <input
              type="number"
              value={escrowFee}
              onChange={(e) => setEscrowFee(e.target.value)}
              placeholder="500"
              min="0"
              step="100"
              className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Flat escrow administration fee</span>
          </label>
          <label className="flex flex-col text-sm font-semibold text-heading">
            Title Insurance Rate (%)
            <input
              type="number"
              value={titleInsuranceRate}
              onChange={(e) => setTitleInsuranceRate(e.target.value)}
              placeholder="0.5"
              min="0"
              max="2"
              step="0.1"
              className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Typical range: 0.4% to 0.8%</span>
          </label>
          <label className="flex flex-col text-sm font-semibold text-heading">
            Recording Fees
            <input
              type="number"
              value={recordingFees}
              onChange={(e) => setRecordingFees(e.target.value)}
              placeholder="200"
              min="0"
              step="50"
              className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Philadelphia County recording fees</span>
          </label>
        </div>
      </div>

      {calculations.isValid && (
        <div className="rounded-3xl border border-outline/15 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-heading mb-4">Cost Breakdown</h3>
          <div className="space-y-3">
            <div className="rounded-2xl border border-outline/20 bg-panel px-4 py-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#3F3F3F]">Qualified Intermediary Fee</span>
                <span className="text-base font-semibold text-heading">
                  ${calculations.qiFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-outline/20 bg-panel px-4 py-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#3F3F3F]">Escrow Fee</span>
                <span className="text-base font-semibold text-heading">
                  ${calculations.escrow.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-outline/20 bg-panel px-4 py-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#3F3F3F]">Title Insurance</span>
                <span className="text-base font-semibold text-heading">
                  ${calculations.titleInsurance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-outline/20 bg-panel px-4 py-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#3F3F3F]">Recording Fees</span>
                <span className="text-base font-semibold text-heading">
                  ${calculations.recording.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-primary bg-primary/10 px-4 py-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-heading">Total Estimated Costs</span>
                <span className="text-xl font-bold text-heading">
                  ${calculations.totalCosts.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-outline/20 bg-panel px-4 py-3">
              <p className="text-xs text-[#3F3F3F]">
                <strong>Note:</strong> Additional costs may include attorney fees, CPA review, property inspections, environmental assessments, and lender fees. Pennsylvania does not impose a state real estate transfer tax, but Philadelphia may have local transfer tax requirements.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


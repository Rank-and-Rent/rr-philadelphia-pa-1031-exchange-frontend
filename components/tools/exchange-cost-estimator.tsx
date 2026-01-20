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

  const inputClasses = "mt-2 w-full border border-[#5D5838]/20 px-4 py-3 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-[#5D5838]";

  return (
    <div className="space-y-8">
      <div className="border border-[#5D5838]/20 bg-white p-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Calculator</p>
        <h2 className="mt-3 text-xl font-normal tracking-wide text-[#5D5838]">ESTIMATE EXCHANGE COSTS</h2>
        <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
          Calculate estimated costs for a 1031 exchange in Philadelphia, PA. Pennsylvania does not impose a state real estate transfer tax, but recording fees and title insurance still apply.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <label className="flex flex-col text-sm font-medium text-[#5D5838]">
            Property Value
            <input
              type="number"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className={inputClasses}
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Sale or purchase price</span>
          </label>
          <label className="flex flex-col text-sm font-medium text-[#5D5838]">
            QI Fee Percentage
            <input
              type="number"
              value={qiFeePercentage}
              onChange={(e) => setQiFeePercentage(e.target.value)}
              placeholder="0.75"
              min="0"
              max="5"
              step="0.1"
              className={inputClasses}
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Typical range: 0.5% to 1.5%</span>
          </label>
          <label className="flex flex-col text-sm font-medium text-[#5D5838]">
            Escrow Fee
            <input
              type="number"
              value={escrowFee}
              onChange={(e) => setEscrowFee(e.target.value)}
              placeholder="500"
              min="0"
              step="100"
              className={inputClasses}
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Flat escrow administration fee</span>
          </label>
          <label className="flex flex-col text-sm font-medium text-[#5D5838]">
            Title Insurance Rate (%)
            <input
              type="number"
              value={titleInsuranceRate}
              onChange={(e) => setTitleInsuranceRate(e.target.value)}
              placeholder="0.5"
              min="0"
              max="2"
              step="0.1"
              className={inputClasses}
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Typical range: 0.4% to 0.8%</span>
          </label>
          <label className="flex flex-col text-sm font-medium text-[#5D5838]">
            Recording Fees
            <input
              type="number"
              value={recordingFees}
              onChange={(e) => setRecordingFees(e.target.value)}
              placeholder="200"
              min="0"
              step="50"
              className={inputClasses}
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">Philadelphia County recording fees</span>
          </label>
        </div>
      </div>

      {calculations.isValid && (
        <div className="border border-[#5D5838]/20 bg-white p-8">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Results</p>
          <h3 className="mt-3 text-lg font-normal tracking-wide text-[#5D5838]">COST BREAKDOWN</h3>
          <div className="mt-6 space-y-4">
            <div className="border border-[#5D5838]/20 bg-[#F8F7F4] px-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#3F3F3F]">Qualified Intermediary Fee</span>
                <span className="text-base font-semibold text-[#5D5838]">
                  ${calculations.qiFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="border border-[#5D5838]/20 bg-[#F8F7F4] px-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#3F3F3F]">Escrow Fee</span>
                <span className="text-base font-semibold text-[#5D5838]">
                  ${calculations.escrow.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="border border-[#5D5838]/20 bg-[#F8F7F4] px-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#3F3F3F]">Title Insurance</span>
                <span className="text-base font-semibold text-[#5D5838]">
                  ${calculations.titleInsurance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="border border-[#5D5838]/20 bg-[#F8F7F4] px-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#3F3F3F]">Recording Fees</span>
                <span className="text-base font-semibold text-[#5D5838]">
                  ${calculations.recording.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="border-2 border-[#5D5838] bg-[#5D5838]/10 px-4 py-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-[#5D5838]">Total Estimated Costs</span>
                <span className="text-xl font-bold text-[#5D5838]">
                  ${calculations.totalCosts.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="mt-4 border border-[#5D5838]/10 bg-[#F8F7F4] px-4 py-4">
              <p className="text-xs text-[#3F3F3F]">
                <strong className="text-[#5D5838]">Note:</strong> Additional costs may include attorney fees, CPA review, property inspections, environmental assessments, and lender fees. Pennsylvania does not impose a state real estate transfer tax, but Philadelphia may have local transfer tax requirements.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

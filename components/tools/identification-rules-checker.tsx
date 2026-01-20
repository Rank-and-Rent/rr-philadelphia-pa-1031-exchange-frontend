"use client";

import { useMemo, useState } from "react";

export function IdentificationRulesChecker() {
  const [relinquishedValue, setRelinquishedValue] = useState("");
  const [numProperties, setNumProperties] = useState("1");
  const [propertyValues, setPropertyValues] = useState<string[]>(["", "", ""]);

  const updatePropertyValue = (index: number, value: string) => {
    const newValues = [...propertyValues];
    newValues[index] = value;
    setPropertyValues(newValues);
  };

  const calculations = useMemo(() => {
    const relValue = parseFloat(relinquishedValue) || 0;
    const numProps = parseInt(numProperties) || 0;
    const totalIdentifiedValue = propertyValues
      .slice(0, numProps)
      .reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

    const threePropertyRule = numProps <= 3;
    const twoHundredPercentRule = totalIdentifiedValue <= relValue * 2;
    const ninetyFivePercentRule = relValue > 0 && totalIdentifiedValue >= relValue * 0.95;

    const allRulesMet = threePropertyRule && (twoHundredPercentRule || ninetyFivePercentRule);

    return {
      totalIdentifiedValue,
      threePropertyRule,
      twoHundredPercentRule,
      ninetyFivePercentRule,
      allRulesMet,
      isValid: relValue > 0 && numProps > 0 && numProps <= 10,
    };
  }, [relinquishedValue, numProperties, propertyValues]);

  const inputClasses = "mt-2 w-full border border-[#5D5838]/20 px-4 py-3 text-sm font-normal text-[#1B1B1B] outline-none transition focus:border-[#5D5838]";

  return (
    <div className="space-y-8">
      <div className="border border-[#5D5838]/20 bg-white p-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Validation Tool</p>
        <h2 className="mt-3 text-xl font-normal tracking-wide text-[#5D5838]">CHECK IDENTIFICATION RULES</h2>
        <p className="mt-4 text-sm leading-relaxed text-[#3F3F3F]">
          Validate your replacement property identification against IRS rules. You must satisfy either the three-property rule, the 200% rule, or the 95% exception.
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
            Number of Properties Identified
            <input
              type="number"
              value={numProperties}
              onChange={(e) => {
                const val = e.target.value;
                setNumProperties(val);
                const num = parseInt(val) || 0;
                if (num > propertyValues.length) {
                  setPropertyValues([...propertyValues, ...Array(num - propertyValues.length).fill("")]);
                }
              }}
              placeholder="1"
              min="1"
              max="10"
              step="1"
              className={inputClasses}
            />
            <span className="mt-1 text-xs text-[#3F3F3F] font-normal">How many replacement properties are you identifying?</span>
          </label>
        </div>
        {parseInt(numProperties) > 0 && (
          <div className="mt-6 space-y-4">
            <p className="text-sm font-medium text-[#5D5838]">Property Values</p>
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: parseInt(numProperties) || 0 }).map((_, index) => (
                <label key={index} className="flex flex-col text-sm font-medium text-[#5D5838]">
                  Property {index + 1} Value
                  <input
                    type="number"
                    value={propertyValues[index] || ""}
                    onChange={(e) => updatePropertyValue(index, e.target.value)}
                    placeholder="0"
                    min="0"
                    step="1000"
                    className={inputClasses}
                  />
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {calculations.isValid && (
        <div className="border border-[#5D5838]/20 bg-white p-8">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Results</p>
          <h3 className="mt-3 text-lg font-normal tracking-wide text-[#5D5838]">RULE VALIDATION RESULTS</h3>
          <div className="mt-6 space-y-4">
            <div className={`border-2 px-4 py-4 ${calculations.threePropertyRule ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-[#5D5838]">Three Property Rule</span>
                <span className={`text-sm font-semibold ${calculations.threePropertyRule ? "text-green-700" : "text-red-700"}`}>
                  {calculations.threePropertyRule ? "Satisfied" : "Not Satisfied"}
                </span>
              </div>
              <p className="text-xs text-[#3F3F3F] mt-2">
                {calculations.threePropertyRule
                  ? `You identified ${parseInt(numProperties)} properties, which is within the limit of 3.`
                  : `You identified ${parseInt(numProperties)} properties, which exceeds the limit of 3.`}
              </p>
            </div>
            <div className={`border-2 px-4 py-4 ${calculations.twoHundredPercentRule ? "border-green-500 bg-green-500/10" : "border-[#7A7654] bg-[#7A7654]/10"}`}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-[#5D5838]">200% Rule</span>
                <span className={`text-sm font-semibold ${calculations.twoHundredPercentRule ? "text-green-700" : "text-[#7A7654]"}`}>
                  {calculations.twoHundredPercentRule ? "Satisfied" : "Not Satisfied"}
                </span>
              </div>
              <p className="text-xs text-[#3F3F3F] mt-2">
                Total identified value: ${calculations.totalIdentifiedValue.toLocaleString("en-US")} | Limit: ${(parseFloat(relinquishedValue) * 2).toLocaleString("en-US")}
                {calculations.twoHundredPercentRule
                  ? " (within 200% limit)"
                  : " (exceeds 200% limit)"}
              </p>
            </div>
            <div className={`border-2 px-4 py-4 ${calculations.ninetyFivePercentRule ? "border-green-500 bg-green-500/10" : "border-[#7A7654] bg-[#7A7654]/10"}`}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-[#5D5838]">95% Exception</span>
                <span className={`text-sm font-semibold ${calculations.ninetyFivePercentRule ? "text-green-700" : "text-[#7A7654]"}`}>
                  {calculations.ninetyFivePercentRule ? "Satisfied" : "Not Satisfied"}
                </span>
              </div>
              <p className="text-xs text-[#3F3F3F] mt-2">
                {calculations.ninetyFivePercentRule
                  ? `You must acquire at least 95% of the identified value ($${(parseFloat(relinquishedValue) * 0.95).toLocaleString("en-US")}).`
                  : `You must acquire at least 95% of the identified value ($${(parseFloat(relinquishedValue) * 0.95).toLocaleString("en-US")}) to use this exception.`}
              </p>
            </div>
            <div className={`border-2 px-4 py-4 mt-4 ${calculations.allRulesMet ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}>
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-[#5D5838]">Overall Status</span>
                <span className={`text-base font-bold ${calculations.allRulesMet ? "text-green-700" : "text-red-700"}`}>
                  {calculations.allRulesMet ? "Compliant" : "Non-Compliant"}
                </span>
              </div>
              {!calculations.allRulesMet && (
                <p className="text-xs text-[#3F3F3F] mt-2">
                  Your identification does not meet IRS requirements. You must satisfy either: (1) three-property rule, or (2) 200% rule, or (3) 95% exception.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

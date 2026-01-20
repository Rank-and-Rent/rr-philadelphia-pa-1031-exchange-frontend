import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "../../lib/config/site";

export function IdentificationRulesExplainer() {
  return (
    <section className="border border-[#5D5838]/20 bg-[#F8F7F4] p-8">
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">IRS Guidelines</p>
      <h3 className="mt-3 text-xl font-normal tracking-wide text-[#5D5838]">IDENTIFICATION RULES EXPLAINED</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="border-t border-[#5D5838]/20 pt-4">
          <h4 className="text-sm font-semibold text-[#5D5838]">Three Property Rule</h4>
          <p className="mt-2 text-sm leading-relaxed text-[#3F3F3F]">
            Identify up to three properties of any value. Suitable when {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} investors pursue a focused shortlist with high closing certainty.
          </p>
        </article>
        <article className="border-t border-[#5D5838]/20 pt-4">
          <h4 className="text-sm font-semibold text-[#5D5838]">Two Hundred Percent Rule</h4>
          <p className="mt-2 text-sm leading-relaxed text-[#3F3F3F]">
            Identify any number of properties as long as aggregate fair market value stays within two hundred percent of the relinquished property value. Useful for diversified {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} portfolios.
          </p>
        </article>
        <article className="border-t border-[#5D5838]/20 pt-4">
          <h4 className="text-sm font-semibold text-[#5D5838]">Ninety Five Percent Exception</h4>
          <p className="mt-2 text-sm leading-relaxed text-[#3F3F3F]">
            Identify more properties exceeding two hundred percent of value, provided that at least ninety five percent of total value is acquired. Reserved for complex acquisitions coordinated across {PRIMARY_STATE_ABBR}.
          </p>
        </article>
      </div>
      <p className="mt-6 text-xs text-[#6B6B6B]">
        Exchange documentation must be delivered to the qualified intermediary in writing by midnight local time on day forty five. Seek counsel before locking these elections.
      </p>
    </section>
  );
}

import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "../../lib/config/site";

export function IdentificationRulesExplainer() {
  return (
    <section className="rounded-3xl border border-outline/15 bg-panel p-6 shadow-inner">
      <h3 className="text-xl font-semibold text-heading">Identification Rules Explained</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-outline/10 bg-white p-4">
          <h4 className="text-sm font-semibold text-heading">Three Property Rule</h4>
          <p className="mt-2 text-sm text-[#3F3F3F]">
            Identify up to three properties of any value. Suitable when {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} investors pursue a focused shortlist with high closing certainty.
          </p>
        </article>
        <article className="rounded-2xl border border-outline/10 bg-white p-4">
          <h4 className="text-sm font-semibold text-heading">Two Hundred Percent Rule</h4>
          <p className="mt-2 text-sm text-[#3F3F3F]">
            Identify any number of properties as long as aggregate fair market value stays within two hundred percent of the relinquished property value. Useful for diversified {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} portfolios.
          </p>
        </article>
        <article className="rounded-2xl border border-outline/10 bg-white p-4">
          <h4 className="text-sm font-semibold text-heading">Ninety Five Percent Exception</h4>
          <p className="mt-2 text-sm text-[#3F3F3F]">
            Identify more properties exceeding two hundred percent of value, provided that at least ninety five percent of total value is acquired. Reserved for complex acquisitions coordinated across {PRIMARY_STATE_ABBR}.
          </p>
        </article>
      </div>
      <p className="mt-4 text-xs text-[#6B6B6B]">
        Exchange documentation must be delivered to the qualified intermediary in writing by midnight local time on day forty five. Seek counsel before locking these elections.
      </p>
    </section>
  );
}


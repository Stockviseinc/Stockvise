import { useState } from 'react';
import { ArrowUpRight, Check, Minus, X, Quote, Mail, ScanLine, Sparkles, Boxes } from 'lucide-react';
import './ProofSections.css';

const vendors = ['Stockvise', 'Katana', 'ReplenishRadar', 'Unicommerce', 'Sellbrite'];

const rows = [
  { label: 'Shopify + Amazon stock in one view', note: 'Table stakes. Everyone here does this.', values: ['yes', 'yes', 'yes', 'yes', 'yes'] },
  { label: 'Flags stockout risk and slow movers', note: 'Alerts are common. Typed flags with confidence are not.', values: ['yes', 'partial', 'yes', 'partial', 'partial'] },
  { label: 'Explains why a number moved', note: 'Promos, seasonality, and supplier history checked before a recommendation.', values: ['yes', 'no', 'partial', 'no', 'no'] },
  { label: 'Remembers your decisions and their outcomes, per SKU', note: 'Your notes and past calls shape the next recommendation.', values: ['yes', 'partial', 'partial', 'no', 'no'], highlight: true },
  { label: 'One email a day, no dashboard to check', note: 'One recommended action per item.', values: ['yes', 'no', 'no', 'no', 'no'] },
];

const valueLabel = { yes: 'Yes', partial: 'Partial', no: 'No' };
const ValueIcon = { yes: Check, partial: Minus, no: X };

export function Comparison({ openDemo }) {
  return <section id="compare" className="proof-section compare-section" aria-labelledby="compare-heading">
    <div className="section-container">
      <div className="section-heading reveal"><div><span className="eyebrow">HOW WE COMPARE</span><h2 id="compare-heading">Plenty of tools sync stock.<br/>None of them <em>remember.</em></h2></div><p>Stockvise isn’t a sync tool or a forecasting<br className="desktop-break"/> dashboard. Here’s where the difference is.</p></div>

      <div className="compare-scroll reveal" role="region" aria-label="Feature comparison table" tabIndex={0}>
        <table className="compare-table">
          <thead><tr><th scope="col"><span className="visually-hidden">Capability</span></th>{vendors.map((vendor, i) => <th scope="col" key={vendor} className={i === 0 ? 'compare-us' : ''}>{i === 0 ? <span className="compare-us-name">stockvise<span>.</span></span> : vendor}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row.label} className={row.highlight ? 'compare-highlight' : ''}>
            <th scope="row"><strong>{row.highlight && <span aria-hidden="true">🧠</span>}{row.label}</strong></th>
            {row.values.map((value, i) => { const Icon = ValueIcon[value]; return <td key={vendors[i]} className={`${i === 0 ? 'compare-us' : ''} compare-${value}`}><span className="compare-mark"><Icon size={13} strokeWidth={2.4} aria-hidden="true"/>{valueLabel[value]}</span></td>; })}
          </tr>)}</tbody>
        </table>
      </div>
      <p className="compare-footnote">Summary of Stockvise’s competitive research, based on each vendor’s public product materials (September 2026). Features change, so check with each vendor. “Partial” means some of the capability exists, such as free-text notes or basic low-stock alerts.</p>

      <div className="compare-evidence">
        <figure className="forum-quote reveal">
          <Quote size={26} strokeWidth={1.3} aria-hidden="true"/>
          <span className="eyebrow">WHAT SELLERS ASKED FOR</span>
          <blockquote>A seller on a public forum asked for a <mark>“reorder / do-not-reorder list”</mark> that carries forward from one decision to the next.</blockquote>
          <figcaption><span>Seller forum post</span><span>Research note #17</span></figcaption>
          <p>That’s Stockvise’s seller memory, almost word for word.</p>
          <button className="text-link" onClick={() => openDemo('digest', 'sage')}>See a do-not-reorder item in the demo <ArrowUpRight size={16}/></button>
        </figure>
      </div>
    </div>
  </section>;
}

// Illustrative unit costs. Triage runs on every SKU; investigation runs only on flagged SKUs.
const TRIAGE_TOKENS_PER_SKU = 600;
const TRIAGE_PRICE_PER_TOKEN = 0.04 / 1_000_000;
const INVESTIGATION_COST = 0.02;
const DAYS = 30;

const money = (value) => value >= 100 ? `$${Math.round(value).toLocaleString('en-US')}` : `$${value.toFixed(2)}`;

export function CostModel() {
  const [skus, setSkus] = useState(1500);
  const [flagged, setFlagged] = useState(40);
  const problems = Math.min(flagged, skus);
  const triage = skus * TRIAGE_TOKENS_PER_SKU * TRIAGE_PRICE_PER_TOKEN * DAYS;
  const investigation = problems * INVESTIGATION_COST * DAYS;
  const stockvise = triage + investigation;
  const everySku = skus * INVESTIGATION_COST * DAYS;
  const ratio = everySku / Math.max(stockvise, 0.01);
  const share = (value) => `${Math.max((value / everySku) * 100, 0.6)}%`;

  return <section id="numbers" className="proof-section numbers-section" aria-labelledby="numbers-heading">
    <div className="section-container">
      <div className="section-heading reveal"><div><span className="eyebrow">THE NUMBERS BEHIND IT</span><h2 id="numbers-heading">Cost grows with problems.<br/>Not with <em>SKU count.</em></h2></div><p>Cheap triage checks every product. Deep<br className="desktop-break"/> investigation runs only where it’s needed.</p></div>

      <div className="cost-model reveal">
        <div className="cost-controls">
          <span className="eyebrow">TRY YOUR CATALOG</span>
          <label htmlFor="cost-skus"><span>SKUs across Shopify + Amazon</span><output htmlFor="cost-skus">{skus.toLocaleString('en-US')}</output></label>
          <input id="cost-skus" type="range" min="100" max="5000" step="50" value={skus} onChange={(e) => setSkus(Number(e.target.value))}/>
          <label htmlFor="cost-flagged"><span>SKUs needing attention today</span><output htmlFor="cost-flagged">{problems}</output></label>
          <input id="cost-flagged" type="range" min="0" max="200" step="1" value={flagged} onChange={(e) => setFlagged(Number(e.target.value))}/>
          <ol className="cost-funnel" aria-label="Daily pipeline">
            <li><ScanLine size={15} aria-hidden="true"/><strong>{skus.toLocaleString('en-US')}</strong> checked by triage</li>
            <li><Sparkles size={15} aria-hidden="true"/><strong>{problems}</strong> investigated by Claude</li>
            <li><Mail size={15} aria-hidden="true"/><strong>1</strong> digest in your inbox</li>
          </ol>
        </div>
        <div className="cost-chart">
          <span className="eyebrow">MONTHLY MODEL COST</span>
          <div className="cost-bars" aria-live="polite">
            <div className="cost-bar-row" title={`LLM on every SKU: ${money(everySku)} per month`}>
              <div className="cost-bar-label"><span>LLM on every SKU</span><strong>{money(everySku)}<small>/mo</small></strong></div>
              <div className="cost-track"><span className="cost-bar cost-bar-naive" style={{ width: '100%' }}/></div>
            </div>
            <div className="cost-bar-row" title={`Stockvise: ${money(stockvise)} per month`}>
              <div className="cost-bar-label"><span>Stockvise (triage + targeted investigation)</span><strong>{money(stockvise)}<small>/mo</small></strong></div>
              <div className="cost-track"><span className="cost-bar cost-bar-triage" style={{ width: share(triage) }}/><span className="cost-bar cost-bar-us" style={{ width: share(investigation) }}/></div>
            </div>
          </div>
          <div className="cost-legend"><span><i className="cost-key-triage"/>Triage on all SKUs · {money(triage)}</span><span><i className="cost-key-us"/>Investigations · {money(investigation)}</span></div>
          <p className="cost-headline"><Boxes size={18} aria-hidden="true"/><span><strong>{ratio >= 10 ? Math.round(ratio) : ratio.toFixed(1)}× cheaper</strong> than running an LLM on every SKU.</span></p>
          <p className="cost-assumptions">Illustrative model. Assumes about {TRIAGE_TOKENS_PER_SKU} tokens per SKU for triage at $0.04 per million, about ${INVESTIGATION_COST.toFixed(2)} per investigation, and {DAYS} daily runs a month.</p>
        </div>
      </div>
    </div>
  </section>;
}

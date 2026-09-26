import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCheck, ChevronRight, Clock3, Coffee, Database, Leaf, Mail, MessageSquareText, Package, Search, ShieldCheck, ShoppingBag, Sparkles, Tag, X } from 'lucide-react';
import './ProductDemo.css';

const STORAGE_KEY = 'stockvise-demo-memory-v1';
const sampleItems = {
  tote: {
    name: 'Canvas Everyday Tote', sku: 'FF-TOTE-01', shortName: 'Everyday Tote', icon: ShoppingBag,
    flag: 'Running a little low', eyebrow: 'Stockout risk', badge: '8 days of stock',
    intro: 'Your bestseller is moving faster than your next delivery.',
    explanation: 'You have 86 totes across Shopify and Amazon. At 10.8 sales a day, that is about 8 days of cover. Your supplier usually needs 12 days — something you told us last time.',
    recommendation: 'Plan a reorder of 180 totes.',
    recommendationDetail: 'Ask your supplier for delivery within 8 days. A standard 12-day delivery would leave a gap of about 4 days.',
    action: 'Review reorder plan', confirm: 'Mark reorder as planned', confirmation: 'Reorder marked as planned',
    review: 'This records your decision to reorder 180 totes and request an earlier delivery. You will still need to place the order with your supplier.',
    stats: [{ value: '86', label: 'units available' }, { value: '10.8', label: 'sales / day' }, { value: '12 days', label: 'supplier lead time' }],
    channels: 'Shopify · 54 units  /  Amazon · 32 units',
    memory: '“Their quote says 7 days, but allow 12. The last two deliveries were late.”',
    memoryDate: 'Your note · 12 September',
    typedFlag: 'STOCKOUT_RISK', confidence: '96%',
    trace: [
      { title: 'Start with the whole picture', detail: 'One internal SKU matches 54 available units on Shopify and 32 on Amazon: 86 totes in total. Sample sales and inventory were last checked at 08:00.', source: 'Shopify + Amazon', icon: Database },
      { title: 'Check the everyday maths', detail: 'The recent 14-day sales rate is 10.8 units a day. 86 ÷ 10.8 gives 7.96 days of cover — less than the 12 days needed for your next delivery.', source: 'Observed sales velocity · no forecast model', icon: Clock3 },
      { title: 'Choose what needs a closer look', detail: 'Jev returns a typed STOCKOUT_RISK flag with 96% sample confidence. This exception is passed to the investigation step.', source: 'Typed triage · 96% confidence', icon: ShieldCheck },
      { title: 'Find out what changed', detail: 'No active tote promotion explains the sales rate. The recent change is within the usual seasonal range. The real issue is the gap between available stock and supplier lead time.', source: 'Promotion calendar · seasonal history · supplier records', icon: Search },
      { title: 'Remember your last call', detail: 'Your supplier lists 7 days. Your note says the last two orders took 12 days, so this recommendation uses 12. Your experience changes the decision.', source: 'Seller memory · 12 September', icon: MessageSquareText },
      { title: 'Make one useful recommendation', detail: 'Reorder 180 units, taking current stock plus the planned order to 266 — about 24.6 days at the observed rate. Request delivery within 8 days to avoid the roughly 4-day gap.', source: 'Recommendation · you decide what happens next', icon: CheckCheck },
    ],
  },
  mug: {
    name: 'Ceramic Everyday Mug', sku: 'FF-MUG-02', shortName: 'Everyday Mug', icon: Coffee,
    flag: 'A spike, with a reason', eyebrow: 'Demand spike', badge: 'Promotion explained',
    intro: 'The mugs are having a moment. We checked why.',
    explanation: 'You sold 64 mugs this week, up from 32 in the previous week. Your 20% email promotion started on Monday, which lines up with the lift. Current stock still covers the 10-day supplier lead time.',
    recommendation: 'Keep your current reorder plan.',
    recommendationDetail: 'Let the promotion finish before treating this temporary lift as your usual sales rate. We will check again in your next digest.',
    action: 'Review recommendation', confirm: 'Keep current plan', confirmation: 'Current reorder plan kept',
    review: 'This records your decision to keep the current reorder plan while the promotion runs. No additional order is suggested for this spike.',
    stats: [{ value: '162', label: 'units available' }, { value: '64', label: 'sold this week' }, { value: '+100%', label: 'vs. previous week' }],
    channels: 'Shopify · 110 units  /  Amazon · 52 units',
    memory: '“Our email offers give mugs a short lift. Check again after the offer ends.”',
    memoryDate: 'Your note · 3 September',
    typedFlag: 'DEMAND_SPIKE', confidence: '93%',
    trace: [
      { title: 'Start with the whole picture', detail: '110 mugs on Shopify and 52 on Amazon map to the same SKU: 162 available units. Combined sales increased from 32 to 64 units week over week.', source: 'Shopify + Amazon', icon: Database },
      { title: 'Spot the unusual change', detail: 'Weekly sales doubled. At this week’s rate of 64 ÷ 7, or about 9.1 units a day, current stock provides roughly 17.7 days of cover.', source: 'Weekly sales comparison · observed velocity', icon: Clock3 },
      { title: 'Choose what needs a closer look', detail: 'Jev returns a typed DEMAND_SPIKE flag with 93% sample confidence. The change is passed to investigation before suggesting a response.', source: 'Typed triage · 93% confidence', icon: ShieldCheck },
      { title: 'Find the explanation', detail: 'The 20% email promotion started at the same time as the lift. There is no unusual seasonal pattern in the sample history. The supplier lead time remains 10 days.', source: 'Promotion calendar · seasonal history · supplier records', icon: Search },
      { title: 'Remember your last call', detail: 'You noted that email offers create a short lift for mugs. The recommendation carries that experience forward instead of treating the promotion as a permanent change.', source: 'Seller memory · 3 September', icon: MessageSquareText },
      { title: 'Make one useful recommendation', detail: 'Keep the current reorder plan. About 17.7 days of cover is above the 10-day supplier lead time, and the promotion explains the spike. Recheck after the offer ends.', source: 'Recommendation · keep current plan', icon: CheckCheck },
    ],
  },
  sage: {
    name: 'Canvas Everyday Tote · Sage', sku: 'FF-TOTE-01-SG', shortName: 'Sage Tote', icon: Tag,
    flag: 'Time to let it go', eyebrow: 'Dead stock', badge: '118 days of cover',
    intro: 'The sage totes are staying on the shelf. You already decided they aren’t coming back.',
    explanation: 'There are 142 sage totes across both stores, and 36 sold in the last 30 days. At 1.2 a day, that is about 118 days of cover. You put sage on your do-not-reorder list in August, so this stock only needs to sell through.',
    recommendation: 'Mark down sage totes by 20%.',
    recommendationDetail: 'Run it on Shopify and Amazon together for 3 weeks. The last time you retired a color, a 20% markdown cleared it in about 4 weeks.',
    action: 'Review markdown', confirm: 'Plan a 20% markdown', confirmation: 'Markdown marked as planned',
    review: 'This records your decision to mark down the sage tote by 20% for 3 weeks. You will still need to change prices in Shopify and Amazon yourself.',
    stats: [{ value: '142', label: 'units available' }, { value: '1.2', label: 'sales / day' }, { value: '118 days', label: 'of cover' }],
    channels: 'Shopify · 98 units  /  Amazon · 44 units',
    memory: '“Not restocking the sage color. Let’s sell through what we have.”',
    memoryDate: 'Your note · 14 August · do-not-reorder list',
    typedFlag: 'DEAD_STOCK', confidence: '89%',
    trace: [
      { title: 'Start with the whole picture', detail: '98 sage totes on Shopify and 44 on Amazon map to one internal SKU: 142 units. Combined sales were 36 over the last 30 days.', source: 'Shopify + Amazon', icon: Database },
      { title: 'Check the everyday maths', detail: '36 ÷ 30 is 1.2 units a day. 142 ÷ 1.2 gives about 118 days of cover, well past your usual 45-day target.', source: 'Observed sales velocity · no forecast model', icon: Clock3 },
      { title: 'Choose what needs a closer look', detail: 'Jev returns a typed DEAD_STOCK flag with 89% sample confidence. The item is passed to investigation.', source: 'Typed triage · 89% confidence', icon: ShieldCheck },
      { title: 'Find out what changed', detail: 'No promotion ended recently, and sage sold at a similar pace last autumn, so this is not a seasonal dip. The natural tote is selling fast, so the issue is the color, not the product.', source: 'Promotion calendar · seasonal history · sales by variant', icon: Search },
      { title: 'Remember your last call', detail: 'In August you put sage on your do-not-reorder list, so a restock is off the table. Last March, a 20% markdown on the retired clay color cleared 120 units in about 4 weeks. Both carry into this recommendation.', source: 'Seller memory · do-not-reorder list · past outcome', icon: MessageSquareText },
      { title: 'Make one useful recommendation', detail: 'Mark down by 20% on both channels for 3 weeks. At the clay markdown’s pace of about 4.3 units a day, 142 units clear in roughly 33 days. We will check progress after 3 weeks.', source: 'Recommendation · you change prices, not us', icon: CheckCheck },
    ],
  },
  pouch: {
    name: 'Linen Market Pouch', sku: 'FF-POUCH-03', shortName: 'Market Pouch', icon: Package,
    flag: 'Quiet, but not forgotten', eyebrow: 'Slow-moving stock', badge: '2 sales in 30 days',
    intro: 'These pouches are waiting for their next chapter.',
    explanation: 'There are 96 pouches across your two stores, with only 2 sold in the last 30 days. You mentioned that their relaunch is waiting on new packaging, due in early October.',
    recommendation: 'Snooze this item for 14 days.',
    recommendationDetail: 'Bring it back on 6 October, after the packaging arrives. Your relaunch note will stay with this SKU.',
    action: 'Review snooze', confirm: 'Snooze for 14 days', confirmation: 'Snoozed until 6 October',
    review: 'This records a sample snooze until 6 October, 14 days after this digest. Your packaging note remains attached to the pouch for the next review.',
    stats: [{ value: '96', label: 'units available' }, { value: '2', label: 'sales in 30 days' }, { value: '14 days', label: 'suggested snooze' }],
    channels: 'Shopify · 72 units  /  Amazon · 24 units',
    memory: '“Hold these for the new packaging. Let’s revisit in early October.”',
    memoryDate: 'Your note · 15 September',
    typedFlag: 'DEAD_STOCK', confidence: '91%',
    trace: [
      { title: 'Start with the whole picture', detail: '72 pouches on Shopify and 24 on Amazon map to one internal SKU. There are 96 units available and 2 sales in the last 30 days.', source: 'Shopify + Amazon', icon: Database },
      { title: 'Spot the slow-moving stock', detail: 'Sales average about 0.067 units a day over the last 30 days. Stock is high relative to this observed sales rate, so the item needs context before action.', source: '30-day sales velocity · stock on hand', icon: Clock3 },
      { title: 'Choose what needs a closer look', detail: 'Jev returns a typed DEAD_STOCK flag with 91% sample confidence. The investigation checks whether there is a known reason for the slow sales.', source: 'Typed triage · 91% confidence', icon: ShieldCheck },
      { title: 'Look for a reason', detail: 'No recent promotion or recurring seasonal change explains the low sales. Your supplier note says replacement packaging is due in early October, ahead of a relaunch.', source: 'Promotion calendar · seasonal history · supplier records', icon: Search },
      { title: 'Remember your last call', detail: 'You asked to hold the pouches until the new packaging arrives. That decision changes the response from a stock warning to a timed follow-up.', source: 'Seller memory · 15 September', icon: MessageSquareText },
      { title: 'Make one useful recommendation', detail: 'Snooze this item for 14 days, until 6 October. Review it after the planned packaging arrival with your relaunch note still attached.', source: 'Recommendation · revisit after packaging arrives', icon: CheckCheck },
    ],
  },
};

function readMemory() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
      return { notes: stored.notes || {}, decisions: stored.decisions || {} };
    }
  } catch { /* The demo still works if browser storage is unavailable. */ }
  return { notes: {}, decisions: {} };
}

export default function ProductDemo({ open, onClose, initialView = 'digest', initialItem = 'tote' }) {
  const dialogRef = useRef(null);
  const scrollRef = useRef(null);
  const previousFocus = useRef(null);
  const [view, setView] = useState('digest');
  const [selected, setSelected] = useState('tote');
  const [memory, setMemory] = useState(readMemory);
  const [note, setNote] = useState('');
  const [notice, setNotice] = useState('');
  const [storageAvailable, setStorageAvailable] = useState(true);
  const item = sampleItems[selected];
  const ProductIcon = item.icon;
  const notes = Array.isArray(memory.notes[selected]) ? memory.notes[selected] : [];
  const decision = memory.decisions[selected];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) {
      previousFocus.current = document.activeElement;
      dialog.showModal();
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        dialog.close();
        document.body.style.overflow = originalOverflow;
        if (previousFocus.current instanceof HTMLElement) previousFocus.current.focus();
      };
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setView(initialView === 'trace' ? 'trace' : 'digest');
      setSelected(sampleItems[initialItem] ? initialItem : 'tote');
      setNotice('');
      setNote('');
    }
  }, [open, initialView, initialItem]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    const heading = scrollRef.current?.querySelector('h2');
    heading?.setAttribute('tabindex', '-1');
    if (dialogRef.current?.open) heading?.focus({ preventScroll: true });
  }, [view, selected]);

  function persist(nextMemory) {
    setMemory(nextMemory);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextMemory));
      setStorageAvailable(true);
      return true;
    } catch {
      setStorageAvailable(false);
      return false;
    }
  }

  function selectItem(id) {
    setSelected(id);
    setView('digest');
    setNote('');
    setNotice('');
  }

  function saveNote(event) {
    event.preventDefault();
    const text = note.trim();
    if (!text) return;
    const saved = persist({ ...memory, notes: { ...memory.notes, [selected]: [...notes, { text, date: new Date().toISOString() }] } });
    setNote('');
    setNotice(saved ? 'Note saved to this SKU’s memory in your browser.' : 'Note saved for this session. Browser storage is unavailable.');
  }

  function confirmDecision() {
    persist({ ...memory, decisions: { ...memory.decisions, [selected]: { label: item.confirmation, date: new Date().toISOString() } } });
    setView('confirmed');
  }

  function dismissBackdrop(event) {
    if (event.target !== dialogRef.current) return;
    const bounds = dialogRef.current.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
  }

  return (
    <dialog ref={dialogRef} className="demo-dialog" aria-labelledby="demo-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={dismissBackdrop}>
      <div className="demo-shell">
        <header className="demo-toolbar">
          <div className="demo-wordmark"><Leaf size={22} strokeWidth={1.5} aria-hidden="true" />stockvise<span className="demo-wordmark-dot">.</span></div>
          <span id="demo-title" className="demo-mode"><span />Interactive demo</span>
          <button type="button" className="demo-close" onClick={onClose} aria-label="Close product demo"><X size={20} /></button>
        </header>
        <div className="demo-workspace">
          <aside className="demo-sidebar" aria-label="Sample digest items">
            <div className="demo-store"><span className="demo-store-monogram">f.</span><div><strong>Form &amp; Field</strong><span>Your Tuesday digest</span></div></div>
            <div className="demo-sidebar-label"><Mail size={14} />{Object.keys(sampleItems).length} things worth a look</div>
            <div className="demo-item-list">
              {Object.entries(sampleItems).map(([id, entry], index) => {
                const Icon = entry.icon;
                return <button type="button" className={`demo-item-selector ${selected === id ? 'demo-item-active' : ''}`} key={id} onClick={() => selectItem(id)} aria-pressed={selected === id}>
                  <span className={`demo-product-icon demo-product-${id}`}><Icon size={21} strokeWidth={1.4} /></span>
                  <span className="demo-item-copy"><span>{entry.shortName}</span><small>{memory.decisions[id] ? 'Decision saved' : entry.eyebrow}</small></span>
                  {memory.decisions[id] ? <Check size={15} className="demo-item-check" /> : <span className="demo-item-number">0{index + 1}</span>}
                </button>;
              })}
            </div>
            <div className="demo-sidebar-bottom"><span className="demo-connected-dot" />Shopify + Amazon<span>Two channels. One clear picture.</span></div>
          </aside>
          <div className="demo-content" ref={scrollRef}>
            {view === 'digest' && <article className="demo-view demo-email">
              <div className="demo-email-meta"><span>STOCKVISE DAILY</span><time>Tue, 22 Sep · 8:04 AM</time></div>
              <h2>A little heads-up<br />for your Tuesday.</h2>
              <p className="demo-email-greeting">Morning, Alex. We checked both stores.<br />Here’s one less thing to keep in your head.</p>
              <div className="demo-email-rule"><span>{String(Object.keys(sampleItems).indexOf(selected) + 1).padStart(2, '0')} / {String(Object.keys(sampleItems).length).padStart(2, '0')}</span><i /><span className="demo-alert-label">{item.eyebrow}</span></div>
              <div className="demo-product-heading"><span className={`demo-product-icon demo-product-large demo-product-${selected}`}><ProductIcon size={27} strokeWidth={1.35} /></span><div><h3>{item.name}</h3><span>{item.sku}</span></div><span className="demo-status-pill">{item.badge}</span></div>
              <h4>{item.intro}</h4>
              <p className="demo-body-copy">{item.explanation}</p>
              <div className="demo-stats">{item.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
              <p className="demo-channel-note">{item.channels}</p>
              <div className="demo-recommendation"><span className="demo-recommendation-icon"><ArrowUpRight /></span><div><span className="demo-overline">OUR RECOMMENDATION</span><h4>{item.recommendation}</h4><p>{item.recommendationDetail}</p></div></div>
              <div className="demo-email-actions"><button type="button" className="demo-primary-button" onClick={() => setView('review')}>{decision ? 'Review saved decision' : item.action}<ArrowRight size={16} /></button><button type="button" className="demo-text-button" onClick={() => setView('trace')}>See how we got here<ChevronRight size={15} /></button></div>
              {decision && <p className="demo-saved-inline"><Check size={14} />{decision.label} · saved in this browser</p>}
              <div className="demo-memory-hint"><MessageSquareText size={17} /><p><strong>A little context goes a long way.</strong> Reply with what you know. We’ll carry it into the next recommendation.</p><button type="button" onClick={() => setView('trace')}>Add a note<ArrowRight size={13} /></button></div>
            </article>}

            {view === 'trace' && <article className="demo-view demo-trace">
              <button type="button" className="demo-back" onClick={() => setView('digest')}><ArrowLeft size={15} />Back to your digest</button>
              <div className="demo-trace-eyebrow"><Search size={15} />BEHIND THE RECOMMENDATION</div>
              <h2>Here’s how<br />we got here.</h2>
              <p className="demo-trace-subtitle">{item.name}<span>{item.sku}</span></p>
              <ol className="demo-timeline">{item.trace.map((step, index) => {
                const Icon = step.icon;
                return <li key={step.title}><span className={`demo-timeline-icon ${index === 5 ? 'demo-timeline-complete' : ''}`}><Icon size={17} strokeWidth={1.6} /></span><div><span className="demo-step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.detail}</p><span className="demo-step-source">{step.source}</span></div></li>;
              })}</ol>
              <section className="demo-memory-section" aria-labelledby="demo-memory-title"><div className="demo-memory-title"><MessageSquareText size={20} /><div><h3 id="demo-memory-title">Your experience, remembered.</h3><p>Notes stay attached to this product.</p></div></div><blockquote>{item.memory}<cite>{item.memoryDate}</cite></blockquote>
                {decision && <div className="demo-memory-decision"><CheckCheck size={16} /><div><strong>{decision.label}</strong><span>Your saved demo decision</span></div></div>}
                {notes.map((savedNote, index) => <blockquote className="demo-user-note" key={`${savedNote.date}-${index}`}>{savedNote.text}<cite>Your note · saved in this browser</cite></blockquote>)}
                <form onSubmit={saveNote}><label htmlFor="demo-note">Something we should remember?</label><textarea id="demo-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="A supplier update, a planned launch, your next decision…" maxLength={1000} rows={3} /><div className="demo-note-actions"><span>For this demo, notes are stored locally.</span><button className="demo-primary-button demo-small-button" type="submit" disabled={!note.trim()}>Save to memory<ArrowRight size={14} /></button></div></form>
                <p className="demo-note-notice" role="status">{notice}</p>
              </section>
              <button type="button" className="demo-text-button demo-bottom-back" onClick={() => setView('digest')}><ArrowLeft size={15} />Back to the recommendation</button>
            </article>}

            {view === 'review' && <article className="demo-view demo-decision-view">
              <button type="button" className="demo-back" onClick={() => setView('digest')}><ArrowLeft size={15} />Back to your digest</button>
              <span className="demo-decision-symbol"><ProductIcon size={34} strokeWidth={1.2} /></span><span className="demo-overline">YOUR CALL, AS ALWAYS</span>
              <h2>{item.recommendation}</h2><p className="demo-decision-product">{item.name} · {item.sku}</p><p className="demo-decision-description">{item.review}</p>
              <div className="demo-review-details"><span>Recommended decision</span><strong>{item.confirm}</strong><span>What gets remembered</span><strong>Your decision, its context, and today’s recommendation</strong><span>Where it is saved</span><strong>Only in this browser, using sample data</strong></div>
              {decision && <p className="demo-saved-inline"><Check size={15} />You already saved: {decision.label.toLowerCase()}.</p>}
              <button type="button" className="demo-primary-button" onClick={confirmDecision}>{item.confirm}<Check size={16} /></button><p className="demo-action-disclaimer">This demo does not place orders or change your stores.</p>
            </article>}

            {view === 'confirmed' && <article className="demo-view demo-confirmed">
              <span className="demo-confirmed-icon"><Check size={36} strokeWidth={1.4} /></span><span className="demo-overline">A LITTLE SMARTER FOR NEXT TIME</span><h2>{item.confirmation}.</h2><p>Your decision is now part of the sample history for <strong>{item.name}</strong>.</p><p className="demo-confirmed-detail">{storageAvailable ? 'It will still be here when you reopen this demo in the same browser.' : 'It is saved for this session. Browser storage is unavailable.'}</p>
              <button type="button" className="demo-primary-button" onClick={() => setView('trace')}>View product memory<ArrowRight size={16} /></button><button type="button" className="demo-text-button" onClick={() => setView('digest')}>Back to your digest</button>
            </article>}
          </div>
        </div>
        <footer className="demo-footer"><span><Sparkles size={12} />A working glimpse of Stockvise</span><span>Sample data. Decisions stay in this browser. No stores connected.</span></footer>
      </div>
    </dialog>
  );
}

function ArrowUpRight() {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

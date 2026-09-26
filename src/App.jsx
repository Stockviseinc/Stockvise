import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, ChevronRight, ChevronDown, Play, X, Menu, Mail, Sparkles, Link2, Brain, ScanLine, ShoppingBag, Package, Leaf, CircleCheck, Clock3, ShieldCheck, MessageSquare, ArrowDown, Zap } from 'lucide-react';
import MarketingSections from './components/MarketingSections';
import ProductDemo from './components/ProductDemo';
import Logo from './components/Logo';
import { Comparison, CostModel } from './components/ProofSections';

function Shopify({ small = false }) {
  return <span className={`platform-logo shopify ${small ? 'platform-small' : ''}`}><ShoppingBag size={small ? 18 : 23} fill="currentColor" strokeWidth={1.5} /><span>shopify</span></span>;
}
function Amazon({ small = false }) {
  return <span className={`platform-logo amazon ${small ? 'platform-small' : ''}`}><span>amazon</span><svg viewBox="0 0 72 15" aria-hidden="true"><path d="M8 3Q34 19 61 2M54 2l8-1-1 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg></span>;
}

function ToteIllustration() {
  return <svg className="tote-illustration" viewBox="0 0 84 91" aria-label="Canvas everyday tote" role="img"><defs><linearGradient id="canvas" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e2daca"/><stop offset="1" stopColor="#c5bba7"/></linearGradient></defs><ellipse cx="42" cy="81" rx="29" ry="4" fill="#afa38d" opacity=".17"/><path d="M17 29h50l5 48c-17 6-42 6-59 0z" fill="url(#canvas)"/><path d="M28 38V21c0-20 28-20 28 0v17" fill="none" stroke="#b9ae96" strokeWidth="5"/><path d="M29 38V21c0-18 26-18 26 0v17" fill="none" stroke="#e6decf" strokeWidth="2"/><path d="M21 32l-3 43M63 32l4 43" stroke="#c1b69f" strokeWidth="1"/><rect x="31" y="51" width="23" height="12" rx="1" fill="#eae5d9"/><text x="42.5" y="58.5" textAnchor="middle" fontFamily="serif" fontSize="4.4" fill="#6b6c59">form & field</text></svg>;
}

function HeroEmail({ openDemo }) {
  return <div className="hero-product">
    <div className="email-preview">
      <div className="email-chrome"><span className="chrome-dots"><i/><i/><i/></span><span><Mail size={12}/> Your daily stockvise</span><span className="email-date">9:00 AM</span></div>
      <div className="email-body">
        <div className="email-sender"><div className="sender-avatar"><svg viewBox="0 0 30 30" fill="none"><path d="M6 23V13l7-4v14m5 0V6l7 4v13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div><strong>Stockvise</strong><span>To: Alex at Form & Field <ChevronDown size={9}/></span></div><span className="sample-label">SAMPLE DIGEST</span></div>
        <div className="email-greeting"><span>TUESDAY, JUNE 16</span><h3>Morning, Alex</h3><p>Four items need you today. The rest can wait.</p></div>
        <div className="digest-summary"><span><i className="status-dot"/>4 things to look at</span><span><Check size={12}/>124 SKUs looking good</span></div>
        <div className="email-alert">
          <div className="alert-eyebrow"><span><span className="risk-dot"/>STOCKOUT HEADS-UP</span><span>01 / 04</span></div>
          <div className="product-summary"><div className="tote-image"><ToteIllustration/></div><div><h4>Your bestseller is<br/>about to sell out.</h4><span>Canvas Everyday Tote · Natural</span><div className="days-tag"><Clock3 size={11}/> About 8 days of stock left</div></div></div>
          <p>Sales are up across both stores. With your supplier’s 12-day lead time, it’s time to get ahead.</p>
          <div className="recommendation"><Sparkles size={15}/><div><strong>Let’s reorder 180 units.</strong><span>Enough breathing room for the weeks ahead.</span></div></div>
          <button className="trace-link" onClick={() => openDemo('trace')}>See how we got here <ArrowRight size={13}/></button>
        </div>
        <div className="email-bottom"><Leaf size={13}/><span>That supplier delay you mentioned? I remembered.</span></div>
      </div>
    </div>
    <button className="memory-float" onClick={() => openDemo('trace')}><span className="memory-float-icon"><Brain size={19}/></span><span><strong>Remembered from 12 Sep</strong><span>Your supplier now takes 12 days, not 7.</span></span><ArrowUpRight size={15}/></button>
    <span className="product-caption">Sample digest · Form & Field · 22 Sep</span>
  </div>;
}

const workflow = [
  { icon: Link2, title: 'One complete picture.', label: 'CONNECT', body: 'Shopify and Amazon, finally on the same page. Stock and sales come together around one shared SKU.', detail: 'Two channels. One view of every product.', meta: 'Shopify + Amazon → unified inventory' },
  { icon: ScanLine, title: 'The signals worth your time.', label: 'NOTICE', body: 'Simple sales velocity and reorder math spot stockout risk, slow movers, and unexpected changes. Fast triage picks what needs a closer look.', detail: 'Check every SKU. Investigate the exceptions.', meta: 'Inventory stats → typed flags + confidence' },
  { icon: Sparkles, title: 'The why, before the what.', label: 'INVESTIGATE', body: 'A promotion? A seasonal shift? A late supplier? Stockvise looks at the context before making a recommendation.', detail: 'An explanation you can actually act on.', meta: 'Promos + seasonality + supplier history' },
  { icon: Brain, title: 'Your experience, remembered.', label: 'REMEMBER', body: 'Your past notes, decisions, and outcomes become context for the next recommendation. Your judgment makes it better.', detail: 'Each decision is stored with its outcome.', meta: 'Seller notes + decisions + outcomes' },
  { icon: Mail, title: 'Your next move. In your inbox.', label: 'DELIVER', body: 'One thoughtful digest with one recommended action per item. Follow the reasoning, make the call, and get on with your day.', detail: 'A clear recommendation. The final call is yours.', meta: 'One email → your reply → better context' },
];

function HowItWorks({ openDemo }) {
  const [active, setActive] = useState(2);
  const selected = workflow[active];
  const Icon = selected.icon;
  return <section id="how-it-works" className="workflow-section section-space">
    <div className="section-container">
      <div className="section-heading reveal"><div><span className="eyebrow"><span className="tiny-star">✳</span> HOW IT WORKS · 5 STEPS</span><h2>It does the digging.<br/>You make the call.</h2></div><p>Every recommendation comes with<br className="desktop-break"/> the steps that produced it.</p></div>
      <div className="workflow-layout reveal">
        <div className="workflow-list" role="tablist" aria-label="How Stockvise works">{workflow.map((step, i) => { const StepIcon = step.icon; return <button key={step.label} id={`workflow-tab-${i}`} className={`workflow-step ${active === i ? 'active' : ''}`} role="tab" aria-selected={active === i} aria-controls="workflow-panel" tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={(event) => { if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 4 : (i + (event.key === 'ArrowDown' ? 1 : 4)) % 5; setActive(next); document.getElementById(`workflow-tab-${next}`)?.focus(); } }}><span className="step-number">0{i + 1}</span><span className="step-icon"><StepIcon size={18}/></span><span>{step.title}</span><ChevronRight size={16}/></button>; })}</div>
        <div id="workflow-panel" className="workflow-panel" role="tabpanel" aria-labelledby={`workflow-tab-${active}`} tabIndex={0}>
          <div key={active} className="workflow-panel-content"><div className="workflow-panel-top"><span className="eyebrow">{selected.label}</span><span>0{active + 1} / 05</span></div><div className="process-art"><span className="process-source"><Shopify small/><Amazon small/></span><span className="process-dots"/><span className="process-core"><Icon size={34} strokeWidth={1.25}/></span><span className="process-dots"/><span className="process-result"><Check size={25}/></span></div><h3>{selected.detail}</h3><p>{selected.body}</p><span className="workflow-meta">{selected.meta}</span></div>
        </div>
      </div>
      <div className="workflow-footer"><span><Zap size={16}/> Claude only reads the SKUs that triage flagged.</span><button className="text-link" onClick={() => openDemo('trace')}>Follow a real example <ArrowUpRight size={16}/></button></div>
      <details className="architecture"><summary>Curious about what’s under the hood? <ChevronDown size={14}/></summary><p>Scheduled API ingestion → Postgres → SKU unification → velocity and reorder statistics → Jev triage → LLM investigation for flagged SKUs → memory → email digest. Seller replies feed back into memory. Jev returns typed flags and confidence; explanations come from the investigation layer. Investigation cost scales with the issues that need attention.</p></details>
    </div>
  </section>;
}

function MemorySection({ openDemo }) {
  return <section id="memory" className="memory-section section-space"><div className="section-container memory-layout">
    <div className="memory-copy reveal"><span className="eyebrow"><Brain size={16}/> SELLER MEMORY</span><h2>Tell it once.<br/>It <em>remembers.</em></h2><p>Your supplier runs late. You don’t restock that color. Last summer’s spike was a one-off.</p><p>Tell Stockvise once. It carries your decisions forward, so the next recommendation starts from what you already know.</p><button className="text-link" onClick={() => openDemo('trace')}>See memory in action <ArrowUpRight size={17}/></button></div>
    <div className="memory-story reveal"><div className="memory-story-heading"><span className="little-grid"><i/><i/><i/><i/></span><span>ONE NOTE, TWO WEEKS LATER</span><span className="sample-label">EXAMPLE</span></div><div className="memory-event"><span className="event-point"><MessageSquare size={16}/></span><div className="event-label">MONDAY, JUNE 1 <span>You left a note</span></div><blockquote>“Heads up — our tote supplier is taking 12 days now, not 7. Build in a buffer.”</blockquote><div className="memory-author"><span className="avatar-small">AL</span>Alex, founder at Form & Field</div></div><div className="memory-connection"><span/><span><Brain size={14}/> Stored in seller memory</span></div><div className="memory-event memory-event-next"><span className="event-point"><Sparkles size={16}/></span><div className="event-label">TUESDAY, JUNE 16 <span>Stockvise connected the dots</span></div><h3>Same product. A smarter recommendation.</h3><p>“You have about 8 days of tote stock left. I’m using the <mark>12-day lead time you told me about</mark>, so I’d place your next order today.”</p><button onClick={() => openDemo('trace')} className="memory-source"><Check size={14}/> Your experience, built into the recommendation <ArrowUpRight size={14}/></button></div><div className="memory-story-bottom"><Leaf size={14}/> Your knowledge stays with your business.</div></div>
  </div></section>;
}

function StartModal({ plan, onClose, openDemo }) {
  const ref = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(true);
  useEffect(() => { const dialog = ref.current; dialog.showModal(); const handler = (event) => { event.preventDefault(); onClose(); }; dialog.addEventListener('cancel', handler); document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; dialog.removeEventListener('cancel', handler); }; }, [onClose]);
  function submit(event) { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); try { localStorage.setItem('stockvise-interest', JSON.stringify({...data,plan,createdAt:new Date().toISOString()})); } catch { setSaved(false); } setSubmitted(true); }
  return <dialog ref={ref} className="start-dialog" aria-labelledby="start-title" onClick={(event) => { if(event.target === ref.current) onClose(); }}><button className="dialog-close" aria-label="Close early access form" onClick={onClose}><X size={20}/></button>{submitted ? <div className="signup-success"><span className="success-icon"><Check size={30}/></span><span className="eyebrow">YOU’RE ON THE LIST</span><h2 id="start-title">You’re on the<br/><em>demo list.</em></h2><p>{saved ? 'Your interest has been saved in this browser.' : 'Your demo form is complete. Browser storage is unavailable.'} This is a concept, so no email has been sent. In the meantime, take your first digest for a spin.</p><button className="button button-dark" onClick={() => { onClose(); openDemo('digest'); }}>Explore the sample digest <ArrowRight size={16}/></button></div> : <><div className="signup-icon"><Leaf size={25}/></div><span className="eyebrow">EARLY ACCESS</span><h2 id="start-title">Get the first<br/><em>digest.</em></h2><p>Get a feel for Stockvise.{plan && plan !== 'Early access' ? ` You’re exploring the ${plan} plan.` : ' Built for your next chapter of growth.'}</p><form onSubmit={submit}><label>Your name<input name="name" autoComplete="given-name" placeholder="Alex Taylor" required maxLength={80}/></label><label>Work email<input name="email" type="email" autoComplete="email" placeholder="alex@yourbrand.com" required maxLength={254}/></label><label>Where do you sell?<select name="channels" defaultValue="both"><option value="both">Shopify + Amazon</option><option value="shopify">Shopify — adding Amazon soon</option><option value="amazon">Amazon — adding Shopify soon</option></select></label><button type="submit" className="button button-dark">Join the demo list <ArrowUpRight size={16}/></button></form><span className="form-note"><ShieldCheck size={13}/> Concept demo. Details stay in this browser.</span></>}</dialog>;
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [demo, setDemo] = useState(null);
  const [demoItem, setDemoItem] = useState('tote');
  const [plan, setPlan] = useState(null);
  const openDemo = (view = 'digest', item = 'tote') => { setMenu(false); setDemoItem(item); setDemo(view); };
  const start = (value = 'Early access') => { setMenu(false); setPlan(value); };
  useEffect(() => { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), {threshold: .1}); document.querySelectorAll('.reveal').forEach(el => observer.observe(el)); return () => observer.disconnect(); }, []);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="nav-container"><Logo/><nav className="desktop-nav" aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#memory">Memory</a><a href="#compare">Compare</a><a href="#customers">Customers</a><a href="#pricing">Pricing</a></nav><div className="nav-actions"><button className="nav-demo" onClick={() => openDemo()}>View demo</button><button className="button button-dark button-small" onClick={() => start()}>Get early access <ArrowUpRight size={15}/></button><button className="mobile-menu-button" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="mobile-navigation" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button></div></div>{menu && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[['How it works','how-it-works'],['Cost model','numbers'],['Memory','memory'],['Compare','compare'],['Customers','customers'],['Pricing','pricing']].map(([text,id])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{text}<ArrowUpRight size={15}/></a>)}<button onClick={() => openDemo()}>Explore the demo <Play size={14}/></button></nav>}</header>
    <main id="main">
      <section className="hero" id="product"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow hero-eyebrow"><span className="tiny-star">✳</span> INVENTORY AGENT · SHOPIFY + AMAZON</span><h1>Know what’s<br/>running <em>out.</em></h1><p>Stockvise puts your Shopify and Amazon stock on one sheet, works out why something changed, and sends one email each morning with the call to make.</p><div className="hero-actions"><button className="button button-dark" onClick={() => start()}>Request early access <ArrowUpRight size={17}/></button><button className="button button-plain" onClick={() => openDemo()}><span className="play-icon"><Play size={10} fill="currentColor"/></span>See a sample digest</button></div><div className="hero-reassurance"><span><Check size={13}/>No dashboard to check</span><span><Check size={13}/>Always your call</span></div><div className="hero-platforms"><span>Works with</span><Shopify/><span className="platform-plus">+</span><Amazon/></div></div><HeroEmail openDemo={openDemo}/></div></section>
      <section className="client-strip" aria-label="Illustrative customer brands"><div className="section-container"><div className="client-strip-heading"><span>SELLING ON SHOPIFY + AMAZON</span><span>Illustrative brands</span></div><div className="client-logos"><span className="client-form">form <i>&</i> field</span><span className="client-ever"><span>◒</span> everday</span><span className="client-wild">WILDROOT<span>GOODS FOR SLOWER LIVING</span></span><span className="client-grove">grove<span>®</span></span><span className="client-north">NORTH<span>&</span>COMMON</span></div></div></section>
      <section className="features-section section-space"><div className="section-container"><div className="section-heading reveal"><div><span className="eyebrow"><span className="tiny-star">✳</span> WHAT IT DOES</span><h2>You started a brand.<br/>Not a spreadsheet habit.</h2></div><p>Three jobs you do by hand today,<br/>done before you open your laptop.</p></div><div className="feature-columns"><article className="feature reveal"><span className="feature-icon"><Link2 size={25} strokeWidth={1.5}/></span><span className="feature-number">F1 · UNIFIED STOCK</span><h3>Two stores. One story.</h3><p>Stock here. Sales there. Bring Shopify and Amazon together, so nothing slips between the cracks.</p><div className="feature-visual platform-visual"><span><Shopify small/></span><span className="connection-line"/><span className="unified-sku"><Package size={17}/>One SKU</span><span className="connection-line"/><span><Amazon small/></span></div></article><article className="feature reveal"><span className="feature-icon"><Sparkles size={25} strokeWidth={1.5}/></span><span className="feature-number">F3 · INVESTIGATION</span><h3>A heads-up, with the why.</h3><p>A sudden spike is only half the story. Get the context behind the change, and a clear next step.</p><div className="feature-visual insight-visual"><span className="mini-chart"><i/><i/><i/><i/><i/><i/><i/><i/></span><span><span className="insight-label">THE DOTS, CONNECTED</span><strong>That spike? Your weekend promo.</strong></span></div></article><article className="feature reveal"><span className="feature-icon"><Brain size={25} strokeWidth={1.5}/></span><span className="feature-number">F4 · SELLER MEMORY</span><h3>It gets to know your way.</h3><p>Your notes and past decisions don’t disappear. They shape what Stockvise recommends next.</p><div className="feature-visual note-visual"><MessageSquare size={16}/><span>“Not restocking the sage color.”<small><Check size={10}/> Remembered for next time</small></span></div></article></div></div></section>
      <HowItWorks openDemo={openDemo}/>
      <CostModel/>
      <MemorySection openDemo={openDemo}/>
      <Comparison openDemo={openDemo}/>
      <section className="quiet-banner"><div className="section-container"><span className="quiet-icon"><Mail size={30} strokeWidth={1.3}/></span><div><h3>One email a day. One action per item.</h3><p>Reorder, mark down, or snooze. You decide.</p></div><button className="button button-outline" onClick={() => openDemo()}>Open your sample digest <ArrowUpRight size={16}/></button></div></section>
      <MarketingSections onStart={start}/>
    </main>
    <ProductDemo open={Boolean(demo)} onClose={() => setDemo(null)} initialView={demo || 'digest'} initialItem={demoItem}/>
    {plan && <StartModal plan={plan} onClose={() => setPlan(null)} openDemo={openDemo}/>}
  </>;
}

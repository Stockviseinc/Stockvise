export default function Logo({ light = false, href = '#product' }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href={href} aria-label="Stockvise home"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M5 24V13l8-5v16M19 24V5l8 5v14" stroke="currentColor" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" /></svg><span>stockvise<span className="brand-period">.</span></span></a>;
}

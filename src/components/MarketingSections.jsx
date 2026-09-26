import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Mail, Star } from 'lucide-react'
import Logo from './Logo'
import './MarketingSections.css'

const featured = {
  brand: <span className="client-form">form <i>&amp;</i> field</span>,
  category: 'EVERYDAY ESSENTIALS · 140 SKUS',
  quote: '“I mentioned our supplier’s new 12-day lead time once. The digest used it two weeks later, and we didn’t run out all summer.”',
  name: 'Alex Taylor',
  role: 'Founder, Form & Field',
  initials: 'AT',
  metrics: [
    { label: 'Stockouts per quarter', before: '7', after: '1' },
    { label: 'Weekly time on stock checks', before: '6 hrs', after: '40 min' },
    { label: 'Spreadsheets maintained', before: '3', after: '0' },
  ],
}

const stories = [
  {
    brand: <span className="client-ever"><span>◒</span> everday</span>,
    category: 'HOME GOODS · 420 SKUS',
    quote: '“One number per product ended our Monday reconciliation.”',
    name: 'Priya Nair', role: 'Head of Operations, Everday', initials: 'PN', color: 'sage', rating: 5,
    metric: { value: '5 hrs', label: 'saved every week' },
  },
  {
    brand: <span className="client-wild">WILDROOT<span>GOODS FOR SLOWER LIVING</span></span>,
    category: 'WELLNESS · 260 SKUS',
    quote: '“It suggested a 20% markdown on a retired scent. Sold through in five weeks.”',
    name: 'Marcus Bell', role: 'Founder, Wildroot', initials: 'MB', color: 'sand', rating: 5,
    metric: { value: '$11.4k', label: 'dead stock cleared' },
  },
  {
    brand: <span className="client-grove">grove<span>®</span></span>,
    category: 'KITCHEN · 900 SKUS',
    quote: '“It told me the spike was our own promo. That saved two panic orders.”',
    name: 'Hana Okafor', role: 'COO, Grove', initials: 'HO', color: 'clay', rating: 5,
    metric: { value: '2', label: 'panic orders avoided' },
  },
  {
    brand: <span className="client-north">NORTH<span>&amp;</span>COMMON</span>,
    category: 'APPAREL · 1,300 SKUS',
    quote: '“Other tools kept nagging us to restock retired colors. Stockvise remembered.”',
    name: 'Tom Reyes', role: 'Co-founder, North & Common', initials: 'TR', color: 'sage', rating: 4,
    metric: { value: '0', label: 'reorder nags on retired SKUs' },
  },
]

function Stars({ rating }) {
  return <span className="story-stars" role="img" aria-label={`${rating} out of 5 stars`}>{[1, 2, 3, 4, 5].map((n) => <Star key={n} size={13} strokeWidth={1.5} aria-hidden="true" className={n <= rating ? 'star-on' : 'star-off'} />)}</span>
}

const plans = [
  { name: 'Starter', monthly: 39, yearly: 31, skus: '250', description: 'For a small catalog with big plans.', featured: false },
  { name: 'Growth', monthly: 89, yearly: 71, skus: '1,500', description: 'For brands finding their stride.', featured: true },
  { name: 'Scale', monthly: 179, yearly: 143, skus: '5,000', description: 'For more products, with less noise.', featured: false },
]

const questions = [
  {
    question: 'Which sales channels does Stockvise support?',
    answer: 'Stockvise is designed for sellers running Shopify and Amazon. It connects matching products to one internal SKU, so stock and sales can be understood together. Other sales channels are outside the first version.',
  },
  {
    question: 'What does Stockvise remember?',
    answer: 'Your notes, past recommendations, decisions, and their outcomes stay connected to each SKU. A supplier delay you mention or a product you decide not to reorder can inform the next recommendation, so you spend less time repeating context.',
  },
  {
    question: 'Will it place orders or change my inventory?',
    answer: 'You make the final call. Stockvise investigates and recommends; it does not place purchase orders, change prices, run promotions, or adjust inventory. Recording a decision in the digest helps it understand what you chose.',
  },
  {
    question: 'How do I choose a plan?',
    answer: 'Choose by the number of unique products you track across both channels. A matched Shopify and Amazon listing counts as one SKU. Every plan includes the same core intelligence: unified inventory, anomaly checks, investigation, seller memory, and the daily digest. Prices shown are illustrative concept pricing.',
  },
]

export default function MarketingSections({ onStart }) {
  const [yearly, setYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <section className="marketing-stories marketing-section" id="customers" aria-labelledby="stories-heading">
        <div className="marketing-container">
          <div className="marketing-section-heading story-heading">
            <p className="marketing-eyebrow">CUSTOMER STORIES</p>
            <h2 id="stories-heading">Fewer stockouts. Fewer <em>spreadsheets.</em></h2>
            <p className="marketing-section-intro">Five brands, five different problems, one morning email.</p>
          </div>
          <article className="story-featured">
            <div className="story-featured-copy">
              <div className="story-brand-block">{featured.brand}<span className="story-brand-category">{featured.category}</span></div>
              <Stars rating={5} />
              <blockquote>{featured.quote}</blockquote>
              <div className="story-person">
                <span className="story-avatar story-avatar-sage" aria-hidden="true">{featured.initials}</span>
                <div><strong>{featured.name}</strong><span>{featured.role}</span></div>
              </div>
            </div>
            <div className="story-metrics">
              <span className="marketing-eyebrow">FIRST 90 DAYS · BEFORE → AFTER</span>
              {featured.metrics.map((metric) => (
                <div className="story-metric" key={metric.label}>
                  <span>{metric.label}</span>
                  <div><s>{metric.before}</s><ArrowRight size={14} aria-hidden="true" /><strong>{metric.after}</strong></div>
                </div>
              ))}
            </div>
          </article>
          <div className="story-grid">
            {stories.map((story) => (
              <article className="story-item" key={story.name}>
                <div className="story-brand-block">{story.brand}<span className="story-brand-category">{story.category}</span></div>
                <Stars rating={story.rating} />
                <blockquote>{story.quote}</blockquote>
                <p className="story-metric-chip"><strong>{story.metric.value}</strong>{story.metric.label}</p>
                <div className="story-person">
                  <span className={`story-avatar story-avatar-${story.color}`} aria-hidden="true">{story.initials}</span>
                  <div><strong>{story.name}</strong><span>{story.role}</span></div>
                </div>
              </article>
            ))}
          </div>
          <p className="story-disclosure">Illustrative seller stories for this concept · Names, brands, quotes, ratings and figures are fictional.</p>
        </div>
      </section>

      <section className="marketing-pricing marketing-section" id="pricing" aria-labelledby="pricing-heading">
        <div className="marketing-container">
          <div className="marketing-section-heading">
            <p className="marketing-eyebrow">PRICING</p>
            <h2 id="pricing-heading">Priced by SKU count. <em>Nothing else.</em></h2>
            <p className="marketing-section-intro">The same thoughtful intelligence on every plan. Just choose your catalog size.</p>
          </div>
          <div className="pricing-billing-row">
            <div className="pricing-toggle" role="group" aria-label="Billing period">
              <button type="button" className={!yearly ? 'pricing-toggle-active' : ''} aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</button>
              <button type="button" className={yearly ? 'pricing-toggle-active' : ''} aria-pressed={yearly} onClick={() => setYearly(true)}>Yearly <span>Save ~20%</span></button>
            </div>
          </div>
          <div className="pricing-grid">
            {plans.map((plan) => {
              const amount = yearly ? plan.yearly : plan.monthly
              return (
                <article className={`pricing-plan${plan.featured ? ' pricing-plan-featured' : ''}`} key={plan.name}>
                  <div className="pricing-plan-title"><h3>{plan.name}</h3>{plan.featured && <span className="pricing-recommended">THE SWEET SPOT</span>}</div>
                  <p className="pricing-description">{plan.description}</p>
                  <div className="pricing-price" aria-live="polite"><span>${amount}</span><span>/ month</span></div>
                  <p className="pricing-billed">{yearly ? `$${(amount * 12).toLocaleString('en-US')} billed yearly` : `$${amount} billed monthly`}</p>
                  <button type="button" className="pricing-button" onClick={() => onStart(plan.name)}>Explore {plan.name}<ArrowUpRight size={17} aria-hidden="true" /></button>
                  <div className="pricing-features">
                    <p className="pricing-sku"><strong>Up to {plan.skus} SKUs</strong><span>across both channels</span></p>
                  </div>
                </article>
              )
            })}
          </div>
          <p className="pricing-includes">Every plan includes Shopify + Amazon sync, the daily digest, investigations and seller memory.</p>
          <p className="pricing-footnote">Concept pricing for this preview. Explore any plan with sample data — no payment required.</p>
        </div>
      </section>

      <section className="marketing-faq marketing-section" aria-labelledby="faq-heading">
        <div className="marketing-container faq-layout">
          <div className="faq-heading">
            <p className="marketing-eyebrow">FAQ</p>
            <h2 id="faq-heading">Before you<br /><em>ask.</em></h2>
            <p>The six things sellers ask first.</p>
            <button type="button" className="faq-demo-link" onClick={() => onStart('Demo')}>Take a look inside <ArrowUpRight size={16} aria-hidden="true" /></button>
          </div>
          <div className="faq-list">
            {questions.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div className={`faq-item${isOpen ? ' faq-item-open' : ''}`} key={faq.question}>
                  <h3><button type="button" id={`faq-question-${index}`} aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(isOpen ? null : index)}>{faq.question}<ChevronDown size={18} aria-hidden="true" /></button></h3>
                  <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!isOpen}><div><p>{faq.answer}</p></div></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="marketing-final-cta" aria-labelledby="final-cta-heading">
        <div className="marketing-container marketing-final-inner">
          <div className="marketing-cta-icon" aria-hidden="true"><Mail size={26} strokeWidth={1.4} /><span><Check size={12} strokeWidth={2.5} /></span></div>
          <p className="marketing-eyebrow">EARLY ACCESS</p>
          <h2 id="final-cta-heading">See your first <em>digest.</em></h2>
          <p>Walk through four sample alerts<br />and the reasoning behind each one.</p>
          <button type="button" className="marketing-cta-button" onClick={() => onStart('Demo')}>Meet your inventory agent<ArrowRight size={18} aria-hidden="true" /></button>
          <span className="marketing-cta-note">An interactive preview. No store connection needed.</span>
        </div>
      </section>

      <footer className="marketing-footer">
        <div className="marketing-container">
          <div className="footer-top">
            <div className="footer-brand-area"><Logo /><p>Inventory intelligence for Shopify + Amazon sellers.</p></div>
            <nav className="footer-nav" aria-label="Footer navigation"><a href="#product">The product</a><a href="#how-it-works">How it works</a><a href="#memory">Memory</a><a href="#compare">Compare</a><a href="#numbers">Cost model</a><a href="#customers">Customers</a><a href="#pricing">Pricing</a></nav>
            <button type="button" className="footer-demo-button" onClick={() => onStart('Demo')}>Take it for a spin <ArrowUpRight size={17} aria-hidden="true" /></button>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Stockvise. A product concept.</span><span>Recommends. Never auto-executes.</span></div>
        </div>
      </footer>
    </>
  )
}

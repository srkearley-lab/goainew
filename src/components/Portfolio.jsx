import React, { useState } from 'react';
import { Icon, Reveal, Eyebrow } from '../lib.jsx';
import { useApp } from '../store.jsx';
import { DATA } from '../data.js';
import { PageHero, FinalCTA } from './Navbar.jsx';

function BrowserMockup({ src, alt, accentColor }) {
  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--line)' }}>
      <div style={{ background: 'var(--surface-2)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c841', display: 'block' }} />
        <div style={{ flex: 1, background: 'var(--surface)', borderRadius: 4, height: 20, marginLeft: 6, borderTop: `2px solid ${accentColor || 'var(--brand)'}` }} />
      </div>
      <img src={src} alt={alt} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}

function PortfolioCard({ item }) {
  const { tr } = useApp();
  return (
    <Reveal className="card" style={{ overflow: 'hidden', padding: 0 }}>
      <BrowserMockup src={item.heroImage} alt={item.name} accentColor={item.accentColor} />
      <div style={{ padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
          <p style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>{item.name}</p>
          <span style={{ fontSize: 12, color: 'var(--ink-3)', flexShrink: 0 }}>{tr(item.deliveredIn)}</span>
        </div>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-3)', marginBottom: 12 }}>{tr(item.location)} · {tr(item.industry)}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {item.services.map((s) => (
            <span key={s} style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-2)', background: 'var(--surface-2)', borderRadius: 'var(--radius-full)', padding: '3px 10px', border: '1px solid var(--line)' }}>{s}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function Portfolio() {
  const { t, tr } = useApp();
  const industries = ['All', ...Array.from(new Set(DATA.portfolio.map((p) => p.industry.EN)))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? DATA.portfolio : DATA.portfolio.filter((p) => p.industry.EN === active);

  return (
    <>
      <PageHero tag={t('nav_portfolio')} title={t('portfolio_page_title')} description={t('portfolio_page_body')} />
      <div className="container" style={{ paddingTop: 40, paddingBottom: 'var(--section-y)' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
          {industries.map((ind) => (
            <button key={ind} onClick={() => setActive(ind)}
              style={{ padding: '8px 18px', borderRadius: 'var(--radius-full)', border: `1px solid ${active === ind ? 'var(--brand)' : 'var(--line)'}`,
                background: active === ind ? 'var(--brand-soft)' : 'var(--surface)', color: active === ind ? 'var(--brand-ink)' : 'var(--ink-2)',
                fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer', transition: 'all 160ms ease' }}>
              {ind}
            </button>
          ))}
        </div>
        <div className="grid-3">
          {filtered.map((item) => <PortfolioCard key={item.id} item={item} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 20, marginTop: 64 }}>
          {DATA.portfolioStats.map((s, i) => (
            <Reveal key={i} delay={i * 60} style={{ textAlign: 'center', padding: 24, background: 'var(--surface-2)', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}>
              <p style={{ fontSize: 32, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--brand)', letterSpacing: '-0.03em' }}>{tr(s.stat)}</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-3)', marginTop: 6, lineHeight: 1.5 }}>{tr(s.label)}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <FinalCTA />
    </>
  );
}

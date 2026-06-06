import React, { useState } from 'react';
import { Icon, Reveal, Section, Eyebrow } from '../lib.jsx';
import { useApp } from '../store.jsx';
import { DATA } from '../data.js';
import { PageHero, FinalCTA } from './Navbar.jsx';

function QuickNav({ industries }) {
  const { tr } = useApp();
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 64 }}>
      {industries.map((ind) => (
        <a key={ind.id} href={`#ind-${ind.id}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--line)', background: 'var(--surface)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink-2)', textDecoration: 'none', transition: 'border-color 160ms ease' }}>
          <Icon name={ind.icon} size={15} color="var(--brand)" />
          {tr(ind.label)}
        </a>
      ))}
    </div>
  );
}

function FeatureRow({ build, idx }) {
  const { tr } = useApp();
  return (
    <Reveal delay={idx * 40} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={build.icon} size={18} color="var(--brand)" />
      </div>
      <div>
        <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', marginBottom: 4 }}>{tr(build.label)}</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-3)', lineHeight: 1.55 }}>{tr(build.detail)}</p>
      </div>
    </Reveal>
  );
}

function IndustrySection({ industry, flip }) {
  const { tr } = useApp();
  return (
    <section id={`ind-${industry.id}`} style={{ paddingBottom: 'var(--section-y)', borderBottom: '1px solid var(--line)', marginBottom: 'var(--section-y)' }}>
      <div style={{ display: 'flex', flexDirection: flip ? 'row-reverse' : 'row', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px', minWidth: 280 }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={industry.icon} size={26} color="var(--brand)" />
              </div>
              <h2 style={{ fontSize: 28 }}>{tr(industry.label)}</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <p style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.45 }}>{tr(industry.tagline)}</p>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 20, fontSize: 'var(--text-sm)' }}>{tr(industry.description)}</p>
          </Reveal>
          {industry.painPoint && (
            <Reveal delay={130}>
              <blockquote style={{ borderLeft: '3px solid var(--brand)', paddingLeft: 16, margin: 0, color: 'var(--ink-3)', fontStyle: 'italic', fontSize: 'var(--text-sm)', lineHeight: 1.65 }}>
                {tr(industry.painPoint)}
              </blockquote>
            </Reveal>
          )}
        </div>
        <div style={{ flex: '1 1 300px', minWidth: 260 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {industry.builds.map((b, i) => <FeatureRow key={i} build={b} idx={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  const { t } = useApp();
  return (
    <>
      <PageHero tag={t('nav_industries')} title={t('industries_page_title')} description={t('industries_page_body')} />
      <div className="container" style={{ paddingTop: 40, paddingBottom: 'var(--section-y)' }}>
        <QuickNav industries={DATA.industries} />
        {DATA.industries.map((ind, i) => <IndustrySection key={ind.id} industry={ind} flip={i % 2 === 1} />)}
      </div>
      <FinalCTA />
    </>
  );
}

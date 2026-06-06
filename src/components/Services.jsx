import React, { useState } from 'react';
import { Icon, Reveal, SectionHeader, Section, Eyebrow, Button } from '../lib.jsx';
import { useApp, AddToProposalButton } from '../store.jsx';
import { CATALOG, GROUPS, GROUP_ORDER, GROUP_TITLES, GROUP_ICONS, cat, catFeatures } from '../catalog.js';
import { PageHero, FinalCTA } from './Navbar.jsx';

const GROUP_ANCHOR_KEY = {
  website: 'website',
  digital: 'digital-marketing',
  automation: 'automation',
  support: 'monthly-support',
};

function MoreDetails({ id, lang }) {
  const [open, setOpen] = useState(false);
  const feats = catFeatures(id, lang);
  if (!feats || !feats.length) return null;
  return (
    <div style={{ borderTop: '1px solid var(--line)', marginTop: 12, paddingTop: 12 }}>
      <button onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--ink-3)', padding: 0 }}>
        <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={14} />
        {open ? 'Less detail' : 'More detail'}
      </button>
      {open && (
        <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {feats.map((f, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>
              <Icon name="Check" size={14} color="var(--brand)" style={{ marginTop: 3, flexShrink: 0 }} />
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CatalogCard({ id, idx }) {
  const { lang, tr } = useApp();
  const item = cat(id);
  if (!item) return null;
  return (
    <Reveal delay={idx * 40} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name={item.icon} size={20} color="var(--brand)" />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>{tr(item.label)}</p>
            {item.best && (
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand)', background: 'var(--brand-soft)', borderRadius: 'var(--radius-full)', padding: '2px 8px', display: 'inline-block', marginTop: 4 }}>
                {tr(item.best)}
              </span>
            )}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <p style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', fontSize: 15 }}>{tr(item.price)}</p>
          {item.unit && <p style={{ fontSize: 11, color: 'var(--ink-3)' }}>{tr(item.unit)}</p>}
        </div>
      </div>
      {item.desc && <p style={{ color: 'var(--ink-3)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>{tr(item.desc)}</p>}
      <MoreDetails id={id} lang={lang} />
      <AddToProposalButton id={id} full />
    </Reveal>
  );
}

function ServicesAnchors({ groups, t }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
      {groups.map((g) => (
        <a key={g} href={`#${GROUP_ANCHOR_KEY[g]}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--line)', background: 'var(--surface)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink-2)', textDecoration: 'none', transition: 'border-color 160ms ease' }}>
          <Icon name={GROUP_ICONS[g]} size={15} color="var(--brand)" />
          {t(GROUP_TITLES[g])}
        </a>
      ))}
    </div>
  );
}

function ServiceGroupSection({ group }) {
  const { t, tr } = useApp();
  const ids = CATALOG[group] || [];
  return (
    <section id={GROUP_ANCHOR_KEY[group]} style={{ paddingBottom: 'var(--section-y)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={GROUP_ICONS[group]} size={22} color="var(--brand)" />
        </div>
        <div>
          <h2 style={{ fontSize: 24, marginBottom: 2 }}>{t(GROUP_TITLES[group])}</h2>
        </div>
      </div>
      <div className="grid-3">
        {ids.map((id, i) => <CatalogCard key={id} id={id} idx={i} />)}
      </div>
    </section>
  );
}

function DiffText() {
  const { t } = useApp();
  const bullets = [t('diff_1'), t('diff_2'), t('diff_3')].filter(Boolean);
  return (
    <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--radius)', padding: 28, marginBottom: 40 }}>
      <p style={{ fontWeight: 700, marginBottom: 16 }}>{t('diff_why')}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>
            <Icon name="Check" size={14} color="var(--brand)" style={{ marginTop: 3 }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Services() {
  const { t } = useApp();
  return (
    <>
      <PageHero tag={t('nav_services')} title={t('services_page_title')} description={t('services_page_body')} />
      <div className="container" style={{ paddingTop: 40, paddingBottom: 'var(--section-y)' }}>
        <ServicesAnchors groups={GROUP_ORDER} t={t} />
        <DiffText />
        {GROUP_ORDER.map((g) => <ServiceGroupSection key={g} group={g} />)}
      </div>
      <FinalCTA />
    </>
  );
}

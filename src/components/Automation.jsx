import React from 'react';
import { Icon, Reveal, SectionHeader, Section, Eyebrow } from '../lib.jsx';
import { useApp, AddToProposalButton } from '../store.jsx';
import { DATA } from '../data.js';
import { PageHero, FinalCTA } from './Navbar.jsx';

function WhatsAppMockup() {
  const { tr } = useApp();
  return (
    <div style={{ background: '#ECE5DD', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', maxWidth: 360 }}>
      <div style={{ background: '#075E54', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="Bot" size={18} color="#fff" />
        </div>
        <div>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: 0 }}>GO AI Bot</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, margin: 0 }}>Online</p>
        </div>
      </div>
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {DATA.chatMessages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%', padding: '8px 12px', borderRadius: msg.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              background: msg.from === 'user' ? '#DCF8C6' : '#fff',
              fontSize: 13, lineHeight: 1.5, boxShadow: '0 1px 2px rgba(0,0,0,0.1)', whiteSpace: 'pre-line',
            }}>
              {tr(msg.text)}
              {msg.time && <span style={{ fontSize: 10, color: '#999', marginLeft: 8 }}>{msg.time}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmailSequenceViz() {
  const { tr } = useApp();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 380 }}>
      {DATA.emailSteps.map((step, i) => (
        <Reveal key={i} delay={i * 50} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0, textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--brand)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{tr(step.day)}</span>
            <div style={{ width: 1, height: i < DATA.emailSteps.length - 1 ? 24 : 0, background: 'var(--line)', margin: '4px auto 0' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{tr(step.subject)}</p>
            <p style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.45, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{tr(step.preview)}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function ProposalMockup() {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: 24, maxWidth: 360, boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ width: 40, height: 8, background: 'var(--brand)', borderRadius: 4, marginBottom: 6 }} />
          <div style={{ width: 24, height: 4, background: 'var(--line)', borderRadius: 4 }} />
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="FileText" size={22} color="var(--brand)" />
        </div>
      </div>
      <div style={{ height: 1, background: 'var(--line)', marginBottom: 16 }} />
      <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Charter Proposal — Azure Charters</p>
      <p style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 16 }}>Private Catamaran · 8 guests · Rhodes</p>
      {[['Charter fee', '€1,200'], ['Skipper', '€280'], ['Fuel & port fees', '€90'], ['Total', '€1,570']].map(([l, v]) => (
        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 14 }}>
          <span style={{ color: 'var(--ink-2)' }}>{l}</span>
          <span style={{ fontWeight: 700 }}>{v}</span>
        </div>
      ))}
      <div style={{ marginTop: 16, background: 'var(--brand)', borderRadius: 8, padding: '12px 16px', textAlign: 'center', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
        Confirm & Pay Deposit →
      </div>
    </div>
  );
}

function AutoSection({ section, idx }) {
  const { tr } = useApp();
  const flip = section.flip;
  const Visual = section.visual === 'whatsapp' ? WhatsAppMockup : section.visual === 'email' ? EmailSequenceViz : ProposalMockup;
  return (
    <section style={{ paddingBottom: 'var(--section-y)', borderBottom: '1px solid var(--line)', marginBottom: 'var(--section-y)' }}>
      <div style={{ display: 'flex', flexDirection: flip ? 'row-reverse' : 'row', gap: 56, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px', minWidth: 280 }}>
          <Reveal>
            <Eyebrow dot>{tr(section.tag)}</Eyebrow>
            <h2 style={{ marginTop: 14, marginBottom: 14, fontSize: 'clamp(22px,3vw,32px)', lineHeight: 1.2 }}>{tr(section.title)}</h2>
          </Reveal>
          <Reveal delay={60}>
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 24, fontSize: 'var(--text-sm)' }}>{tr(section.description)}</p>
          </Reveal>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {section.points.map((pt, i) => (
              <Reveal key={i} delay={80 + i * 40} as="li" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>
                <Icon name="Check" size={15} color="var(--brand)" style={{ marginTop: 3, flexShrink: 0 }} />
                {tr(pt)}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={200}>
            <AddToProposalButton id={section.cid} size="md" />
          </Reveal>
        </div>
        <div style={{ flex: '1 1 280px', display: 'flex', justifyContent: 'center' }}>
          <Reveal delay={100}>
            <Visual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SupportCard({ card, idx }) {
  const { tr } = useApp();
  return (
    <Reveal delay={idx * 50} className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={card.icon} size={22} color="var(--brand)" />
      </div>
      <p style={{ fontWeight: 700 }}>{tr(card.title)}</p>
      <p style={{ color: 'var(--ink-3)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>{tr(card.description)}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {card.points.map((pt, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--ink-2)' }}>
            <Icon name="Check" size={13} color="var(--brand)" style={{ marginTop: 2, flexShrink: 0 }} />
            {tr(pt)}
          </li>
        ))}
      </ul>
      <AddToProposalButton id={card.cid} size="sm" full />
    </Reveal>
  );
}

function SystemFlow() {
  const { tr } = useApp();
  return (
    <section style={{ paddingBottom: 'var(--section-y)' }}>
      <div style={{ display: 'flex', gap: 0, overflowX: 'auto', paddingBottom: 12 }}>
        {DATA.flowSteps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '0 16px', minWidth: 100 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={step.icon} size={22} color="#fff" />
              </div>
              <p style={{ fontWeight: 700, fontSize: 13, textAlign: 'center' }}>{tr(step.label)}</p>
              <p style={{ fontSize: 11, color: 'var(--ink-3)', textAlign: 'center', lineHeight: 1.4 }}>{tr(step.sub)}</p>
            </div>
            {i < DATA.flowSteps.length - 1 && (
              <div style={{ width: 32, height: 1, background: 'var(--brand)', opacity: 0.3, flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Automation() {
  const { t } = useApp();
  return (
    <>
      <PageHero tag={t('nav_automation')} title={t('auto_page_title')} description={t('auto_page_body')} />
      <div className="container" style={{ paddingTop: 60, paddingBottom: 'var(--section-y)' }}>
        <SystemFlow />
        {DATA.autoSections.map((s, i) => <AutoSection key={i} section={s} idx={i} />)}
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ textAlign: 'center', marginBottom: 48 }}>{t('support_title')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {DATA.supportCards.map((c, i) => <SupportCard key={c.cid} card={c} idx={i} />)}
          </div>
        </div>
      </div>
      <FinalCTA />
    </>
  );
}

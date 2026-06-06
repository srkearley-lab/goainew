import React, { useState } from 'react';
import { Icon, Reveal, Eyebrow, WHATSAPP } from '../lib.jsx';
import { useApp } from '../store.jsx';
import { GROUPS, GROUP_ORDER, GROUP_TITLES, GROUP_ICONS, cat, catLabel, catPrice, catRecurring } from '../catalog.js';
import { DATA } from '../data.js';
import { PageHero } from './Navbar.jsx';

function ProposalToggle({ group, lang }) {
  const { hasItem, toggleItem, t, tr } = useApp();
  const ids = GROUPS[group] || [];
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Icon name={GROUP_ICONS[group]} size={16} color="var(--brand)" />
        <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{tr(GROUP_TITLES[group])}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {ids.map((id) => {
          const on = hasItem(id);
          const item = cat(id);
          if (!item) return null;
          return (
            <button key={id} onClick={() => toggleItem(id)} aria-pressed={on}
              style={{ padding: '7px 14px', borderRadius: 'var(--radius-full)', border: `1px solid ${on ? 'var(--brand)' : 'var(--line)'}`,
                background: on ? 'var(--brand-soft)' : 'var(--surface)', color: on ? 'var(--brand-ink)' : 'var(--ink-2)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 140ms ease' }}>
              {on && <Icon name="Check" size={12} color="var(--brand)" />}
              {tr(item.label)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProposalSummary() {
  const { items, labelOf, priceOf, amountOf, recurringOf, clearItems, count, NOT_SURE, tr } = useApp();
  const total = items.filter((id) => id !== NOT_SURE).reduce((acc, id) => {
    if (!recurringOf(id)) acc.oneOff += amountOf(id) || 0;
    else acc.monthly += amountOf(id) || 0;
    return acc;
  }, { oneOff: 0, monthly: 0 });

  if (!count) return null;
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 20, marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <p style={{ fontWeight: 700 }}>Your Proposal ({count})</p>
        <button onClick={clearItems} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--ink-3)' }}>Clear all</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {items.map((id) => (
          <div key={id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
            <span>{labelOf(id)}</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-2)' }}>{priceOf(id)}</span>
          </div>
        ))}
      </div>
      {total.oneOff > 0 && (
        <p style={{ fontSize: 13, color: 'var(--ink-2)' }}>One-off: <strong style={{ fontFamily: 'var(--font-mono)' }}>€{total.oneOff.toLocaleString()}</strong></p>
      )}
      {total.monthly > 0 && (
        <p style={{ fontSize: 13, color: 'var(--ink-2)' }}>Monthly: <strong style={{ fontFamily: 'var(--font-mono)' }}>€{total.monthly}/mo</strong></p>
      )}
    </div>
  );
}

function ReassureCard({ signal }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>
      <Icon name="Check" size={15} color="var(--brand)" style={{ marginTop: 2, flexShrink: 0 }} />
      {signal}
    </div>
  );
}

function Field({ label, name, type = 'text', value, onChange, required, placeholder, options }) {
  const base = { width: '100%', padding: '11px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--ink)', fontSize: 'var(--text-sm)', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>{label}{required && ' *'}</label>
      {type === 'textarea'
        ? <textarea name={name} rows={4} value={value} onChange={onChange} placeholder={placeholder} required={required} style={{ ...base, resize: 'vertical' }} />
        : type === 'select'
        ? (
          <select name={name} value={value} onChange={onChange} required={required} style={base}>
            <option value="">Select...</option>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        )
        : <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} style={base} />
      }
    </div>
  );
}

function BusinessForm() {
  const { t, tr, items, count } = useApp();
  const [form, setForm] = useState({ name: '', business: '', type: '', phone: '', email: '', url: '', goals: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setSubmitted(true);
  };

  if (submitted) return <Confirmation />;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Field label={t('form_name')} name="name" value={form.name} onChange={set('name')} required placeholder="Maria" />
        <Field label={t('form_business')} name="business" value={form.business} onChange={set('business')} required placeholder="Villa Sunshine" />
      </div>
      <Field label={t('form_type')} name="type" type="select" value={form.type} onChange={set('type')} required options={DATA.businessTypes.map(tr)} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Field label={t('form_phone')} name="phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+30 69..." />
        <Field label={t('form_email')} name="email" type="email" value={form.email} onChange={set('email')} required placeholder="you@example.com" />
      </div>
      <Field label={t('form_url')} name="url" type="url" value={form.url} onChange={set('url')} placeholder="https://yoursite.gr" />
      <Field label={t('form_goals')} name="goals" type="textarea" value={form.goals} onChange={set('goals')} placeholder={t('form_goals_hint')} />
      {count > 0 && (
        <div style={{ background: 'var(--brand-soft)', borderRadius: 'var(--radius)', padding: '12px 16px', fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>
          {t('form_services_note')} ({count})
        </div>
      )}
      <button type="submit" disabled={sending}
        style={{ height: 52, borderRadius: 'var(--radius-full)', background: 'var(--brand)', color: '#fff', border: 'none', fontSize: 'var(--text-base)', fontWeight: 700, cursor: sending ? 'wait' : 'pointer', opacity: sending ? 0.8 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: 'var(--shadow-brand)', transition: 'opacity 200ms ease' }}>
        {sending ? <><Icon name="Loader2" size={18} color="#fff" /> Sending...</> : <>{t('form_submit')} <Icon name="ArrowRight" size={18} color="#fff" /></>}
      </button>
    </form>
  );
}

function Confirmation() {
  const { t } = useApp();
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="CheckCircle2" size={36} color="var(--brand)" />
      </div>
      <h3 style={{ fontSize: 24 }}>{t('confirm_title')}</h3>
      <p style={{ color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: 400 }}>{t('confirm_body')}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 340, marginTop: 8 }}>
        {DATA.nextSteps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, textAlign: 'left' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={s.icon} size={16} color="var(--brand)" />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14 }}>{s.title.EN || s.title}</p>
              <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>{s.body.EN || s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqItem({ faq }) {
  const { tr } = useApp();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: '18px 0', cursor: 'pointer', textAlign: 'left', gap: 12 }}>
        <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>{tr(faq.q)}</span>
        <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={18} color="var(--ink-3)" style={{ flexShrink: 0 }} />
      </button>
      {open && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', lineHeight: 1.65, paddingBottom: 18 }}>{tr(faq.a)}</p>}
    </div>
  );
}

export function Contact() {
  const { t, tr, lang } = useApp();
  return (
    <>
      <PageHero tag={t('nav_contact')} title={t('contact_page_title')} description={t('contact_page_body')} />
      <div className="container" style={{ paddingTop: 40, paddingBottom: 'var(--section-y)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px,1fr) minmax(260px,380px)', gap: 48, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: 22, marginBottom: 12 }}>{t('select_services_title')}</h2>
            <p style={{ color: 'var(--ink-3)', fontSize: 'var(--text-sm)', marginBottom: 24 }}>{t('select_services_body')}</p>
            {GROUP_ORDER.map((g) => <ProposalToggle key={g} group={g} lang={lang} />)}
            <ProposalSummary />
            <h2 style={{ fontSize: 22, marginTop: 32, marginBottom: 20 }}>{t('form_title')}</h2>
            <BusinessForm />
          </div>
          <div>
            <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--radius)', padding: 28, marginBottom: 24 }}>
              <p style={{ fontWeight: 700, marginBottom: 16 }}>{t('trust_title')}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {DATA.trustSignals.map((s, i) => <ReassureCard key={i} signal={tr(s)} />)}
              </div>
              <div style={{ borderTop: '1px solid var(--line)', marginTop: 20, paddingTop: 20 }}>
                <a href={WHATSAPP} target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#25d366', borderRadius: 'var(--radius-full)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 'var(--text-sm)', justifyContent: 'center' }}>
                  <Icon name="MessageCircle" size={18} color="#fff" />
                  {t('whatsapp_chat')}
                </a>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 18, marginBottom: 4 }}>{t('faq_title')}</h3>
              {DATA.faqs.map((faq, i) => <FaqItem key={i} faq={faq} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

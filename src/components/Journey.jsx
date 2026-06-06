import React, { useState, useEffect } from 'react';
import { Icon, Reveal, Eyebrow, navigate } from '../lib.jsx';
import { useApp, AddToProposalButton, SelectWebsiteButton } from '../store.jsx';
import { CATALOG, GROUPS, cat, catFeatures } from '../catalog.js';

const LS_STEP = 'goai_jstep';

const J_STEPS = [
  { n: 1, group: 'website',    titleKey: 'j_step1', whyKey: 'j_why1', icon: 'Globe' },
  { n: 2, group: 'digital',    titleKey: 'j_step2', whyKey: 'j_why2', icon: 'Search' },
  { n: 3, group: 'automation', titleKey: 'j_step3', whyKey: 'j_why3', icon: 'Zap' },
  { n: 4, group: 'support',    titleKey: 'j_step4', whyKey: 'j_why4', icon: 'HeadphonesIcon' },
  { n: 5, group: null,         titleKey: 'j_step5', whyKey: 'j_why5', icon: 'ClipboardList' },
  { n: 6, group: null,         titleKey: 'j_step6', whyKey: 'j_why6', icon: 'CheckCircle2' },
];

const FALLBACK_TITLES = {
  j_step1: { EN: 'Choose your website', GR: 'Επιλέξτε ιστοσελίδα' },
  j_step2: { EN: 'Digital marketing', GR: 'Ψηφιακό marketing' },
  j_step3: { EN: 'Automation tools', GR: 'Αυτοματισμοί' },
  j_step4: { EN: 'Monthly support', GR: 'Μηνιαία υποστήριξη' },
  j_step5: { EN: 'Review your proposal', GR: 'Ελέγξτε την πρότασή σας' },
  j_step6: { EN: 'All done!', GR: 'Έτοιμο!' },
};

const FALLBACK_WHY = {
  j_why1: { EN: 'Your website is your 24/7 sales machine. Pick the package that fits your goals.', GR: 'Η ιστοσελίδα σας είναι η μηχανή πωλήσεων 24/7. Επιλέξτε το πακέτο που ταιριάζει.' },
  j_why2: { EN: 'Get found on Google and social media to drive more leads.', GR: 'Βρεθείτε στο Google και τα social media για περισσότερα leads.' },
  j_why3: { EN: 'Save hours every week with WhatsApp bots, email flows and AI proposals.', GR: 'Γλιτώστε ώρες κάθε εβδομάδα με bot WhatsApp, ροές email και AI προτάσεις.' },
  j_why4: { EN: 'Keep growing month by month with ongoing SEO, content and reporting.', GR: 'Συνεχίστε να αναπτύσσεστε κάθε μήνα με SEO, περιεχόμενο και αναφορές.' },
  j_why5: { EN: "Here's everything in your proposal. Make any changes before sending.", GR: 'Όλα στην πρότασή σας. Κάντε αλλαγές πριν στείλετε.' },
  j_why6: { EN: "We'll review your selection and send you a personalised plan within 24 hours.", GR: 'Θα εξετάσουμε την επιλογή σας και θα σας στείλουμε εξατομικευμένο πλάνο σε 24 ώρες.' },
};

function JourneyProgress({ step }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 32, justifyContent: 'center' }}>
      {J_STEPS.map((s) => (
        <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: s.n === step ? 28 : 10, height: 10, borderRadius: 'var(--radius-full)',
            background: s.n < step ? 'var(--brand)' : s.n === step ? 'var(--brand)' : 'var(--line)',
            opacity: s.n < step ? 0.5 : 1,
            transition: 'all 300ms ease',
          }} />
        </div>
      ))}
    </div>
  );
}

function JourneyServiceCard({ id, isWebsite }) {
  const { tr } = useApp();
  const item = cat(id);
  if (!item) return null;
  const Btn = isWebsite ? SelectWebsiteButton : AddToProposalButton;
  return (
    <Reveal className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={item.icon} size={18} color="var(--brand)" />
          </div>
          <p style={{ fontWeight: 700, fontSize: 14 }}>{tr(item.label)}</p>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{tr(item.price)}</p>
      </div>
      {item.desc && <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{tr(item.desc)}</p>}
      <Btn id={id} full />
    </Reveal>
  );
}

function JourneyFeatures({ group }) {
  const { t } = useApp();
  const ids = GROUPS[group] || [];
  const isWebsite = group === 'website';
  return (
    <div className="jcards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
      {ids.map((id) => <JourneyServiceCard key={id} id={id} isWebsite={isWebsite} />)}
    </div>
  );
}

function JourneyReview() {
  const { items, labelOf, priceOf, amountOf, recurringOf, NOT_SURE, tr, t } = useApp();
  const oneOffItems = items.filter((id) => id !== NOT_SURE && !recurringOf(id));
  const monthlyItems = items.filter((id) => id !== NOT_SURE && recurringOf(id));
  const oneOff = oneOffItems.reduce((acc, id) => acc + (amountOf(id) || 0), 0);
  const monthly = monthlyItems.reduce((acc, id) => acc + (amountOf(id) || 0), 0);

  if (!items.length) {
    return (
      <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-3)' }}>
        <Icon name="ShoppingCart" size={40} color="var(--line)" />
        <p style={{ marginTop: 16 }}>No services added yet.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {oneOffItems.length > 0 && (
        <div>
          <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>One-off</p>
          {oneOffItems.map((id) => (
            <div key={id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 'var(--text-sm)' }}>
              <span>{labelOf(id)}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{priceOf(id)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontWeight: 800 }}>
            <span>Total one-off</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand)' }}>€{oneOff.toLocaleString()}</span>
          </div>
        </div>
      )}
      {monthlyItems.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Monthly</p>
          {monthlyItems.map((id) => (
            <div key={id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 'var(--text-sm)' }}>
              <span>{labelOf(id)}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{priceOf(id)}/mo</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontWeight: 800 }}>
            <span>Total monthly</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand)' }}>€{monthly}/mo</span>
          </div>
        </div>
      )}
    </div>
  );
}

function JourneyComplete() {
  const { t } = useApp();
  return (
    <div style={{ textAlign: 'center', padding: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="PartyPopper" size={40} color="var(--brand)" />
      </div>
      <h2>{t('j_complete_title') || 'Your proposal is ready!'}</h2>
      <p style={{ color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: 440 }}>
        {t('j_complete_body') || "We'll review your selections and send you a personalised plan via WhatsApp within 24 hours."}
      </p>
      <button onClick={() => navigate('/contact')}
        style={{ height: 52, padding: '0 32px', borderRadius: 'var(--radius-full)', background: 'var(--brand)', color: '#fff', border: 'none', fontSize: 'var(--text-base)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-brand)' }}>
        <Icon name="Send" size={18} color="#fff" />
        {t('request_proposal') || 'Submit proposal'}
      </button>
    </div>
  );
}

export function Journey() {
  const { t, tr, lang } = useApp();
  const [step, setStep] = useState(() => {
    try { const v = parseInt(localStorage.getItem(LS_STEP)); return (v >= 1 && v <= 6) ? v : 1; } catch { return 1; }
  });

  useEffect(() => { try { localStorage.setItem(LS_STEP, step); } catch {} }, [step]);

  const current = J_STEPS[step - 1];
  const resolveTitle = (key) => {
    const val = t(key);
    if (val && val !== key) return val;
    const fb = FALLBACK_TITLES[key];
    return fb ? tr(fb) : key;
  };
  const resolveWhy = (key) => {
    const val = t(key);
    if (val && val !== key) return val;
    const fb = FALLBACK_WHY[key];
    return fb ? tr(fb) : '';
  };

  return (
    <section style={{ paddingTop: 'calc(64px + 48px)', paddingBottom: 'var(--section-y)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 860 }}>
        <JourneyProgress step={step} />
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Eyebrow dot>Step {step} of {J_STEPS.length}</Eyebrow>
          <h2 style={{ marginTop: 10, fontSize: 'clamp(22px,4vw,36px)' }}>{resolveTitle(current.titleKey)}</h2>
          {current.whyKey && <p style={{ color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.65, maxWidth: 560, margin: '8px auto 0' }}>{resolveWhy(current.whyKey)}</p>}
        </div>

        <div style={{ marginBottom: 40 }}>
          {step < 5 && current.group && <JourneyFeatures group={current.group} />}
          {step === 5 && <JourneyReview />}
          {step === 6 && <JourneyComplete />}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}
            style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--line)', background: 'var(--surface)', cursor: step === 1 ? 'not-allowed' : 'pointer', opacity: step === 1 ? 0.4 : 1, fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink-2)' }}>
            <Icon name="ChevronLeft" size={16} /> {t('a_back') || 'Back'}
          </button>
          {step < 6 && (
            <button onClick={() => setStep((s) => Math.min(6, s + 1))}
              style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 24px', borderRadius: 'var(--radius-full)', background: 'var(--brand)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 'var(--text-sm)', fontWeight: 700, boxShadow: 'var(--shadow-brand)' }}>
              {step === 4 ? 'Review' : 'Next'} <Icon name="ChevronRight" size={16} color="#fff" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

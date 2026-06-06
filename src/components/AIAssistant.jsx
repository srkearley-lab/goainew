import React, { useState } from 'react';
import { Icon, navigate, WHATSAPP } from '../lib.jsx';
import { useApp } from '../store.jsx';
import { CATALOG } from '../catalog.js';

const A_GOALS = [
  { id: 'website',    labelEN: 'Build a website',      labelGR: 'Φτιάξτε ιστοσελίδα' },
  { id: 'marketing',  labelEN: 'Grow online',           labelGR: 'Αναπτυχθείτε online' },
  { id: 'automate',   labelEN: 'Automate enquiries',    labelGR: 'Αυτοματοποιήστε αιτήματα' },
  { id: 'all',        labelEN: 'All of the above',      labelGR: 'Όλα τα παραπάνω' },
];

const A_HAVESITE = [
  { id: 'yes',  labelEN: 'Yes, I have one', labelGR: 'Ναι, έχω' },
  { id: 'no',   labelEN: 'No website yet',  labelGR: 'Δεν έχω ακόμα' },
  { id: 'old',  labelEN: 'Yes, but outdated', labelGR: 'Ναι, αλλά παλιά' },
];

const A_BUSINESS = [
  { id: 'villa',    labelEN: 'Villa / Rental', labelGR: 'Βίλα / Ενοικίαση' },
  { id: 'food',     labelEN: 'Restaurant / Café', labelGR: 'Εστιατόριο / Καφέ' },
  { id: 'fitness',  labelEN: 'Gym / Fitness', labelGR: 'Γυμναστήριο / Fitness' },
  { id: 'beauty',   labelEN: 'Hair & Beauty', labelGR: 'Κομμωτήριο & Beauty' },
  { id: 'tourism',  labelEN: 'Tourism / Tours', labelGR: 'Τουρισμός / Εκδρομές' },
  { id: 'other',    labelEN: 'Other', labelGR: 'Άλλο' },
];

function recommend(mem) {
  const { goal, business } = mem;
  let website = null;
  let automation = [];
  let support = [];

  if (goal === 'website' || goal === 'all') {
    website = business === 'villa' || business === 'tourism' ? 'premium-ai-website'
      : business === 'fitness' || business === 'beauty' ? 'business-website'
      : 'basic-launch-website';
  }

  if (goal === 'automate' || goal === 'all') {
    if (business === 'villa' || business === 'tourism') automation = ['whatsapp-automation', 'ai-proposal-generation', 'email-automation'];
    else automation = ['whatsapp-automation', 'email-automation'];
  }

  if (goal === 'marketing' || goal === 'all') {
    support = ['local-seo'];
    if (business === 'food' || business === 'fitness' || business === 'beauty') support.push('social-video');
  }

  return { website, automation, support };
}

function Bubble({ from, text }) {
  return (
    <div style={{ display: 'flex', justifyContent: from === 'user' ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
      <div style={{
        maxWidth: '85%', padding: '9px 13px', borderRadius: from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        background: from === 'user' ? 'var(--brand)' : 'var(--surface)',
        color: from === 'user' ? '#fff' : 'var(--ink)', fontSize: 13, lineHeight: 1.5,
        border: from === 'bot' ? '1px solid var(--line)' : 'none',
        whiteSpace: 'pre-line',
      }}>
        {text}
      </div>
    </div>
  );
}

function OptBtn({ label, onClick }) {
  return (
    <button onClick={onClick}
      style={{ padding: '7px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--line)', background: 'var(--surface-2)', color: 'var(--ink-2)', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'border-color 160ms ease' }}>
      {label}
    </button>
  );
}

export function AIAssistant() {
  const { lang, addItem, t } = useApp();
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState('goal');
  const [mem, setMem] = useState({});
  const [messages, setMessages] = useState([
    { from: 'bot', text: lang === 'GR' ? 'Γεια σας! 👋 Πώς μπορώ να σας βοηθήσω σήμερα;' : "Hi! 👋 What are you looking to do?" }
  ]);

  const push = (from, text) => setMessages((m) => [...m, { from, text }]);

  const handleGoal = (goal) => {
    const label = A_GOALS.find((g) => g.id === goal)?.[lang === 'GR' ? 'labelGR' : 'labelEN'] || goal;
    push('user', label);
    setMem((m) => ({ ...m, goal }));
    setTimeout(() => {
      push('bot', lang === 'GR' ? 'Έχετε ήδη ιστοσελίδα;' : 'Do you have an existing website?');
      setStage('havesite');
    }, 400);
  };

  const handleHavesite = (havesite) => {
    const label = A_HAVESITE.find((h) => h.id === havesite)?.[lang === 'GR' ? 'labelGR' : 'labelEN'] || havesite;
    push('user', label);
    setMem((m) => ({ ...m, havesite }));
    setTimeout(() => {
      push('bot', lang === 'GR' ? 'Τι είδος επιχείρησης έχετε;' : 'What type of business do you run?');
      setStage('business');
    }, 400);
  };

  const handleBusiness = (business) => {
    const label = A_BUSINESS.find((b) => b.id === business)?.[lang === 'GR' ? 'labelGR' : 'labelEN'] || business;
    push('user', label);
    const newMem = { ...mem, business };
    setMem(newMem);
    setTimeout(() => {
      const rec = recommend(newMem);
      const introText = lang === 'GR'
        ? 'Βάσει των αναγκών σας, προτείνω:'
        : "Based on what you've told me, here's what I'd recommend:";
      push('bot', introText);
      if (rec.website) { push('bot', lang === 'GR' ? `🌐 Ιστοσελίδα: ${rec.website}` : `🌐 Website: ${rec.website}`); addItem(rec.website); }
      rec.automation.forEach((id) => { push('bot', `⚡ ${id}`); addItem(id); });
      rec.support.forEach((id) => { push('bot', `📈 ${id}`); addItem(id); });
      push('bot', lang === 'GR' ? 'Έχω προσθέσει αυτές τις υπηρεσίες στην πρότασή σας. Θέλετε να δείτε το ταξίδι σας;' : "I've added these to your proposal. Want to view your journey?");
      setStage('rec');
    }, 600);
  };

  const handleBack = () => {
    setStage('goal');
    setMem({});
    setMessages([{ from: 'bot', text: lang === 'GR' ? 'Γεια σας! 👋 Πώς μπορώ να σας βοηθήσω σήμερα;' : "Hi! 👋 What are you looking to do?" }]);
  };

  return (
    <>
      <a href={WHATSAPP} target="_blank" rel="noreferrer"
        style={{ position: 'fixed', bottom: 76, right: 20, width: 52, height: 52, borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(37,211,102,0.5)', zIndex: 200, textDecoration: 'none' }}
        aria-label="WhatsApp">
        <Icon name="MessageCircle" size={24} color="#fff" />
      </a>

      <button onClick={() => setOpen(!open)}
        style={{ position: 'fixed', bottom: 20, right: 20, width: 52, height: 52, borderRadius: '50%', background: 'var(--brand)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-brand)', zIndex: 200 }}
        aria-label="AI assistant">
        <Icon name={open ? 'X' : 'Bot'} size={22} color="#fff" />
      </button>

      {open && (
        <div style={{ position: 'fixed', bottom: 82, right: 20, width: 320, maxHeight: 480, borderRadius: 16, background: 'var(--bg)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-xl)', display: 'flex', flexDirection: 'column', zIndex: 199, overflow: 'hidden' }}>
          <div style={{ background: 'var(--brand)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="Bot" size={18} color="#fff" />
            </div>
            <div>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: 0 }}>GO AI Assistant</p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, margin: 0 }}>Online</p>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
            {messages.map((msg, i) => <Bubble key={i} from={msg.from} text={msg.text} />)}

            {stage === 'goal' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {A_GOALS.map((g) => (
                  <OptBtn key={g.id} label={lang === 'GR' ? g.labelGR : g.labelEN} onClick={() => handleGoal(g.id)} />
                ))}
              </div>
            )}
            {stage === 'havesite' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {A_HAVESITE.map((h) => (
                  <OptBtn key={h.id} label={lang === 'GR' ? h.labelGR : h.labelEN} onClick={() => handleHavesite(h.id)} />
                ))}
              </div>
            )}
            {stage === 'business' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {A_BUSINESS.map((b) => (
                  <OptBtn key={b.id} label={lang === 'GR' ? b.labelGR : b.labelEN} onClick={() => handleBusiness(b.id)} />
                ))}
              </div>
            )}
            {stage === 'rec' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                <OptBtn label={lang === 'GR' ? 'Δες το ταξίδι' : 'View my journey'} onClick={() => { navigate('/contact'); setOpen(false); }} />
                <OptBtn label={lang === 'GR' ? 'Ξεκίνα πάλι' : 'Start over'} onClick={handleBack} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

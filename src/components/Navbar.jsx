import React, { useState, useEffect } from 'react';
import { Icon, Link, navigate, WHATSAPP, Eyebrow, Button } from '../lib.jsx';
import { useApp, LangSwitcher } from '../store.jsx';

const NAV_LINKS = [
  { key: 'nav_services',   to: '/services' },
  { key: 'nav_industries', to: '/industries' },
  { key: 'nav_portfolio',  to: '/portfolio' },
  { key: 'nav_automation', to: '/automation' },
  { key: 'nav_contact',    to: '/contact' },
];

export function Logo() {
  return (
    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="Zap" size={18} color="#fff" />
      </div>
      <span style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em' }}>GO AI</span>
    </Link>
  );
}

export function RequestProposalButton({ size = 'md', full = false, onNavigate }) {
  const { count, t } = useApp();
  return (
    <button
      onClick={() => { navigate('/contact'); onNavigate && onNavigate(); }}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: full ? '100%' : undefined, height: size === 'sm' ? 40 : 48,
        padding: '0 20px', borderRadius: 'var(--radius-full)',
        background: 'var(--brand)', color: '#fff', border: 'none', cursor: 'pointer',
        fontSize: 'var(--text-sm)', fontWeight: 700, letterSpacing: '-0.01em',
        boxShadow: 'var(--shadow-brand)', transition: 'opacity 180ms ease', position: 'relative',
      }}>
      <Icon name="FileText" size={size === 'sm' ? 15 : 16} color="#fff" />
      {t('request_proposal')}
      {count > 0 && (
        <span style={{
          position: 'absolute', top: -6, right: -6, background: 'var(--gold)',
          color: '#000', borderRadius: '50%', width: 18, height: 18, fontSize: 10,
          fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{count}</span>
      )}
    </button>
  );
}

export function Navbar() {
  const { t } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 max(5%, 16px)', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'background 300ms ease, border-color 300ms ease',
      }}>
        <Logo />
        <nav style={{ display: 'flex', gap: 2 }} aria-label="Primary">
          {NAV_LINKS.map(({ key, to }) => (
            <Link key={to} to={to} style={{ display: 'none', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: 13.5, fontWeight: 500, color: 'var(--ink-2)', textDecoration: 'none', transition: 'color 160ms ease', '@media(min-width:768px)': { display: 'block' } }}
              className="nav-link">
              {t(key)}
            </Link>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LangSwitcher compact />
          <div className="hide-mobile"><RequestProposalButton size="sm" /></div>
          <button onClick={() => setOpen(!open)} className="show-mobile"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}
            aria-label="Menu" aria-expanded={open}>
            <Icon name={open ? 'X' : 'Menu'} size={22} color="var(--ink)" />
          </button>
        </div>
      </header>

      {open && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 99,
          background: 'var(--bg)', padding: '24px max(5%,16px)', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {NAV_LINKS.map(({ key, to }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '12px 16px', borderRadius: 'var(--radius)', fontSize: 17, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', background: 'var(--surface-2)' }}>
              {t(key)}
            </Link>
          ))}
          <div style={{ marginTop: 16 }}>
            <RequestProposalButton full onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export function Footer() {
  const { t, tr } = useApp();
  const year = new Date().getFullYear();

  const cols = [
    {
      title: t('footer_services'), links: [
        { label: t('nav_services'), to: '/services' },
        { label: t('nav_industries'), to: '/industries' },
        { label: t('nav_automation'), to: '/automation' },
        { label: t('nav_portfolio'), to: '/portfolio' },
      ]
    },
    {
      title: t('footer_company'), links: [
        { label: t('nav_contact'), to: '/contact' },
      ]
    },
    {
      title: t('footer_contact'), links: [
        { label: 'WhatsApp', href: WHATSAPP },
      ]
    },
  ];

  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: 'var(--section-y) 0 48px', background: 'var(--surface-2)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div style={{ gridColumn: 'span 2' }}>
            <Logo />
            <p style={{ marginTop: 16, color: 'var(--ink-3)', fontSize: 'var(--text-sm)', maxWidth: 280, lineHeight: 1.6 }}>
              {t('footer_tagline')}
            </p>
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, padding: '10px 18px',
                background: '#25d366', color: '#fff', borderRadius: 'var(--radius-full)', textDecoration: 'none',
                fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              <Icon name="MessageCircle" size={16} color="#fff" />
              {t('whatsapp_chat')}
            </a>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <p style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 14 }}>{col.title}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((lk) => (
                  <li key={lk.label}>
                    {lk.to
                      ? <Link to={lk.to} style={{ color: 'var(--ink-2)', textDecoration: 'none', fontSize: 'var(--text-sm)' }}>{lk.label}</Link>
                      : <a href={lk.href} target="_blank" rel="noreferrer" style={{ color: 'var(--ink-2)', textDecoration: 'none', fontSize: 'var(--text-sm)' }}>{lk.label}</a>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 28, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <p style={{ color: 'var(--ink-3)', fontSize: 13 }}>© {year} GO AI. {t('footer_rights')}</p>
          <p style={{ color: 'var(--ink-3)', fontSize: 13 }}>{t('footer_made')}</p>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ tag, title, description, children }) {
  return (
    <section className="hero-grid" style={{ paddingTop: 'calc(64px + var(--section-y))', paddingBottom: 'var(--section-y)', background: 'radial-gradient(ellipse 80% 50% at 50% 0%, var(--surface-accent), transparent)', textAlign: 'center' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        {tag && <Eyebrow dot>{tag}</Eyebrow>}
        <h1 style={{ maxWidth: 720 }}>{title}</h1>
        {description && <p style={{ maxWidth: 600, color: 'var(--ink-2)', fontSize: 'var(--text-lg)', lineHeight: 1.65 }}>{description}</p>}
        {children}
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { t } = useApp();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ package: 'starter' }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Server returned invalid response: ' + text.slice(0, 120));
      }

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed (' + response.status + ')');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment error: ' + error.message + '\nPlease WhatsApp us: +30 6985743536');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: 'var(--section-y) 0', background: 'var(--ink)', color: '#fff', textAlign: 'center' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <Eyebrow tone="gold" dot>{t('cta_tag')}</Eyebrow>
        <h2 style={{ color: '#fff', maxWidth: 640 }}>{t('cta_title')}</h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 520, lineHeight: 1.65, fontSize: 'var(--text-lg)' }}>{t('cta_body')}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
          <Button to="/contact" variant="gold" size="lg" icon="FileText">{t('request_proposal')}</Button>
          <button onClick={handlePayment} disabled={loading} className="btn-pay"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 52, padding: '0 28px', borderRadius: 'var(--radius-full)', border: 'none', fontSize: 'var(--text-sm)', fontWeight: 700, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
            <Icon name="CreditCard" size={18} color="#fff" />
            {loading ? 'Processing...' : t('pay_get_started')}
          </button>
          <a href={WHATSAPP} target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 52, padding: '0 28px', borderRadius: 'var(--radius-full)', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer' }}>
            <Icon name="MessageCircle" size={18} color="#fff" />
            {t('whatsapp_chat')}
          </a>
        </div>
      </div>
    </section>
  );
}

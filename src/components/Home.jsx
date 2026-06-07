import React, { useState, useRef } from 'react';
import { Icon, navigate, WHATSAPP, Eyebrow, Button, Reveal, SectionHeader, Section } from '../lib.jsx';
import { useApp, SelectWebsiteButton } from '../store.jsx';
import { DATA } from '../data.js';
import { FinalCTA } from './Navbar.jsx';


export function Hero() {
  const { t } = useApp();
  return (
    <section style={{
      paddingTop: 'calc(64px + 80px)', paddingBottom: 80,
      background: 'radial-gradient(ellipse 80% 60% at 50% 0%, var(--surface-accent), transparent)',
      textAlign: 'center',
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        <Reveal>
          <Eyebrow dot>{t('hero_eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h1 style={{ maxWidth: 760, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 1.08, letterSpacing: '-0.04em' }}>
            {t('hero_title')}
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ maxWidth: 560, fontSize: 'var(--text-lg)', color: 'var(--ink-2)', lineHeight: 1.65 }}>
            {t('hero_body')}
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
            <Button to="/contact" variant="primary" size="lg" icon="FileText">{t('request_proposal')}</Button>
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 52, padding: '0 24px', borderRadius: 'var(--radius-full)', background: '#25d366', color: '#fff', textDecoration: 'none', fontSize: 'var(--text-sm)', fontWeight: 600, boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
              <Icon name="MessageCircle" size={18} color="#fff" />
              WhatsApp
            </a>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginTop: 24 }}>
            {DATA.heroProofKeys.map((k) => (
              <span key={k} style={{ fontSize: 13, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="Check" size={14} color="var(--brand)" />
                {t(k)}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VideoPlayer({ src }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.play()
      setPlaying(true)
    }
  }

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setPlaying(false)
    }
  }

  const handlePause = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause()
        setPlaying(false)
      } else {
        videoRef.current.play()
        setPlaying(true)
      }
    }
  }

  return (
    <section style={{
      width: '100%',
      padding: '3rem 1rem',
      background: '#0a0a0a'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(107,78,255,0.3)',
        boxShadow: '0 0 40px rgba(107,78,255,0.2)'
      }}>
        <video
          ref={videoRef}
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{
            display: 'block',
            width: '100%',
            maxHeight: '500px',
            objectFit: 'cover'
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>

        {!playing && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.45)',
              cursor: 'pointer'
            }}
            onClick={handlePlay}
          >
            <button
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6B4EFF, #4E9EFF)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 40px rgba(107,78,255,0.7)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
          </div>
        )}

        {playing && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '1rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
          }}>
            <button
              onClick={handlePause}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)'
              }}
              title="Pause"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
              </svg>
            </button>
            <button
              onClick={handleStop}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)'
              }}
              title="Stop"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <rect x="4" y="4" width="16" height="16"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function JourneyCard({ item, idx }) {
  const { tr } = useApp();
  const delay = idx * 60;
  return (
    <Reveal delay={delay} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={item.icon} size={22} color="var(--brand)" />
      </div>
      <div>
        <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 6 }}>{tr(item.title)}</p>
        <p style={{ color: 'var(--ink-3)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>{tr(item.description)}</p>
      </div>
    </Reveal>
  );
}

function JourneyLauncher() {
  const { t } = useApp();
  return (
    <Section bg="alt">
      <SectionHeader tag={t('journey_tag')} title={t('journey_title')} description={t('journey_body')} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <Button to="/contact" variant="primary" size="lg" icon="ArrowRight">{t('journey_cta')}</Button>
        <Button href={WHATSAPP} variant="ghost" size="lg" icon="MessageCircle">{t('whatsapp_chat')}</Button>
      </div>
    </Section>
  );
}

function IndustryTile({ industry, idx }) {
  const { tr } = useApp();
  return (
    <Reveal delay={idx * 40}>
      <button onClick={() => navigate('/industries')}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '20px 12px',
          background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--line)',
          cursor: 'pointer', width: '100%', transition: 'border-color 180ms ease, box-shadow 180ms ease' }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={industry.icon} size={24} color="var(--brand)" />
        </div>
        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: 'center', color: 'var(--ink)' }}>{tr(industry.label)}</span>
      </button>
    </Reveal>
  );
}

function StepCard({ step, idx }) {
  const { tr } = useApp();
  return (
    <Reveal delay={idx * 80} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name={step.icon} size={22} color="#fff" />
        </div>
        <div style={{ width: 1, flex: 1, height: 1, background: idx < DATA.steps.length - 1 ? 'var(--line)' : 'transparent' }} />
      </div>
      <div>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>{tr(step.title)}</p>
        <p style={{ color: 'var(--ink-3)', fontSize: 'var(--text-sm)', lineHeight: 1.65 }}>{tr(step.description)}</p>
      </div>
    </Reveal>
  );
}

function PackageCard({ pkg, idx }) {
  const { tr } = useApp();
  return (
    <Reveal delay={idx * 80} className={`card ${pkg.popular ? 'popular' : ''}`} style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
      {pkg.badge && (
        <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--brand)', color: '#fff', borderRadius: 'var(--radius-full)', padding: '4px 14px', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
          {tr(pkg.badge)}
        </div>
      )}
      <div>
        <p style={{ fontWeight: 700, fontSize: 'var(--text-lg)' }}>{tr(pkg.name)}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
          <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'var(--font-mono)' }}>{tr(pkg.price)}</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-3)' }}>{tr(pkg.unit)}</span>
        </div>
      </div>
      <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-sm)', lineHeight: 1.65 }}>{tr(pkg.description)}</p>
      <p style={{ fontSize: 12, color: 'var(--ink-3)', borderTop: '1px solid var(--line)', paddingTop: 16 }}>
        <strong style={{ color: 'var(--ink-2)' }}>Best for:</strong> {tr(pkg.bestFor)}
      </p>
      <SelectWebsiteButton id={pkg.cid} />
    </Reveal>
  );
}

function Pricing() {
  const { t } = useApp();
  return (
    <Section id="pricing">
      <SectionHeader tag={t('pricing_tag')} title={t('pricing_title')} description={t('pricing_body')} />
      <div className="grid-3" style={{ marginTop: 48 }}>
        {DATA.packages.map((pkg, i) => <PackageCard key={pkg.cid} pkg={pkg} idx={i} />)}
      </div>
      <Reveal style={{ textAlign: 'center', marginTop: 32 }}>
        <p style={{ color: 'var(--ink-3)', fontSize: 'var(--text-sm)' }}>{t('pricing_note')}</p>
      </Reveal>
    </Section>
  );
}

function WhatWeDo() {
  const { t, tr } = useApp();
  return (
    <Section bg="alt">
      <SectionHeader tag={t('services_tag')} title={t('services_title')} />
      <div className="grid-3" style={{ marginTop: 48 }}>
        {DATA.services.map((s, i) => (
          <Reveal key={i} delay={i * 60} className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={s.icon} size={22} color="var(--brand)" />
            </div>
            <p style={{ fontWeight: 700 }}>{tr(s.title)}</p>
            <p style={{ color: 'var(--ink-3)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>{tr(s.description)}</p>
          </Reveal>
        ))}
      </div>
      <Reveal style={{ textAlign: 'center', marginTop: 40 }}>
        <Button to="/services" variant="outline" icon="ArrowRight" iconRight>{t('view_all_services')}</Button>
      </Reveal>
    </Section>
  );
}

function Industries() {
  const { t } = useApp();
  return (
    <Section>
      <SectionHeader tag={t('industries_tag')} title={t('industries_title')} description={t('industries_body')} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12, marginTop: 48 }} className="grid-industries">
        {DATA.industriesShort.map((ind, i) => <IndustryTile key={ind.to} industry={ind} idx={i} />)}
      </div>
      <Reveal style={{ textAlign: 'center', marginTop: 40 }}>
        <Button to="/industries" variant="outline" icon="ArrowRight">{t('view_all_industries')}</Button>
      </Reveal>
    </Section>
  );
}

function HowItWorks() {
  const { t } = useApp();
  return (
    <Section bg="alt">
      <SectionHeader tag={t('how_tag')} title={t('how_title')} />
      <div className="grid-3" style={{ marginTop: 56 }}>
        {DATA.steps.map((s, i) => <StepCard key={i} step={s} idx={i} />)}
      </div>
    </Section>
  );
}

function WhyUs() {
  const { t, tr } = useApp();
  return (
    <Section>
      <SectionHeader tag={t('why_tag')} title={t('why_title')} />
      <div className="grid-3" style={{ marginTop: 48 }}>
        {DATA.diffs.map((d, i) => (
          <Reveal key={i} delay={i * 60} style={{ display: 'flex', gap: 16 }}>
            <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: 'var(--brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color: 'var(--brand)' }}>{d.number}</div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: 8 }}>{tr(d.title)}</p>
              <p style={{ color: 'var(--ink-3)', fontSize: 'var(--text-sm)', lineHeight: 1.65 }}>{tr(d.body)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Home() {
  const { lang } = useApp();
  return (
    <>
      <Hero />
      {lang === 'GR' && <VideoPlayer src="/hero-video.mp4" />}
      {lang === 'EN' && <VideoPlayer src="/hero-video-en.mp4" />}
      <JourneyLauncher />
      <Pricing />
      <WhatWeDo />
      <Industries />
      <HowItWorks />
      <WhyUs />
      <FinalCTA />
    </>
  );
}

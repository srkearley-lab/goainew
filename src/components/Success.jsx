import React from 'react';
import { WHATSAPP } from '../lib.jsx';

export function Success() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      color: 'var(--ink)',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
      <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
        Payment Successful!
      </h1>
      <p style={{ fontSize: '1.125rem', color: 'var(--ink-2)', maxWidth: 500, lineHeight: 1.65, marginBottom: '0.75rem' }}>
        Thank you for choosing GO AI. Our team will contact you within 24 hours to start building your website.
      </p>
      <p style={{ color: 'var(--ink-3)', fontSize: '0.9rem' }}>
        Questions? WhatsApp us:{' '}
        <a href={WHATSAPP} target="_blank" rel="noreferrer" style={{ color: 'var(--brand)', fontWeight: 600 }}>
          +30 6985 743 536
        </a>
      </p>
      <a href="/#/"
        style={{
          marginTop: '2rem',
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          color: '#fff',
          padding: '0.875rem 2rem',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.9375rem',
          boxShadow: '0 10px 26px -10px rgba(79,70,229,0.5)',
        }}>
        ← Back to Home
      </a>
    </div>
  );
}

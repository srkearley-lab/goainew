import React, { useEffect, useState, Component } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { AppProvider } from './store.jsx';
import { useHashRoute } from './lib.jsx';
import { Navbar, Footer } from './components/Navbar.jsx';
import { Home } from './components/Home.jsx';
import { Services } from './components/Services.jsx';
import { Industries } from './components/Industries.jsx';
import { Portfolio } from './components/Portfolio.jsx';
import { Automation } from './components/Automation.jsx';
import { Contact } from './components/Contact.jsx';
import { Journey } from './components/Journey.jsx';
import { AIAssistant } from './components/AIAssistant.jsx';

const STRIPE_KEY = 'pk_test_51TfKxtFPfIHqc65P4vGBI1HBXKsqmc5o5Ea2vjl2Mzhfd5oZ8gVncbfnnnnXOccq9Rh2CjvMnzVXAJnVM5TUcH2800PqBhJP5g';
export const stripePromise = loadStripe(STRIPE_KEY);

const PAGES = {
  '/':            Home,
  '/services':    Services,
  '/industries':  Industries,
  '/portfolio':   Portfolio,
  '/automation':  Automation,
  '/contact':     Contact,
  '/journey':     Journey,
};

const ACCENTS = [
  { id: 'indigo', hue: 243, sat: 80, light: 51 },
  { id: 'violet', hue: 262, sat: 72, light: 46 },
  { id: 'rose',   hue: 345, sat: 72, light: 50 },
  { id: 'teal',   hue: 172, sat: 66, light: 38 },
  { id: 'amber',  hue: 38,  sat: 90, light: 48 },
];

function setThemeAccent(hue, sat, light) {
  const root = document.documentElement;
  root.style.setProperty('--brand-h', hue);
  root.style.setProperty('--brand-s', `${sat}%`);
  root.style.setProperty('--brand-l', `${light}%`);
}

function AppShell() {
  const path = useHashRoute();
  const Page = PAGES[path] || Home;

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 0 }}>
        <Page />
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}

function ThemeManager({ children }) {
  const [dark] = useState(() => {
    try { return localStorage.getItem('goai_dark') === '1'; } catch { return false; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem('goai_dark', dark ? '1' : '0'); } catch {}
  }, [dark]);

  useEffect(() => {
    setThemeAccent(ACCENTS[0].hue, ACCENTS[0].sat, ACCENTS[0].light);
  }, []);

  return children;
}

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  render() {
    if (this.state.err) {
      return (
        <div style={{ padding: '80px 32px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2 style={{ marginBottom: 12 }}>Something went wrong</h2>
          <p style={{ color: '#666', marginBottom: 24 }}>Please refresh the page or go back to the home page.</p>
          <a href="/" style={{ color: '#4f46e5', fontWeight: 600 }}>← Home</a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <ThemeManager>
          <AppShell />
        </ThemeManager>
      </AppProvider>
    </ErrorBoundary>
  );
}

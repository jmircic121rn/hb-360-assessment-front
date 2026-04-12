import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { Layout, IcLayers, IcChart, IcBuilding, IcPeople, IcQuestion } from './managerUtils';
import { Card } from '../../components/UI';

// ── Welcome Nav Card ───────────────────────────────────────────────────────
function WelcomeNavCard({ icon, title, desc, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#fafafa' : 'var(--canvas-white)',
        border: `1.5px solid ${hovered ? '#bbb' : 'var(--canvas-warm)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '22px 24px',
        textAlign: 'left',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.09)' : '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'all 200ms cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
      }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36, borderRadius: '10px',
        background: hovered ? '#000' : 'var(--canvas-warm)',
        color: hovered ? '#fff' : 'var(--ink-soft)',
        transition: 'all 200ms cubic-bezier(0.4,0,0.2,1)',
        flexShrink: 0,
      }}>
        {icon}
      </span>
      <div>
        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)', marginBottom: '5px', fontFamily: 'var(--font-body)' }}>
          {title}
        </div>
        <p style={{ color: 'var(--ink-soft)', fontSize: '0.81rem', lineHeight: 1.6, margin: 0 }}>
          {desc}
        </p>
      </div>
    </button>
  );
}

export function ManagerWelcome() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    api.getMe('admin').then(d => setName(d?.firstName || d?.name || '')).catch(() => {});
  }, []);


  const steps = [
    {
      num: '01',
      title: 'Define your ideal',
      body: 'Create an HB Ideal Profile for a role — pick the competency dimensions and proficiency levels that describe what "great" really looks like.',
      action: { label: 'Build a profile', href: '/manager/profiles/new' },
    },
    {
      num: '02',
      title: 'Run a 360° campaign',
      body: 'Launch an assessment cycle. Assign participants, pick who gives feedback (self, peers, managers), and set your deadline.',
      action: { label: 'Start a campaign', href: '/manager/campaigns/new' },
    },
    {
      num: '03',
      title: 'See the gap — act on it',
      body: 'Results land as clear gap reports: where each person stands against the ideal, what to develop, and where they already shine.',
      action: { label: 'View campaigns', href: '/manager/dashboard' },
    },
  ];

  const quickLinks = [
    {
      icon: <IcLayers />,
      title: 'My Ideal Profiles',
      desc: 'Browse all the competency profiles you\'ve built — dimensions, pillars, facets, and proficiency levels.',
      href: '/manager/profiles',
    },
    {
      icon: <IcChart />,
      title: 'Active Campaigns',
      desc: 'Check progress, send reminders, and manage ongoing 360° assessment cycles.',
      href: '/manager/dashboard',
    },
    {
      icon: <IcBuilding />,
      title: 'My Companies',
      desc: 'Manage organisations, add employees, and keep your people data up to date.',
      href: '/manager/companies',
    },
    {
      icon: <IcPeople />,
      title: 'Employees',
      desc: 'View every person\'s profile, campaign history, and download their reports.',
      href: '/manager/people',
    },
  ];

  return (
    <Layout>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>

        {/* ── Hero ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: '32px', marginBottom: '56px',
          paddingBottom: '40px', borderBottom: '1px solid var(--canvas-warm)',
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.71rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '12px' }}>
              HB Compass
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', lineHeight: 1.12, marginBottom: '16px' }}>
              Great Conquests<br />Are Won in the Backseat
            </h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 480, marginBottom: '28px' }}>
              You're looking at a tool built around one idea: know what great looks like, then measure how close your people are to it. Start by defining an ideal profile for a role, run a 360° campaign, and get a clear picture of where each person stands.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/manager/profiles/new')}
                style={{
                  background: '#000', color: '#fff', border: 'none',
                  borderRadius: 'var(--radius-md)', padding: '10px 20px',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
                  cursor: 'pointer', transition: 'opacity 150ms',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Create a profile
              </button>
              <button
                onClick={() => navigate('/manager/campaigns/new', { state: { from: '/manager/welcome' } })}
                style={{
                  background: 'transparent', color: 'var(--ink)', border: '1.5px solid #ddd',
                  borderRadius: 'var(--radius-md)', padding: '10px 20px',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
                  cursor: 'pointer', transition: 'border-color 150ms, background 150ms',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#999'; e.currentTarget.style.background = '#f9f9f9'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.background = 'transparent'; }}
              >
                Start a campaign
              </button>
            </div>
          </div>
          <img
            src="/compass.png"
            alt="HB Compass"
            style={{ width: 170, height: 'auto', opacity: 0.88, flexShrink: 0 }}
          />
        </div>

        {/* ── How it works ── */}
        <div style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '0.71rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '6px' }}>
            How it works
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '28px' }}>
            Three steps to meaningful insight
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {steps.map((step) => (
              <div key={step.num} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                  background: '#000', color: '#fff', borderRadius: '10px',
                  width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700,
                  flexShrink: 0, letterSpacing: '0.04em',
                }}>
                  {step.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>{step.title}</div>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: '10px' }}>{step.body}</p>
                  <button
                    onClick={() => navigate(step.action.href, { state: { from: '/manager/welcome' } })}
                    style={{
                      background: 'none', border: 'none', padding: 0,
                      color: 'var(--ink)', fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      textDecoration: 'underline', textUnderlineOffset: '3px',
                    }}
                  >
                    {step.action.label}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quick access ── */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontSize: '0.71rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '6px' }}>
            Quick access
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '20px' }}>
            Jump to what you need
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
            {quickLinks.map(link => (
              <WelcomeNavCard
                key={link.href}
                icon={link.icon}
                title={link.title}
                desc={link.desc}
                onClick={() => navigate(link.href)}
              />
            ))}
          </div>
        </div>

        {/* ── Support strip ── */}
        <div style={{
          borderTop: '1px solid var(--canvas-warm)', paddingTop: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
            Got questions? The FAQ covers campaigns, profiles, scoring, and more.
          </p>
          <button
            onClick={() => navigate('/faq')}
            style={{
              background: 'none', border: '1.5px solid #ddd', borderRadius: 'var(--radius-md)',
              padding: '8px 16px', fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: '0.82rem', cursor: 'pointer', color: 'var(--ink)',
              transition: 'border-color 150ms',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#999'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#ddd'}
          >
            <IcQuestion />
            Visit FAQ
          </button>
        </div>

      </div>
    </Layout>
  );
}

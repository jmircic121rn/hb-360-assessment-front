import React from 'react';
import { Link } from 'react-router-dom';
import { PublicNav } from '../../components/Layout';

const pillars = [
  { label: 'Results', desc: 'Achieving goals, managing performance, and driving meaningful outcomes' },
  { label: 'Mindset', desc: 'Self-awareness, growth orientation, and resilience under pressure' },
  { label: 'Skills', desc: 'Communication, personal effectiveness, and collaborative working' },
  { label: 'Influence', desc: 'Inspiring action, building trust, and shaping team culture' },
];

const steps = [
  { num: '01', title: 'Initiate Campaign', desc: 'A manager launches a 360° campaign for a team member.' },
  { num: '02', title: 'Collect Feedback', desc: 'Assessors receive unique links and complete assessments anonymously.' },
  { num: '03', title: 'Generate Reports', desc: 'Structured insights reveal strengths and areas for growth.' },
  { num: '04', title: 'Drive Development', desc: 'Targeted plans based on clear, data-driven feedback.' },
];

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
      <PublicNav />

      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative lines */}
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.03)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

        <div style={{ position: 'relative', maxWidth: 680 }}>
          <div style={{
            display: 'inline-block', padding: '5px 16px', borderRadius: '2px',
            border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.55)',
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
            marginBottom: '32px', fontFamily: 'var(--font-body)',
          }}>
            HB Compass
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
            color: '#fff', lineHeight: 1.1, marginBottom: '24px', fontWeight: 400,
          }}>
            Unlock the Full<br />
            <em style={{ fontStyle: 'italic' }}>Potential</em> of Your People
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: '44px', maxWidth: 480, margin: '0 auto 44px' }}>
            HB Compass is a 360° assessment platform that provides structured, actionable insights across Results, Mindset, Skills, and Influence — for every role in your organization.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" style={{
              padding: '13px 30px', borderRadius: 'var(--radius-sm)',
              background: '#fff', color: '#000', fontWeight: 700, fontSize: '0.88rem',
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* About – 4 Pillars */}
      <section style={{ background: '#fff', padding: '80px 24px', borderTop: '1px solid #eee' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--ink)', marginBottom: '12px', fontWeight: 400 }}>
              The Four Dimensions
            </h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: 440, margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
              HB Compass evaluates people across four interconnected dimensions, giving a holistic view of each person's effectiveness and impact.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: '#eee', border: '1px solid #eee' }}>
            {pillars.map((p, i) => (
              <div key={i} style={{
                background: '#fff', padding: '36px 28px',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', fontWeight: 400 }}>{p.label}</div>
                <div style={{ width: 24, height: 1, background: 'var(--ink)' }} />
                <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.7 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: 'var(--ink)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff', marginBottom: '0', fontWeight: 400 }}>How It Works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
            {steps.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.12)', lineHeight: 1, marginBottom: '16px', fontWeight: 700 }}>{s.num}</div>
                <h3 style={{ fontWeight: 600, marginBottom: '8px', color: '#fff', fontSize: '0.95rem', letterSpacing: '0.02em' }}>{s.title}</h3>
                <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 360° Perspectives */}
      <section style={{ background: '#fff', padding: '80px 24px', borderTop: '1px solid #eee' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '16px' }}>
              360° Perspective
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--ink)', fontWeight: 400, lineHeight: 1.25, marginBottom: '20px' }}>
              See yourself through<br /><em style={{ fontStyle: 'italic' }}>every lens that matters</em>
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '16px' }}>
              HB Compass collects feedback from all directions — self, manager, peers, and external stakeholders — giving a complete, unbiased picture of how each person shows up at work.
            </p>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', lineHeight: 1.8 }}>
              The gap between how we see ourselves and how others experience us is where the real growth begins.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Self', desc: 'Your own reflection on behaviors and impact' },
              { label: 'Manager', desc: 'Direct observation from those who lead you' },
              { label: 'Peers', desc: 'Day-to-day experience from colleagues who work alongside you' },
              { label: 'Direct Reports', desc: 'Feedback from the team members you manage and lead' },
              { label: 'External', desc: 'Outside perspectives from clients, partners, or stakeholders' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '16px 20px', borderRadius: '8px', background: 'var(--canvas)', border: '1px solid #eee' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '3px' }}>{item.label}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal Profiles */}
      <section style={{ background: 'var(--canvas)', padding: '80px 24px', borderTop: '1px solid #eee' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '14px' }}>
              Role-Based Assessment
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--ink)', fontWeight: 400, lineHeight: 1.25, marginBottom: '16px' }}>
              Tailored to every role
            </h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: 480, margin: '0 auto', fontSize: '0.92rem', lineHeight: 1.8 }}>
              Not all roles are measured the same. HB Compass uses distinct question sets and ideal profiles for different positions — ensuring the benchmark is always relevant to the job.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              {
                label: 'Leader Profile',
                desc: 'Designed for managers and team leads. Evaluates strategic thinking, team development, decision-making, and organizational influence.',
                tag: 'Manager · Team Lead',
              },
              {
                label: 'Leader Profile',
                desc: 'Designed for managers and team leads. Evaluates strategic thinking, team development, decision-making, and organizational influence.',
                tag: 'Manager · Team Lead',
              },
              {
                label: 'Custom Talent Profile',
                desc: 'DTailored for specific roles within your organization. Evaluates alignment with company values, cultural fit, and specialized competencies unique to your team.',
                tag: 'Bespoke · Cultural Fit',
              },
            ].map((profile, i) => (
              <div key={i} style={{ padding: '32px 28px', background: '#fff', borderRadius: '12px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>{profile.tag}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--ink)' }}>{profile.label}</h3>
                <div style={{ width: 28, height: 1, background: 'var(--ink)' }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.75 }}>{profile.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#000', padding: '28px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem' }}>
          © {new Date().getFullYear()} HB Compass · 360° Assessment Platform
        </p>
      </footer>
    </div>
  );
}

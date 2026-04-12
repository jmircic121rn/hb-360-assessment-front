import React, { useState, useEffect } from 'react';
import { Layout, NAV } from './managerUtils';
import { PortalLayout } from '../../components/Layout';
import { PageHeader } from '../../components/UI';

export function CreateIdealProfile() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  // 12 dots on a circle, each with a phase offset
  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
    const x = 50 + 38 * Math.cos(angle);
    const y = 50 + 38 * Math.sin(angle);
    const phase = (tick - i * 2 + 240) % 24;
    const opacity = phase < 12 ? 0.15 + (phase / 12) * 0.85 : 1 - ((phase - 12) / 12) * 0.85;
    const scale = phase < 12 ? 0.5 + (phase / 12) * 0.5 : 1 - ((phase - 12) / 12) * 0.5;
    return { x, y, opacity, scale };
  });

  return (
    <PortalLayout role="admin" navItems={NAV}>
      <div style={{
        minHeight: 'calc(100vh - 120px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '36px',
      }}>
        {/* Animated compass-like spinner */}
        <div style={{ position: 'relative', width: 100, height: 100 }}>
          <svg viewBox="0 0 100 100" width="100" height="100">
            {dots.map((d, i) => (
              <circle
                key={i}
                cx={d.x} cy={d.y} r={4}
                fill="var(--ink)"
                opacity={d.opacity}
                transform={`scale(${d.scale}) translate(${(1 - d.scale) * 50}, ${(1 - d.scale) * 50})`}
                style={{ transformOrigin: `${d.x}px ${d.y}px`, transform: `scale(${d.scale})` }}
              />
            ))}
            {/* Center dot */}
            <circle cx="50" cy="50" r="3.5" fill="var(--ink)" opacity="0.25" />
          </svg>
        </div>

        <div style={{ textAlign: 'center', maxWidth: 420 }}>
          <p style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '14px',
          }}>
            In Development
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 4vw, 2.1rem)',
            lineHeight: 1.2, marginBottom: '16px', color: 'var(--ink)',
          }}>
            Coming Soon
          </h1>
          <p style={{
            fontSize: '0.92rem', color: 'var(--ink-soft)',
            lineHeight: 1.7, marginBottom: '32px',
          }}>
            We're building a powerful tool for creating custom ideal profiles.
            It will let you define competency levels across dimensions and facets
            tailored to any role.
          </p>
          <button
            onClick={() => window.history.back()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '9px 20px', borderRadius: 'var(--radius-sm)',
              border: '1.5px solid rgba(0,0,0,0.12)',
              background: 'transparent', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              color: 'var(--ink-soft)', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.color = 'var(--ink)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = 'var(--ink-soft)'; }}
          >
            ← Go back
          </button>
        </div>
      </div>
    </PortalLayout>
  );
}

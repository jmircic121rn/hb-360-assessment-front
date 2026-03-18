import React, { useState } from 'react';

// ── Button ─────────────────────────────────────────────────────────────────
const btnStyles = {
  base: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    padding: '10px 20px', borderRadius: 'var(--radius-md)',
    fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.01em',
    transition: 'all var(--transition)', cursor: 'pointer', border: 'none',
  },
  primary: { background: 'var(--ink)', color: '#fff' },
  accent: { background: 'var(--ink)', color: '#fff' },
  teal: { background: 'var(--ink)', color: '#fff' },
  outline: { background: 'transparent', color: 'var(--ink)', border: '1.5px solid var(--ink-faint)' },
  ghost: { background: 'transparent', color: 'var(--ink-soft)' },
  danger: { background: 'var(--danger)', color: '#fff' },
  sm: { padding: '6px 14px', fontSize: '0.82rem' },
  lg: { padding: '14px 28px', fontSize: '1rem' },
  disabled: { opacity: 0.5, cursor: 'not-allowed' },
};

export function Btn({ variant = 'primary', size, loading, disabled, children, style, ...props }) {
  const s = {
    ...btnStyles.base,
    ...btnStyles[variant],
    ...(size && btnStyles[size]),
    ...(disabled || loading ? btnStyles.disabled : {}),
    ...style,
  };
  return (
    <button style={s} disabled={disabled || loading} {...props}>
      {loading && <Spinner size={14} color="currentColor" />}
      {children}
    </button>
  );
}

// ── Spinner ────────────────────────────────────────────────────────────────
export function Spinner({ size = 20, color = 'var(--accent)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="3" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────
export function Card({ children, style, onClick, hover }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        background: 'var(--canvas-white)', borderRadius: 'var(--radius-lg)',
        boxShadow: hov && hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        border: '1px solid rgba(0,0,0,0.09)',
        transition: 'all var(--transition)',
        transform: hov && hover ? 'translateY(-1px)' : 'none',
        cursor: onClick || hover ? 'pointer' : 'default',
        ...style
      }}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </div>
  );
}

// ── Alert ──────────────────────────────────────────────────────────────────
const alertColors = {
  error: { bg: 'var(--danger-pale)', border: '#e8b4b0', text: 'var(--danger)' },
  success: { bg: 'var(--success-pale)', border: '#a3d9bb', text: 'var(--teal)' },
  info: { bg: 'var(--teal-pale)', border: '#a3d4cf', text: 'var(--teal)' },
  warn: { bg: 'var(--warn-pale)', border: '#f0c490', text: 'var(--warn)' },
};

export function Alert({ type = 'info', children }) {
  const c = alertColors[type];
  return (
    <div style={{
      padding: '12px 16px', borderRadius: 'var(--radius-md)',
      background: c.bg, border: `1px solid ${c.border}`,
      color: c.text, fontSize: '0.88rem', lineHeight: 1.5,
    }}>
      {children}
    </div>
  );
}

// ── FormField ──────────────────────────────────────────────────────────────
export function FormField({ label, required, error, hint, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {label && (
        <label style={{ fontSize: '0.83rem', fontWeight: 500, color: 'var(--ink-soft)', letterSpacing: '0.03em' }}>
          {label} {required && <span style={{ color: 'var(--accent)' }}>*</span>}
        </label>
      )}
      {children}
      {hint && <span style={{ fontSize: '0.78rem', color: 'var(--ink-faint)' }}>{hint}</span>}
      {error && <span style={{ fontSize: '0.78rem', color: 'var(--danger)' }}>{error}</span>}
    </div>
  );
}

const inputBase = {
  padding: '10px 13px', borderRadius: 'var(--radius-md)',
  border: '1.5px solid var(--canvas-warm)',
  background: 'var(--canvas-white)', color: 'var(--ink)',
  fontSize: '0.92rem', outline: 'none', width: '100%',
  transition: 'border-color var(--transition)',
};

export function Input({ error, style, ...props }) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      style={{ ...inputBase, borderColor: error ? 'var(--danger)' : focus ? 'var(--ink-mid)' : 'var(--canvas-warm)', ...style }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      {...props}
    />
  );
}

export function Select({ error, style, children, ...props }) {
  const [focus, setFocus] = useState(false);
  return (
    <select
      style={{ ...inputBase, borderColor: error ? 'var(--danger)' : focus ? 'var(--ink-mid)' : 'var(--canvas-warm)', cursor: 'pointer', ...style }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      {...props}
    >
      {children}
    </select>
  );
}

// ── Badge ──────────────────────────────────────────────────────────────────
const badgeColors = {
  pending: { bg: 'var(--warn-pale)', color: 'var(--warn)' },
  active: { bg: 'var(--teal-pale)', color: 'var(--teal)' },
  completed: { bg: 'var(--success-pale)', color: 'var(--success)' },
  cancelled: { bg: '#f0f0f0', color: 'var(--ink-soft)' },
  default: { bg: 'var(--canvas-warm)', color: 'var(--ink-soft)' },
};

export function Badge({ status, children }) {
  const c = badgeColors[status] || badgeColors.default;
  return (
    <span style={{
      display: 'inline-block', padding: '2px 9px', borderRadius: '99px',
      fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em',
      background: c.bg, color: c.color, textTransform: 'uppercase',
    }}>
      {children}
    </span>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
      backdropFilter: 'blur(4px)', zIndex: 1000, padding: '24px',
    }} onClick={onClose}>
      <div className="modal-box" style={{
        background: 'var(--canvas-white)', borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '520px',
        maxHeight: '90vh', overflow: 'auto',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--canvas-warm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>{title}</h3>
          <button onClick={onClose} style={{ color: 'var(--ink-soft)', fontSize: '1.4rem', cursor: 'pointer', background: 'none', border: 'none', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: '20px 24px' }}>{children}</div>
      </div>
    </div>
  );
}

// ── PageHeader ─────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', gap: '16px', flexWrap: 'wrap' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--ink)', lineHeight: 1.2 }}>{title}</h1>
        {subtitle && <p style={{ color: 'var(--ink-soft)', marginTop: '4px', fontSize: '0.92rem' }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ── EmptyState ─────────────────────────────────────────────────────────────
export function EmptyState({ icon = '📋', title, message, action }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--ink-soft)' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{icon}</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '8px' }}>{title}</h3>
      {message && <p style={{ fontSize: '0.88rem', maxWidth: '320px', margin: '0 auto 20px' }}>{message}</p>}
      {action}
    </div>
  );
}

// ── Table ──────────────────────────────────────────────────────────────────
export function Table({ headers, rows, emptyMessage }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: '10px 14px', textAlign: 'left',
                fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.06em',
                textTransform: 'uppercase', color: 'var(--ink-soft)',
                borderBottom: '2px solid var(--canvas-warm)',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-faint)' }}>
                {emptyMessage || 'No data'}
              </td>
            </tr>
          ) : rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--canvas-warm)' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '12px 14px', color: 'var(--ink)' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

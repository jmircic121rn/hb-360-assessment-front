import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearToken } from '../utils/api';

// ── Logo ───────────────────────────────────────────────────────────────────
export function Logo({ size = 'md', light }) {
  const sizes = { sm: { height: 20, text: '0.85rem' }, md: { height: 80, text: '1rem' }, lg: { height: 34, text: '1.15rem' } };
  const s = sizes[size];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <img
        src="/whitetransparent.png"
        alt="HansenBeck"
        style={{ height: s.height, width: 'auto', filter: light ? 'none' : 'invert(1)' }}
      />
      <div>
      </div>
    </div>
  );
}

// ── Portal layout (sidebar + content) ────────────────────────────────────
export function PortalLayout({ role, navItems, children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  function handleLogout() {
    clearToken(role);
    navigate(`/${role}/login`);
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--canvas)' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 56 : 220, flexShrink: 0,
        background: 'var(--ink)', display: 'flex', flexDirection: 'column',
        transition: 'width var(--transition)', overflow: 'hidden',
        position: 'sticky', top: 0, height: '100vh',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Logo area */}
        <div style={{ padding: collapsed ? '18px 12px' : '22px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', minHeight: 64, display: 'flex', alignItems: 'center' }}>
          {collapsed ? (
            <img src="/whitetransparent.png" alt="HB" style={{ height: 18, width: 'auto' }} />
          ) : (
            <Logo light />
          )}
        </div>

        {/* Role badge */}
        {!collapsed && (
          <div style={{ padding: '10px 18px 6px' }}>
            <span style={{
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)',
            }}>
              {role} portal
            </span>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
          {navItems.map(item => {
            const active = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            return (
              <Link key={item.href} to={item.href} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: collapsed ? '10px 8px' : '9px 10px',
                borderRadius: 'var(--radius-sm)',
                background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: active ? '#fff' : 'rgba(255,255,255,0.45)',
                fontSize: '0.85rem', fontWeight: active ? 600 : 400,
                transition: 'all var(--transition)',
                whiteSpace: 'nowrap', overflow: 'hidden',
                borderLeft: active ? '2px solid #fff' : '2px solid transparent',
                justifyContent: collapsed ? 'center' : 'flex-start',
                letterSpacing: '0.01em',
              }}>
                <span style={{ fontSize: '0.95rem', flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{
            display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '8px', padding: '8px 10px', borderRadius: 'var(--radius-sm)',
            color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', background: 'none', border: 'none',
            cursor: 'pointer', transition: 'color var(--transition)', fontFamily: 'var(--font-body)',
          }}>
            <span style={{ fontSize: '0.9rem' }}>{collapsed ? '→' : '←'}</span>
            {!collapsed && 'Collapse'}
          </button>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '8px', padding: '8px 10px', borderRadius: 'var(--radius-sm)',
            color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', background: 'none', border: 'none',
            cursor: 'pointer', transition: 'color var(--transition)', fontFamily: 'var(--font-body)',
          }}>
            <span>↩</span>
            {!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '36px 40px', minWidth: 0, overflowX: 'auto' }}>
        {children}
      </main>
    </div>
  );
}

// ── Auth layout ────────────────────────────────────────────────────────────
export function AuthLayout({ children, role }) {
  const roleLabels = { manager: 'Manager Portal', employee: 'Employee Portal', admin: 'Admin Console', user: '' };
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'var(--ink)', padding: '24px',
    }}>
      {/* Subtle grid background */}
      <div style={{
        position: 'fixed', inset: 0, opacity: 0.08,
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '40px 40px', pointerEvents: 'none',
      }} />

      {/* Card */}
      <div style={{
        background: 'var(--canvas-white)', borderRadius: 'var(--radius-lg)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)', width: '100%', maxWidth: '400px',
        padding: '36px', position: 'relative',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid var(--canvas-warm)' }}>
          <img src="/logowhite.png" alt="HansenBeck" style={{ height: 56, width: 'auto', marginBottom: '10px' }} />
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', fontWeight: 600 }}>
            {roleLabels[role] || ''}
          </div>
        </div>
        {children}
        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--canvas-warm)' }}>
          <Link to="/" style={{ fontSize: '0.82rem', color: 'var(--ink-faint)', textDecoration: 'none', letterSpacing: '0.01em' }}>
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Public Navbar ──────────────────────────────────────────────────────────
export function PublicNav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '14px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
      transition: 'all var(--transition)',
    }}>
      <Logo light />
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link to="/login" style={{
          padding: '7px 16px', borderRadius: 'var(--radius-sm)', fontSize: '0.83rem',
          color: '#000', background: '#fff', fontWeight: 600,
          transition: 'all var(--transition)', letterSpacing: '0.02em',
        }}>Sign In</Link>
      </div>
    </nav>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearToken, api } from '../utils/api';

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

// ── useMobile hook ────────────────────────────────────────────────────────
function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = e => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

// ── Portal layout (sidebar + content) ────────────────────────────────────
export function PortalLayout({ role, navItems, children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const isMobile = useMobile();

  useEffect(() => {
    api.getMe(role).then(d => setUser(d?.user || d)).catch(() => {});
  }, [role]);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  function handleLogout() {
    clearToken(role);
    navigate(`/${role}/login`);
  }

  const username = user?.username || user?.Username || '';
  const fullName = user?.name || user?.Name || '';

  const sidebarWidth = isMobile ? 260 : (collapsed ? 56 : 220);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--canvas)' }}>

      {/* Mobile backdrop */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 99, backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: sidebarWidth, flexShrink: 0,
        background: 'var(--ink)', display: 'flex', flexDirection: 'column',
        transition: 'width var(--transition), transform var(--transition)',
        overflow: 'hidden',
        ...(isMobile ? {
          position: 'fixed', left: 0, top: 0, bottom: 0,
          zIndex: 100,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        } : {
          position: 'sticky', top: 0, height: '100vh',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }),
      }}>
        {/* Logo area */}
        <div style={{ padding: collapsed && !isMobile ? '18px 12px' : '22px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', minHeight: 64, display: 'flex', alignItems: 'center' }}>
          {collapsed && !isMobile ? (
            <img src="/whitetransparent.png" alt="HB" style={{ height: 18, width: 'auto' }} />
          ) : (
            <Logo light />
          )}
        </div>

        {/* Role badge */}
        {(!collapsed || isMobile) && (
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
              <Link
                key={item.href}
                to={item.href}
                onClick={() => isMobile && setMobileOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: collapsed && !isMobile ? '10px 8px' : '11px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.45)',
                  fontSize: '0.88rem', fontWeight: active ? 600 : 400,
                  transition: 'all var(--transition)',
                  whiteSpace: 'nowrap', overflow: 'hidden',
                  borderLeft: active ? '2px solid #fff' : '2px solid transparent',
                  justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
                  letterSpacing: '0.01em',
                }}>
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
                {(!collapsed || isMobile) && item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {(!collapsed || isMobile) && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 10px', borderRadius: 'var(--radius-sm)',
              background: 'rgba(255,255,255,0.06)',
            }}>
              <div style={{
                flexShrink: 0, width: 30, height: 30, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.8)" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {username || role}
                </div>
                <div style={{ fontSize: '0.69rem', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {fullName}
                </div>
              </div>
            </div>
          )}
          {collapsed && !isMobile && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.8)" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </div>
          )}

          {/* Collapse toggle — desktop only */}
          {!isMobile && (
            <button onClick={() => setCollapsed(!collapsed)} style={{
              display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '8px', padding: '7px 10px', borderRadius: 'var(--radius-sm)',
              color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', background: 'none', border: 'none',
              cursor: 'pointer', transition: 'color var(--transition)', fontFamily: 'var(--font-body)',
            }}>
              <span style={{ fontSize: '0.9rem' }}>{collapsed ? '→' : '←'}</span>
              {!collapsed && 'Collapse'}
            </button>
          )}

          {/* Logout */}
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
            gap: '8px', padding: '8px 10px', borderRadius: 'var(--radius-sm)',
            color: 'rgba(255,100,100,0.75)', fontSize: '0.82rem', fontWeight: 500,
            background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.15)',
            cursor: 'pointer', transition: 'all var(--transition)', fontFamily: 'var(--font-body)',
          }}>
            <span style={{ fontSize: '0.95rem' }}>↩</span>
            {(!collapsed || isMobile) && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      {isMobile && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 52,
          background: 'var(--ink)', display: 'flex', alignItems: 'center',
          padding: '0 16px', gap: '14px', zIndex: 98,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{ color: '#fff', padding: '6px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px' }}
            aria-label="Toggle menu"
          >
            <span style={{ width: 20, height: 2, background: '#fff', display: 'block', transition: 'transform var(--transition)', transformOrigin: 'center', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ width: 20, height: 2, background: '#fff', display: 'block', transition: 'opacity var(--transition)', opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ width: 20, height: 2, background: '#fff', display: 'block', transition: 'transform var(--transition)', transformOrigin: 'center', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
          <Logo light size="sm" />
        </div>
      )}

      {/* Main content */}
      <main style={{
        flex: 1, minWidth: 0, overflowX: 'auto',
        padding: isMobile ? '68px 16px 32px' : '36px 40px',
      }}>
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
      padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
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

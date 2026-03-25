import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setToken } from '../../utils/api';
import { AuthLayout } from '../../components/Layout';
import { Btn, FormField, Input, Alert } from '../../components/UI';

function LoginForm({ title, subtitle, onSubmit, loading, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ username, password });
  }

  return (
    <>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', textAlign: 'center', marginBottom: '6px' }}>{title}</h2>
      <p style={{ textAlign: 'center', color: 'var(--ink-soft)', fontSize: '0.85rem', marginBottom: '28px' }}>{subtitle}</p>

      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FormField label="Username" required>
          <Input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="enter username" required autoFocus />
        </FormField>
        <FormField label="Password" required>
          <div style={{ position: 'relative' }}>
            <Input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ paddingRight: '42px' }} />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', padding: '2px',
                color: 'var(--ink-faint)', lineHeight: 1,
              }}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </FormField>
        <Btn type="submit" loading={loading} style={{ marginTop: '8px', justifyContent: 'center' }}>
          Sign In →
        </Btn>
      </form>
    </>
  );
}

export function UnifiedLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin(creds) {
    setLoading(true); setError(null);
    try {
      const res = await api.login(creds);
      setToken(res.user.role, res.token);
      navigate(res.user.role === 'admin' ? '/manager/welcome' : '/employee/dashboard');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout role="user">
      <LoginForm title="Sign In" subtitle="Access your HB Compass portal" onSubmit={handleLogin} loading={loading} error={error} />
    </AuthLayout>
  );
}

export function ManagerLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin(creds) {
    setLoading(true); setError(null);
    try {
      const res = await api.loginManager(creds);
      setToken('manager', res.token);
      navigate('/manager/dashboard');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  return (
    <AuthLayout role="manager">
      <LoginForm title="Manager Sign In" subtitle="Access your leadership assessment portal" onSubmit={handleLogin} loading={loading} error={error} />
    </AuthLayout>
  );
}

export function EmployeeLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin(creds) {
    setLoading(true); setError(null);
    try {
      const res = await api.loginEmployee(creds);
      setToken('employee', res.token);
      navigate('/employee/dashboard');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  return (
    <AuthLayout role="employee">
      <LoginForm title="Employee Sign In" subtitle="View your assessment results and reports" onSubmit={handleLogin} loading={loading} error={error} />
    </AuthLayout>
  );
}

export function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin(creds) {
    setLoading(true); setError(null);
    try {
      const res = await api.loginAdmin(creds);
      setToken('admin', res.token);
      navigate('/admin/campaigns');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  return (
    <AuthLayout role="admin">
      <LoginForm title="Admin Console" subtitle="System administration and report generation" onSubmit={handleLogin} loading={loading} error={error} />
    </AuthLayout>
  );
}

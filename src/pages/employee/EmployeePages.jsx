import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { PortalLayout } from '../../components/Layout';
import { Card, Badge, Alert, PageHeader, EmptyState, Table, Spinner, Btn } from '../../components/UI';

const NAV = [
  { href: '/employee/dashboard', icon: '🏠', label: 'Dashboard' },
  { href: '/employee/reports', icon: '📊', label: 'My Reports' },
];

function Layout({ children }) {
  return <PortalLayout role="employee" navItems={NAV}>{children}</PortalLayout>;
}

// ── Self Assessment Row ────────────────────────────────────────────────────
function SelfAssessmentRow({ campaign }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleStart() {
    setLoading(true); setError(null);
    try {
      const res = await api.employee.getSelfToken(campaign.CycleID);
      window.location.href = `/assess/${res.token}`;
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 16px', borderRadius: 'var(--radius-md)',
      background: 'var(--canvas-warm)', gap: '12px', flexWrap: 'wrap',
    }}>
      <div>
        <div style={{ fontWeight: 600, marginBottom: '2px' }}>Self Assessment</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>
          Started {new Date(campaign.CreatedAt).toLocaleDateString()}
        </div>
        {error && <div style={{ fontSize: '0.78rem', color: 'var(--danger)', marginTop: '4px' }}>{error}</div>}
      </div>
      <Btn variant="primary" loading={loading} onClick={handleStart}>
        Start Assessment →
      </Btn>
    </div>
  );
}

// ── Employee Dashboard ─────────────────────────────────────────────────────
export function EmployeeDashboard() {
  const [data, setData] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      api.employee.getDashboard(),
      api.employee.getCampaigns(),
    ])
      .then(([dash, cyc]) => { setData(dash); setCampaigns(Array.isArray(cyc) ? cyc : []); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Campaigns where employee still needs to do their self-assessment
  const pendingSelf = campaigns.filter(c =>
    c.IncludeSelf && c.Status === 'in_progress'
  );

  return (
    <Layout>
      <PageHeader
        title={data?.name ? `Welcome, ${data.name.split(' ')[0]}` : 'Dashboard'}
        subtitle="Your 360° assessment status"
      />

      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Pending self-assessments */}
          {pendingSelf.length > 0 && (
            <Card style={{ padding: '24px', border: '1.5px solid var(--ink)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '16px' }}>
                Pending Self-Assessments
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pendingSelf.map(c => (
                  <SelfAssessmentRow key={c.CycleID} campaign={c} />
                ))}
              </div>
            </Card>
          )}

          {/* Active campaigns */}
          <Card style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '16px' }}>Active Assessment Campaigns</h3>
            {campaigns.filter(c => c.Status === 'in_progress').length === 0 ? (
              <EmptyState icon="🔄" title="No active campaigns" message="You don't have any assessment campaigns in progress." />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {campaigns.filter(c => c.Status === 'in_progress').map(c => (
                  <div key={c.CycleID} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 16px', borderRadius: 'var(--radius-md)',
                    background: 'var(--canvas)', border: '1px solid var(--canvas-warm)',
                    flexWrap: 'wrap', gap: '12px',
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '2px' }}>360° Assessment Campaign</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>
                        Started {new Date(c.CreatedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginBottom: '4px' }}>
                          {c.CompletedLinks}/{c.TotalLinks} responses
                        </div>
                        <div style={{ width: 120, height: 4, background: 'var(--canvas-warm)', borderRadius: 2 }}>
                          <div style={{ height: '100%', background: 'var(--accent)', width: `${(c.CompletedLinks / c.TotalLinks) * 100}%`, borderRadius: 2 }} />
                        </div>
                      </div>
                      <Badge status="active">{c.Status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Quick stats */}
          {data?.completedCycles !== undefined && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
              {[
                { label: 'Completed Campaigns', value: data.completedCycles, icon: '✅' },
                { label: 'Available Reports', value: data.availableReports, icon: '📊' },
              ].map(s => (
                <Card key={s.label} style={{ padding: '20px' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', color: 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginTop: '4px' }}>{s.label}</div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

// ── Employee Reports ───────────────────────────────────────────────────────
function openReportPdf(reportId) {
  const token = localStorage.getItem('compass_token_employee');
  const BASE = process.env.REACT_APP_API_URL || 'https://api.hansenbeck.com';
  fetch(`${BASE}/api/360/employee/reports/${reportId}/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    })
    .catch(e => alert(`Download failed: ${e.message}`));
}

export function EmployeeReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.employee.getReports()
      .then(setReports).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <PageHeader title="My Reports" subtitle="Download your assessment reports" />

      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
      ) : reports.length === 0 ? (
        <Card style={{ padding: '24px' }}>
          <EmptyState
            icon="📊"
            title="No reports available"
            message="Your reports will appear here once your assessment campaign is completed and processed."
          />
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {reports.map(r => (
            <Card key={r.ReportID} style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 'var(--radius-md)',
                  background: r.ReportType === 'report1' ? 'var(--accent-pale)' : 'var(--teal-pale)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0,
                }}>
                  {r.ReportType === 'report1' ? '📋' : '🔬'}
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '2px' }}>
                    {r.ReportType === 'report1' ? 'Individual Report' : 'Development Report'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>
                    Generated {new Date(r.GeneratedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <Btn variant="accent" size="sm" onClick={() => openReportPdf(r.ReportID)}>
                ⬇ Download PDF
              </Btn>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}

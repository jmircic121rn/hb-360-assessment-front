import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { Layout, ActionMenu, downloadReportPdf } from './managerUtils';
import {
  PageHeader, Alert, Card, Badge, Btn, Table, Spinner, Select, Modal
} from '../../components/UI';

export function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(null);
  const [reportSuccess, setReportSuccess] = useState(null);
  const [reportError, setReportError] = useState(null);
  const [peersExpanded, setPeersExpanded] = useState(false);
  const [drExpanded, setDrExpanded] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);
  const [reports, setReports] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiStatus, setAiStatus] = useState('');
  const [aiError, setAiError] = useState(null);
  const [cycleData, setCycleData] = useState(null);

  function fetchReports() {
    api.manager.getReports()
      .then(all => setReports((all || []).filter(r => r.CycleID === Number(id))))
      .catch(() => {});
  }

  useEffect(() => {
    api.manager.getCampaign(id)
      .then(setData).catch(e => setError(e.message)).finally(() => setLoading(false));
    fetchReports();
    api.manager.getCycleData(id).then(setCycleData).catch(() => {});
  }, [id]);

  const campaign = data?.cycle;
  const links = data?.links || [];
  const typeLabels = data?.typeLabels || {};

  const selfLink = links.find(l => l.AssessmentType === 'self');
  const managerLink = links.find(l => l.AssessmentType === 'manager');
  const selfFormat = campaign?.SelfFormat || 'standard_40';
  const reportsAvailable = ['standard_40', 'short_20'].includes(selfFormat);
  const peerLinks = links.filter(l => l.AssessmentType === 'peer');
  const drLinks = links.filter(l => ['directreport', 'direct_report'].includes(l.AssessmentType));
  const otherLinks = links.filter(l => !['self', 'manager', 'peer', 'directreport', 'direct_report'].includes(l.AssessmentType));

  const selfDone = selfLink?.Status === 'completed';
  const completedCount = links.filter(l => l.Status === 'completed').length;

  async function generateFullReport() {
    setAiGenerating(true); setAiError(null); setAiStatus('Starting…');
    let jobId;
    try {
      ({ jobId } = await api.manager.generateAIReport(id));
      setAiStatus('AI is analyzing…');
    } catch (e) {
      setAiError(e.message); setAiGenerating(false); setAiStatus('');
      return;
    }
    const poll = async () => {
      try {
        const result = await api.manager.getAIReportStatus(id, jobId);
        if (result.status === 'done') {
          setAiStatus('Saving…');
          const saved = await api.manager.saveAIReport(id, result.report || '');
          const reportId = saved?.reportId || saved?.ReportID || saved?.id;
          setAiStatus('Downloading PDF…');
          const blob = await api.manager.downloadAIReportPdf(reportId);
          const pdfBlob = new Blob([blob], { type: 'application/pdf' });
          const url = URL.createObjectURL(pdfBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Development_Report_${campaign.FirstName}_${campaign.LastName}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 30000);
          fetchReports();
          setAiGenerating(false); setAiStatus('');
        } else if (result.status === 'error') {
          setAiError(result.error || 'Report generation failed.');
          setAiGenerating(false); setAiStatus('');
        } else {
          setTimeout(poll, 5000);
        }
      } catch (e) {
        setAiError(e.message); setAiGenerating(false); setAiStatus('');
      }
    };
    poll();
  }

  async function doGenerateReport(type, force = false) {
    if (type === 2 && !force) {
      const incomplete = links.filter(l => l.Status !== 'completed');
      if (incomplete.length > 0) { setConfirmModal({ type, incomplete }); return; }
    }
    setGenerating(type); setReportSuccess(null); setReportError(null);
    try {
      await (type === 1 ? api.manager.generateReport1(id) : api.manager.generateReport2(id));
      const allReports = await api.manager.getReports();
      const cycleReports = (allReports || []).filter(r => r.CycleID === Number(id));
      setReports(cycleReports);
      const reportType = type === 1 ? 'report1' : 'report2';
      const newReport = cycleReports.find(r => r.ReportType === reportType);
      if (newReport) {
        downloadReportPdf(newReport.CycleID, newReport.ReportType, newReport.ReportID, campaign.FirstName, campaign.LastName);
      }
      setReportSuccess(type === 1 ? 'Self Assessment Report generated.' : 'HB Compass Development Report generated.');
      setConfirmModal(null);
    } catch (e) { setReportError(e.message); }
    finally { setGenerating(null); }
  }

  const TYPE_LABELS = {
    self: 'Self Assessment', manager: 'Manager Review',
    peer: 'Peer Review', directreport: 'Direct Report', direct_report: 'Direct Report',
    external: 'External', cross_partisan: 'Cross-Partisan', crosspartisan: 'Cross-Partisan',
    mentor: 'Mentor',
    ...typeLabels,
  };

  function LinkRow({ link, label }) {
    const resolvedLabel = label || TYPE_LABELS[link.AssessmentType?.toLowerCase()] || link.AssessmentType?.replace(/_/g, ' ');
    const publicUrl = link.Token ? `${window.location.origin}/assess/${link.Token}` : null;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 110px 160px', gap: '12px', alignItems: 'center', padding: '12px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--canvas-warm)' }}>
        <span style={{ fontWeight: 500, fontSize: '0.86rem', textTransform: 'capitalize' }}>{resolvedLabel}</span>
        {publicUrl ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.79rem', color: 'var(--ink-soft)', fontFamily: 'monospace', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{publicUrl}</span>
            <Btn size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(publicUrl)}>Copy</Btn>
          </div>
        ) : (link.AssessorEmail || <em style={{ color: 'var(--ink-faint)' }}>—</em>)}
        {link.IsShared
          ? (link.ResponseCount > 0
              ? <Badge status="completed">{link.ResponseCount} {link.ResponseCount === 1 ? 'response' : 'responses'}</Badge>
              : <Badge status="pending">Pending</Badge>)
          : <Badge status={link.Status === 'completed' ? 'completed' : 'pending'}>{link.Status}</Badge>
        }
        <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>{link.CompletedAt ? new Date(link.CompletedAt).toLocaleString() : ''}</span>
      </div>
    );
  }

  function GroupRow({ links: groupLinks, label, expanded, onToggle }) {
    const sharedLink = groupLinks.find(l => !l.AssessorEmail);
    const individualLinks = groupLinks.filter(l => !!l.AssessorEmail);
    const done = individualLinks.filter(l => l.Status === 'completed').length;
    const allDone = done === individualLinks.length && individualLinks.length > 0;
    const sharedPublicUrl = sharedLink?.Token ? `${window.location.origin}/assess/${sharedLink.Token}` : null;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Shared link — uvek vidljiv */}
        {sharedPublicUrl && (
          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 110px 160px', gap: '12px', alignItems: 'center', padding: '12px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--canvas-warm)' }}>
            <span style={{ fontWeight: 500, fontSize: '0.86rem' }}>{label} — shared</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <span style={{ fontSize: '0.79rem', color: 'var(--ink-soft)', fontFamily: 'monospace', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sharedPublicUrl}</span>
              <Btn size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(sharedPublicUrl)}>Copy</Btn>
            </div>
            {sharedLink.ResponseCount > 0
              ? <Badge status="completed">{sharedLink.ResponseCount} {sharedLink.ResponseCount === 1 ? 'response' : 'responses'}</Badge>
              : <Badge status="pending">Pending</Badge>
            }
            <span />
          </div>
        )}
        {/* Individualni — collapsible, samo ime + status */}
        {individualLinks.length > 0 && (
          <div>
            <div onClick={onToggle} style={{
              display: 'grid', gridTemplateColumns: '140px 1fr 110px 160px', gap: '12px', alignItems: 'center',
              padding: '12px 14px', background: 'var(--canvas-warm)',
              borderRadius: expanded ? 'var(--radius-md) var(--radius-md) 0 0' : 'var(--radius-md)',
              border: '1px solid var(--canvas-warm)', cursor: 'pointer', userSelect: 'none',
            }}>
              <span style={{ fontWeight: 600, fontSize: '0.86rem' }}>{label}</span>
              <span style={{ fontSize: '0.83rem', color: 'var(--ink-soft)' }}>{done}/{individualLinks.length} completed</span>
              <Badge status={allDone ? 'completed' : 'pending'}>{allDone ? 'done' : 'in progress'}</Badge>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>{expanded ? '▲ Hide' : '▼ Show all'}</span>
            </div>
            {expanded && (
              <div style={{ border: '1px solid var(--canvas-warm)', borderTop: 'none', borderRadius: '0 0 var(--radius-md) var(--radius-md)', overflow: 'hidden' }}>
                {individualLinks.map((l, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 110px 160px', gap: '12px', alignItems: 'center', padding: '10px 14px', background: i % 2 === 0 ? 'var(--canvas)' : 'var(--canvas-white)', borderTop: i === 0 ? 'none' : '1px solid var(--canvas-warm)' }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '0.86rem' }}>{l.AssessorName || l.AssessorEmail}</div>
                      {l.AssessorName && <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{l.AssessorEmail}</div>}
                    </div>
                    <Badge status={l.Status === 'completed' ? 'completed' : 'pending'}>{l.Status}</Badge>
                    <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>{l.CompletedAt ? new Date(l.CompletedAt).toLocaleString() : ''}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <Layout>
      {/* Fullscreen loading overlay for report generation */}
      {(aiGenerating || generating !== null) && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px',
        }}>
          <div style={{
            width: '36px', height: '36px', border: '3px solid #e4e4e4', borderTopColor: 'var(--ink)',
            borderRadius: '50%', animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--ink)', letterSpacing: '0.04em' }}>
            {aiGenerating ? (aiStatus || 'Generating Personal Development Plan...') : 'Generating report...'}
          </p>
          <p style={{ fontSize: '0.8rem', color: '#999' }}>
            Please wait, this may take a minute. Do not close this page.
          </p>
        </div>
      )}

      <PageHeader
        title={campaign ? `${campaign.Name} for ${campaign.FirstName} ${campaign.LastName}` : 'Campaign Detail'}
        subtitle={campaign ? `Started ${new Date(campaign.CreatedAt).toLocaleDateString()}` : ''}
      />
      {error && <Alert type="error">{error}</Alert>}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
      ) : campaign && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Status card */}
          <Card style={{ padding: '24px' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Status</div>
                <Badge status={campaign.Status === 'in_progress' ? 'active' : campaign.Status}>{campaign.Status}</Badge>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Progress</div>
                <div style={{ fontWeight: 600 }}>{completedCount}/{links.length} completed</div>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ height: 6, background: 'var(--canvas-warm)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'var(--ink)', width: `${links.length ? (completedCount / links.length) * 100 : 0}%`, transition: 'width 0.5s ease' }} />
                </div>
              </div>
              {campaign.JobTitle && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Job Title</div>
                  <div style={{ fontWeight: 500 }}>{campaign.JobTitle}</div>
                </div>
              )}
              {(campaign.ProfilName || campaign.ProfileName) && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Profile</div>
                  <div style={{ fontWeight: 500 }}>{campaign.ProfilName || campaign.ProfileName}</div>
                </div>
              )}
              {campaign.Status === 'in_progress' && (
                <Btn size="sm" variant="outline" onClick={() => navigate(`/manager/campaigns/${id}/edit`)}>Edit Campaign</Btn>
              )}
            </div>
          </Card>

          {/* Links */}
          <Card style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '16px' }}>Assessment Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selfLink && <LinkRow link={selfLink} label={TYPE_LABELS['self']} />}
              {managerLink && <LinkRow link={managerLink} label={TYPE_LABELS['manager']} />}
              {peerLinks.length > 0 && <GroupRow links={peerLinks} label={TYPE_LABELS['peer']} expanded={peersExpanded} onToggle={() => setPeersExpanded(x => !x)} />}
              {drLinks.length > 0 && <GroupRow links={drLinks} label={TYPE_LABELS['direct_report']} expanded={drExpanded} onToggle={() => setDrExpanded(x => !x)} />}
              {otherLinks.map((l, i) => <LinkRow key={i} link={l} label={TYPE_LABELS[l.AssessmentType?.toLowerCase()]} />)}
            </div>
          </Card>

          {/* Reports — only for standard_40 and short_20 formats */}
          <Card style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '4px' }}>Reports</h3>
            {!reportsAvailable ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '0', lineHeight: 1.6 }}>
                Reports are not available for the <strong>{selfFormat === 'forced_choice' ? 'Forced Choice' : selfFormat === 'deep_scenario' ? 'Deep Scenario' : selfFormat}</strong> assessment format.
                Reports can only be generated for Standard (40Q) and Short (20Q) self-assessment formats.
              </p>
            ) : (<>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '20px', lineHeight: 1.6 }}>
              Reports are visible to you and the employee.
              {!selfDone && <span style={{ color: 'var(--danger)', marginLeft: '4px' }}>Self assessment must be completed first.</span>}
            </p>
            {reportSuccess && <div style={{ marginBottom: '16px' }}><Alert type="success">{reportSuccess}</Alert></div>}
            {reportError && <div style={{ marginBottom: '16px' }}><Alert type="error">{reportError}</Alert></div>}
            {aiError && <div style={{ marginBottom: '16px' }}><Alert type="error">{aiError}</Alert></div>}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Btn variant={selfDone ? 'primary' : 'outline'} loading={generating === 1}
                  disabled={!selfDone || generating !== null} onClick={() => doGenerateReport(1)}
                  style={!selfDone ? { opacity: 0.45, cursor: 'not-allowed' } : {}}>
                  Self Assessment Report
                </Btn>
                {!selfDone
                  ? <span style={{ fontSize: '0.74rem', color: 'var(--ink-faint)' }}>Requires: self assessment complete</span>
                  : <span style={{ fontSize: '0.74rem', color: 'var(--ink-faint)' }}>Downloads as PDF</span>
                }
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Btn variant={selfDone ? 'primary' : 'outline'} loading={aiGenerating}
                  disabled={!selfDone || aiGenerating || generating !== null} onClick={generateFullReport}
                  style={!selfDone ? { opacity: 0.45, cursor: 'not-allowed' } : {}}>
                  {aiGenerating ? (aiStatus || 'Generating Personal Development Plan...') : 'Personal Development Plan'}
                </Btn>
                {!selfDone
                  ? <span style={{ fontSize: '0.74rem', color: 'var(--ink-faint)' }}>Requires: self assessment complete</span>
                  : <span style={{ fontSize: '0.74rem', color: 'var(--ink-faint)' }}>Downloads as PDF</span>
                }
              </div>
            </div>

            {/* 360 inclusions */}
            <div style={{ borderTop: '1px solid var(--canvas-warm)', paddingTop: '16px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--ink-soft)', marginBottom: '10px' }}>
                Will be included in Personal Development plan report
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <div style={{
                  padding: '5px 12px', borderRadius: 'var(--radius-md)',
                  border: `1px solid ${selfDone ? 'var(--ink)' : 'var(--canvas-warm)'}`,
                  background: selfDone ? 'var(--canvas-warm)' : 'var(--canvas)',
                  fontSize: '0.78rem', fontWeight: 500,
                  color: selfDone ? 'var(--ink)' : 'var(--ink-faint)',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  {selfDone
                    ? <span style={{ color: 'var(--success)', fontSize: '0.7rem' }}>●</span>
                    : <span style={{ color: 'var(--ink-faint)', fontSize: '0.7rem' }}>○</span>
                  }
                  Self Assessment
                </div>
                <div style={{
                  padding: '5px 12px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--canvas-warm)',
                  background: 'var(--canvas)',
                  fontSize: '0.78rem', fontWeight: 500,
                  color: 'var(--ink-faint)',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <span style={{ fontSize: '0.7rem' }}>◌</span>
                  360 feedback — in development
                </div>
              </div>
            </div>

            {/* Generated reports list */}
            {reports.length > 0 && (
              <div style={{ borderTop: '1px solid var(--canvas-warm)', paddingTop: '20px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: '12px' }}>Generated</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                  {reports.map(r => (
                    <div key={r.ReportID} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--canvas)', borderRadius: 'var(--radius-md)', border: '1px solid var(--canvas-warm)' }}>
                      <div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 500 }}>
                          {r.ReportType === 'report1' ? 'Self Assessment Report' : 'HB Compass Development Report'}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', marginTop: '2px' }}>
                          {new Date(r.GeneratedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <ActionMenu items={[
                        { label: 'Download PDF', onClick: () => downloadReportPdf(r.CycleID, r.ReportType, r.ReportID, campaign.FirstName, campaign.LastName) },
                        { label: 'Delete', onClick: () => setConfirmDeleteId(r.ReportID), danger: true },
                      ]} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            </>)}
          </Card>

          <PillarScoreChart data={cycleData} selfDone={selfDone} lang={campaign?.Lang || 'en'} />
        </div>
      )}

      {/* Delete report modal */}
      <Modal open={confirmDeleteId !== null} onClose={() => setConfirmDeleteId(null)} title="Delete Report">
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px', fontSize: '0.92rem', lineHeight: 1.6 }}>
          Are you sure you want to delete this report? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setConfirmDeleteId(null)}>Cancel</Btn>
          <Btn variant="danger" loading={deleting !== null} onClick={async () => {
            setDeleting(confirmDeleteId);
            try {
              await api.manager.deleteReport(confirmDeleteId);
              setReports(prev => prev.filter(r => r.ReportID !== confirmDeleteId));
              setConfirmDeleteId(null);
            } catch (e) { setError(e.message); }
            finally { setDeleting(null); }
          }}>Delete</Btn>
        </div>
      </Modal>

      {/* Incomplete confirm modal */}
      <Modal open={!!confirmModal} onClose={() => setConfirmModal(null)} title="Not everyone has completed">
        {confirmModal && <>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '16px', fontSize: '0.9rem', lineHeight: 1.6 }}>
            The following assessors haven't finished yet. Generate the report anyway?
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px', maxHeight: 200, overflowY: 'auto' }}>
            {confirmModal.incomplete.map((l, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--canvas-warm)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                <span style={{ textTransform: 'capitalize' }}>{l.AssessmentType?.replace('_', ' ')} — {l.AssessorEmail || 'link'}</span>
                <Badge status="pending">{l.Status}</Badge>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Btn variant="outline" onClick={() => setConfirmModal(null)}>Cancel</Btn>
            <Btn variant="primary" loading={generating !== null} onClick={() => doGenerateReport(confirmModal.type, true)}>Generate Anyway</Btn>
          </div>
        </>}
      </Modal>
    </Layout>
  );
}

// ── Pillar Score Chart ───────────────────────────────────────────────────────
function pillarDim(pillar) {
  const p = (pillar || '').toUpperCase().trim();
  if (p.includes('CILJEVI') || p.includes('PROMEN') || p.includes('SHORT-TERM') || p.includes('LONG-TERM') || p === 'STG' || p === 'LTC') return 'RESULTS';
  if (p.includes('PREMA') || p.includes('TOWARDS') || p === 'TO' || p === 'TOO' || p === 'TCP' || p === 'CP') return 'MINDSET';
  if (p.includes('EFIKASNOST') || p.includes('KOMUNIKACIJA') || p.includes('RAZVOJ TIMA') || p.includes('EFFICIENCY') || p.includes('COMMUNICATION') || p.includes('PEOPLE DEVELOPMENT') || p === 'PE' || p === 'CO' || p === 'TPD') return 'SKILLS';
  return 'INFLUENCE';
}


const DIM_SR_MAP = {
  RESULTS: 'REZULTATI',
  MINDSET: 'MENTALITET',
  SKILLS: 'VEŠTINE',
  INFLUENCE: 'UTICAJ',
};

// Strip diacritics then map to canonical EN key
function normalizeDim(raw) {
  const s = (raw || '').toUpperCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/Đ/g, 'DJ').replace(/đ/gi, 'DJ');        // đ has no NFD decomposition
  const MAP = {
    RESULTS: 'RESULTS', REZULTATI: 'RESULTS',
    MINDSET: 'MINDSET', MENTALITET: 'MINDSET',
    SKILLS: 'SKILLS', VESTINE: 'SKILLS',
    INFLUENCE: 'INFLUENCE', UTICAJ: 'INFLUENCE',
  };
  return MAP[s] || raw.toUpperCase().trim();
}

const DIM_QUOTES = {
  RESULTS:   '"Knowing is not enough; we must apply. Willing is not enough; we must do." — Goethe',
  MINDSET:   '"He who knows others is wise; he who knows himself is enlightened." — Lao Tzu',
  SKILLS:    '"I hear and I forget. I see and I remember. I do and I understand." — Confucius',
  INFLUENCE: '"You can\'t win friends by trying to get them interested in you." — Dale Carnegie',
};

function PillarScoreChart({ data: chartData, selfDone, lang }) {
  const isSr = (lang || 'en') === 'sr';
  const byAssessorType = chartData?.byAssessorType || {};
  const selfScores = byAssessorType.self || [];

  if (selfScores.length === 0) {
    return (
      <Card style={{ padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '4px' }}>Performance Overview</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '0', lineHeight: 1.6 }}>
          {selfDone
            ? 'Score data is loading…'
            : 'Complete the self-assessment to see the competency profile.'}
        </p>
      </Card>
    );
  }

  // Aggregate scores by pillar — normalize dimension to canonical EN key
  const fMap = {};
  selfScores.forEach(r => {
    const rawDim = r.dimension || pillarDim(r.pillar || '');
    const dim = normalizeDim(rawDim || 'OTHER');
    const k = `${dim}||${r.pillar}`;
    if (!fMap[k]) fMap[k] = { dim, pillar: r.pillar, sum: 0, count: 0 };
    if (typeof r.score === 'number') { fMap[k].sum += r.score; fMap[k].count++; }
  });

  // Build grouped dynamically from whatever dimensions exist in data
  const grouped = {};
  Object.values(fMap).forEach(({ dim, pillar, sum, count }) => {
    if (!count) return;
    if (!grouped[dim]) grouped[dim] = [];
    grouped[dim].push({ pillar, score: Math.max(1, Math.min(5, sum / count)) });
  });

  // Known dimensions shown first (in order), then any custom ones alphabetically
  const KNOWN_ORDER = ['RESULTS', 'MINDSET', 'SKILLS', 'INFLUENCE'];
  const dims = Object.keys(grouped).sort((a, b) => {
    const ai = KNOWN_ORDER.indexOf(a), bi = KNOWN_ORDER.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <Card style={{ padding: '24px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '4px' }}>Performance Overview</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '20px', lineHeight: 1.6 }}>
        Results by Dimensions and Pillars
      </p>
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
        {dims.map(dim => {
          const pillars = grouped[dim];
          const quote = DIM_QUOTES[dim];
          return (
            <div key={dim} style={{
              flex: '1 1 0', minWidth: 160, minHeight: 300,
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              boxShadow: '3px 3px 0 rgba(0,0,0,0.08)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}>
              {/* Card header */}
              <div style={{ padding: '10px 12px 0' }}>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.06em', color: '#222', marginBottom: '4px' }}>
                  HansenBeck
                </div>
                <div style={{ height: 1.5, background: '#222', marginBottom: '8px' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 400, color: '#000', lineHeight: 1.1, marginBottom: '8px' }}>
                  {isSr ? (DIM_SR_MAP[dim] || dim) : dim}
                </div>
              </div>

              {/* Bar chart area */}
              <div style={{ flex: 1, padding: '0 12px', display: 'flex', alignItems: 'flex-end', gap: 0, minHeight: 160 }}>
                {pillars.length === 0 ? (
                  <div style={{ fontSize: '0.7rem', color: '#aaa', alignSelf: 'center', width: '100%', textAlign: 'center' }}>—</div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, width: '100%', height: 160, justifyContent: 'center' }}>
                    {pillars.map(({ pillar, score }) => {
                      const label = pillar || '';
                      const barH = Math.max(4, (score / 5) * 96);
                      return (
                        <div key={pillar} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#222', marginBottom: 2 }}>
                            {score.toFixed(1)}
                          </div>
                          <div style={{
                            width: '60%', minWidth: 18, maxWidth: 36, height: barH,
                            background: '#222', borderRadius: '2px 2px 0 0',
                          }} />
                          <div style={{
                            marginTop: 5, fontSize: '0.55rem', fontWeight: 700,
                            color: '#333', textAlign: 'center', lineHeight: 1.3,
                            width: '100%', overflow: 'hidden',
                            display: '-webkit-box', WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            wordBreak: 'break-word',
                          }} title={label}>
                            {label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Quote footer — only for known dimensions */}
              {quote && (
                <div style={{ padding: '8px 12px 12px', borderTop: '0.5px solid #ddd', marginTop: 8 }}>
                  <p style={{ fontSize: '0.6rem', color: '#555', lineHeight: 1.4, fontStyle: 'italic', margin: 0 }}>
                    {quote}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

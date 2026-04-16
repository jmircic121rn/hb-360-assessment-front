import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../utils/api';
import { Layout } from './managerUtils';
import { PageHeader, Alert, Spinner, Card, Btn } from '../../components/UI';
import { CampaignForm } from './CampaignForm';

export function NewCampaign() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCompanyId = location.state?.companyId || '';
  const returnTo = location.state?.from || '/manager/dashboard';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Drafts state
  const [drafts, setDrafts] = useState([]);
  const [draftsLoading, setDraftsLoading] = useState(true);
  const [activeDraftId, setActiveDraftId] = useState(null);
  const [saveDraftLoading, setSaveDraftLoading] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [deletingDraftId, setDeletingDraftId] = useState(null);
  const formRef = useRef(null);

  // Load drafts on mount
  useEffect(() => {
    api.manager.getDrafts()
      .then(d => setDrafts(d || []))
      .catch(() => {})
      .finally(() => setDraftsLoading(false));
  }, []);

  // Save draft handler
  const handleSaveDraft = useCallback(async () => {
    if (!formRef.current) return;
    const data = formRef.current.getFormData();
    const name = data.form?.name || 'Untitled Draft';
    setSaveDraftLoading(true);
    setDraftSaved(false);
    try {
      if (activeDraftId) {
        // Update existing draft
        await api.manager.updateDraft(activeDraftId, { name, payload: data });
        setDrafts(prev => prev.map(d => d.id === activeDraftId ? { ...d, name, payload: data, updatedAt: new Date().toISOString() } : d));
      } else {
        // Create new draft
        const res = await api.manager.saveDraft({ name, payload: data });
        const newDraft = { id: res.id, name, payload: data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        setDrafts(prev => [newDraft, ...prev]);
        setActiveDraftId(res.id);
      }
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaveDraftLoading(false);
    }
  }, [activeDraftId]);

  // Load draft into form
  const loadDraft = useCallback((draft) => {
    if (!formRef.current) return;
    setActiveDraftId(draft.id);
    formRef.current.setFormData(draft.payload);
    setError(null);
  }, []);

  // Delete draft
  const deleteDraft = useCallback(async (draftId, e) => {
    e.stopPropagation();
    setDeletingDraftId(draftId);
    try {
      await api.manager.deleteDraft(draftId);
      setDrafts(prev => prev.filter(d => d.id !== draftId));
      if (activeDraftId === draftId) setActiveDraftId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingDraftId(null);
    }
  }, [activeDraftId]);

  // Start fresh (new campaign)
  const startFresh = useCallback(() => {
    setActiveDraftId(null);
    // Reload the page to reset form state cleanly
    window.location.reload();
  }, []);

  async function handleSubmit(payload) {
    if (payload.mode === 'individual' && !payload.employeeId) { setError('Please select an employee.'); return; }
    if (payload.mode === 'group' && payload.groupStyle === 'custom') {
      if (!payload.subgroups || payload.subgroups.length === 0) { setError('Add at least one subgroup.'); return; }
      for (let i = 0; i < payload.subgroups.length; i++) {
        const sg = payload.subgroups[i];
        if (!sg.employeeIds || sg.employeeIds.length === 0) { setError(`Subgroup ${i + 1} has no employees selected.`); return; }
        if (!sg.profilId) { setError(`Subgroup ${i + 1} has no profile selected.`); return; }
        if (!Object.entries(sg).some(([k, v]) => k.startsWith('include') && v === true)) {
          setError(`Subgroup ${i + 1} has no assessment types selected.`); return;
        }
      }
    } else {
      if (payload.mode === 'group' && (!payload.employeeIds || payload.employeeIds.length < 2)) { setError('Select at least 2 employees for a group campaign.'); return; }
      if (!Object.entries(payload).some(([k, v]) => k.startsWith('include') && v === true)) {
        setError('Select at least one assessment type.'); return;
      }
    }
    setLoading(true); setError(null);
    try {
      if (payload.mode === 'group') {
        if (payload.groupStyle === 'custom') {
          const groupId = (typeof crypto !== 'undefined' && crypto.randomUUID)
            ? crypto.randomUUID()
            : `group-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
          for (const sg of payload.subgroups) {
            await api.manager.createCampaignBatch({
              name: payload.name,
              employeeIds: sg.employeeIds,
              profilId: sg.profilId,
              deadline: payload.deadline,
              groupId,
              lang: payload.lang,
              selfFormat: sg.includeSelf ? (payload.selfFormat || 'standard_40') : undefined,
              includeSelf: sg.includeSelf,
              includeManager: sg.includeManager,
              includePeer: sg.includePeer,
              includeDirectReports: sg.includeDirectReports,
              includeExternal: sg.includeExternal,
              includeCrossPartisan: sg.includeCrossPartisan,
              includeMentor: sg.includeMentor,
            });
          }
        } else {
          await api.manager.createCampaignBatch(payload);
        }
        // If this was a draft, delete it after successful launch
        if (activeDraftId) {
          api.manager.deleteDraft(activeDraftId).catch(() => {});
        }
        navigate('/manager/dashboard');
      } else {
        const res = await api.manager.createCampaign(payload);
        // If this was a draft, delete it after successful launch
        if (activeDraftId) {
          api.manager.deleteDraft(activeDraftId).catch(() => {});
        }
        navigate(`/manager/campaigns/${res.cycleId}`);
      }
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  const hasDrafts = drafts.length > 0;

  return (
    <Layout>
      <PageHeader title="New Assessment Campaign" subtitle="Configure and launch an HB Compass campaign" />

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        {/* Main form */}
        <Card style={{ padding: '32px', flex: 1, minWidth: 0, maxWidth: hasDrafts ? undefined : 1000 }}>
          {draftSaved && <Alert type="success" style={{ marginBottom: '16px' }}>Draft saved successfully.</Alert>}
          <CampaignForm
            ref={formRef}
            onSubmit={handleSubmit}
            submitLoading={loading}
            submitError={error}
            initialCompanyId={initialCompanyId}
            returnTo={returnTo}
            onSaveDraft={handleSaveDraft}
            saveDraftLoading={saveDraftLoading}
          />
        </Card>

        {/* Saved Drafts sidebar */}
        {(hasDrafts || draftsLoading) && (
          <div style={{ width: 260, flexShrink: 0, position: 'sticky', top: 24 }}>
            <div style={{
              fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
              color: '#999', marginBottom: '10px', paddingLeft: '4px',
            }}>
              Saved Drafts
            </div>
            {draftsLoading ? (
              <div style={{ padding: '20px', textAlign: 'center' }}><Spinner size={18} /></div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {drafts.map(d => {
                  const isActive = d.id === activeDraftId;
                  const isDeleting = deletingDraftId === d.id;
                  const date = d.updatedAt ? new Date(d.updatedAt) : null;
                  const dateStr = date ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '';
                  return (
                    <div key={d.id}
                      onClick={() => loadDraft(d)}
                      style={{
                        padding: '10px 12px', borderRadius: '8px', cursor: 'pointer',
                        border: `1.5px solid ${isActive ? 'var(--ink)' : '#e4e4e4'}`,
                        background: isActive ? '#f4f4f4' : '#fff',
                        transition: 'all 0.15s ease',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          fontSize: '0.82rem', fontWeight: isActive ? 600 : 500, color: 'var(--ink)',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>
                          {d.name}
                        </div>
                        {dateStr && (
                          <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '2px' }}>{dateStr}</div>
                        )}
                      </div>
                      <button
                        onClick={(e) => deleteDraft(d.id, e)}
                        disabled={isDeleting}
                        title="Delete draft"
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                          color: '#bbb', fontSize: '14px', lineHeight: 1, flexShrink: 0,
                          opacity: isDeleting ? 0.4 : 1,
                        }}
                      >
                        &#x2715;
                      </button>
                    </div>
                  );
                })}

                {activeDraftId && (
                  <button onClick={startFresh} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '0.78rem', color: 'var(--ink-soft)', padding: '8px 4px',
                    textAlign: 'left', textDecoration: 'underline',
                  }}>
                    + New Campaign
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

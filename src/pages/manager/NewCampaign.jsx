import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../utils/api';
import { Layout } from './managerUtils';
import { PageHeader, Alert, Spinner, Card, Select } from '../../components/UI';
import { CampaignForm } from './CampaignForm';

export function NewCampaign() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCompanyId = location.state?.companyId || '';
  const returnTo = location.state?.from || '/manager/dashboard';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        navigate('/manager/dashboard');
      } else {
        const res = await api.manager.createCampaign(payload);
        navigate(`/manager/campaigns/${res.cycleId}`);
      }
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <Layout>
      <PageHeader title="New Assessment Campaign" subtitle="Configure and launch an HB Compass campaign" />
      <Card style={{ padding: '32px', maxWidth: 1000 }}>
        <CampaignForm onSubmit={handleSubmit} submitLoading={loading} submitError={error} initialCompanyId={initialCompanyId} returnTo={returnTo} />
      </Card>
    </Layout>
  );
}

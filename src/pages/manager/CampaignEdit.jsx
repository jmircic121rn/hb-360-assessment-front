import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { api } from '../../utils/api';
import { Layout } from './managerUtils';
import { PageHeader, Alert, Spinner, Card } from '../../components/UI';
import { CampaignForm } from './CampaignForm';

export function CampaignEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    api.manager.getCampaign(id)
      .then(data => {
        const cycle = data?.cycle;
        if (!cycle) return;
        setInitialData({
          name: cycle.Name || cycle.name || '',
          mode: 'individual',
          employeeId: String(cycle.EmployeeID || ''),
          employeeIds: [],
          profilId: String(cycle.ProfilId || ''),
          includeSelf: !!cycle.IncludeSelf,
          includeManager: !!cycle.IncludeManager,
          includePeer: !!cycle.IncludePeer,
          includeDirectReports: !!cycle.IncludeDirectReports,
          includeExternal: !!cycle.IncludeExternal,
          peerEmployeeIds: [], peerNewPersons: [],
          drEmployeeIds: [], drNewPersons: [],
          deadline: cycle.Deadline ? new Date(cycle.Deadline).toISOString().split('T')[0] : '',
        });
      })
      .catch(e => setError(e.message))
      .finally(() => setLoadingData(false));
  }, [id]);

  async function handleSubmit(payload) {
    setLoading(true); setError(null);
    try {
      await api.manager.updateCampaign(id, payload);
      navigate(`/manager/campaigns/${id}`);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <Layout>
      <PageHeader title="Edit Campaign" subtitle="Update campaign settings" />
      <Card style={{ padding: '32px', maxWidth: 680 }}>
        {loadingData ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><Spinner size={28} /></div>
        ) : initialData ? (
          <CampaignForm initialData={initialData} onSubmit={handleSubmit} submitLoading={loading} submitError={error} lockMode />
        ) : (
          <Alert type="error">{error || 'Campaign not found.'}</Alert>
        )}
      </Card>
    </Layout>
  );
}

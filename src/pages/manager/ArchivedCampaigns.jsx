import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { Layout, ActionMenu } from './managerUtils';
import {
  Btn, Card, Alert, PageHeader, Select, Spinner, Modal, Table
} from '../../components/UI';

export function ArchivedCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCompany, setFilterCompany] = useState('');
  const [filterEmployee, setFilterEmployee] = useState('');
  const [filterCampaignName, setFilterCampaignName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteCampaign() {
    setDeleting(true);
    try {
      await api.manager.deleteCampaign(deleteId);
      setCampaigns(prev => prev.filter(c => c.CycleID !== deleteId));
      setDeleteId(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setDeleting(false);
    }
  }

  useEffect(() => {
    Promise.all([
      api.manager.getCampaigns(),
      api.manager.getEmployees(),
      api.manager.getCompanies().catch(() => []),
    ]).then(([cData, empData, compData]) => {
      const compList = Array.isArray(compData) ? compData : [];
      setCompanies(compList);
      const empMap = {};
      (Array.isArray(empData) ? empData : []).forEach(e => {
        if (e.CompanyID) empMap[e.EmployeeID] = { CompanyID: e.CompanyID, CompanyName: e.CompanyName || `Company #${e.CompanyID}` };
      });
      const enriched = (Array.isArray(cData) ? cData : []).map(c => ({
        ...c,
        CompanyID: c.CompanyID ?? empMap[c.EmployeeID]?.CompanyID,
        CompanyName: c.CompanyName ?? empMap[c.EmployeeID]?.CompanyName,
      }));
      // Only archived campaigns
      setCampaigns(enriched.filter(c => c.Status === 'archived'));
    }).catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const empName = c => c.FullName || `${c.FirstName || ''} ${c.LastName || ''}`.trim();
  const fmtDeadline = c => {
    const d = c.Deadline || c.deadline;
    if (!d) return <span style={{ color: 'var(--ink-faint)' }}>—</span>;
    const date = new Date(d);
    return isNaN(date) ? <span style={{ color: 'var(--ink-faint)' }}>—</span> : date.toLocaleDateString();
  };

  const filteredByCompany = campaigns.filter(c =>
    filterCompany ? String(c.CompanyID) === filterCompany : true
  );
  const filteredByEmployee = filteredByCompany.filter(c =>
    filterEmployee ? empName(c) === filterEmployee : true
  );
  const filteredByCampaignName = filteredByEmployee.filter(c =>
    filterCampaignName ? (c.Name || 'Unnamed Campaign') === filterCampaignName : true
  );
  const filtered = filteredByCampaignName.filter(c => {
    if (!searchTerm) return true;
    const s = `${c.Name} ${empName(c)} ${c.CompanyName}`.toLowerCase();
    return s.includes(searchTerm.toLowerCase());
  });

  const uniqueEmployees = [...new Set(filteredByCompany.map(c => empName(c)).filter(Boolean))].sort();
  const uniqueCampaignNames = [...new Set(filteredByEmployee.map(c => c.Name || 'Unnamed Campaign').filter(Boolean))].sort();

  return (
    <Layout>
      <PageHeader title="Archived Campaigns" subtitle="Completed assessment campaigns" />
      {error && <Alert type="error">{error}</Alert>}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
      ) : (
        <>
          <Card style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                  Completed Campaigns
                  <span style={{ marginLeft: '10px', fontSize: '0.82rem', color: 'var(--ink-faint)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>
                    {filtered.length} total
                  </span>
                </h3>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                background: '#f8f8f8',
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Search</label>
                  <input
                    type="text"
                    placeholder="Type to search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.85rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Company</label>
                  <Select value={filterCompany} onChange={e => { setFilterCompany(e.target.value); setFilterEmployee(''); setFilterCampaignName(''); }}>
                    <option value="">All Companies</option>
                    {companies.map(c => <option key={c.CompanyID || c.id} value={String(c.CompanyID || c.id)}>{c.CompanyName || c.name}</option>)}
                  </Select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Employee</label>
                  <Select value={filterEmployee} onChange={e => { setFilterEmployee(e.target.value); setFilterCampaignName(''); }}>
                    <option value="">All Employees</option>
                    {uniqueEmployees.map(name => <option key={name} value={name}>{name}</option>)}
                  </Select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>Campaign Name</label>
                  <Select value={filterCampaignName} onChange={e => setFilterCampaignName(e.target.value)}>
                    <option value="">All Campaign Names</option>
                    {uniqueCampaignNames.map(name => <option key={name} value={name}>{name}</option>)}
                  </Select>
                </div>
              </div>
            </div>
            <Table
              headers={['Campaign', 'Employee', 'Company', 'Progress', 'Started', 'Deadline', 'Actions']}
              rows={filtered.map(c => [
                <strong>{c.Name}</strong>,
                <strong>{c.FirstName} {c.LastName}</strong>,
                <span style={{ color: 'var(--ink-soft)', fontSize: '0.84rem' }}>{c.CompanyName || '—'}</span>,
                `${c.CompletedLinks}/${c.TotalLinks}`,
                new Date(c.CreatedAt).toLocaleDateString(),
                fmtDeadline(c),
                <ActionMenu items={[
                  { label: 'View', href: `/manager/campaigns/${c.CycleID}` },
                  { label: 'Delete', onClick: () => setDeleteId(c.CycleID), danger: true },
                ]} />,
              ])}
              emptyMessage="No archived campaigns yet."
            />
          </Card>
          <Modal open={!!deleteId} title="Delete Campaign" onClose={() => setDeleteId(null)}>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>
              Are you sure you want to delete this campaign? This will permanently remove all responses and assessment links.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Btn variant="outline" onClick={() => setDeleteId(null)}>Cancel</Btn>
              <Btn onClick={handleDeleteCampaign} loading={deleting} style={{ background: 'var(--danger)', color: '#fff', borderColor: 'var(--danger)' }}>
                Yes, Delete
              </Btn>
            </div>
          </Modal>
        </>
      )}
    </Layout>
  );
}

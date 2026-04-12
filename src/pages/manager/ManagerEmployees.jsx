import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { Layout, ActionMenu } from './managerUtils';
import {
  Btn, Card, Badge, Alert, PageHeader, Select, Spinner, Modal, EmptyState, Table
} from '../../components/UI';

export function ManagerEmployees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [filterCompany, setFilterCompany] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    api.manager.getEmployees()
      .then(setEmployees).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  async function handleDelete() {
    setDeleting(true);
    try {
      await api.manager.deleteEmployee(deleteId);
      setDeleteId(null);
      load();
    } catch (e) { setError(e.message); }
    finally { setDeleting(false); }
  }

  // Derive unique companies from employee data
  const empCompanies = [...new Map(
    employees.filter(e => e.CompanyID)
      .map(e => [String(e.CompanyID), { id: e.CompanyID, name: e.CompanyName || `Company #${e.CompanyID}` }])
  ).values()];

  // Group employees by company, applying filter
  const grouped = employees
    .filter(e => !filterCompany || String(e.CompanyID) === filterCompany)
    .reduce((acc, e) => {
      const key = e.CompanyID ? String(e.CompanyID) : '__none__';
      const label = e.CompanyName || (e.CompanyID ? `Company #${e.CompanyID}` : 'No Company');
      if (!acc[key]) acc[key] = { label, rows: [] };
      acc[key].rows.push(e);
      return acc;
    }, {});
  const groups = Object.values(grouped);

  return (
    <Layout>
      <PageHeader
        title="Employees"
        subtitle="Manage your team members"
        action={<Link to="/manager/employees/new" state={{ from: '/manager/people' }}><Btn variant="teal">+ Add Employee</Btn></Link>}
      />
      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}
      {empCompanies.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <Select value={filterCompany} onChange={e => setFilterCompany(e.target.value)} style={{ maxWidth: 240 }}>
            <option value="">All companies</option>
            {empCompanies.map(c => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
          </Select>
        </div>
      )}
      {loading ? (
        <Card><div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div></Card>
      ) : employees.length === 0 ? (
        <Card><EmptyState icon="👥" title="No employees yet" message="Add your first employee to get started." action={<Link to="/manager/employees/new" state={{ from: '/manager/people' }}><Btn variant="teal">Add Employee</Btn></Link>} /></Card>
      ) : groups.length === 0 ? (
        <Card><EmptyState icon="👥" title="No employees found" message="No employees match the selected company." /></Card>
      ) : (
        groups.map(group => (
          <div key={group.label} style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: '8px', padding: '0 2px' }}>
              🏢 {group.label}
            </div>
            <Card>
              <Table
                headers={['Name', 'Email', 'Job Title', 'Language', 'Actions']}
                rows={group.rows.map(e => [
                  <strong>{e.FirstName} {e.LastName}</strong>,
                  <span style={{ color: 'var(--ink-soft)' }}>{e.Email}</span>,
                  e.JobTitle || '—',
                  <Badge status="default">{e.Lang || 'EN'}</Badge>,
                  <ActionMenu items={[
                    { label: 'Edit', onClick: () => navigate(`/manager/employees/${e.EmployeeID}/edit`, { state: { from: '/manager/people' } }) },
                    { label: 'Delete', onClick: () => setDeleteId(e.EmployeeID), danger: true },
                  ]} />,
                ])}
              />
            </Card>
          </div>
        ))
      )}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Employee">
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>Are you sure you want to delete this employee? This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setDeleteId(null)}>Cancel</Btn>
          <Btn variant="danger" loading={deleting} onClick={handleDelete}>Delete</Btn>
        </div>
      </Modal>
    </Layout>
  );
}
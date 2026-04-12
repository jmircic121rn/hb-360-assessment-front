import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../utils/api';
import { Layout, ActionMenu } from './managerUtils';
import {
  PageHeader, Card, Table, Spinner, Alert, EmptyState, Btn, Modal, Input
} from '../../components/UI';

export function ManagerCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api.manager.getCompanies()
      .then(r => setCompanies(Array.isArray(r) ? r : []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  async function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true); setActionError(null);
    try {
      await api.manager.createCompany({ companyName: newName.trim() });
      setNewName('');
      load();
    } catch (err) { setActionError(err.message); }
    finally { setCreating(false); }
  }

  async function handleRename(e) {
    e.preventDefault();
    if (!editName.trim()) return;
    setSaving(true); setActionError(null);
    try {
      await api.manager.updateCompany(editId, { companyName: editName.trim() });
      setEditId(null); setEditName('');
      load();
    } catch (err) { setActionError(err.message); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    setDeleting(true); setActionError(null);
    try {
      await api.manager.deleteCompany(deleteId);
      setDeleteId(null);
      load();
    } catch (err) { setActionError(err.message); setDeleteId(null); }
    finally { setDeleting(false); }
  }

  return (
    <Layout>
      <PageHeader title="Companies" subtitle="Manage your client companies" />
      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}
      {actionError && <div style={{ marginBottom: '16px' }}><Alert type="error">{actionError}</Alert></div>}

      <Card style={{ padding: '24px', maxWidth: 600, marginBottom: '24px' }}>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '12px' }}>Add New Company</div>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px' }}>
          <Input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Company name..."
            required
            style={{ flex: 1 }}
          />
          <Btn type="submit" variant="teal" loading={creating}>Add</Btn>
        </form>
      </Card>

      <Card style={{ maxWidth: 600 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}><Spinner size={28} /></div>
        ) : companies.length === 0 ? (
          <EmptyState icon="🏢" title="No companies yet" message="Add your first company above." />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {companies.map(c => {
              const cId = c.CompanyID || c.id;
              const cName = c.CompanyName || c.name;
              return (
                <div key={cId} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--canvas)' }}>
                  {editId === cId ? (
                    <form onSubmit={handleRename} style={{ display: 'flex', gap: '8px', flex: 1 }}>
                      <Input
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        required
                        autoFocus
                        style={{ flex: 1 }}
                      />
                      <Btn type="submit" size="sm" variant="teal" loading={saving}>Save</Btn>
                      <Btn type="button" size="sm" variant="outline" onClick={() => { setEditId(null); setEditName(''); }}>Cancel</Btn>
                    </form>
                  ) : (
                    <>
                      <span style={{ flex: 1, fontWeight: 500 }}>{cName}</span>
                      <ActionMenu items={[
                        { label: 'Rename', onClick: () => { setEditId(cId); setEditName(cName); setActionError(null); } },
                        { label: 'Delete', onClick: () => { setDeleteId(cId); setActionError(null); }, danger: true },
                      ]} />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Company">
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>Are you sure? This will fail if the company has employees assigned to it.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setDeleteId(null)}>Cancel</Btn>
          <Btn variant="danger" loading={deleting} onClick={handleDelete}>Delete</Btn>
        </div>
      </Modal>
    </Layout>
  );
}

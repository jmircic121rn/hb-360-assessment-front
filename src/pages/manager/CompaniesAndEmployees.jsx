import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { Layout, ActionMenu, IcBuilding } from './managerUtils';
import {
  PageHeader, Card, Table, Spinner, Alert, Badge, EmptyState, Btn, Modal, Input, Select
} from '../../components/UI';

export function CompaniesAndEmployees() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Company CRUD
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteCompanyId, setDeleteCompanyId] = useState(null);
  const [deletingCompany, setDeletingCompany] = useState(false);

  // Employee CRUD
  const [deleteEmpId, setDeleteEmpId] = useState(null);
  const [deletingEmp, setDeletingEmp] = useState(false);

  // Selection & tab
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [activeTab, setActiveTab] = useState('employees');

  const [actionError, setActionError] = useState(null);

  // Profiles
  const [allProfiles, setAllProfiles] = useState([]);
  const [newProfileIds, setNewProfileIds] = useState([]);
  const [showAddProfile, setShowAddProfile] = useState(false);
  const [addingProfileId, setAddingProfileId] = useState('');
  const [profileActionLoading, setProfileActionLoading] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([
      api.manager.getCompanies().catch(() => []),
      api.manager.getEmployees().catch(() => []),
      api.manager.getCampaigns().catch(() => []),
      api.manager.getProfiles().catch(() => []),
    ]).then(([comps, emps, camps, profs]) => {
      setCompanies(Array.isArray(comps) ? comps : []);
      setEmployees(Array.isArray(emps) ? emps : []);
      setCampaigns(Array.isArray(camps) ? camps : []);
      setAllProfiles(Array.isArray(profs) ? profs : []);
    }).catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  const fmtDeadline = c => {
    const d = c.Deadline || c.deadline;
    if (!d) return <span style={{ color: 'var(--ink-faint)' }}>—</span>;
    const date = new Date(d);
    return isNaN(date) ? <span style={{ color: 'var(--ink-faint)' }}>—</span> : date.toLocaleDateString();
  };

  async function handleCreateCompany(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true); setActionError(null);
    try {
      await api.manager.createCompany({ companyName: newName.trim(), profileIds: newProfileIds });
      setNewName(''); setNewProfileIds([]); setShowAddCompany(false);
      load();
    } catch (err) { setActionError(err.message); }
    finally { setCreating(false); }
  }

  async function handleAddProfile() {
    if (!addingProfileId || !selectedCompanyId) return;
    const cId = selectedCompanyId;
    const currentIds = (selectedCompany?.profiles || []).map(p => p.id);
    if (currentIds.includes(Number(addingProfileId))) return;
    setProfileActionLoading(true); setActionError(null);
    try {
      await api.manager.updateCompany(cId, { companyName: selectedCompany.CompanyName || selectedCompany.name, profileIds: [...currentIds, Number(addingProfileId)] });
      setAddingProfileId(''); setShowAddProfile(false);
      load();
    } catch (err) { setActionError(err.message); }
    finally { setProfileActionLoading(false); }
  }

  async function handleRemoveProfile(profileId) {
    if (!selectedCompanyId) return;
    const cId = selectedCompanyId;
    const currentIds = (selectedCompany?.profiles || []).map(p => p.id).filter(id => id !== profileId);
    setProfileActionLoading(true); setActionError(null);
    try {
      await api.manager.updateCompany(cId, { companyName: selectedCompany.CompanyName || selectedCompany.name, profileIds: currentIds });
      load();
    } catch (err) { setActionError(err.message); }
    finally { setProfileActionLoading(false); }
  }

  async function handleRenameCompany(e) {
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

  async function handleDeleteCompany() {
    setDeletingCompany(true); setActionError(null);
    try {
      await api.manager.deleteCompany(deleteCompanyId);
      if (String(selectedCompanyId) === String(deleteCompanyId)) setSelectedCompanyId(null);
      setDeleteCompanyId(null);
      load();
    } catch (err) { setActionError(err.message); setDeleteCompanyId(null); }
    finally { setDeletingCompany(false); }
  }

  async function handleDeleteEmployee() {
    setDeletingEmp(true);
    try {
      await api.manager.deleteEmployee(deleteEmpId);
      setDeleteEmpId(null);
      load();
    } catch (err) { setActionError(err.message); }
    finally { setDeletingEmp(false); }
  }

  const empsByCompany = employees.reduce((acc, e) => {
    const key = String(e.CompanyID || '__none__');
    if (!acc[key]) acc[key] = [];
    acc[key].push(e);
    return acc;
  }, {});

  const campsByCompany = campaigns.reduce((acc, c) => {
    const key = String(c.CompanyID || '__none__');
    if (!acc[key]) acc[key] = [];
    acc[key].push(c);
    return acc;
  }, {});

  const selectedCompany = selectedCompanyId
    ? companies.find(c => String(c.CompanyID || c.id) === String(selectedCompanyId))
    : null;
  const selEmps = selectedCompanyId ? (empsByCompany[String(selectedCompanyId)] || []) : [];
  const selCamps = selectedCompanyId ? (campsByCompany[String(selectedCompanyId)] || []) : [];

  return (
    <Layout>
      <PageHeader
        title="My Companies"
        subtitle="Manage your companies and their team members"
      />

      {error && <div style={{ marginBottom: '16px' }}><Alert type="error">{error}</Alert></div>}
      {actionError && <div style={{ marginBottom: '16px' }}><Alert type="error">{actionError}</Alert></div>}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner size={28} /></div>
      ) : (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>

          {/* ── Left panel ── */}
          <div style={{ width: 272, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Card style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
                  Companies{companies.length > 0 ? ` (${companies.length})` : ''}
                </p>
                <button
                  onClick={() => setShowAddCompany(v => !v)}
                  style={{
                    fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', padding: '2px 4px',
                  }}
                >
                  {showAddCompany ? 'Cancel' : '+ Add'}
                </button>
              </div>

              {showAddCompany && (
                <form onSubmit={handleCreateCompany} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Company name…" required autoFocus />
                  {allProfiles.length > 0 && (
                    <div>
                      <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-faint)', marginBottom: '5px' }}>Profiles</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {allProfiles.map(p => {
                          const pid = p.id || p.ProfilID;
                          const checked = newProfileIds.includes(pid);
                          return (
                            <label key={pid} style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
                              <input type="checkbox" checked={checked} onChange={() => setNewProfileIds(prev => checked ? prev.filter(x => x !== pid) : [...prev, pid])} style={{ accentColor: 'var(--ink)' }} />
                              {p.name || p.Name}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <Btn type="submit" size="sm" variant="teal" loading={creating}>Add Company</Btn>
                </form>
              )}

              {companies.length === 0 ? (
                <p style={{ color: 'var(--ink-faint)', fontSize: '0.83rem', padding: '8px 0' }}>No companies yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  {companies.map(c => {
                    const cId = String(c.CompanyID || c.id);
                    const cName = c.CompanyName || c.name;
                    const empCount = (empsByCompany[cId] || []).length;
                    const active = String(selectedCompanyId) === cId;
                    return (
                      <button key={cId} onClick={() => { setSelectedCompanyId(cId); setEditId(null); setActiveTab('employees'); }} style={{
                        padding: '9px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                        background: active ? 'rgba(0,0,0,0.06)' : 'transparent',
                        textAlign: 'left', fontFamily: 'var(--font-body)', transition: 'background 0.15s',
                      }}>
                        <div style={{ fontWeight: active ? 600 : 400, fontSize: '0.87rem', color: 'var(--ink)' }}>{cName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--ink-faint)', marginTop: '1px' }}>
                          {empCount} employee{empCount !== 1 ? 's' : ''}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          {/* ── Right panel ── */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {!selectedCompany ? (
              <Card style={{ padding: '64px 32px', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--canvas-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: 'var(--ink-faint)' }}>
                  <IcBuilding />
                </div>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>Select a company to view details.</p>
              </Card>
            ) : (
              <>
                {/* Company header card */}
                <Card style={{ padding: '24px 28px' }}>
                  {editId === String(selectedCompany.CompanyID || selectedCompany.id) ? (
                    <form onSubmit={handleRenameCompany} style={{ display: 'flex', gap: '8px' }}>
                      <Input value={editName} onChange={e => setEditName(e.target.value)} required autoFocus style={{ flex: 1 }} />
                      <Btn type="submit" size="sm" variant="teal" loading={saving}>Save</Btn>
                      <Btn type="button" size="sm" variant="outline" onClick={() => { setEditId(null); setEditName(''); }}>Cancel</Btn>
                    </form>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: 52, height: 52, borderRadius: '50%',
                          background: 'var(--canvas-warm)', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', flexShrink: 0, color: 'var(--ink-soft)',
                        }}>
                          <IcBuilding />
                        </div>
                        <div>
                          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)' }}>
                            {selectedCompany.CompanyName || selectedCompany.name}
                          </h2>
                          {/* Profiles */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px', alignItems: 'center' }}>
                            {(selectedCompany.profiles || []).map(p => (
                              <span key={p.id} style={{
                                display: 'inline-flex', alignItems: 'center', gap: '5px',
                                fontSize: '0.75rem', fontWeight: 500, padding: '3px 10px 3px 10px',
                                borderRadius: '999px', background: 'var(--canvas-warm)',
                                color: 'var(--ink-soft)', border: '1px solid rgba(0,0,0,0.06)',
                              }}>
                                {p.name}
                                <button
                                  disabled={profileActionLoading}
                                  onClick={() => handleRemoveProfile(p.id)}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', lineHeight: 1, color: 'var(--ink-faint)', display: 'flex', alignItems: 'center' }}
                                  title="Remove profile"
                                >
                                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                                </button>
                              </span>
                            ))}
                            {(() => {
                              const assigned = (selectedCompany.profiles || []).map(p => p.id);
                              const available = allProfiles.filter(p => !assigned.includes(p.id || p.ProfilID));
                              if (available.length === 0) return null;
                              return showAddProfile ? (
                                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                  <Select
                                    value={addingProfileId}
                                    onChange={e => setAddingProfileId(e.target.value)}
                                    style={{ fontSize: '0.78rem', padding: '3px 8px', height: 'auto' }}
                                  >
                                    <option value="">— choose —</option>
                                    {available.map(p => <option key={p.id || p.ProfilID} value={p.id || p.ProfilID}>{p.name || p.Name}</option>)}
                                  </Select>
                                  <Btn size="sm" variant="teal" loading={profileActionLoading} onClick={handleAddProfile}>Add</Btn>
                                  <Btn size="sm" variant="outline" onClick={() => { setShowAddProfile(false); setAddingProfileId(''); }}>✕</Btn>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setShowAddProfile(true)}
                                  style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', background: 'none', border: '1px dashed rgba(0,0,0,0.15)', borderRadius: '999px', padding: '3px 10px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                                >
                                  + Add Profile
                                </button>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        <Btn size="sm" variant="secondary" onClick={() => {
                          const cId = String(selectedCompany.CompanyID || selectedCompany.id);
                          setEditId(cId);
                          setEditName(selectedCompany.CompanyName || selectedCompany.name);
                          setActionError(null);
                        }}>Rename</Btn>
                        <Btn size="sm" variant="danger" onClick={() => {
                          setDeleteCompanyId(selectedCompany.CompanyID || selectedCompany.id);
                          setActionError(null);
                        }}>Delete</Btn>
                      </div>
                    </div>
                  )}

                  {/* Stats / tab switcher */}
                  <div style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '18px', borderTop: '1px solid var(--canvas-warm)' }}>
                    {[
                      { key: 'employees', label: 'Employees', value: selEmps.length },
                      { key: 'campaigns', label: 'Campaigns', value: selCamps.length },
                    ].map(({ key, label, value }) => {
                      const active = activeTab === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setActiveTab(key)}
                          style={{
                            flex: 1, textAlign: 'center', padding: '10px 8px', borderRadius: '10px',
                            border: 'none', cursor: 'pointer',
                            background: active ? 'var(--ink)' : 'var(--canvas)',
                            transition: 'all 0.15s',
                          }}
                        >
                          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: active ? '#fff' : 'var(--ink)', lineHeight: 1 }}>{value}</div>
                          <div style={{ fontSize: '0.71rem', color: active ? 'rgba(255,255,255,0.7)' : 'var(--ink-faint)', marginTop: '4px', letterSpacing: '0.02em' }}>{label}</div>
                        </button>
                      );
                    })}
                  </div>
                </Card>

                {/* Tab content card */}
                <Card style={{ padding: 0 }}>
                  <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--canvas-warm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)' }}>
                      {activeTab === 'employees' ? 'Employees' : 'Campaigns'}
                    </h3>
                    {activeTab === 'employees' ? (
                      <Btn size="sm" variant="teal" onClick={() => navigate('/manager/employees/new', { state: { from: '/manager/companies', companyId: String(selectedCompanyId) } })}>+ Add Employee</Btn>
                    ) : (
                      <Link to="/manager/campaigns/new" state={{ companyId: String(selectedCompanyId), from: '/manager/companies' }}><Btn size="sm" variant="teal">+ New Campaign</Btn></Link>
                    )}
                  </div>

                  {activeTab === 'employees' && (
                    selEmps.length === 0 ? (
                      <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: '0.88rem' }}>No employees in this company yet.</div>
                    ) : (
                      <Table
                        headers={['Name', 'Email', 'Job Title', 'Language', 'Actions']}
                        rows={selEmps.map(e => [
                          <strong>{e.FirstName} {e.LastName}</strong>,
                          <span style={{ color: 'var(--ink-soft)', fontSize: '0.85rem' }}>{e.Email}</span>,
                          e.JobTitle || '—',
                          <Badge status="default">{e.Lang?.toUpperCase() || 'EN'}</Badge>,
                          <ActionMenu items={[
                            { label: 'Edit', onClick: () => navigate(`/manager/employees/${e.EmployeeID}/edit`, { state: { from: '/manager/companies' } }) },
                            { label: 'Delete', onClick: () => setDeleteEmpId(e.EmployeeID), danger: true },
                          ]} />,
                        ])}
                      />
                    )
                  )}

                  {activeTab === 'campaigns' && (
                    selCamps.length === 0 ? (
                      <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: '0.88rem' }}>No campaigns for this company yet.</div>
                    ) : (
                      <Table
                        headers={['Campaign', 'Employee', 'Status', 'Progress', 'Deadline', 'Actions']}
                        rows={selCamps.map(camp => [
                          <strong>{camp.Name}</strong>,
                          `${camp.FirstName || ''} ${camp.LastName || ''}`.trim() || '—',
                          <Badge status={camp.Status === 'in_progress' ? 'active' : camp.Status}>{camp.Status}</Badge>,
                          `${camp.CompletedLinks}/${camp.TotalLinks}`,
                          fmtDeadline(camp),
                          <ActionMenu items={[
                            { label: 'View', href: `/manager/campaigns/${camp.CycleID}` },
                          ]} />,
                        ])}
                      />
                    )
                  )}
                </Card>
              </>
            )}
          </div>
        </div>
      )}

      <Modal open={!!deleteCompanyId} onClose={() => setDeleteCompanyId(null)} title="Delete Company">
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>Are you sure? This will fail if the company has employees assigned to it.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setDeleteCompanyId(null)}>Cancel</Btn>
          <Btn variant="danger" loading={deletingCompany} onClick={handleDeleteCompany}>Delete</Btn>
        </div>
      </Modal>

      <Modal open={!!deleteEmpId} onClose={() => setDeleteEmpId(null)} title="Delete Employee">
        <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>Are you sure you want to delete this employee? This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Btn variant="outline" onClick={() => setDeleteEmpId(null)}>Cancel</Btn>
          <Btn variant="danger" loading={deletingEmp} onClick={handleDeleteEmployee}>Delete</Btn>
        </div>
      </Modal>
    </Layout>
  );
}

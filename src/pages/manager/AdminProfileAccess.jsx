import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Layout, NAV } from './managerUtils';
import { PortalLayout } from '../../components/Layout';
import {
  PageHeader, Card, Table, Btn, Alert, Spinner, Modal, Badge
} from '../../components/UI';

export function AdminProfileAccess() {
  const [admins, setAdmins] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [saved, setSaved] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      api.manager.getAdminProfiles(),
      api.manager.getProfiles(),
    ])
      .then(([adminList, profiles]) => {
        setAdmins(Array.isArray(adminList) ? adminList : []);
        setAllProfiles(Array.isArray(profiles) ? profiles : []);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(admin) {
    setSaving(prev => ({ ...prev, [admin.managerId]: true }));
    setSaved(prev => ({ ...prev, [admin.managerId]: false }));
    try {
      await api.manager.updateAdminProfiles(admin.managerId, { profileIds: admin.profileIds });
      setSaved(prev => ({ ...prev, [admin.managerId]: true }));
      setTimeout(() => setSaved(prev => ({ ...prev, [admin.managerId]: false })), 2000);
    } catch (e) {
      alert(`Failed to save: ${e.message}`);
    } finally {
      setSaving(prev => ({ ...prev, [admin.managerId]: false }));
    }
  }

  function toggleProfile(managerId, profileId) {
    setAdmins(prev => prev.map(a => {
      if (a.managerId !== managerId) return a;
      const has = a.profileIds.includes(profileId);
      return { ...a, profileIds: has ? a.profileIds.filter(id => id !== profileId) : [...a.profileIds, profileId] };
    }));
    setSaved(prev => ({ ...prev, [managerId]: false }));
  }

  return (
    <PortalLayout role="admin" navItems={NAV}>
      <PageHeader title="Profile Access" subtitle="Manage which profiles each administrator can see and use." />
      {error && <Alert type="error" style={{ marginBottom: 20 }}>{error}</Alert>}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}><Spinner /></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: 800 }}>
          {admins.length === 0 && (
            <Card style={{ padding: '48px 32px', textAlign: 'center' }}>
              <p style={{ color: 'var(--ink-soft)' }}>No administrators found.</p>
            </Card>
          )}
          {admins.map(admin => (
            <Card key={admin.managerId} style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '2px' }}>{admin.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--ink-faint)' }}>{admin.username}</div>
                </div>
                <Btn
                  size="sm"
                  variant={saved[admin.managerId] ? 'outline' : 'primary'}
                  onClick={() => handleSave(admin)}
                  disabled={saving[admin.managerId]}
                >
                  {saving[admin.managerId] ? 'Saving…' : saved[admin.managerId] ? '✓ Saved' : 'Save'}
                </Btn>
              </div>
              <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allProfiles.map(p => {
                  const pid = p.id || p.ProfilID;
                  const checked = admin.profileIds.includes(pid);
                  return (
                    <label key={pid} style={{
                      display: 'flex', alignItems: 'center', gap: '7px',
                      padding: '7px 13px', borderRadius: '6px', cursor: 'pointer',
                      fontSize: '0.83rem', fontWeight: 500,
                      border: `1.5px solid ${checked ? 'var(--ink)' : '#e0e0e0'}`,
                      background: checked ? 'var(--canvas-warm)' : '#fff',
                      transition: 'all 0.15s',
                    }}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleProfile(admin.managerId, pid)}
                        style={{ accentColor: 'var(--ink)' }}
                      />
                      {p.name || p.Name || p.profileType}
                    </label>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
    </PortalLayout>
  );
}

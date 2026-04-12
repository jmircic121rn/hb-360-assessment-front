import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { api } from '../../utils/api';
import { Layout, JOB_TITLES } from './managerUtils';
import {
  Btn, Card, Alert, PageHeader, FormField, Input, Select, Spinner, Modal
} from '../../components/UI';

export function EmployeeForm({ editMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const returnTo = location.state?.from || '/manager/people';
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    jobTitle: '', jobTitleCustom: '',
    lang: 'en',
    managerId: '',
    companyId: location.state?.companyId || '',
  });
  const [managerList, setManagerList] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddManager, setShowAddManager] = useState(false);
  const [addManagerForm, setAddManagerForm] = useState({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '' });
  const [addManagerLoading, setAddManagerLoading] = useState(false);
  const [addManagerError, setAddManagerError] = useState(null);

  // Initial load: companies + employee data for edit mode
  useEffect(() => {
    Promise.all([
      api.manager.getEmployees(),
      api.manager.getCompanies().catch(() => []),
    ]).then(([list, comps]) => {
      setCompanies(Array.isArray(comps) ? comps : []);
      if (editMode && id) {
        const emp = list.find(e => String(e.EmployeeID) === id);
        if (emp) {
          const knownTitle = JOB_TITLES.slice(0, -1).includes(emp.JobTitle);
          const companyId = emp.CompanyID ? String(emp.CompanyID) : '';
          setForm({
            firstName: emp.FirstName, lastName: emp.LastName, email: emp.Email,
            jobTitle: knownTitle ? emp.JobTitle : (emp.JobTitle ? 'Other' : ''),
            jobTitleCustom: knownTitle ? '' : (emp.JobTitle || ''),
            lang: emp.Lang || 'en',
            managerId: emp.ManagerID ? String(emp.ManagerID) : '',
            companyId,
          });
          // Load managers scoped to this company
          const filtered = companyId ? list.filter(e => String(e.CompanyID) === companyId && String(e.EmployeeID) !== id) : list.filter(e => String(e.EmployeeID) !== id);
          setManagerList(filtered);
        }
      } else {
        setManagerList(list);
      }
    }).catch(() => {});
  }, [editMode, id]);

  // Re-fetch manager list when company changes
  useEffect(() => {
    if (!form.companyId) {
      setManagerList([]);
      setForm(f => ({ ...f, managerId: '' }));
      return;
    }
    api.manager.getEmployees(form.companyId)
      .then(list => {
        setManagerList(list.filter(e => String(e.EmployeeID) !== id));
        // Clear manager if no longer in list
        setForm(f => ({
          ...f,
          managerId: list.some(e => String(e.EmployeeID) === f.managerId) ? f.managerId : '',
        }));
      })
      .catch(() => {});
  }, [form.companyId, id]);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleAddManager(e) {
    e.preventDefault();
    setAddManagerLoading(true); setAddManagerError(null);
    try {
      const created = await api.manager.createEmployee({
        firstName: addManagerForm.firstName, lastName: addManagerForm.lastName,
        email: addManagerForm.email,
        jobTitle: addManagerForm.jobTitle || undefined,
        lang: addManagerForm.lang,
        companyId: addManagerForm.companyId ? Number(addManagerForm.companyId) : null,
      });
      const newId = String(created.employeeId || created.id || created.EmployeeID);
      const newEntry = {
        EmployeeID: newId,
        FirstName: addManagerForm.firstName,
        LastName: addManagerForm.lastName,
        Email: addManagerForm.email,
        JobTitle: addManagerForm.jobTitle,
        CompanyID: addManagerForm.companyId ? Number(addManagerForm.companyId) : null,
      };
      setManagerList(prev => [...prev, newEntry]);
      setForm(f => ({ ...f, managerId: newId }));
      setShowAddManager(false);
      setAddManagerForm({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '' });
    } catch (err) { setAddManagerError(err.message); }
    finally { setAddManagerLoading(false); }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const payload = {
        firstName: form.firstName, lastName: form.lastName, email: form.email,
        jobTitle: form.jobTitle === 'Other' ? form.jobTitleCustom : form.jobTitle,
        lang: form.lang,
        managerEmployeeId: form.managerId ? Number(form.managerId) : null,
        companyId: form.companyId ? Number(form.companyId) : null,
      };
      if (editMode) await api.manager.updateEmployee(id, payload);
      else await api.manager.createEmployee(payload);
      navigate(returnTo);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <Layout>
      <PageHeader title={editMode ? 'Edit Employee' : 'Add Employee'} subtitle={editMode ? 'Update employee information' : 'Add a new team member'} />
      <Card style={{ padding: '32px', maxWidth: 560 }}>
        {error && <div style={{ marginBottom: '20px' }}><Alert type="error">{error}</Alert></div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="grid-2col" style={{ gap: '16px' }}>
            <FormField label="First Name" required><Input value={form.firstName} onChange={set('firstName')} required /></FormField>
            <FormField label="Last Name" required><Input value={form.lastName} onChange={set('lastName')} required /></FormField>
          </div>
          <FormField label="Email" required><Input type="email" value={form.email} onChange={set('email')} required /></FormField>

          <FormField label="Company" required>
            <Select value={form.companyId} onChange={set('companyId')} required>
              <option value="">— Select company —</option>
              {companies.map(c => (
                <option key={c.CompanyID || c.id} value={c.CompanyID || c.id}>
                  {c.CompanyName || c.name}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Job Title">
            <Select value={form.jobTitle} onChange={set('jobTitle')}>
              <option value="">— Select job title —</option>
              {JOB_TITLES.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
            {form.jobTitle === 'Other' && (
              <Input style={{ marginTop: '8px' }} value={form.jobTitleCustom} onChange={set('jobTitleCustom')} placeholder="Enter job title..." />
            )}
          </FormField>

          <FormField label="Manager / Mentor" hint="Select the employee's direct manager or mentor (optional)">
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <Select value={form.managerId} onChange={set('managerId')} style={{ flex: 1 }} disabled={!form.companyId}>
                <option value="">{form.companyId ? '— No manager —' : '— Select company first —'}</option>
                {managerList.map(e => (
                  <option key={e.EmployeeID} value={e.EmployeeID}>
                    {e.FirstName} {e.LastName}
                  </option>
                ))}
              </Select>
              <Btn type="button" variant="outline" size="sm" onClick={() => setShowAddManager(true)} style={{ whiteSpace: 'nowrap', flexShrink: 0 }} disabled={!form.companyId}>+ Add New</Btn>
            </div>
          </FormField>

          <FormField label="Language" required>
            <Select value={form.lang} onChange={set('lang')}>
              <option value="en">English</option>
              <option value="sr">Serbian</option>
            </Select>
          </FormField>

          <div style={{ display: 'flex', gap: '10px', paddingTop: '8px' }}>
            <Btn type="submit" variant="teal" loading={loading}>{editMode ? 'Save Changes' : 'Add Employee'}</Btn>
            <Btn variant="outline" type="button" onClick={() => navigate(returnTo)}>Cancel</Btn>
          </div>
        </form>
      </Card>

      <Modal open={showAddManager} onClose={() => { setShowAddManager(false); setAddManagerError(null); }} title="Add New Manager">
        {addManagerError && <div style={{ marginBottom: '16px' }}><Alert type="error">{addManagerError}</Alert></div>}
        <form onSubmit={handleAddManager} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="grid-2col" style={{ gap: '12px' }}>
            <FormField label="First Name" required>
              <Input value={addManagerForm.firstName} onChange={e => setAddManagerForm(f => ({ ...f, firstName: e.target.value }))} required autoFocus />
            </FormField>
            <FormField label="Last Name" required>
              <Input value={addManagerForm.lastName} onChange={e => setAddManagerForm(f => ({ ...f, lastName: e.target.value }))} required />
            </FormField>
          </div>
          <FormField label="Email" required>
            <Input type="email" value={addManagerForm.email} onChange={e => setAddManagerForm(f => ({ ...f, email: e.target.value }))} required />
          </FormField>
          {companies.length > 0 && (
            <FormField label="Company">
              <Select value={addManagerForm.companyId} onChange={e => setAddManagerForm(f => ({ ...f, companyId: e.target.value }))}>
                <option value="">— Select company —</option>
                {companies.map(c => <option key={c.CompanyID || c.id} value={c.CompanyID || c.id}>{c.CompanyName || c.name}</option>)}
              </Select>
            </FormField>
          )}
          <div className="grid-2col" style={{ gap: '12px' }}>
            <FormField label="Job Title">
              <Select value={addManagerForm.jobTitle} onChange={e => setAddManagerForm(f => ({ ...f, jobTitle: e.target.value }))}>
                <option value="">— Select —</option>
                {JOB_TITLES.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
            </FormField>
            <FormField label="Language">
              <Select value={addManagerForm.lang} onChange={e => setAddManagerForm(f => ({ ...f, lang: e.target.value }))}>
                <option value="en">English</option>
                <option value="sr">Serbian</option>
              </Select>
            </FormField>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '4px' }}>
            <Btn variant="outline" type="button" onClick={() => { setShowAddManager(false); setAddManagerError(null); }}>Cancel</Btn>
            <Btn type="submit" variant="teal" loading={addManagerLoading}>Add & Select</Btn>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}

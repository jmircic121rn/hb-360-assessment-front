import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { JOB_TITLES } from './managerUtils';
import {
  Btn, Card, Modal, FormField, Input, Select, Alert, Spinner, Badge
} from '../../components/UI';

export const CampaignForm = React.forwardRef(function CampaignForm({ initialData, onSubmit, submitLoading, submitError, lockMode, initialCompanyId, returnTo, onSaveDraft, saveDraftLoading }, ref) {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [mode, setMode] = useState(initialData?.mode || 'individual');
  const [form, setForm] = useState({
    name: '', employeeId: '', employeeIds: [], profilId: '', lang: '',
    includeSelf: false, includeManager: false, includePeer: false,
    includeDirectReports: false, includeExternal: false,
    includeClient: false, includeInternalSupport: false,
    includeBusinessPartner: false, includeTrainingParticipant: false,
    includeCrossPartisan: false, includeMentor: false,
    selfFormat: 'standard_40',
    managerFormat: 'standard_40',
    peerEmployeeIds: [],
    peerNewPersons: [],
    drEmployeeIds: [],
    drNewPersons: [],
    deadline: '',
    ...initialData,
  });
  const [showAddEmp, setShowAddEmp] = useState(false);
  const [showAddPeer, setShowAddPeer] = useState(false);
  const [showAddDr, setShowAddDr] = useState(false);
  const [addEmpForm, setAddEmpForm] = useState({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '', managerId: '' });
  const [filterEmpCompany, setFilterEmpCompany] = useState(initialCompanyId || '');
  const [addEmpLoading, setAddEmpLoading] = useState(false);
  const [addEmpError, setAddEmpError] = useState(null);
  const [showAddEmpManager, setShowAddEmpManager] = useState(false);
  const [addEmpManagerForm, setAddEmpManagerForm] = useState({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '' });
  const [addEmpManagerLoading, setAddEmpManagerLoading] = useState(false);
  const [addEmpManagerError, setAddEmpManagerError] = useState(null);
  // Odvojene liste za peer i DR pickere, učitane iz relationships tabele
  const [peerEmployees, setPeerEmployees] = useState([]);
  const [drEmployees, setDrEmployees] = useState([]);
  const [loadingRelationships, setLoadingRelationships] = useState(false);
  const [groupStyle, setGroupStyle] = useState('same');
  const EMPTY_SUBGROUP = { employeeIds: [], profilId: '', includeSelf: false, includeManager: false, includePeer: false, includeDirectReports: false, includeExternal: false, includeClient: false, includeInternalSupport: false, includeBusinessPartner: false, includeTrainingParticipant: false, includeCrossPartisan: false, includeMentor: false };
  const [subgroups, setSubgroups] = useState([{ ...EMPTY_SUBGROUP }]);
  const [cycleConfig, setCycleConfig] = useState(null);
  const [cycleConfigLoading, setCycleConfigLoading] = useState(false);
  const cycleConfigCacheRef = useRef({});
  const [sgTypeIntersections, setSgTypeIntersections] = useState([]);
  const [sgBlockReasons, setSgBlockReasons] = useState([]); // per subgroup: { [key]: blockMessage }
  const [groupSameIntersection, setGroupSameIntersection] = useState(null);
  const [groupSameBlockReasons, setGroupSameBlockReasons] = useState({}); // { [key]: blockMessage }
  const [selfFormats, setSelfFormats] = useState([]);
  const [selfFormatsLoading, setSelfFormatsLoading] = useState(false);
  const [managerFormats, setManagerFormats] = useState([]);
  const [managerFormatsLoading, setManagerFormatsLoading] = useState(false);
  const [expandedFormatSection, setExpandedFormatSection] = useState(null); // 'self' | 'manager' | null

  useEffect(() => {
    api.manager.getEmployees().then(setEmployees).catch(() => {});
    api.manager.getProfiles().then(setProfiles).catch(() => {});
    api.manager.getCompanies().then(r => setCompanies(Array.isArray(r) ? r : [])).catch(() => {});
    if (!lockMode) {
      // Fetch both campaigns and drafts so the auto-generated name number
      // doesn't collide with existing campaigns or saved drafts.
      Promise.all([
        api.manager.getCampaigns().catch(() => []),
        api.manager.getDrafts().catch(() => []),
      ]).then(([campaigns, drafts]) => {
        // Collect all numbers already used in "HB Compass Campaign N" names
        const usedNums = new Set();
        const nameRe = /^HB Compass Campaign\s+(\d+)$/i;
        for (const c of (campaigns || [])) {
          const m = (c.name || c.Name || '').match(nameRe);
          if (m) usedNums.add(Number(m[1]));
        }
        for (const d of (drafts || [])) {
          const m = (d.name || '').match(nameRe);
          if (m) usedNums.add(Number(m[1]));
        }
        // Pick the first unused number starting from total+1, or at least 1
        let nextNum = Math.max((campaigns?.length || 0) + (drafts?.length || 0), 1);
        while (usedNums.has(nextNum)) nextNum++;
        setForm(f => ({ ...f, name: f.name || `HB Compass Campaign ${nextNum}` }));
      });
    }
  }, []);

  // Expose form data to parent (for draft save/load)
  React.useImperativeHandle(ref, () => ({
    getFormData: () => ({ form, mode, groupStyle, subgroups, filterEmpCompany }),
    setFormData: (data) => {
      if (data.form) setForm(f => ({ ...f, ...data.form }));
      if (data.mode) setMode(data.mode);
      if (data.groupStyle) setGroupStyle(data.groupStyle);
      if (data.subgroups) setSubgroups(data.subgroups);
      if (data.filterEmpCompany) setFilterEmpCompany(data.filterEmpCompany);
    },
  }));

  const selectedProfile = profiles.find(p => String(p.id || p.ProfilID) === String(form.profilId));

  // Map form keys → API questionType strings
  const Q_TYPE_MAP = {
    includeSelf: 'self',
    includeManager: 'manager',
    includePeer: 'peer',
    includeDirectReports: 'direct_report',
    includeExternal: 'external',
    includeClient: 'client',
    includeInternalSupport: 'internalsupport',
    includeBusinessPartner: 'business_partner',
    includeTrainingParticipant: 'training_participant',
    includeCrossPartisan: 'crosspartisan',
    includeMentor: 'mentor',
  };
const normalizeCycleTypes = (types) => (types || []).map(t => ({ ...t, key: t.key }));

  // Which types are available for the selected profile (from DB)
  const profileQTypes = selectedProfile?.questionTypes || null;
  const isTypeAvailable = key => {
    // Profile-level check
    if (profileQTypes && !profileQTypes.some(t => t === Q_TYPE_MAP[key] || t === Q_TYPE_MAP[key]?.replace('_', ''))) return false;
    // Employee intersection check for "same for all" group mode
    if (mode === 'group' && groupStyle === 'same' && groupSameIntersection) return groupSameIntersection.has(key);
    return true;
  };
  // Backwards-compat: if profile name says employee, treat as self-only
  const isEmployeeProfile = profileQTypes
    ? profileQTypes.length === 1 && profileQTypes[0] === 'self'
    : (selectedProfile?.name || selectedProfile?.Name || '').toLowerCase().includes('employee');

  // When profile changes, clear assessment types that are no longer available
  useEffect(() => {
    if (!form.profilId) return;
    setForm(f => ({
      ...f,
      includeSelf: f.includeSelf && isTypeAvailable('includeSelf'),
      includeManager: f.includeManager && isTypeAvailable('includeManager'),
      includePeer: f.includePeer && isTypeAvailable('includePeer'),
      includeDirectReports: f.includeDirectReports && isTypeAvailable('includeDirectReports'),
      includeExternal: f.includeExternal && isTypeAvailable('includeExternal'),
      includeCrossPartisan: f.includeCrossPartisan && isTypeAvailable('includeCrossPartisan'),
      includeMentor: f.includeMentor && isTypeAvailable('includeMentor'),
    }));
    if (isEmployeeProfile) {
      setForm(f => ({ ...f, includeSelf: true, includeManager: false, includePeer: false, includeDirectReports: false, includeExternal: false, includeCrossPartisan: false, includeMentor: false }));
    }
  }, [form.profilId]); // eslint-disable-line

  // Fetch available self-assessment formats when profile is selected
  useEffect(() => {
    if (!form.profilId) {
      setSelfFormats([]);
      return;
    }
    setSelfFormatsLoading(true);
    api.manager.getSelfFormats(form.profilId)
      .then(formats => {
        setSelfFormats(formats || []);
        if (formats?.length && !formats.find(f => f.formatKey === form.selfFormat)) {
          setForm(f => ({ ...f, selfFormat: formats[0].formatKey }));
        }
      })
      .catch(() => setSelfFormats([]))
      .finally(() => setSelfFormatsLoading(false));
  }, [form.profilId]); // eslint-disable-line

  // Fetch available manager-assessment formats when profile is selected
  useEffect(() => {
    if (!form.profilId) {
      setManagerFormats([]);
      return;
    }
    setManagerFormatsLoading(true);
    api.manager.getManagerFormats(form.profilId)
      .then(formats => {
        setManagerFormats(formats || []);
        if (formats?.length && !formats.find(f => f.formatKey === form.managerFormat)) {
          setForm(f => ({ ...f, managerFormat: formats[0].formatKey }));
        }
      })
      .catch(() => setManagerFormats([]))
      .finally(() => setManagerFormatsLoading(false));
  }, [form.profilId]); // eslint-disable-line

  // Fetch cycle config when employee + profile selected (individual mode)
  useEffect(() => {
    if (!form.employeeId || !form.profilId || mode !== 'individual') {
      setCycleConfig(null);
      return;
    }
    setCycleConfigLoading(true);
    api.manager.getCycleConfig(form.employeeId, form.profilId)
      .then(cfg => {
        const normalized = { ...cfg, assessmentTypes: normalizeCycleTypes(cfg.assessmentTypes) };
        setCycleConfig(normalized);
        // Uncheck any types that are blocked for this employee
        setForm(f => {
          const updated = { ...f };
          (normalized.assessmentTypes || []).forEach(t => {
            if (t.blocked) updated[t.key] = false;
          });
          return updated;
        });
      })
      .catch(() => setCycleConfig(null))
      .finally(() => setCycleConfigLoading(false));
  }, [form.employeeId, form.profilId, mode]); // eslint-disable-line

  // For custom subgroups: fetch getCycleConfig per employee+profile, compute intersection of available types
  const sgSignature = subgroups.map(sg => `${sg.profilId}:${[...sg.employeeIds].sort().join(',')}`).join('|');
  useEffect(() => {
    if (mode !== 'group' || groupStyle !== 'custom') return;
    subgroups.forEach((sg, si) => {
      if (!sg.profilId || sg.employeeIds.length === 0) {
        setSgTypeIntersections(prev => { const next = [...prev]; next[si] = null; return next; });
        return;
      }
      const fetchOne = (empId) => {
        const cacheKey = `${empId}-${sg.profilId}`;
        if (cycleConfigCacheRef.current[cacheKey]) return Promise.resolve(cycleConfigCacheRef.current[cacheKey]);
        return api.manager.getCycleConfig(empId, sg.profilId)
          .then(cfg => {
            const normalized = normalizeCycleTypes(cfg.assessmentTypes || []);
            cycleConfigCacheRef.current[cacheKey] = normalized;
            return normalized;
          }).catch(() => null);
      };
      Promise.all(sg.employeeIds.map(fetchOne)).then(results => {
        const valid = results.filter(Boolean);
        if (valid.length === 0) {
          setSgTypeIntersections(prev => { const next = [...prev]; next[si] = null; return next; });
          setSgBlockReasons(prev => { const next = [...prev]; next[si] = {}; return next; });
          return;
        }
        const availSet = new Set();
        const blockReasons = {};
        for (const typeObj of valid[0]) {
          const key = typeObj.key;
          if (typeObj.blocked) {
            blockReasons[key] = typeObj.blockMessage || 'Not available for this employee';
            continue;
          }
          const allAvail = valid.every(r => { const found = r.find(rt => rt.key === key); return found && !found.blocked; });
          if (allAvail) availSet.add(key);
          else blockReasons[key] = 'Not available for all employees in this subgroup';
        }
        setSgTypeIntersections(prev => { const next = [...prev]; next[si] = availSet; return next; });
        setSgBlockReasons(prev => { const next = [...prev]; next[si] = blockReasons; return next; });
        // Uncheck any types that fell out of the intersection
        setSubgroups(prev => prev.map((g, i) => {
          if (i !== si) return g;
          return {
            ...g,
            includeSelf: g.includeSelf && availSet.has('includeSelf'),
            includeManager: g.includeManager && availSet.has('includeManager'),
            includePeer: g.includePeer && availSet.has('includePeer'),
            includeDirectReports: g.includeDirectReports && availSet.has('includeDirectReports'),
            includeExternal: g.includeExternal && availSet.has('includeExternal'),
            includeCrossPartisan: g.includeCrossPartisan && availSet.has('includeCrossPartisan'),
            includeMentor: g.includeMentor && availSet.has('includeMentor'),
          };
        }));
      });
    });
  }, [sgSignature, mode, groupStyle]); // eslint-disable-line

  // For "same for all" group mode: compute intersection of available types across all selected employees
  const groupSameSignature = `${form.profilId}:${[...form.employeeIds].sort().join(',')}`;
  useEffect(() => {
    if (mode !== 'group' || groupStyle !== 'same' || !form.profilId || form.employeeIds.length === 0) {
      setGroupSameIntersection(null);
      return;
    }
    const fetchOne = (empId) => {
      const cacheKey = `${empId}-${form.profilId}`;
      if (cycleConfigCacheRef.current[cacheKey]) return Promise.resolve(cycleConfigCacheRef.current[cacheKey]);
      return api.manager.getCycleConfig(empId, form.profilId)
        .then(cfg => {
          const normalized = normalizeCycleTypes(cfg.assessmentTypes || []);
          cycleConfigCacheRef.current[cacheKey] = normalized;
          return normalized;
        }).catch(() => null);
    };
    Promise.all(form.employeeIds.map(fetchOne)).then(results => {
      const valid = results.filter(Boolean);
      if (valid.length === 0) { setGroupSameIntersection(null); setGroupSameBlockReasons({}); return; }
      const availSet = new Set();
      const blockReasons = {};
      for (const typeObj of valid[0]) {
        const key = typeObj.key;
        if (typeObj.blocked) {
          // Blocked by backend for this employee — use backend's reason
          blockReasons[key] = typeObj.blockMessage || 'Not available for this employee';
          continue;
        }
        const allAvail = valid.every(r => { const found = r.find(rt => rt.key === key); return found && !found.blocked; });
        if (allAvail) {
          availSet.add(key);
        } else {
          blockReasons[key] = 'Not available for all selected employees';
        }
      }
      setGroupSameIntersection(availSet);
      setGroupSameBlockReasons(blockReasons);
      setForm(f => ({
        ...f,
        includeSelf: f.includeSelf && availSet.has('includeSelf'),
        includeManager: f.includeManager && availSet.has('includeManager'),
        includePeer: f.includePeer && availSet.has('includePeer'),
        includeDirectReports: f.includeDirectReports && availSet.has('includeDirectReports'),
        includeExternal: f.includeExternal && availSet.has('includeExternal'),
        includeCrossPartisan: f.includeCrossPartisan && availSet.has('includeCrossPartisan'),
        includeMentor: f.includeMentor && availSet.has('includeMentor'),
      }));
    });
  }, [groupSameSignature, mode, groupStyle]); // eslint-disable-line

  // Kada se promeni subject employee, učitaj njegove peers i DR iz baze
  useEffect(() => {
    const empId = form.employeeId;
    if (!empId || mode !== 'individual') {
      setPeerEmployees([]);
      setDrEmployees([]);
      return;
    }
    setLoadingRelationships(true);
    Promise.all([
      api.manager.getEmployeePeers(empId).catch(() => []),
      api.manager.getEmployeeDirectReports(empId).catch(() => []),
    ]).then(([peers, drs]) => {
      setPeerEmployees(Array.isArray(peers) ? peers : []);
      setDrEmployees(Array.isArray(drs) ? drs : []);
      // Pre-selektuj sve koji postoje u relationships
      setForm(f => ({
        ...f,
        peerEmployeeIds: (Array.isArray(peers) ? peers : []).map(p => p.EmployeeID),
        drEmployeeIds:   (Array.isArray(drs)   ? drs   : []).map(d => d.EmployeeID),
      }));
    }).finally(() => setLoadingRelationships(false));
  }, [form.employeeId, mode]);

  async function handleAddEmpManager(e) {
    e.preventDefault();
    setAddEmpManagerLoading(true); setAddEmpManagerError(null);
    try {
      const created = await api.manager.createEmployee({
        firstName: addEmpManagerForm.firstName, lastName: addEmpManagerForm.lastName,
        email: addEmpManagerForm.email, jobTitle: addEmpManagerForm.jobTitle || undefined,
        lang: addEmpManagerForm.lang,
        companyId: addEmpManagerForm.companyId ? Number(addEmpManagerForm.companyId) : null,
      });
      const newId = String(created.employeeId || created.id || created.EmployeeID);
      const newEntry = { EmployeeID: newId, FirstName: addEmpManagerForm.firstName, LastName: addEmpManagerForm.lastName };
      setEmployees(prev => [...prev, newEntry]);
      setAddEmpForm(f => ({ ...f, managerId: newId }));
      setShowAddEmpManager(false);
      setAddEmpManagerForm({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '' });
    } catch (err) { setAddEmpManagerError(err.message); }
    finally { setAddEmpManagerLoading(false); }
  }

  async function handleAddEmployee(e) {
    e.preventDefault();
    setAddEmpLoading(true); setAddEmpError(null);
    try {
      const created = await api.manager.createEmployee({
        firstName: addEmpForm.firstName, lastName: addEmpForm.lastName,
        email: addEmpForm.email, jobTitle: addEmpForm.jobTitle || undefined, lang: addEmpForm.lang,
        companyId: addEmpForm.companyId ? Number(addEmpForm.companyId) : null,
        managerEmployeeId: addEmpForm.managerId ? Number(addEmpForm.managerId) : null,
      });
      const newEmp = { EmployeeID: created.employeeId || created.id || created.EmployeeID, FirstName: addEmpForm.firstName, LastName: addEmpForm.lastName, Email: addEmpForm.email, JobTitle: addEmpForm.jobTitle };
      setEmployees(prev => [...prev, newEmp]);
      setForm(f => ({ ...f, employeeId: String(newEmp.EmployeeID) }));
      setShowAddEmp(false);
      setAddEmpForm({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '', managerId: '' });
    } catch (err) { setAddEmpError(err.message); }
    finally { setAddEmpLoading(false); }
  }

  const toggle = key => {
    setForm(f => {
      const next = { ...f, [key]: !f[key] };

      // Format picker accordion logic:
      // When checking a type that has formats → expand its picker.
      // When checking a second type that also has formats → collapse the first.
      // When unchecking → collapse if it was open.
      const formatMap = { includeSelf: 'self', includeManager: 'manager' };
      const section = formatMap[key];
      if (section) {
        if (next[key]) {
          // Just checked — open this picker
          setExpandedFormatSection(section);
        } else {
          // Unchecked — close if it was the open one
          setExpandedFormatSection(prev => prev === section ? null : prev);
        }
      }

      return next;
    });
  };

  function toggleId(listKey, id) {
    setForm(f => ({
      ...f,
      [listKey]: f[listKey].includes(id) ? f[listKey].filter(x => x !== id) : [...f[listKey], id],
    }));
  }


  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: form.name,
      mode,
      lang: form.lang || undefined,
      ...(mode === 'individual' ? { employeeId: Number(form.employeeId) } : { employeeIds: form.employeeIds }),
      profilId: form.profilId ? Number(form.profilId) : undefined,
      deadline: form.deadline || undefined,
      includeSelf: form.includeSelf, includeManager: form.includeManager,
      includePeer: form.includePeer, includeDirectReports: form.includeDirectReports,
      includeExternal: form.includeExternal,
      includeCrossPartisan: form.includeCrossPartisan, includeMentor: form.includeMentor,
      selfFormat: form.includeSelf ? (form.selfFormat || 'standard_40') : undefined,
      managerFormat: form.includeManager ? (form.managerFormat || 'standard_40') : undefined,
      // Dynamic profile-specific types (e.g. includeClient, includeBusinessPartner for ice_pilot)
      ...Object.fromEntries(
        Object.entries(form)
          .filter(([k, v]) => k.startsWith('include') && v === true && !['includeSelf','includeManager','includePeer','includeDirectReports','includeExternal','includeCrossPartisan','includeMentor'].includes(k))
      ),
      // Peer — individualni + shared link uvek ide sa backenda
      peerEmployeeIds: form.peerEmployeeIds,
      peerNewPersonIds: form.peerNewPersons.map(p => p.id).filter(Boolean),
      // Direct reports — individualni + shared link uvek ide sa backenda
      drEmployeeIds: form.drEmployeeIds,
      drNewPersonIds: form.drNewPersons.map(p => p.id).filter(Boolean),
      // Group subgroups
      ...(mode === 'group' ? { groupStyle, subgroups } : {}),
    });
  }

  return (
    <>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {submitError && <Alert type="error">{submitError}</Alert>}

      {/* Campaign Name */}
      <FormField label="Campaign Name" required>
        <Input
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="e.g. HB Compass Campaign 1"
          required
        />
      </FormField>

      {/* Company */}
      {!lockMode && companies.length > 0 && (
        <FormField label="Company" required>
          <Select
            value={filterEmpCompany}
            onChange={e => {
              const newCompId = e.target.value;
              setFilterEmpCompany(newCompId);
              const compObj = companies.find(c => String(c.CompanyID || c.id) === newCompId);
              const compProfs = compObj?.profiles;
              setForm(f => {
                const profilStillValid = !compProfs?.length || compProfs.some(cp => String(cp.id) === String(f.profilId));
                return { ...f, employeeId: '', employeeIds: [], profilId: profilStillValid ? f.profilId : '' };
              });
            }}
            required
          >
            <option value="">— Select company —</option>
            {companies.map(c => <option key={c.CompanyID || c.id} value={String(c.CompanyID || c.id)}>{c.CompanyName || c.name}</option>)}
          </Select>
        </FormField>
      )}

      {/* Mode — hidden in edit mode */}
      {!lockMode && (
        <FormField label="Campaign Mode" required>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[{ value: 'individual', label: 'For Individual', desc: 'One employee' }, { value: 'group', label: 'For Group', desc: 'Multiple employees at once' }].map(m => (
              <label key={m.value} style={{
                flex: 1, display: 'flex', gap: '10px', padding: '14px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                border: `1.5px solid ${mode === m.value ? 'var(--ink)' : 'var(--canvas-warm)'}`,
                background: mode === m.value ? 'var(--canvas-warm)' : 'var(--canvas)', transition: 'all var(--transition)',
              }}>
                <input type="radio" name="mode" value={m.value} checked={mode === m.value} onChange={() => setMode(m.value)} style={{ accentColor: 'var(--ink)', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{m.label}</div>
                  <div style={{ fontSize: '0.77rem', color: 'var(--ink-soft)', marginTop: '2px' }}>{m.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </FormField>
      )}

      {/* Deadline */}
      <FormField label="Deadline" hint="Assessors will receive reminder emails at 10, 5, 2 and 1 day(s) before the deadline">
        <Input
          type="date"
          value={form.deadline}
          onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
          min={new Date().toISOString().split('T')[0]}
        />
      </FormField>

      {/* Employee selection — hidden in edit mode */}
      {!lockMode && (() => {
        const filteredEmps = filterEmpCompany
          ? employees.filter(e => String(e.CompanyID) === filterEmpCompany)
          : employees;
          const isCompanySelected = !!filterEmpCompany;
        if (mode === 'individual') return (
          <FormField label="Select Employee" required>
            {isCompanySelected && filteredEmps.length === 0 ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ flex: 1, padding: '14px 16px', borderRadius: 'var(--radius-md)', background: 'var(--canvas)', border: '1.5px solid var(--canvas-warm)', fontSize: '0.85rem', color: 'var(--ink-faint)' }}>
                  This company has no employees yet.
                </div>
                <Btn type="button" variant="outline" size="sm" onClick={() => { setAddEmpForm(prev => ({ ...prev, companyId: filterEmpCompany })); setShowAddEmp(true); }} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                  + Add New
                </Btn>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', opacity: isCompanySelected ? 1 : 0.6, transition: 'opacity 0.2s ease' }}>
                <Select
                  value={form.employeeId}
                  disabled={!isCompanySelected}
                  onChange={e => {
                    setForm(f => ({ ...f, employeeId: e.target.value, peerEmployeeIds: [], drEmployeeIds: [], peerNewPersons: [], drNewPersons: [] }));
                    setPeerEmployees([]);
                    setDrEmployees([]);
                  }}
                  required
                  style={{ flex: 1, cursor: !isCompanySelected ? 'not-allowed' : 'pointer' }}
                >
                  <option value="">{isCompanySelected ? '— Choose employee —' : 'Select company above first'}</option>
                  {filteredEmps.map(emp => <option key={emp.EmployeeID} value={emp.EmployeeID}>{emp.FirstName} {emp.LastName} ({emp.JobTitle || emp.Email})</option>)}
                </Select>
                <Btn type="button" variant="outline" size="sm" disabled={!isCompanySelected} onClick={() => { setAddEmpForm(prev => ({ ...prev, companyId: filterEmpCompany })); setShowAddEmp(true); }} style={{ whiteSpace: 'nowrap', flexShrink: 0, cursor: !isCompanySelected ? 'not-allowed' : 'pointer' }}>
                  + Add New
                </Btn>
              </div>
            )}
          </FormField>
        );
        const employeeListUI = (
          <div style={{
            opacity: isCompanySelected ? 1 : 0.6,
            pointerEvents: isCompanySelected ? 'auto' : 'none',
            transition: 'opacity 0.2s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{
                display: 'flex', gap: '8px', alignItems: 'center',
                cursor: isCompanySelected ? 'pointer' : 'not-allowed',
                fontSize: '0.85rem', color: 'var(--ink-soft)'
              }}>
                <input
                  type="checkbox"
                  disabled={!isCompanySelected}
                  checked={isCompanySelected && filteredEmps.length > 0 && filteredEmps.every(e => form.employeeIds.includes(e.EmployeeID))}
                  onChange={() => {
                    if (!isCompanySelected) return;
                    const allSelected = filteredEmps.every(e => form.employeeIds.includes(e.EmployeeID));
                    const filteredIds = filteredEmps.map(e => e.EmployeeID);
                    setForm(f => ({
                      ...f,
                      employeeIds: allSelected
                        ? f.employeeIds.filter(id => !filteredIds.includes(id))
                        : [...new Set([...f.employeeIds, ...filteredIds])],
                    }));
                  }}
                  style={{ accentColor: 'var(--ink)' }}
                />
                Select all in company
              </label>
              {form.employeeIds.length > 0 && <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>{form.employeeIds.length} selected</div>}
            </div>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '3px', maxHeight: 220, overflowY: 'auto',
              border: '1.5px solid var(--canvas-warm)', borderRadius: 'var(--radius-md)', padding: '6px',
              background: !isCompanySelected ? 'var(--canvas)' : 'transparent'
            }}>
              {!isCompanySelected ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: '0.85rem' }}>
                  Select a company above to see employees.
                </div>
              ) : filteredEmps.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: '0.85rem' }}>
                  This company has no employees yet.
                </div>
              ) : filteredEmps.map(emp => (
                <label key={emp.EmployeeID} style={{
                  display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                  background: form.employeeIds.includes(emp.EmployeeID) ? 'var(--canvas-warm)' : 'transparent',
                }}>
                  <input type="checkbox" checked={form.employeeIds.includes(emp.EmployeeID)}
                    onChange={() => toggleId('employeeIds', emp.EmployeeID)} style={{ accentColor: 'var(--ink)' }} />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.88rem' }}>{emp.FirstName} {emp.LastName}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--ink-soft)' }}>{emp.JobTitle || emp.Email}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

        const subgroupUI = (
          <div style={{ opacity: isCompanySelected ? 1 : 0.6, pointerEvents: isCompanySelected ? 'auto' : 'none' }}>
            {subgroups.map((sg, si) => (
              <div key={si} style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: '16px', marginBottom: '12px', background: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Subgroup {si + 1}</div>
                  {subgroups.length > 1 && (
                    <Btn type="button" size="sm" variant="outline" onClick={() => setSubgroups(prev => prev.filter((_, i) => i !== si))} style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>Remove</Btn>
                  )}
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Employees {sg.employeeIds.length > 0 ? `(${sg.employeeIds.length} selected)` : ''}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', maxHeight: 180, overflowY: 'auto', border: '1px solid #e5e5e5', borderRadius: 6, padding: '6px', background: '#fff', marginBottom: '12px' }}>
                  {filteredEmps.length === 0 ? (
                    <div style={{ padding: '12px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: '0.84rem' }}>Select a company above to see employees.</div>
                  ) : filteredEmps.map(emp => (
                    <label key={emp.EmployeeID} style={{
                      display: 'flex', gap: '8px', alignItems: 'center', padding: '6px 8px',
                      borderRadius: 4, cursor: 'pointer',
                      background: sg.employeeIds.includes(emp.EmployeeID) ? 'var(--canvas-warm)' : 'transparent',
                    }}>
                      <input type="checkbox" checked={sg.employeeIds.includes(emp.EmployeeID)}
                        onChange={() => setSubgroups(prev => prev.map((g, i) => i !== si ? g : {
                          ...g,
                          employeeIds: g.employeeIds.includes(emp.EmployeeID)
                            ? g.employeeIds.filter(id => id !== emp.EmployeeID)
                            : [...g.employeeIds, emp.EmployeeID],
                        }))}
                        style={{ accentColor: 'var(--ink)' }} />
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>{emp.FirstName} {emp.LastName}</div>
                        <div style={{ fontSize: '0.73rem', color: 'var(--ink-soft)' }}>{emp.JobTitle || emp.Email}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {/* Per-subgroup profile */}
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Profile</div>
                {(() => {
                  const companyObj = companies.find(c => String(c.CompanyID || c.id) === filterEmpCompany);
                  const companyProfiles = companyObj?.profiles;
                  const availableProfiles = companyProfiles?.length
                    ? profiles.filter(p => companyProfiles.some(cp => String(cp.id) === String(p.id || p.ProfilID)))
                    : profiles;
                  return (
                    <Select
                      value={sg.profilId}
                      onChange={e => {
                        const newProfilId = e.target.value;
                        setSubgroups(prev => prev.map((g, i) => {
                          if (i !== si) return g;
                          const newProf = profiles.find(p => String(p.id || p.ProfilID) === String(newProfilId));
                          const qTypes = newProf?.questionTypes || null;
                          const clearIfUnavailable = key => {
                            if (!qTypes) return g[key];
                            return qTypes.some(t => t === Q_TYPE_MAP[key] || t === Q_TYPE_MAP[key]?.replace('_', '')) ? g[key] : false;
                          };
                          return {
                            ...g, profilId: newProfilId,
                            includeSelf: clearIfUnavailable('includeSelf'),
                            includeManager: clearIfUnavailable('includeManager'),
                            includePeer: clearIfUnavailable('includePeer'),
                            includeDirectReports: clearIfUnavailable('includeDirectReports'),
                            includeExternal: clearIfUnavailable('includeExternal'),
                            includeCrossPartisan: clearIfUnavailable('includeCrossPartisan'),
                            includeMentor: clearIfUnavailable('includeMentor'),
                          };
                        }));
                      }}
                      style={{ marginBottom: '12px' }}
                    >
                      <option value="">— Select profile —</option>
                      {availableProfiles.map(p => <option key={p.id || p.ProfilID} value={p.id || p.ProfilID}>{p.name || p.Name}</option>)}
                    </Select>
                  );
                })()}

                {/* Assessment types — filtered by this subgroup's profile */}
                {sg.profilId ? (
                  <>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Assessment Types</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {[
                        { key: 'includeSelf', label: 'Self' },
                        { key: 'includeManager', label: 'Manager' },
                        { key: 'includePeer', label: 'Peer' },
                        { key: 'includeDirectReports', label: 'Direct Reports' },
                        { key: 'includeExternal', label: 'External' },
                        { key: 'includeClient', label: 'Client' },
                        { key: 'includeInternalSupport', label: 'Internal Support' },
                        { key: 'includeBusinessPartner', label: 'Business Partner' },
                        { key: 'includeTrainingParticipant', label: 'Training Participant' },
                        { key: 'includeCrossPartisan', label: 'Cross-Partisan' },
                        { key: 'includeMentor', label: 'Mentor' },
                      ].filter(t => {
                        const sgProf = profiles.find(p => String(p.id || p.ProfilID) === String(sg.profilId));
                        const qTypes = sgProf?.questionTypes || null;
                        return !qTypes || qTypes.some(q => q === Q_TYPE_MAP[t.key] || q === Q_TYPE_MAP[t.key]?.replace('_', ''));
                      }).map(t => {
                        const intersection = sgTypeIntersections[si];
                        const blocked = intersection && !intersection.has(t.key);
                        const blockMessage = (sgBlockReasons[si] && sgBlockReasons[si][t.key]) || 'Not available for the selected employees';
                        if (blocked) return (
                          <div key={t.key} style={{
                            display: 'flex', gap: '6px', alignItems: 'center', padding: '7px 11px',
                            borderRadius: 6, fontSize: '0.83rem', fontWeight: 500,
                            border: '1.5px solid #e0e0e0', background: '#f5f5f5', opacity: 0.6,
                            cursor: 'not-allowed', flexDirection: 'column', alignItems: 'flex-start',
                          }}>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <input type="checkbox" checked={false} disabled style={{ accentColor: 'var(--ink)' }} />
                              {t.label}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--danger)', marginLeft: '20px' }}>{blockMessage}</div>
                          </div>
                        );
                        return (
                          <label key={t.key} style={{
                            display: 'flex', gap: '6px', alignItems: 'center', padding: '7px 11px',
                            borderRadius: 6, cursor: 'pointer', fontSize: '0.83rem', fontWeight: 500,
                            border: `1.5px solid ${sg[t.key] ? 'var(--ink)' : '#e0e0e0'}`,
                            background: sg[t.key] ? 'var(--canvas-warm)' : '#fff',
                            transition: 'all 0.15s ease',
                          }}>
                            <input type="checkbox" checked={sg[t.key]}
                              onChange={() => setSubgroups(prev => prev.map((g, i) => i !== si ? g : { ...g, [t.key]: !g[t.key] }))}
                              style={{ accentColor: 'var(--ink)' }} />
                            {t.label}
                          </label>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: '0.83rem', color: 'var(--ink-faint)', padding: '6px 0' }}>Select a profile above to see assessment types.</div>
                )}
              </div>
            ))}
            <Btn type="button" variant="outline" size="sm" onClick={() => setSubgroups(prev => [...prev, { ...EMPTY_SUBGROUP }])}>
              + Add Subgroup
            </Btn>
          </div>
        );

        return (
          <>
            <FormField label="Group Configuration">
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { v: 'same', l: 'Same for all', d: 'All employees get the same assessment types' },
                  { v: 'custom', l: 'Custom per subgroup', d: 'Different types for different groups of employees' },
                ].map(opt => (
                  <label key={opt.v} style={{
                    flex: 1, display: 'flex', gap: '10px', padding: '14px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                    border: `1.5px solid ${groupStyle === opt.v ? 'var(--ink)' : 'var(--canvas-warm)'}`,
                    background: groupStyle === opt.v ? 'var(--canvas-warm)' : 'var(--canvas)', transition: 'all var(--transition)',
                  }}>
                    <input type="radio" name="groupStyle" value={opt.v} checked={groupStyle === opt.v} onChange={() => setGroupStyle(opt.v)} style={{ accentColor: 'var(--ink)', marginTop: '2px' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{opt.l}</div>
                      <div style={{ fontSize: '0.77rem', color: 'var(--ink-soft)', marginTop: '2px' }}>{opt.d}</div>
                    </div>
                  </label>
                ))}
              </div>
            </FormField>
            <FormField label={groupStyle === 'same' ? 'Select Employees' : 'Configure Subgroups'} hint={groupStyle === 'same' ? 'Select all employees for this batch campaign' : 'Each subgroup can have different employees and assessment types'} required>
              {groupStyle === 'same' ? employeeListUI : subgroupUI}
            </FormField>
          </>
        );
      })()}

      {/* Profile — only shown after company is selected; hidden in custom subgroup mode (each subgroup picks its own) */}
      {!(mode === 'group' && groupStyle === 'custom') && profiles.length > 0 && filterEmpCompany && (mode === 'group' || form.employeeId) && (() => {
        const companyObj = companies.find(c => String(c.CompanyID || c.id) === filterEmpCompany);
        const companyProfiles = companyObj?.profiles;
        if (!companyProfiles?.length) {
          return (
            <FormField label="Assessment Profile">
              <div style={{ padding: '14px 16px', borderRadius: 'var(--radius-md)', background: 'var(--canvas)', border: '1.5px solid var(--canvas-warm)', fontSize: '0.85rem', color: 'var(--ink-faint)' }}>
                This company has no profiles assigned. Go to My Companies to assign a profile before creating a campaign.
              </div>
            </FormField>
          );
        }
        const availableProfiles = profiles.filter(p => companyProfiles.some(cp => String(cp.id) === String(p.id || p.ProfilID)));
        return (
          <>
            <FormField label="Assessment Profile" hint="Select a profile for this campaign">
              <Select value={form.profilId} onChange={e => {
                const pid = e.target.value;
                const prof = availableProfiles.find(p => String(p.id || p.ProfilID) === String(pid));
                const langs = prof?.availableLangs || [];
                console.log('[CampaignForm] selected profile:', prof, '| availableLangs:', langs);
                // Force EN for now — Serbian self-assessment questions not yet available
                setForm(f => ({ ...f, profilId: pid, lang: 'en' }));
              }}>
                <option value="">— Select profile —</option>
                {availableProfiles.map(p => <option key={p.id || p.ProfilID} value={p.id || p.ProfilID}>{p.name || p.Name}</option>)}
              </Select>
            </FormField>

            {/* Language picker — hidden for now, all self-assessment questions are EN only.
               Will re-enable once Serbian translations are ready. */}
            {(() => {
              const langs = selectedProfile?.availableLangs || [];
              // For now, force English — Serbian self-assessment questions are not yet available
              if (langs.length > 0 && form.lang !== 'en') {
                setTimeout(() => setForm(f => ({ ...f, lang: 'en' })), 0);
              }
              // Hide picker entirely until SR questions are ready
              if (true) return null; // eslint-disable-line
              const LANG_LABELS = { sr: 'Serbian', en: 'English', de: 'German', fr: 'French', es: 'Spanish' };
              return (
                <FormField label="Assessment Language" hint="Select the language for this campaign's questions">
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {langs.map(l => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, lang: l }))}
                        style={{
                          padding: '8px 18px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                          fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600,
                          border: '1.5px solid',
                          borderColor: form.lang === l ? 'var(--ink)' : 'var(--canvas-warm)',
                          background: form.lang === l ? 'var(--ink)' : 'var(--canvas-white)',
                          color: form.lang === l ? '#fff' : 'var(--ink-soft)',
                          transition: 'all 150ms',
                        }}
                      >
                        {LANG_LABELS[l] || l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </FormField>
              );
            })()}
          </>
        );
      })()}

      {/* Assessment types — only shown when profile is selected */}
      {!(mode === 'group' && groupStyle === 'custom') && !form.profilId && filterEmpCompany && (
        <div style={{ padding: '14px 16px', borderRadius: 'var(--radius-md)', background: 'var(--canvas)', border: '1.5px solid var(--canvas-warm)', fontSize: '0.85rem', color: 'var(--ink-faint)' }}>
          Select a profile above to see available assessment types.
        </div>
      )}
      {!(mode === 'group' && groupStyle === 'custom') && form.profilId && (() => {
        // When cycleConfig is loaded (employee selected, individual mode): use backend types + labels
        // Otherwise: use profile-based hardcoded list
        const useCycleTypes = mode === 'individual' && cycleConfig;
        const visibleTypes = useCycleTypes
          ? normalizeCycleTypes(cycleConfig.assessmentTypes)
          : (() => {
              const allTypes = [
                { key: 'includeSelf', label: 'Self Assessment', desc: 'Employee rates themselves' },
                { key: 'includeManager', label: 'Manager Review', desc: 'Direct manager assessment' },
                { key: 'includePeer', label: 'Peer Review', desc: 'Individual links + shared link' },
                { key: 'includeDirectReports', label: 'Direct Reports', desc: 'Individual links + shared link' },
                { key: 'includeExternal', label: 'External', desc: 'One shared link for external assessors' },
                { key: 'includeClient', label: 'Client', desc: 'Client / key client assessment' },
                { key: 'includeInternalSupport', label: 'Internal Support', desc: 'Internal support assessment' },
                { key: 'includeBusinessPartner', label: 'Business Partner', desc: 'Business partner assessment' },
                { key: 'includeTrainingParticipant', label: 'Training Participant', desc: 'Training participant assessment' },
                { key: 'includeCrossPartisan', label: 'Cross-Partisan', desc: 'Cross-partisan assessment' },
                { key: 'includeMentor', label: 'Mentor', desc: 'Mentor assessment' },
              ];
              return allTypes
                .filter(t => !profileQTypes || profileQTypes.some(q => q === Q_TYPE_MAP[t.key] || q === Q_TYPE_MAP[t.key]?.replace('_', '')))
                .map(t => {
                  if (mode === 'group' && groupStyle === 'same' && groupSameIntersection && !groupSameIntersection.has(t.key)) {
                    return { ...t, blocked: true, blockMessage: groupSameBlockReasons[t.key] || 'Not available for the selected employees' };
                  }
                  return t;
                });
            })();

        return (
          <FormField label="Assessment Types" required hint={isEmployeeProfile ? 'This profile only supports Self Assessment' : undefined}>
            {cycleConfigLoading && mode === 'individual' && form.employeeId && (
              <div style={{ padding: '8px 0', fontSize: '0.83rem', color: 'var(--ink-faint)' }}>Loading assessment types...</div>
            )}
            <div className="grid-2col" style={{ gap: '10px' }}>
              {visibleTypes.map(t => {
                const lockedOn = isEmployeeProfile && t.key === 'includeSelf';
                if (t.blocked) return (
                  <div key={t.key} style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--canvas-warm)', background: 'var(--canvas-warm)', opacity: 0.6,
                    cursor: 'not-allowed',
                  }}>
                    <input type="checkbox" checked={false} disabled style={{ accentColor: 'var(--ink)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--ink-soft)' }}>{t.label}</div>
                      {t.blockMessage
                        ? <div style={{ fontSize: '0.77rem', color: 'var(--danger)', marginTop: '2px' }}>{t.blockMessage}</div>
                        : <div style={{ fontSize: '0.77rem', color: 'var(--ink-soft)', marginTop: '2px' }}>{t.desc}</div>
                      }
                    </div>
                  </div>
                );
                return (
                  <label key={t.key} style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: 'var(--radius-md)',
                    cursor: lockedOn ? 'not-allowed' : 'pointer',
                    border: `1.5px solid ${form[t.key] ? 'var(--ink)' : 'var(--canvas-warm)'}`,
                    background: form[t.key] ? 'var(--canvas-warm)' : 'var(--canvas)',
                    transition: 'all var(--transition)',
                  }}>
                    <input type="checkbox" checked={!!form[t.key]} onChange={() => { if (!lockedOn) toggle(t.key); }} disabled={lockedOn} style={{ accentColor: 'var(--ink)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{t.label}</div>
                      <div style={{ fontSize: '0.77rem', color: 'var(--ink-soft)', marginTop: '2px' }}>{t.desc}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </FormField>
        );
      })()}

      {/* ── Format pickers (accordion) ── only one expanded at a time ── */}
      {[
        { key: 'self',    show: form.includeSelf    && selfFormats.length > 1,    formats: selfFormats,    loading: selfFormatsLoading,    label: 'Self-Assessment Format',    formField: 'selfFormat',    radioName: 'selfFormat' },
        { key: 'manager', show: form.includeManager && managerFormats.length > 1, formats: managerFormats, loading: managerFormatsLoading, label: 'Manager Assessment Format', formField: 'managerFormat', radioName: 'managerFormat' },
      ].filter(s => s.show).map(section => {
        const isExpanded = expandedFormatSection === section.key;
        const selectedFmt = section.formats.find(f => f.formatKey === form[section.formField]) || section.formats[0];
        return (
          <div key={section.key} style={{ marginBottom: '4px' }}>
            {/* Collapsed summary bar */}
            <div
              onClick={() => setExpandedFormatSection(isExpanded ? null : section.key)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                border: `1.5px solid ${isExpanded ? 'var(--ink)' : 'var(--canvas-warm)'}`,
                background: isExpanded ? 'var(--canvas-warm)' : 'var(--canvas)',
                transition: 'all var(--transition)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {section.label}
                </div>
                {selectedFmt && (
                  <div style={{ fontSize: '0.83rem', color: 'var(--ink)', fontWeight: 500 }}>
                    {selectedFmt.label}
                    <span style={{ fontWeight: 400, fontSize: '0.78rem', color: 'var(--ink-soft)', marginLeft: '6px' }}>
                      {selectedFmt.estimatedTime}
                    </span>
                  </div>
                )}
              </div>
              <div style={{
                fontSize: '0.72rem', fontWeight: 600, color: 'var(--ink-soft)',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                padding: '3px 10px', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--canvas-warm)', background: 'var(--canvas)',
              }}>
                {isExpanded ? 'Close' : 'Change'}
              </div>
            </div>

            {/* Expanded format cards */}
            {isExpanded && (
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {section.loading ? (
                  <div style={{ padding: '8px 0', fontSize: '0.83rem', color: 'var(--ink-faint)' }}>Loading formats...</div>
                ) : section.formats.map(fmt => {
                  const isSelected = form[section.formField] === fmt.formatKey;
                  return (
                    <label key={fmt.formatKey} style={{
                      display: 'flex', gap: '14px', padding: '14px 16px', borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      border: `1.5px solid ${isSelected ? 'var(--ink)' : 'var(--canvas-warm)'}`,
                      background: isSelected ? 'var(--canvas-warm)' : 'var(--canvas)',
                      transition: 'all var(--transition)',
                    }}>
                      <input
                        type="radio" name={section.radioName} value={fmt.formatKey}
                        checked={isSelected}
                        onChange={() => {
                          setForm(f => ({ ...f, [section.formField]: fmt.formatKey }));
                          // Auto-collapse after selection
                          setExpandedFormatSection(null);
                        }}
                        style={{ accentColor: 'var(--ink)', flexShrink: 0, marginTop: '2px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '3px' }}>
                          {fmt.label}
                          <span style={{ fontWeight: 400, fontSize: '0.78rem', color: 'var(--ink-soft)', marginLeft: '8px' }}>
                            {fmt.estimatedTime} · {fmt.questionCount} questions
                          </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: '6px' }}>
                          {fmt.description}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                          <div>
                            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px' }}>Pros</div>
                            {(fmt.pros || []).map((p, i) => (
                              <div key={i} style={{ fontSize: '0.76rem', color: 'var(--ink-soft)', lineHeight: 1.45, paddingLeft: '10px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0 }}>+</span> {p}
                              </div>
                            ))}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--danger)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px' }}>Cons</div>
                            {(fmt.cons || []).map((c, i) => (
                              <div key={i} style={{ fontSize: '0.76rem', color: 'var(--ink-soft)', lineHeight: 1.45, paddingLeft: '10px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0 }}>-</span> {c}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Peer picker — individual mode only */}
      {form.includePeer && mode === 'individual' && (
        <FormField label="Peer Review — Assessors">
          {loadingRelationships ? (
            <div style={{ padding: '12px', fontSize: '0.84rem', color: 'var(--ink-soft)' }}>Loading peers...</div>
          ) : (
          <PeoplePicker
            label="Peer"
            employees={peerEmployees}
            selected={form.peerEmployeeIds}
            onSelectAll={ids => setForm(f => ({ ...f, peerEmployeeIds: ids }))}
            onToggle={id => toggleId('peerEmployeeIds', id)}
            newPersons={form.peerNewPersons}
            onAddPerson={p => setForm(f => ({ ...f, peerNewPersons: [...f.peerNewPersons, p] }))}
            onRemovePerson={i => setForm(f => ({ ...f, peerNewPersons: f.peerNewPersons.filter((_, idx) => idx !== i) }))}
            addModalOpen={showAddPeer}
            setAddModalOpen={setShowAddPeer}
            managerEmployeeId={employees.find(e => String(e.EmployeeID) === String(form.employeeId))?.ManagerID || null}
            companies={companies}
          />
          )}
        </FormField>
      )}

      {form.includePeer && mode === 'group' && groupStyle === 'same' && (
        <div style={{ padding: '12px 16px', background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--ink)' }}>Peer Review:</strong> In group mode, one shared link per employee will be generated.
        </div>
      )}

      {/* Direct Reports picker — individual mode only */}
      {form.includeDirectReports && mode === 'individual' && (
        <FormField label="Direct Reports — Assessors">
          {loadingRelationships ? (
            <div style={{ padding: '12px', fontSize: '0.84rem', color: 'var(--ink-soft)' }}>Loading direct reports...</div>
          ) : (
          <PeoplePicker
            label="Direct Report"
            employees={drEmployees}
            selected={form.drEmployeeIds}
            onSelectAll={ids => setForm(f => ({ ...f, drEmployeeIds: ids }))}
            onToggle={id => toggleId('drEmployeeIds', id)}
            newPersons={form.drNewPersons}
            onAddPerson={p => setForm(f => ({ ...f, drNewPersons: [...f.drNewPersons, p] }))}
            onRemovePerson={i => setForm(f => ({ ...f, drNewPersons: f.drNewPersons.filter((_, idx) => idx !== i) }))}
            addModalOpen={showAddDr}
            setAddModalOpen={setShowAddDr}
            managerEmployeeId={form.employeeId ? Number(form.employeeId) : null}
            companies={companies}
          />
          )}
        </FormField>
      )}

      {form.includeDirectReports && mode === 'group' && groupStyle === 'same' && (
        <div style={{ padding: '12px 16px', background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--ink)' }}>Direct Reports:</strong> In group mode, one shared link per employee will be generated.
        </div>
      )}

      {form.includeExternal && (
        <div style={{ padding: '12px 16px', background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--ink)' }}>External link:</strong> One shared link will be generated. Anyone who opens it can complete the assessment — no individual invitation required.
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <Btn type="submit" loading={submitLoading} style={{ minWidth: 160, justifyContent: 'center' }}>Launch Campaign</Btn>
        {onSaveDraft && (
          <Btn variant="outline" type="button" loading={saveDraftLoading} onClick={onSaveDraft}
            style={{ minWidth: 120, justifyContent: 'center' }}>
            Save Draft
          </Btn>
        )}
        <Btn variant="outline" type="button" onClick={() => navigate(returnTo || '/manager/dashboard')}>Cancel</Btn>
      </div>
    </form>

    {/* Quick Add Employee Modal — outside <form> to avoid nesting */}
    <Modal open={showAddEmp} onClose={() => { setShowAddEmp(false); setAddEmpError(null); }} title="Add New Employee">
      {addEmpError && <div style={{ marginBottom: '16px' }}><Alert type="error">{addEmpError}</Alert></div>}
      <form onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="grid-2col" style={{ gap: '12px' }}>
          <FormField label="First Name" required>
            <Input value={addEmpForm.firstName} onChange={e => setAddEmpForm(f => ({ ...f, firstName: e.target.value }))} required autoFocus />
          </FormField>
          <FormField label="Last Name" required>
            <Input value={addEmpForm.lastName} onChange={e => setAddEmpForm(f => ({ ...f, lastName: e.target.value }))} required />
          </FormField>
        </div>
        <FormField label="Email" required>
          <Input type="email" value={addEmpForm.email} onChange={e => setAddEmpForm(f => ({ ...f, email: e.target.value }))} required />
        </FormField>
        {companies.length > 0 && (
          <FormField label="Company">
            <Select value={addEmpForm.companyId} onChange={e => setAddEmpForm(f => ({ ...f, companyId: e.target.value }))}>
              <option value="">— Select company —</option>
              {companies.map(c => (
                <option key={c.CompanyID || c.id} value={c.CompanyID || c.id}>{c.CompanyName || c.name}</option>
              ))}
            </Select>
          </FormField>
        )}
        <div className="grid-2col" style={{ gap: '12px' }}>
          <FormField label="Job Title">
            <Select value={addEmpForm.jobTitle} onChange={e => setAddEmpForm(f => ({ ...f, jobTitle: e.target.value }))}>
              <option value="">— Select —</option>
              {JOB_TITLES.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
          </FormField>
          <FormField label="Language">
            <Select value={addEmpForm.lang} onChange={e => setAddEmpForm(f => ({ ...f, lang: e.target.value }))}>
              <option value="en">English</option>
              <option value="sr">Serbian</option>
            </Select>
          </FormField>
        </div>
        <FormField label="Manager / Mentor" hint="Optional — select or add the employee's direct manager or mentor">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <Select value={addEmpForm.managerId} onChange={e => setAddEmpForm(f => ({ ...f, managerId: e.target.value }))} style={{ flex: 1 }} disabled={!addEmpForm.companyId}>
              <option value="">{addEmpForm.companyId ? '— No manager —' : '— Select company first —'}</option>
              {employees.filter(e => String(e.CompanyID) === String(addEmpForm.companyId)).map(e => (
                <option key={e.EmployeeID} value={e.EmployeeID}>{e.FirstName} {e.LastName}</option>
              ))}
            </Select>
            <Btn type="button" variant="outline" size="sm" onClick={() => setShowAddEmpManager(true)} style={{ whiteSpace: 'nowrap', flexShrink: 0 }} disabled={!addEmpForm.companyId}>+ Add New</Btn>
          </div>
        </FormField>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '4px' }}>
          <Btn variant="outline" type="button" onClick={() => { setShowAddEmp(false); setAddEmpError(null); }}>Cancel</Btn>
          <Btn type="submit" variant="teal" loading={addEmpLoading}>Add & Select</Btn>
        </div>
      </form>
    </Modal>

    {/* Nested modal — Add Manager from within Add Employee */}
    <Modal open={showAddEmpManager} onClose={() => { setShowAddEmpManager(false); setAddEmpManagerError(null); }} title="Add New Manager">
      {addEmpManagerError && <div style={{ marginBottom: '16px' }}><Alert type="error">{addEmpManagerError}</Alert></div>}
      <form onSubmit={handleAddEmpManager} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="grid-2col" style={{ gap: '12px' }}>
          <FormField label="First Name" required>
            <Input value={addEmpManagerForm.firstName} onChange={e => setAddEmpManagerForm(f => ({ ...f, firstName: e.target.value }))} required autoFocus />
          </FormField>
          <FormField label="Last Name" required>
            <Input value={addEmpManagerForm.lastName} onChange={e => setAddEmpManagerForm(f => ({ ...f, lastName: e.target.value }))} required />
          </FormField>
        </div>
        <FormField label="Email" required>
          <Input type="email" value={addEmpManagerForm.email} onChange={e => setAddEmpManagerForm(f => ({ ...f, email: e.target.value }))} required />
        </FormField>
        {companies.length > 0 && (
          <FormField label="Company">
            <Select value={addEmpManagerForm.companyId} onChange={e => setAddEmpManagerForm(f => ({ ...f, companyId: e.target.value }))}>
              <option value="">— Select company —</option>
              {companies.map(c => <option key={c.CompanyID || c.id} value={c.CompanyID || c.id}>{c.CompanyName || c.name}</option>)}
            </Select>
          </FormField>
        )}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '4px' }}>
          <Btn variant="outline" type="button" onClick={() => { setShowAddEmpManager(false); setAddEmpManagerError(null); }}>Cancel</Btn>
          <Btn type="submit" variant="teal" loading={addEmpManagerLoading}>Add & Select</Btn>
        </div>
      </form>
    </Modal>
    </>
  );
});

// ── People Picker (Peers / Direct Reports) ─────────────────────────────────
// Uvek generiše I shared link I individualne linkove za izabrane iz baze
function PeoplePicker({ label, employees, selected, onToggle, onSelectAll, newPersons, onAddPerson, onRemovePerson, addModalOpen, setAddModalOpen, managerEmployeeId, companies }) {
  const [newPerson, setNewPerson] = useState({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '' });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState(null);

  async function handleAdd(e) {
    e.preventDefault();
    setAddLoading(true); setAddError(null);
    try {
      const created = await api.manager.createEmployee({
        firstName: newPerson.firstName, lastName: newPerson.lastName,
        email: newPerson.email, jobTitle: newPerson.jobTitle || undefined, lang: newPerson.lang,
        companyId: newPerson.companyId ? Number(newPerson.companyId) : null,
        ...(managerEmployeeId ? { managerEmployeeId } : {}),
      });
      const createdId = created.employeeId || created.id || created.EmployeeID;
      onAddPerson({ id: createdId, firstName: newPerson.firstName, lastName: newPerson.lastName, email: newPerson.email });
      setNewPerson({ firstName: '', lastName: '', email: '', jobTitle: '', lang: 'en', companyId: '' });
      setAddModalOpen(false);
    } catch (err) { setAddError(err.message); }
    finally { setAddLoading(false); }
  }

  const totalSelected = selected.length + newPersons.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

      {/* Deo 1 — picker iz baze (individualni linkovi + email) */}
      <div style={{ border: '1.5px solid var(--canvas-warm)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', background: 'var(--canvas-warm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              style={{ accentColor: 'var(--ink)' }}
              checked={employees.length > 0 && selected.length === employees.length}
              onChange={() => {
                const allSelected = selected.length === employees.length;
                onSelectAll(allSelected ? [] : employees.map(e => e.EmployeeID));
              }}
            />
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>From database</span>
            <span style={{ fontSize: '0.76rem', color: 'var(--ink-soft)' }}>
              {totalSelected > 0 ? `${totalSelected} selected` : 'individual link + email per person'}
            </span>
          </label>
          <Btn type="button" size="sm" variant="outline" onClick={() => setAddModalOpen(true)}>+ Add New</Btn>
        </div>

        <div style={{ maxHeight: 190, overflowY: 'auto', padding: '6px' }}>
          {employees.length === 0 ? (
            <div style={{ padding: '10px', fontSize: '0.83rem', color: 'var(--ink-faint)', textAlign: 'center' }}>No employees in database yet.</div>
          ) : employees.map(emp => (
            <label key={emp.EmployeeID} style={{
              display: 'flex', gap: '10px', alignItems: 'center', padding: '7px 10px',
              borderRadius: 'var(--radius-sm)', cursor: 'pointer',
              background: selected.includes(emp.EmployeeID) ? 'rgba(0,0,0,0.04)' : 'transparent',
            }}>
              <input type="checkbox" checked={selected.includes(emp.EmployeeID)}
                onChange={() => onToggle(emp.EmployeeID)} style={{ accentColor: 'var(--ink)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: '0.87rem' }}>{emp.FirstName} {emp.LastName}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {emp.Email}{emp.JobTitle ? ` · ${emp.JobTitle}` : ''}
                </div>
              </div>
              {selected.includes(emp.EmployeeID) && (
                <span style={{ fontSize: '0.71rem', color: '#0a9', fontWeight: 600, flexShrink: 0 }}>✉ email</span>
              )}
            </label>
          ))}
        </div>

        {/* Novo dodati */}
        {newPersons.length > 0 && (
          <div style={{ borderTop: '1px solid var(--canvas-warm)', padding: '6px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', padding: '4px 10px 4px' }}>Newly added</div>
            {newPersons.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,160,120,0.06)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 500, fontSize: '0.87rem' }}>{p.firstName} {p.lastName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{p.email}</div>
                </div>
                <span style={{ fontSize: '0.71rem', color: '#0a9', fontWeight: 600, flexShrink: 0 }}>✉ email</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ fontSize: '0.76rem', color: 'var(--ink-soft)', padding: '2px 4px', lineHeight: 1.5 }}>
        A shared link will also be generated after launch — visible on the campaign page.
      </div>

      {/* Add new person modal */}
      <Modal open={addModalOpen} onClose={() => { setAddModalOpen(false); setAddError(null); }} title={`Add New ${label}`}>
        {addError && <div style={{ marginBottom: '14px' }}><Alert type="error">{addError}</Alert></div>}
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '16px', lineHeight: 1.6 }}>
          This person will be saved to the database and will receive an individual email with their assessment link.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="grid-2col" style={{ gap: '12px' }}>
            <FormField label="First Name" required>
              <Input value={newPerson.firstName} onChange={e => setNewPerson(f => ({ ...f, firstName: e.target.value }))} required autoFocus />
            </FormField>
            <FormField label="Last Name" required>
              <Input value={newPerson.lastName} onChange={e => setNewPerson(f => ({ ...f, lastName: e.target.value }))} required />
            </FormField>
          </div>
          <FormField label="Email" required hint="Invitation will be sent to this address">
            <Input type="email" value={newPerson.email} onChange={e => setNewPerson(f => ({ ...f, email: e.target.value }))} required />
          </FormField>
          {companies && companies.length > 0 && (
            <FormField label="Company">
              <Select value={newPerson.companyId} onChange={e => setNewPerson(f => ({ ...f, companyId: e.target.value }))}>
                <option value="">— Select company —</option>
                {companies.map(c => (
                  <option key={c.CompanyID || c.id} value={c.CompanyID || c.id}>{c.CompanyName || c.name}</option>
                ))}
              </Select>
            </FormField>
          )}
          <div className="grid-2col" style={{ gap: '12px' }}>
            <FormField label="Job Title">
              <Select value={newPerson.jobTitle} onChange={e => setNewPerson(f => ({ ...f, jobTitle: e.target.value }))}>
                <option value="">— Select —</option>
                {JOB_TITLES.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
            </FormField>
            <FormField label="Language">
              <Select value={newPerson.lang} onChange={e => setNewPerson(f => ({ ...f, lang: e.target.value }))}>
                <option value="en">English</option>
                <option value="sr">Serbian</option>
              </Select>
            </FormField>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '4px' }}>
            <Btn variant="outline" type="button" onClick={() => { setAddModalOpen(false); setAddError(null); }}>Cancel</Btn>
            <Btn type="button" variant="teal" loading={addLoading} onClick={handleAdd}>Save & Add</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

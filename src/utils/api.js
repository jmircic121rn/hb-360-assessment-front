const BASE = process.env.REACT_APP_API_URL || 'https://api.hansenbeck.com';

function getToken(role) {
  return localStorage.getItem(`compass_token_${role}`);
}

export function setToken(role, token) {
  localStorage.setItem(`compass_token_${role}`, token);
}

export function clearToken(role) {
  localStorage.removeItem(`compass_token_${role}`);
}

async function request(path, options = {}, role = null) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (role) {
    const token = getToken(role);
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (res.status === 401) {
    if (role) {
      clearToken(role);
      window.location.href = `/${role}/login`;
      return;
    }
    throw new Error('Invalid credentials');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // Assessment (public)
  getAssessment: (token) => request(`/api/360/assess/${token}`),
  submitAssessment: (token, data) => request(`/api/360/assess/${token}/submit`, {
    method: 'POST', body: JSON.stringify(data)
  }),

  // Auth
  login: (creds) => request('/api/360/auth/login', { method: 'POST', body: JSON.stringify(creds) }),
  getMe: (role) => request('/api/360/auth/me', {}, role),
  changePassword: (role, data) => request('/api/360/auth/change-password', { method: 'PUT', body: JSON.stringify(data) }, role),

  // Manager
  manager: {
    getDashboard: () => request('/api/360/manager/dashboard', {}, 'admin'),
    getEmployees: (companyId) => request(`/api/360/manager/employees${companyId ? `?companyId=${companyId}` : ''}`, {}, 'admin'),
    createEmployee: (data) => request('/api/360/manager/employees', { method: 'POST', body: JSON.stringify(data) }, 'admin'),
    updateEmployee: (id, data) => request(`/api/360/manager/employees/${id}`, { method: 'PUT', body: JSON.stringify(data) }, 'admin'),
    deleteEmployee: (id) => request(`/api/360/manager/employees/${id}`, { method: 'DELETE' }, 'admin'),
    getCampaigns: () => request('/api/360/manager/cycles', {}, 'admin'),
    getCampaign: (id) => request(`/api/360/manager/cycles/${id}`, {}, 'admin'),
    getCycleData: (id) => request(`/api/360/manager/cycles/${id}/data`, {}, 'admin'),
    createCampaign: (data) => request('/api/360/manager/cycles', { method: 'POST', body: JSON.stringify(data) }, 'admin'),
    // Group campaign — backend kreira po jedan cycle za svakog employee-a
    createCampaignBatch: (data) => request('/api/360/manager/cycles/batch', { method: 'POST', body: JSON.stringify(data) }, 'admin'),
    updateCampaign: (id, data) => request(`/api/360/manager/cycles/${id}`, { method: 'PUT', body: JSON.stringify(data) }, 'admin'),
    generateReport1: (campaignId) => request(`/api/360/manager/cycles/${campaignId}/report/1`, { method: 'POST', body: JSON.stringify({ sendToEmployee: true, forceIfIncomplete: true }) }, 'admin'),
    generateReport2: (campaignId) => request(`/api/360/manager/cycles/${campaignId}/report/2`, { method: 'POST', body: JSON.stringify({ sendToEmployee: true }) }, 'admin'),
    getReports: () => request('/api/360/manager/reports', {}, 'admin'),
    deleteCampaign: (id) => request(`/api/360/manager/cycles/${id}`, { method: 'DELETE' }, 'admin'),
    completeCampaign: (id) => request(`/api/360/manager/cycles/${id}/complete`, { method: 'PATCH' }, 'admin'),
    archiveCampaign: (id) => request(`/api/360/manager/cycles/${id}/archive`, { method: 'PATCH' }, 'admin'),
    deleteReport: (id) => request(`/api/360/manager/reports/${id}`, { method: 'DELETE' }, 'admin'),
    // Novi endpointi
    getProfiles: () => request('/api/360/manager/profiles', {}, 'admin'),
    generateAIReport: (cycleId) => request(`/api/360/manager/cycles/${cycleId}/generate-ai-report`, { method: 'POST' }, 'admin'),
    getAIReportStatus: (cycleId, jobId) => request(`/api/360/manager/cycles/${cycleId}/report-status/${jobId}`, {}, 'admin'),
    saveAIReport: (cycleId, report) => request(`/api/360/manager/cycles/${cycleId}/save-ai-report`, { method: 'POST', body: JSON.stringify({ report }) }, 'admin'),
    downloadAIReportPdf: async (reportId) => {
      const token = localStorage.getItem('compass_token_admin');
      const res = await fetch(`${BASE}/api/360/manager/reports/${reportId}/ai-pdf`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to download PDF');
      return res.blob();
    },
    getManagersList: () => request('/api/360/manager/managers-list', {}, 'admin'),
    // Companies
    getCompanies: () => request('/api/360/manager/companies', {}, 'admin'),
    createCompany: (data) => request('/api/360/manager/companies', { method: 'POST', body: JSON.stringify(data) }, 'admin'),
    updateCompany: (id, data) => request(`/api/360/manager/companies/${id}`, { method: 'PUT', body: JSON.stringify(data) }, 'admin'),
    deleteCompany: (id) => request(`/api/360/manager/companies/${id}`, { method: 'DELETE' }, 'admin'),
    // Peers i Direct Reports po zaposlenom
    getEmployeePeers: (employeeId) => request(`/api/360/manager/employees/${employeeId}/peers`, {}, 'admin'),
    addEmployeePeer: (employeeId, data) => request(`/api/360/manager/employees/${employeeId}/peers`, { method: 'POST', body: JSON.stringify(data) }, 'admin'),
    removeEmployeePeer: (employeeId, peerId) => request(`/api/360/manager/employees/${employeeId}/peers/${peerId}`, { method: 'DELETE' }, 'admin'),
    getEmployeeDirectReports: (employeeId) => request(`/api/360/manager/employees/${employeeId}/direct-reports`, {}, 'admin'),
    addEmployeeDirectReport: (employeeId, data) => request(`/api/360/manager/employees/${employeeId}/direct-reports`, { method: 'POST', body: JSON.stringify(data) }, 'admin'),
    removeEmployeeDirectReport: (employeeId, drId) => request(`/api/360/manager/employees/${employeeId}/direct-reports/${drId}`, { method: 'DELETE' }, 'admin'),
  },

  // Employee
  employee: {
    getDashboard: () => request('/api/360/employee/dashboard', {}, 'employee'),
    getCampaigns: () => request('/api/360/employee/cycles', {}, 'employee'),
    getSelfToken: (campaignId) => request(`/api/360/employee/cycles/${campaignId}/self-token`, {}, 'employee'),
    getReports: () => request('/api/360/employee/reports', {}, 'employee'),
  },
};

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
  loginAdmin: (creds) => request('/api/360/auth/login/admin', { method: 'POST', body: JSON.stringify({ password: creds.password }) }),
  getMe: (role) => request('/api/360/auth/me', {}, role),

  // Manager
  manager: {
    getDashboard: () => request('/api/360/manager/dashboard', {}, 'manager'),
    getEmployees: () => request('/api/360/manager/employees', {}, 'manager'),
    createEmployee: (data) => request('/api/360/manager/employees', { method: 'POST', body: JSON.stringify(data) }, 'manager'),
    updateEmployee: (id, data) => request(`/api/360/manager/employees/${id}`, { method: 'PUT', body: JSON.stringify(data) }, 'manager'),
    deleteEmployee: (id) => request(`/api/360/manager/employees/${id}`, { method: 'DELETE' }, 'manager'),
    getCampaigns: () => request('/api/360/manager/cycles', {}, 'manager'),
    getCampaign: (id) => request(`/api/360/manager/cycles/${id}`, {}, 'manager'),
    createCampaign: (data) => request('/api/360/manager/cycles', { method: 'POST', body: JSON.stringify(data) }, 'manager'),
    generateReport1: (campaignId) => request(`/api/360/manager/cycles/${campaignId}/report/1`, { method: 'POST', body: JSON.stringify({ sendToEmployee: true }) }, 'manager'),
    generateReport2: (campaignId) => request(`/api/360/manager/cycles/${campaignId}/report/2`, { method: 'POST', body: JSON.stringify({ sendToEmployee: true }) }, 'manager'),
    getReports: () => request('/api/360/manager/reports', {}, 'manager'),
    deleteReport: (id) => request(`/api/360/manager/reports/${id}`, { method: 'DELETE' }, 'manager'),
  },

  // Employee
  employee: {
    getDashboard: () => request('/api/360/employee/dashboard', {}, 'employee'),
    getCampaigns: () => request('/api/360/employee/cycles', {}, 'employee'),
    getSelfToken: (campaignId) => request(`/api/360/employee/cycles/${campaignId}/self-token`, {}, 'employee'),
    getReports: () => request('/api/360/employee/reports', {}, 'employee'),
  },

  // Admin
  admin: {
    getManagers: () => request('/api/360/admin/managers', {}, 'admin'),
    getCampaigns: (status) => request(`/api/360/admin/cycles${status ? `?status=${status}` : ''}`, {}, 'admin'),
    getCampaignData: (id) => request(`/api/360/admin/cycles/${id}/data`, {}, 'admin'),
    generateReport1: (campaignId, data) => request(`/api/360/admin/cycles/${campaignId}/report/1`, { method: 'POST', body: JSON.stringify(data) }, 'admin'),
    generateReport2: (campaignId, data) => request(`/api/360/admin/cycles/${campaignId}/report/2`, { method: 'POST', body: JSON.stringify(data) }, 'admin'),
    getReports: () => request('/api/360/admin/reports', {}, 'admin'),
    generateGroupReport: (data) => request('/api/360/admin/reports/group', { method: 'POST', body: JSON.stringify(data) }, 'admin'),
    getGroupReports: () => request('/api/360/admin/group-reports', {}, 'admin'),
  },
};

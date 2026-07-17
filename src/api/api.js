// Lightweight API helper for the frontend.
// Reads the API base URL from Vite env: VITE_API_URL.
// Falls back to the live Railway backend if the env variable is not configured.
{/*const API_BASE = (import.meta.env.VITE_API_URL || 'https://api-project-production-257e.up.railway.app').replace(/\/$/, '');

async function request(path, opts = {}) {
  const url = `${API_BASE}${path.startsWith('/') ? path : '/' + path}`;
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`Request failed: ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  return res.json().catch(() => null);
}

export async function fetchModels() {
  return request('/api/models/');
}

export async function healthCheck() {
  return request('/api/');
}


export default { fetchModels, healthCheck };*/}



// Lightweight API helper for the frontend.
// Reads the API base URL from Vite env: VITE_API_URL.
// Falls back to the live Railway backend if the env variable is not configured.
/*const API_BASE = (import.meta.env.VITE_API_URL || 'https://api-project-production-257e.up.railway.app').replace(/\/$/, '');

async function request(path, opts = {}) {
  const token = localStorage.getItem('access_token') // grab JWT once
  const headers = { ...(opts.headers || {}) }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const url = `${API_BASE}${path.startsWith('/') ? path : '/' + path}`;
  const res = await fetch(url, { ...opts, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`Request failed: ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  return res.json().catch(() => null);
}

export async function fetchModels() {
  return request('/api/models/');
}

export async function healthCheck() {
  return request('/api/');
}

// NEW: UPDATE CLIENT PROFILE
export async function updateProfile(formData) {
  return request('/api/profile/', {
    method: 'PUT',
    body: formData // DO NOT set Content-Type. Browser sets it for FormData
  })
}

// ONLY 1 DEFAULT EXPORT AT THE BOTTOM
export default { fetchModels, healthCheck, updateProfile };*/

const DEFAULT_API_BASE = 'https://api-project-production-257e.up.railway.app';
const configuredApiBase = (import.meta.env.VITE_API_URL || DEFAULT_API_BASE).trim();

// Guard against stale deployment env values still pointing at the old Render API.
const safeApiBase = configuredApiBase.includes('pro-models-api.onrender.com')
  ? DEFAULT_API_BASE
  : configuredApiBase;

export const API_BASE = safeApiBase.replace(/\/$/, '');

export function toAbsoluteMediaUrl(value) {
  if (!value || typeof value !== 'string') return value;
  if (value.startsWith('/photos/')) return value;
  if (/^https?:\/\//i.test(value)) return value.replace(/^http:\/\//i, 'https://');
  if (value.startsWith('//')) return `https:${value}`;
  return `${API_BASE}${value.startsWith('/') ? '' : '/'}${value}`;
}

async function request(path, opts = {}) {
  const token = localStorage.getItem('access_token')
  const headers = { ...(opts.headers || {}) }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const url = `${API_BASE}${path.startsWith('/') ? path : '/' + path}`;
  const res = await fetch(url, { ...opts, headers });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`Request failed: ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  
  // FIX: 204 has no body
  if (res.status === 204) return null;
  return res.json().catch(() => null);
}

export async function fetchModels() {
  return request('/api/models/');
}

export async function healthCheck() {
  return request('/api/');
}

export async function updateProfile(formData) {
  return request('/api/profile/', {
    method: 'PUT',
    body: formData
  })
}

export async function login(username, password) {
  return request('/api/login/', { // <-- CHANGE FROM /api/token/ TO /api/login/
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
}

export async function signup(payload) {
  return request('/api/signup/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
}

export async function submitContact(payload) {
  return request('/api/contact/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
}

export default { fetchModels, healthCheck, updateProfile, login, signup, submitContact };

// Lightweight API helper for the frontend.
// Reads the API base URL from Vite env: VITE_API_URL.
// Falls back to the live Railway backend if the env variable is not configured.
const API_BASE = (import.meta.env.VITE_API_URL || 'https://api-project-production-257e.up.railway.app').replace(/\/$/, '');

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

export default { fetchModels, healthCheck };

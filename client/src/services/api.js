const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${res.status}`);
  }
  return res.json();
};

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);
  },

  async logout() {
    const res = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return handleResponse(res);
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      credentials: 'include'
    });
    return handleResponse(res);
  },

  // Sessions
  async getSessions() {
    const res = await fetch(`${API_BASE}/sessions`);
    return handleResponse(res);
  },

  async getCurrentSession() {
    const res = await fetch(`${API_BASE}/sessions/current`);
    return handleResponse(res);
  },

  // Events
  async getEvents(sessionSlug = '') {
    const url = sessionSlug ? `${API_BASE}/events?session=${sessionSlug}` : `${API_BASE}/events`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  async createEvent(eventData) {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(eventData)
    });
    return handleResponse(res);
  },

  // Gallery
  async getGallery(sessionSlug = '') {
    const url = sessionSlug ? `${API_BASE}/gallery?session=${sessionSlug}` : `${API_BASE}/gallery`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  // People
  async getCabinet(sessionSlug = '') {
    const url = sessionSlug ? `${API_BASE}/people/cabinet?session=${sessionSlug}` : `${API_BASE}/people/cabinet`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  async getTeams(sessionSlug = '', category = '') {
    let url = `${API_BASE}/people/teams?`;
    if (sessionSlug) url += `session=${sessionSlug}&`;
    if (category && category !== 'ALL') url += `category=${category}&`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  // Submissions (Public)
  async submitForm(data) {
    const res = await fetch(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  // Image Upload (Device to Cloudinary / Data URI)
  async uploadImage(imageData, folder = 'sense_iiui') {
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageData, folder })
    });
    return handleResponse(res);
  },

  // Submissions (Admin)
  async getSubmissions() {
    const res = await fetch(`${API_BASE}/submissions`, {
      credentials: 'include'
    });
    return handleResponse(res);
  }
};

export default api;


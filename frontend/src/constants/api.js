const API_BASE = "https://dataverse-26la.onrender.com/api";

export const API = {
  EVENTS: `${API_BASE}/events`,
  EVENT_DETAILS: (id) => `${API_BASE}/events/${id}`,
  EVENT_FORM: (id) => `${API_BASE}/events/${id}/form`,
  REGISTER_EVENT: (id) => `${API_BASE}/events/${id}/register`,

  ADMIN_LOGIN: `${API_BASE}/admin/auth/login`,
  ADMIN_EVENTS: `${API_BASE}/admin/events`,
  ADMIN_EVENT: (id) => `${API_BASE}/admin/events/${id}`,
  ADMIN_EVENT_FORM: (id) => `${API_BASE}/admin/events/${id}/form`,
  ADMIN_EVENT_REGISTRATIONS: (id) =>
    `${API_BASE}/admin/events/${id}/registrations`,
  ADMIN_EVENT_EXPORT: (id, token) =>
    `${API_BASE}/admin/events/${id}/export?token=${token}`,
};

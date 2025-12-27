const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

const fetchWrapper = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Something went wrong");
  }

  return response.json();
};

const api = {
  users: {
    getAll: () => fetchWrapper(`${API_BASE_URL}/users`),
    create: (data) =>
      fetchWrapper(`${API_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  equipment: {
    getAll: () => fetchWrapper(`${API_BASE_URL}/equipment`),
    create: (data) =>
      fetchWrapper(`${API_BASE_URL}/equipment`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  requests: {
    getAll: () => fetchWrapper(`${API_BASE_URL}/requests`),
    create: (data, createdBy) =>
      fetchWrapper(`${API_BASE_URL}/requests?created_by=${createdBy}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    updateState: (id, state) =>
      fetchWrapper(`${API_BASE_URL}/requests/${id}/state?state=${state}`, {
        method: "PUT",
      }),
  },
};

export default api;

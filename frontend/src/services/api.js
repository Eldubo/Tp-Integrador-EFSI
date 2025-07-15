const API_URL = '/api';

export async function apiFetch(endpoint, { method = 'GET', body, headers = {}, params } = {}) {
  let url = API_URL + endpoint;
  if (params) {
    const query = new URLSearchParams(params).toString();
    url += '?' + query;
  }

  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }

  const response = await fetch(url, {
    method,
    headers,
    body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
  });

  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    throw data || { error: 'Error de red o servidor' };
  }
  return data;
} 
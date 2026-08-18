type Options = RequestInit & { params?: Record<string, string> };

async function request<T>(url: string, options: Options = {}): Promise<T> {
  const { params, ...init } = options;
  let fullUrl = url;
  if (params) {
    const qs = new URLSearchParams(params).toString();
    fullUrl += '?' + qs;
  }
  const res = await fetch(fullUrl, {
    headers: { 'Content-Type': 'application/json', ...init.headers },
    ...init,
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Request failed');
  return json.data as T;
}

export const api = {
  get: <T>(url: string, params?: Record<string, string>) => request<T>(url, { params }),
  post: <T>(url: string, body?: unknown) => request<T>(url, { method: 'POST', body: JSON.stringify(body) }),
  patch: <T>(url: string, body?: unknown) => request<T>(url, { method: 'PATCH', body: JSON.stringify(body) }),
};

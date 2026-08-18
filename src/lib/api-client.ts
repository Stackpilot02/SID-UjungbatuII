import { headers } from 'next/headers';

type Options = RequestInit & { params?: Record<string, string> };

async function resolveBaseUrl(): Promise<string> {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const h = await headers();
  const host = h.get('host');
  const proto = h.get('x-forwarded-proto') || 'http';
  return `${proto}://${host}`;
}

async function request<T>(url: string, options: Options = {}): Promise<T> {
  const { params, ...init } = options;
  let path = url;
  if (params) {
    const qs = new URLSearchParams(params).toString();
    path += '?' + qs;
  }
  const absoluteUrl = new URL(path, await resolveBaseUrl()).toString();
  const res = await fetch(absoluteUrl, {
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
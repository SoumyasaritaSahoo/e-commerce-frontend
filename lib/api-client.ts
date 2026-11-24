/**
 * Fetch wrapper for talking to the Django backend. Attaches the JWT access
 * token, and on a 401 attempts a single refresh-and-retry before giving up
 * (docs/08-security-plan.md, docs/09-tech-stack.md).
 */

import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "./auth-storage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });
  if (!response.ok) return null;

  const data = await response.json();
  setAccessToken(data.access);
  if (data.refresh) setRefreshToken(data.refresh);
  return data.access as string;
}

export async function apiFetch(path: string, options: RequestOptions = {}): Promise<Response> {
  const { skipAuth, headers, ...rest } = options;

  const doFetch = (token: string | null) =>
    fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(token && !skipAuth ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });

  let response = await doFetch(getAccessToken());

  if (response.status === 401 && !skipAuth) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      response = await doFetch(newToken);
    }
  }

  return response;
}

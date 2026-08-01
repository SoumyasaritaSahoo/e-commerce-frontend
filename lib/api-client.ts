/**
 * Fetch wrapper for talking to the Django backend. Attaches the JWT access
 * token, and on a 401 attempts a single refresh-and-retry before giving up
 * (docs/08-security-plan.md, docs/09-tech-stack.md).
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("accessToken");
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken =
    typeof window !== "undefined" ? window.localStorage.getItem("refreshToken") : null;
  if (!refreshToken) return null;

  const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });
  if (!response.ok) return null;

  const data = await response.json();
  window.localStorage.setItem("accessToken", data.access);
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

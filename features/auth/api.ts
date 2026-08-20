import { apiFetch } from "@/lib/api-client";

import type { LoginInput } from "./schemas";

interface TokenPair {
  access: string;
  refresh: string;
}

export class AuthError extends Error {}

export async function login(input: LoginInput): Promise<TokenPair> {
  const response = await apiFetch("/auth/login/", {
    method: "POST",
    body: JSON.stringify(input),
    skipAuth: true,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new AuthError(data?.detail ?? "Invalid email or password.");
  }

  return response.json();
}

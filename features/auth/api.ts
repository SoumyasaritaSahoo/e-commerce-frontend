import { apiFetch } from "@/lib/api-client";

import type { ForgotPasswordInput, LoginInput, RegisterInput, ResetPasswordInput } from "./schemas";

interface TokenPair {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    full_name: string;
    phone: string | null;
    role: string;
    is_email_verified: boolean;
  };
}

interface RegisteredUser {
  email: string;
  full_name: string;
  phone: string | null;
}

export class AuthError extends Error {
  fields?: Record<string, string>;

  constructor(message: string, fields?: Record<string, string>) {
    super(message);
    this.fields = fields;
  }
}

/**
 * The backend wraps every error as {"error": {"code", "message"}}, where
 * `message` is either a plain string or a DRF field-errors map
 * ({field: [msg, ...]}) for validation failures.
 */
function parseError(data: Record<string, unknown> | null, fallback: string): AuthError {
  const error = data?.error as { message?: unknown } | undefined;
  if (!error) return new AuthError(fallback);

  if (typeof error.message === "string") {
    return new AuthError(error.message);
  }

  if (error.message && typeof error.message === "object") {
    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(error.message as Record<string, unknown>)) {
      if (Array.isArray(value) && typeof value[0] === "string") {
        fields[key] = value[0];
      }
    }
    const firstMessage = Object.values(fields)[0];
    return new AuthError(firstMessage ?? fallback, Object.keys(fields).length > 0 ? fields : undefined);
  }

  return new AuthError(fallback);
}

export async function login(input: LoginInput): Promise<TokenPair> {
  const response = await apiFetch("/auth/login/", {
    method: "POST",
    body: JSON.stringify(input),
    skipAuth: true,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw parseError(data, "Invalid email or password.");
  }

  return response.json();
}

export async function requestPasswordReset(input: ForgotPasswordInput): Promise<void> {
  const response = await apiFetch("/auth/password/reset/", {
    method: "POST",
    body: JSON.stringify(input),
    skipAuth: true,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw parseError(data, "Could not send the reset email.");
  }
}

export async function confirmPasswordReset(token: string, input: ResetPasswordInput): Promise<void> {
  const response = await apiFetch("/auth/password/reset/confirm/", {
    method: "POST",
    body: JSON.stringify({ token, ...input }),
    skipAuth: true,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw parseError(data, "Could not reset your password.");
  }
}

export async function register(input: RegisterInput): Promise<RegisteredUser> {
  const response = await apiFetch("/auth/register/", {
    method: "POST",
    body: JSON.stringify(input),
    skipAuth: true,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw parseError(data, "Could not create your account.");
  }

  return response.json();
}

export async function verifyEmail(token: string): Promise<void> {
  const response = await apiFetch("/auth/verify-email/", {
    method: "POST",
    body: JSON.stringify({ token }),
    skipAuth: true,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw parseError(data, "Could not verify your email.");
  }
}

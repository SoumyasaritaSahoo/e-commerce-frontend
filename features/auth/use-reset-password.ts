"use client";

import { useMutation } from "@tanstack/react-query";

import { confirmPasswordReset } from "./api";
import type { ResetPasswordInput } from "./schemas";

interface ResetPasswordVariables {
  token: string;
  input: ResetPasswordInput;
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ token, input }: ResetPasswordVariables) => confirmPasswordReset(token, input),
  });
}

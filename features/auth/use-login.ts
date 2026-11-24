"use client";

import { useMutation } from "@tanstack/react-query";

import { setTokens } from "@/lib/auth-storage";

import { login } from "./api";
import type { LoginInput } from "./schemas";

interface LoginVariables {
  input: LoginInput;
  remember: boolean;
}

export function useLogin() {
  return useMutation({
    mutationFn: (variables: LoginVariables) => login(variables.input),
    onSuccess: (tokens, variables) => {
      setTokens(tokens, variables.remember, tokens.user.role);
    },
  });
}

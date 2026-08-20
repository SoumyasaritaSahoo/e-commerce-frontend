"use client";

import { useMutation } from "@tanstack/react-query";

import { login } from "./api";

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (tokens) => {
      window.localStorage.setItem("accessToken", tokens.access);
      window.localStorage.setItem("refreshToken", tokens.refresh);
    },
  });
}

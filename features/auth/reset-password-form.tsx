"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";

import { AuthError } from "./api";
import { resetPasswordSchema, type ResetPasswordInput } from "./schemas";
import { useResetPassword } from "./use-reset-password";

export function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const resetPassword = useResetPassword();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordInput>({ resolver: zodResolver(resetPasswordSchema) });

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <WarningIcon />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Invalid or expired link</h2>
          <p className="mt-1 text-sm text-zinc-600">
            This password reset link is missing or no longer valid. Request a new one below.
          </p>
        </div>

        <Link href="/forgot-password" className="w-full">
          <Button type="button" variant="gradient" className="w-full">
            Request a new link
          </Button>
        </Link>
      </div>
    );
  }

  const onSubmit = handleSubmit((values) => {
    resetPassword.mutate(
      { token, input: values },
      {
        onError: (error) => {
          if (error instanceof AuthError && error.fields) {
            for (const [field, message] of Object.entries(error.fields)) {
              if (field in values) {
                setError(field as keyof ResetPasswordInput, { message });
              }
            }
          }
        },
      },
    );
  });

  const formError =
    resetPassword.isError &&
    (!(resetPassword.error instanceof AuthError) || !resetPassword.error.fields) &&
    (resetPassword.error instanceof AuthError ? resetPassword.error.message : "Something went wrong. Try again.");

  if (resetPassword.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
          <CheckIcon />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Password reset</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Your password has been updated. You can now sign in with your new password.
          </p>
        </div>

        <Button type="button" variant="gradient" className="w-full" onClick={() => router.push("/login")}>
          Continue to Sign In
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">New password</Label>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password_confirm">Confirm new password</Label>
        <PasswordInput
          id="password_confirm"
          autoComplete="new-password"
          placeholder="••••••••"
          {...register("password_confirm")}
        />
        {errors.password_confirm && (
          <p className="text-sm text-red-600">{errors.password_confirm.message}</p>
        )}
      </div>

      {formError && <Alert variant="error">{formError}</Alert>}

      <Button type="submit" variant="gradient" disabled={resetPassword.isPending} className="gap-2">
        {resetPassword.isPending ? <Spinner className="text-current" /> : "Reset Password"}
      </Button>

      <p className="text-center text-sm text-zinc-500">
        Remembered your password?{" "}
        <Link href="/login" className="font-medium text-violet-600 hover:text-violet-700">
          Back to Sign In
        </Link>
      </p>
    </form>
  );
}

function WarningIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import { AuthError } from "./api";
import { MailIcon } from "./field-icons";
import { forgotPasswordSchema, type ForgotPasswordInput } from "./schemas";
import { useForgotPassword } from "./use-forgot-password";

export function ForgotPasswordForm() {
  const forgotPassword = useForgotPassword();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = handleSubmit((values) => {
    forgotPassword.mutate(values);
  });

  if (forgotPassword.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
          <MailIcon />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Check your email</h2>
          <p className="mt-1 text-sm text-zinc-600">
            If an account exists for <span className="font-medium text-zinc-900">{getValues("email")}</span>,
            we&apos;ve sent a link to reset your password.
          </p>
        </div>

        <Button type="button" variant="outline" onClick={() => forgotPassword.reset()} className="mt-2">
          Use a different email
        </Button>

        <Link href="/login" className="text-sm font-medium text-violet-600 hover:text-violet-700">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          icon={<MailIcon />}
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      {forgotPassword.isError && (
        <Alert variant="error">
          {forgotPassword.error instanceof AuthError
            ? forgotPassword.error.message
            : "Something went wrong. Try again."}
        </Alert>
      )}

      <Button type="submit" variant="gradient" disabled={forgotPassword.isPending} className="gap-2">
        {forgotPassword.isPending ? (
          <Spinner className="text-current" />
        ) : (
          <>
            Send Reset Link
            <ArrowRightIcon />
          </>
        )}
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

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

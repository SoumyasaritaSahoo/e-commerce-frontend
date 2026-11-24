"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";

import { AuthError } from "./api";
import { MailIcon } from "./field-icons";
import { loginSchema, type LoginInput } from "./schemas";
import { SocialLogin } from "./social-login";
import { useLogin } from "./use-login";

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const [remember, setRemember] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit((values) => {
    login.mutate(
      { input: values, remember },
      { onSuccess: () => router.push("/account/orders") },
    );
  });

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

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col gap-2 min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between">
        <label className="flex items-center gap-2 text-sm text-zinc-600">
          <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          Remember Me
        </label>
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          Forgot Password?
        </Link>
      </div>

      {login.isError && (
        <Alert variant="error">
          {login.error instanceof AuthError ? login.error.message : "Something went wrong. Try again."}
        </Alert>
      )}

      <Button type="submit" variant="gradient" disabled={login.isPending} className="gap-2">
        {login.isPending ? (
          <Spinner className="text-current" />
        ) : (
          <>
            Sign In
            <ArrowRightIcon />
          </>
        )}
      </Button>

      <SocialLogin />

      <p className="text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-violet-600 hover:text-violet-700">
          Create Account
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

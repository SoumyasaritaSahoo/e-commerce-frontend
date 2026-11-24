"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";

import { AuthError } from "./api";
import { MailIcon, PhoneIcon, UserIcon } from "./field-icons";
import { registerSchema, type RegisterInput } from "./schemas";
import { SocialLogin } from "./social-login";
import { useRegister } from "./use-register";

export function RegisterForm() {
  const router = useRouter();
  const registerUser = useRegister();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = handleSubmit((values) => {
    registerUser.mutate(values, {
      onSuccess: () => router.push("/login"),
      onError: (error) => {
        if (error instanceof AuthError && error.fields) {
          for (const [field, message] of Object.entries(error.fields)) {
            if (field in values) {
              setError(field as keyof RegisterInput, { message });
            }
          }
        }
      },
    });
  });

  const formError =
    registerUser.isError &&
    (!(registerUser.error instanceof AuthError) || !registerUser.error.fields) &&
    (registerUser.error instanceof AuthError ? registerUser.error.message : "Something went wrong. Try again.");

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="full_name">Full name</Label>
        <Input
          id="full_name"
          type="text"
          autoComplete="name"
          icon={<UserIcon />}
          placeholder="Jane Doe"
          {...register("full_name")}
        />
        {errors.full_name && <p className="text-sm text-red-600">{errors.full_name.message}</p>}
      </div>

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
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          icon={<PhoneIcon />}
          placeholder="+1 555 000 0000"
          {...register("phone")}
        />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password_confirm">Confirm password</Label>
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

      <Button type="submit" variant="gradient" disabled={registerUser.isPending} className="gap-2">
        {registerUser.isPending ? (
          <Spinner className="text-current" />
        ) : (
          <>
            Create Account
            <ArrowRightIcon />
          </>
        )}
      </Button>

      <SocialLogin />

      <p className="text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-violet-600 hover:text-violet-700">
          Sign In
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

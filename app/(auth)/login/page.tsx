import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Log in | Marketplace",
};

export default function LoginPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Welcome Back!</h1>
        <p className="mt-1 text-sm text-zinc-500">Login to continue your shopping journey</p>
      </div>
      <LoginForm />
    </>
  );
}

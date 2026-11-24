import type { Metadata } from "next";

import { RegisterForm } from "@/features/auth/register-form";

export const metadata: Metadata = {
  title: "Create account | Marketplace",
};

export default function RegisterPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Create Account</h1>
        <p className="mt-1 text-sm text-zinc-500">Join us and start shopping smarter</p>
      </div>
      <RegisterForm />
    </>
  );
}

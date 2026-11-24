import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password | Marketplace",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Forgot password?</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Enter your email and we&apos;ll send you a link to reset it
        </p>
      </div>
      <ForgotPasswordForm />
    </>
  );
}

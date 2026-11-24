import type { Metadata } from "next";
import { Suspense } from "react";

import { VerifyEmailForm } from "@/features/auth/verify-email-form";

export const metadata: Metadata = {
  title: "Verify email | Marketplace",
};

export default function VerifyEmailPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Verify your email</h1>
        <p className="mt-1 text-sm text-zinc-500">Confirming your email address</p>
      </div>
      <Suspense fallback={null}>
        <VerifyEmailForm />
      </Suspense>
    </>
  );
}

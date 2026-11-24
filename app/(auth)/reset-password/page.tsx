import type { Metadata } from "next";
import { Suspense } from "react";

import { ResetPasswordForm } from "@/features/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset password | Marketplace",
};

export default function ResetPasswordPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Reset password</h1>
        <p className="mt-1 text-sm text-zinc-500">Choose a new password for your account</p>
      </div>
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { AuthError } from "./api";
import { useVerifyEmail } from "./use-verify-email";

export function VerifyEmailForm() {
  const token = useSearchParams().get("token");
  const verifyEmail = useVerifyEmail();
  const triggered = useRef(false);

  useEffect(() => {
    if (!token || triggered.current) return;
    triggered.current = true;
    verifyEmail.mutate(token);
  }, [token, verifyEmail]);

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <WarningIcon />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Invalid or expired link</h2>
          <p className="mt-1 text-sm text-zinc-600">
            This verification link is missing or no longer valid.
          </p>
        </div>

        <Link href="/login" className="w-full">
          <Button type="button" variant="gradient" className="w-full">
            Back to Sign In
          </Button>
        </Link>
      </div>
    );
  }

  if (verifyEmail.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
          <CheckIcon />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Email verified</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Your email address has been confirmed. You can now sign in to your account.
          </p>
        </div>

        <Link href="/login" className="w-full">
          <Button type="button" variant="gradient" className="w-full">
            Continue to Sign In
          </Button>
        </Link>
      </div>
    );
  }

  if (verifyEmail.isError) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <WarningIcon />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Verification failed</h2>
          <p className="mt-1 text-sm text-zinc-600">
            {verifyEmail.error instanceof AuthError
              ? verifyEmail.error.message
              : "Something went wrong. Try again."}
          </p>
        </div>

        <Link href="/login" className="w-full">
          <Button type="button" variant="outline" className="w-full">
            Back to Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <Spinner className="size-8 text-violet-600" />
      <p className="text-sm text-zinc-600">Verifying your email…</p>
    </div>
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

import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Log in | Marketplace",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Log in</h1>
      <LoginForm />
    </>
  );
}

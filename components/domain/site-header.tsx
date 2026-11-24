"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

import { clearTokens, getIsAuthed, subscribeToAuthChanges } from "@/lib/auth-storage";

import { Logo } from "./logo";

const NAV_LINKS = [{ href: "/", label: "Home" }];

function getIsAuthedServerSnapshot() {
  return false;
}

export function SiteHeader() {
  const router = useRouter();
  const isAuthed = useSyncExternalStore(
    subscribeToAuthChanges,
    getIsAuthed,
    getIsAuthedServerSnapshot,
  );

  const handleLogout = () => {
    clearTokens();
    router.push("/");
  };

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <Logo />

        <nav className="flex flex-1 items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-zinc-900 dark:hover:text-zinc-100">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/cart" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            Cart
          </Link>
          {isAuthed ? (
            <>
              <Link href="/account/orders" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                Account
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Log out
              </button>
            </>
          ) : (
            <Link href="/login" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

const TABS = [
  { href: "/login", label: "Sign In", icon: <UserIcon /> },
  { href: "/register", label: "Create Account", icon: <UserPlusIcon /> },
];

export function AuthTabs() {
  const pathname = usePathname();
  const activeIndex = TABS.findIndex((tab) => tab.href === pathname);

  if (activeIndex === -1) return null;

  return (
    <div className="mb-8">
      <div className="flex rounded-full bg-zinc-100 p-1">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-full px-2 py-2 text-xs font-semibold transition-colors sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm",
                active
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900",
              )}
            >
              {tab.icon}
              {tab.label}
            </Link>
          );
        })}
      </div>

      {activeIndex >= 0 && (
        <div className="mt-1.5 h-0.5 w-1/2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-transform duration-300"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
      )}
    </div>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="8" r="4" />
      <path d="M2 20c0-4 3.1-7 7-7s7 3 7 7" />
      <path d="M19 8v6M22 11h-6" />
    </svg>
  );
}

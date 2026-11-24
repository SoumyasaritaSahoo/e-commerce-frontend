import { ReactNode } from "react";

import { SidebarNav, type SidebarNavItem } from "@/components/ui/sidebar-nav";

import { Logo } from "./logo";

interface DashboardShellProps {
  title: string;
  navItems: SidebarNavItem[];
  children: ReactNode;
}

export function DashboardShell({ title, navItems, children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between px-6 py-4">
          <Logo />
          <span className="text-sm font-medium text-zinc-500">{title}</span>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-4 py-8">
        <aside className="w-56 shrink-0">
          <SidebarNav items={navItems} />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-500">
        © {new Date().getFullYear()} Marketplace. All rights reserved.
      </div>
    </footer>
  );
}

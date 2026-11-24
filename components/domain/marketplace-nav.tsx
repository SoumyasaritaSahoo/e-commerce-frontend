import Link from "next/link";

import { Logo } from "./logo";

const NAV_LINKS = ["Home", "Shop", "Categories", "Deals", "About"];

export function MarketplaceNav() {
  return (
    <header className="relative z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-5 lg:px-10">
        <Logo className="text-zinc-900" />

        <nav className="hidden items-center gap-1 text-sm font-medium text-zinc-600 md:flex">
          {NAV_LINKS.map((label, index) => (
            <Link
              key={label}
              href="/"
              className={
                index === 0
                  ? "rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-white shadow-sm"
                  : "rounded-full px-4 py-2 transition-colors hover:bg-white/60 hover:text-zinc-900"
              }
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-zinc-700">
          <button type="button" aria-label="Search" className="hover:text-zinc-900">
            <SearchIcon />
          </button>
          <Link href="/account/wishlist" aria-label="Wishlist" className="hover:text-zinc-900">
            <HeartIcon />
          </Link>
          <Link href="/cart" className="relative flex items-center hover:text-zinc-900" aria-label="Cart">
            <CartIcon />
            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-[10px] font-bold text-white">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.5 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>
  );
}

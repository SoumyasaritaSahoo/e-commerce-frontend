import { SidebarNav } from "@/components/ui/sidebar-nav";

const ACCOUNT_NAV_ITEMS = [
  { href: "/account/orders", label: "Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/wishlist", label: "Wishlist" },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 gap-8 py-8">
      <aside className="w-56 shrink-0">
        <SidebarNav items={ACCOUNT_NAV_ITEMS} />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

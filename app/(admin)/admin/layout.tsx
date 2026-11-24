import { DashboardShell } from "@/components/domain/dashboard-shell";

const ADMIN_NAV_ITEMS = [
  { href: "/admin/vendors", label: "Vendors" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/payouts", label: "Payouts" },
  { href: "/admin/coupons", label: "Coupons" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell title="Admin" navItems={ADMIN_NAV_ITEMS}>
      {children}
    </DashboardShell>
  );
}

import { DashboardShell } from "@/components/domain/dashboard-shell";

const VENDOR_NAV_ITEMS = [
  { href: "/vendor/dashboard", label: "Dashboard" },
  { href: "/vendor/products", label: "Products" },
  { href: "/vendor/orders", label: "Orders" },
  { href: "/vendor/payouts", label: "Payouts" },
];

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell title="Vendor" navItems={VENDOR_NAV_ITEMS}>
      {children}
    </DashboardShell>
  );
}

import { SiteFooter } from "@/components/domain/site-footer";
import { SiteHeader } from "@/components/domain/site-header";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">{children}</div>
      <SiteFooter />
    </div>
  );
}

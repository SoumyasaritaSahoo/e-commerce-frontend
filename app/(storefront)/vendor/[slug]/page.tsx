export default async function PublicVendorStorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main className="flex flex-1 flex-col gap-2 p-16">
      <h1 className="text-2xl font-semibold">Vendor storefront: {slug}</h1>
      <p className="text-zinc-500">Public vendor page — features/vendors.</p>
    </main>
  );
}

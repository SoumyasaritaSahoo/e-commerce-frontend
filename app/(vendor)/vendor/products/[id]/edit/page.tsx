export default async function VendorProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="flex flex-1 flex-col gap-2 p-16">
      <h1 className="text-2xl font-semibold">Edit product {id}</h1>
      <p className="text-zinc-500">CSR, vendor-role-gated — features/catalog.</p>
    </main>
  );
}

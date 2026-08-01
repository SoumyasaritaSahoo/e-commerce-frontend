export default async function CustomerOrderDetailPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  return (
    <main className="flex flex-1 flex-col gap-2 p-16">
      <h1 className="text-2xl font-semibold">Order {orderNumber}</h1>
      <p className="text-zinc-500">CSR, behind auth — features/orders.</p>
    </main>
  );
}

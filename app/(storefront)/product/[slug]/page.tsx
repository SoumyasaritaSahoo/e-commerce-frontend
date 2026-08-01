export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main className="flex flex-1 flex-col gap-2 p-16">
      <h1 className="text-2xl font-semibold">Product: {slug}</h1>
      <p className="text-zinc-500">Public, SSR/ISR — features/catalog.</p>
    </main>
  );
}

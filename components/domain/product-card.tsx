import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";

interface ProductCardProps {
  slug: string;
  name: string;
  price: string;
  imageUrl?: string;
  vendorName?: string;
}

export function ProductCard({ slug, name, price, imageUrl, vendorName }: ProductCardProps) {
  return (
    <Link href={`/product/${slug}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-800">
          {imageUrl && <Image src={imageUrl} alt={name} fill className="object-cover" />}
        </div>
        <div className="p-4">
          {vendorName && <p className="text-xs text-zinc-500">{vendorName}</p>}
          <p className="mt-1 line-clamp-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {name}
          </p>
          <p className="mt-1 text-sm font-semibold">{price}</p>
        </div>
      </Card>
    </Link>
  );
}

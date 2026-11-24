"use client";

import { Button } from "@/components/ui/button";

interface CartItemRowProps {
  name: string;
  price: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItemRow({ name, price, quantity, onQuantityChange, onRemove }: CartItemRowProps) {
  return (
    <div className="flex items-center gap-4 border-b border-zinc-100 py-4 last:border-0 dark:border-zinc-900">
      <div className="flex-1">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{name}</p>
        <p className="text-sm text-zinc-500">{price}</p>
      </div>

      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(event) => onQuantityChange(Number(event.target.value))}
        className="w-16 rounded-md border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-700"
      />

      <Button variant="ghost" className="w-auto" onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
}

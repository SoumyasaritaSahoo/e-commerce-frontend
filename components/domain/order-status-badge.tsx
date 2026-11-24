import { Badge, type BadgeVariant } from "@/components/ui/badge";

// Mirrors VendorSubOrder.status in docs/05-database-design.md.
export type OrderStatus =
  | "pending"
  | "processing"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

const STATUS_VARIANTS: Record<OrderStatus, BadgeVariant> = {
  pending: "neutral",
  processing: "info",
  packed: "info",
  shipped: "info",
  delivered: "success",
  cancelled: "danger",
  returned: "warning",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  packed: "Packed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge variant={STATUS_VARIANTS[status]}>{STATUS_LABELS[status]}</Badge>;
}

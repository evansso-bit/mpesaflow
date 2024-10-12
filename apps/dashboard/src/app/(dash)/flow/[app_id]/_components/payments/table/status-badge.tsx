import { cn } from "@mpesaflow/ui/cn";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusColor =
    {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    }[status.toLowerCase()] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={cn("px-2 py-1 rounded-full text-xs font-medium", statusColor)}
    >
      {status}
    </span>
  );
}

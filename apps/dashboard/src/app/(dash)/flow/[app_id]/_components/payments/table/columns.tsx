"use client";

import { Button } from "@mpesaflow/ui/button";
import { Checkbox } from "@mpesaflow/ui/checkbox";
import { Icons } from "@mpesaflow/ui/icons";
import type { ColumnDef } from "@tanstack/react-table";
import { RelativeTime } from "./relative-time";
import { RowAction } from "./row-action";
import { StatusBadge } from "./status-badge";

type Payment = {
  transactionId: string;
  status: string;
  resultDesc: string;
  amount: number;
  phoneNumber: string;
  accountReference: string;
  transactionDesc: string;
  date_created: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "resultDesc",
    header: "Result Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      // biome-ignore lint/style/useNumberNamespace: <explanation>
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
      }).format(amount);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PhoneNumber
          <Icons.arrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "accountReference",
    header: "Account Reference",
  },
  {
    accessorKey: "transactionDesc",
    header: "Transaction Description",
  },
  {
    accessorKey: "date_created",
    header: "Created On",
    cell: ({ row }) => (
      <RelativeTime timestamp={row.getValue("date_created")} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return <RowAction payment={payment} />;
    },
  },
];

import { StatusBadge } from "./status-badge"
import { RelativeTime } from "./relative-time"

export type Payment = {
  transactionId: string
  status: string
  resultDesc: string
  amount: number
  phoneNumber: string
  accountReference: string
  transactionDesc: string
  date_created: string
}

export const columns = [
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
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
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
    accessorKey: "mpesaRequestId",
    header: "Mpesa Request ID",
  },
  {
    accessorKey: "date_created",
    header: "Date Created",
    cell: ({ row }) => <RelativeTime timestamp={row.getValue("date_created")} />,
  },
]
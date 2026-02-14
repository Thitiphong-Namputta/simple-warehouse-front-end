"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  CircleCheck,
  Loader,
  PackageSearch,
  CircleX,
  Banknote,
  CreditCard,
  Landmark,
  QrCode,
} from "lucide-react";
import Link from "next/link";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { formatDateTime } from "@/lib/utils";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  payment_method: "cash" | "credit_card" | "bank_transfer" | "promptpay";
  email: string;
  created_at: Date;
  updated_at: Date;
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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "success" ? (
          <CircleCheck className="fill-green-500 dark:fill-green-400" />
        ) : row.original.status === "pending" ? (
          <Loader className="fill-yellow-500 dark:fill-yellow-400" />
        ) : row.original.status === "processing" ? (
          <PackageSearch className="fill-blue-500 dark:fill-blue-400" />
        ) : (
          <CircleX className="fill-red-500 dark:fill-red-400" />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => {
      const method = row.original.payment_method;
      const config = {
        cash: {
          icon: Banknote,
          label: "Cash",
          color: "text-green-600 dark:text-green-400",
        },
        credit_card: {
          icon: CreditCard,
          label: "Credit Card",
          color: "text-blue-600 dark:text-blue-400",
        },
        bank_transfer: {
          icon: Landmark,
          label: "Bank Transfer",
          color: "text-purple-600 dark:text-purple-400",
        },
        promptpay: {
          icon: QrCode,
          label: "PromptPay",
          color: "text-orange-600 dark:text-orange-400",
        },
      }[method];
      const Icon = config.icon;
      return (
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${config.color}`} />
          <span>{config.label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated Date",
    cell: ({ row }) => {
      return <div>{formatDateTime(row.getValue("updated_at"))}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/warehouse/transaction/${payment.id}`}>
                View payment details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

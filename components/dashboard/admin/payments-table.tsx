"use client";

import { useEffect, useState, useCallback } from "react";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function copyRowInfo(payment: Payment) {
  var toCopy = "";

  toCopy +=
    "{status: " +
    payment.status +
    ", email: " +
    payment.email +
    ", amount: " +
    payment.amount +
    ", type: " +
    payment.type +
    ", tier: " +
    payment.tier +
    ", date: " +
    payment.date +
    "}";

  navigator.clipboard.writeText(toCopy);
}

export type Payment = {
  id: string;
  // customer?: string;
  amount: number;
  status: "Pending" | "Success" | "Failed";
  email: string;
  type?: string;
  tier?: string;
  date?: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "status",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Tier",
    accessorKey: "tier",
  },

  {
    header: "Date",
    accessorKey: "date",
  },
  {
    header: "",
    accessorKey: "action",
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
            <DropdownMenuItem onClick={() => copyRowInfo(payment)}>
              Copy payment
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

async function getData(): Promise<Payment[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          // customer: "Alice Johnson",
          amount: 120.0,
          status: "Success",
          email: "alice.johnson@example.com",
          type: "Credit Card",
          tier: "Gold",
          date: "2024-08-01",
        },
        {
          id: "2",
          // customer: "Bob Smith",
          amount: 89.99,
          status: "Pending",
          email: "bob.smith@example.com",
          type: "PayPal",
          tier: "Silver",
          date: "2024-08-02",
        },
        {
          id: "3",
          // customer: "Charlie Brown",
          amount: 54.5,
          status: "Failed",
          email: "charlie.brown@example.com",
          type: "Bank Transfer",
          tier: "Bronze",
          date: "2024-08-03",
        },
        {
          id: "4",
          // customer: "Diana Prince",
          amount: 200.0,
          status: "Success",
          email: "diana.prince@example.com",
          type: "Credit Card",
          tier: "Platinum",
          date: "2024-08-04",
        },
        {
          id: "5",
          // customer: "Edward Norton",
          amount: 75.75,
          status: "Pending",
          email: "edward.norton@example.com",
          type: "Debit Card",
          tier: "Gold",
          date: "2024-08-05",
        },
        {
          id: "6",
          // customer: "Fiona Green",
          amount: 45.0,
          status: "Failed",
          email: "fiona.green@example.com",
          type: "PayPal",
          tier: "Silver",
          date: "2024-08-06",
        },
        {
          id: "7",
          // customer: "George Lucas",
          amount: 320.0,
          status: "Success",
          email: "george.lucas@example.com",
          type: "Bank Transfer",
          tier: "Platinum",
          date: "2024-08-07",
        },
        {
          id: "8",
          // customer: "Hannah Montana",
          amount: 150.0,
          status: "Pending",
          email: "hannah.montana@example.com",
          type: "Credit Card",
          tier: "Gold",
          date: "2024-08-08",
        },
        {
          id: "8",
          // customer: "Hannah Montana",
          amount: 150.0,
          status: "Pending",
          email: "hannah.montana@example.com",
          type: "Credit Card",
          tier: "Gold",
          date: "2024-08-08",
        },
        {
          id: "8",
          // customer: "Hannah Montana",
          amount: 150.0,
          status: "Pending",
          email: "hannah.montana@example.com",
          type: "Credit Card",
          tier: "Gold",
          date: "2024-08-08",
        },
        {
          id: "8",
          // customer: "Hannah Montana",
          amount: 150.0,
          status: "Pending",
          email: "hannah.montana@example.com",
          type: "Credit Card",
          tier: "Gold",
          date: "2024-08-08",
        },
      ]);
    }, 1000); // Simulate a 1-second delay
  });
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    state: {
      sorting,
    },
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <></>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="space-x-2 pt-4">
        <DataTablePagination table={table} />
      </div>
    </>
  );
}

export default function TableLoad() {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const timeout = new Promise<null>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 10000)
    );

    try {
      const dataPromise = getData();
      const data = await Promise.race([dataPromise, timeout]);
      setData(data as Payment[]);
    } catch (error) {
      console.error("Failed to load data:", error);
      if (error instanceof Error && error.message === "Timeout") {
        setError("Reload or try again later.");
      } else {
        setError("Unable to load data.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="rounded-md">
      {loading ? (
        <div className="min-h-20 animate-pulse flex space-x-4 min-w-full bg-muted dark:bg-muted rounded-md"></div>
      ) : error ? (
        <div className="min-h-20 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            <p className="text-md font-medium text-[#18181B] dark:text-[#FAFAFA]">
              {error}
            </p>
            <Button
              variant="default"
              onClick={loadData} // Reload only data
              className="mt-2"
            >
              Reload Orders
            </Button>
          </div>
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}

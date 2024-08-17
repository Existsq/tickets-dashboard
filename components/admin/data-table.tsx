"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type Payment = {
  id: string;
  customer?: string;
  amount: number;
  status: "Processing" | "Success" | "Failed";
  email: string;
  type?: string;
  tier?: string;
  date?: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "tier",
    header: "Tier",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge className="text-xs" variant="outline">
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
];

async function getData(): Promise<Payment[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "728ed52f",
          amount: 100,
          status: "Failed",
          customer: "User",
          type: "Year",
          tier: "1 Tier",
          date: "2023-08-12",
          email: "m@example.com",
        },
        {
          id: "728ed52f",
          amount: 100,
          status: "Success",
          email: "m@example.com",
        },
        {
          id: "728ed52f",
          amount: 100,
          status: "Processing",
          email: "m@example.com",
        },
        {
          id: "728ed52f",
          amount: 100,
          status: "Success",
          email: "m@example.com",
        },
        {
          id: "728ed52f",
          amount: 100,
          status: "Success",
          email: "m@example.com",
        },
        {
          id: "728ed52f",
          amount: 100,
          status: "Success",
          email: "m@example.com",
        },
      ]);
    }, 2000); // 2-second delay
  });
}

function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
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
                Empty.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getData().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="rounded-md">
      {loading ? (
        <div className="min-h-20 animate-pulse flex space-x-4 min-w-full bg-zinc-100 dark:bg-zinc-900 rounded-md"></div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}

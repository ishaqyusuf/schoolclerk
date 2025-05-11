"use client";

import { PageItem } from "@/actions/get-transactions";
import { AnimatedNumber } from "@/components/animated-number";
import { NumberInput } from "@/components/currency-input";
import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@school-clerk/ui/cn";

export type Item = PageItem;
export const columns: ColumnDef<Item>[] = [
  {
    header: "Transaction",
    accessorKey: "billable",
    cell: ({ row: { original: item } }) => (
      <div>
        <div className="font-bold">{item.type}</div>
        <div className="">{item.summary}</div>
      </div>
    ),
  },
  {
    header: "Amount",
    accessorKey: "amount",
    meta: {
      className: "w-16",
    },
    cell: ({ row: { original: item } }) => (
      <div
        className={cn(
          item.amount > 0 ? "text-green-700" : "text-red-700",
          "font-mono",
        )}
      >
        <AnimatedNumber value={item.amount} />
      </div>
    ),
  },
  {
    header: "",
    accessorKey: "action",
    meta: {
      className: "",
    },
    cell: ({ row: { original: item } }) => <div></div>,
  },
];

"use client";

import { BillablePageItem } from "@/actions/get-billables";
import { ClassRoomPageItem } from "@/actions/get-class-rooms";
import { ColumnDef } from "@tanstack/react-table";

export type Item = BillablePageItem;
export const columns: ColumnDef<Item>[] = [
  {
    header: "Billable",
    accessorKey: "billable",
    cell: ({ row: { original: item } }) => <div></div>,
  },
  {
    header: "Department",
    accessorKey: "department",
    cell: ({ row: { original: item } }) => (
      <div>{/* {item.departmentName} */}</div>
    ),
  },
];

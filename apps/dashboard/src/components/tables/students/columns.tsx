"use client";

import { StudentData } from "@/actions/get-students-list";
import { Menu } from "@/components/menu";
import { ColumnDef } from "@tanstack/react-table";

import { ActionCell } from "../action-cell";

export type Item = StudentData;
export const columns: ColumnDef<StudentData>[] = [
  {
    header: "Student",
    accessorKey: "student",
    cell: ({ row: { original: item } }) => (
      <div>
        <div>{item.studentName}</div>
        <div>{item.gender}</div>
      </div>
    ),
  },
  {
    header: "Department",
    accessorKey: "department",
    cell: ({ row: { original: item } }) => <div>{item.department}</div>,
  },
  {
    header: "",
    accessorKey: "actions",
    meta: {
      className: "flex-1",
    },
    cell: ({ row: { original: item } }) => {
      return <ActionCell trash itemId={item.id}></ActionCell>;
    },
  },
];

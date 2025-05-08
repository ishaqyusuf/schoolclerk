"use client";

import { ClassRoomPageItem } from "@/actions/get-class-rooms";
import { TermBillablePageItem } from "@/actions/get-school-fees";
import { ColumnDef } from "@tanstack/react-table";

export type Item = TermBillablePageItem;
export const columns: ColumnDef<Item>[] = [
  {
    header: "Classroom",
    accessorKey: "class_room",
    cell: ({ row: { original: item } }) => (
      <div>
        {/* {item.classRoom?.name === item.departmentName
          ? ""
          : item.classRoom.name} */}
      </div>
    ),
  },
  {
    header: "Department",
    accessorKey: "department",
    cell: ({ row: { original: item } }) => (
      <div>{/* {item.departmentName} */}</div>
    ),
  },
];

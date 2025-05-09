"use client";

import { ClassRoomPageItem } from "@/actions/get-class-rooms";
import { ColumnDef } from "@tanstack/react-table";

export type ClassItem = ClassRoomPageItem;
export const columns: ColumnDef<ClassItem>[] = [
  {
    header: "Classroom",
    accessorKey: "class_room",
    meta: {},
    cell: ({ row: { original: item } }) => (
      <div>
        {Array.from(new Set([item.classRoom?.name, item.departmentName])).join(
          "-",
        )}
      </div>
    ),
  },
  {
    header: "Students",
    accessorKey: "department",
    cell: ({ row: { original: item } }) => <div>{10}</div>,
  },
  {
    header: "Subjects",
    accessorKey: "subjects",

    cell: ({ row: { original: item } }) => <div className="w-12">{0}</div>,
  },
];

"use client";

import { ClassRoomPageItem } from "@/actions/get-class-rooms";
import { ColumnDef } from "@tanstack/react-table";

export type ClassItem = ClassRoomPageItem;
export const columns: ColumnDef<ClassItem>[] = [
  {
    header: "Classroom",
    accessorKey: "class_room",
    cell: ({ row: { original: item } }) => (
      <div>
        {item.classRoom?.name === item.departmentName
          ? ""
          : item.classRoom.name}
      </div>
    ),
  },
  {
    header: "Department",
    accessorKey: "department",
    cell: ({ row: { original: item } }) => <div>{item.departmentName}</div>,
  },
];

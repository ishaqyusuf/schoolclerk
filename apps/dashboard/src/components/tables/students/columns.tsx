"use client";

import { ClassRoomPageItem } from "@/actions/get-class-rooms";
import { StudentData } from "@/actions/get-students-list";
import { ColumnDef } from "@tanstack/react-table";

export type Student = StudentData;
export const columns: ColumnDef<StudentData>[] = [
  {
    header: "Classroom",
    accessorKey: "class_room",
    cell: ({ row: { original: item } }) => <div>{item.studentName}</div>,
  },
  {
    header: "Department",
    accessorKey: "department",
    cell: ({ row: { original: item } }) => <div>{item.department}</div>,
  },
];

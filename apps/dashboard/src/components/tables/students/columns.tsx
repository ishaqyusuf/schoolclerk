"use client";

import { deleteStudentAction } from "@/actions/delete-student";
import { ClassRoomPageItem } from "@/actions/get-class-rooms";
import { StudentData } from "@/actions/get-students-list";
import ConfirmBtn from "@/components/confirm-button";
import { Menu } from "@/components/menu";
import { useLoadingToast } from "@/hooks/use-loading-toast";
import { ColumnDef } from "@tanstack/react-table";
import { useAction } from "next-safe-action/hooks";

import { ActionCell } from "../action-cell";

export type Item = StudentData;
export const columns: ColumnDef<StudentData>[] = [
  {
    header: "Classroom",
    accessorKey: "class_room",
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
    accessorKey: "action",
    cell: ({ row: { original: item } }) => {
      <ActionCell
        trash
        itemId={item.id}
        Menu={
          <>
            <Menu.Item>Hello</Menu.Item>
          </>
        }
      ></ActionCell>;
    },
  },
];

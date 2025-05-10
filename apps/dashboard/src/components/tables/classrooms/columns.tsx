"use client";

import { ClassRoomPageItem } from "@/actions/get-class-rooms";
import { Menu } from "@/components/menu";
import { ColumnDef } from "@tanstack/react-table";

import { ActionCell } from "../action-cell";

export type ClassItem = ClassRoomPageItem;
export const columns: ColumnDef<ClassItem>[] = [
  {
    header: "Classroom",
    accessorKey: "class_room",
    meta: {
      className: "sm:w-[350px]",
    },
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
    meta: {
      className: "w-[80px]",
    },
    cell: ({ row: { original: item } }) => <div>{10}</div>,
  },
  {
    header: "Subjects",
    accessorKey: "subjects",
    meta: {
      className: "w-[80px]",
    },
    cell: ({ row: { original: item } }) => <div className="">{0}</div>,
  },
  {
    header: "",
    accessorKey: "actions",
    meta: {
      className: "flex-1",
    },
    cell: ({ row: { original: item } }) => (
      <ActionCell trash itemId={item.classRoom?.id}>
        {/* <Menu>
          <Menu.Item>Hello Menu</Menu.Item>
        </Menu> */}
      </ActionCell>
    ),
  },
];

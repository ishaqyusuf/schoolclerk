"use client";

import { ClassRoomPageItem } from "@/actions/get-class-rooms";
import { Menu } from "@/components/menu";
import { ColumnDef } from "@tanstack/react-table";

import { ActionCell } from "../action-cell";
import { Badge } from "@school-clerk/ui/badge";
import { useClassesParams } from "@/hooks/use-classes-params";

export type ClassItem = ClassRoomPageItem;
export const __classQueryState: {
  context: ReturnType<typeof useClassesParams>;
} = {
  context: null as any,
};
export const columns: ColumnDef<ClassItem>[] = [
  {
    header: "Classroom",
    accessorKey: "class_room",
    meta: {
      className: "sm:w-[350px]",
    },
    cell: ({ row: { original: item } }) => <div>{item?.displayName}</div>,
  },
  {
    header: "Students",
    accessorKey: "department",
    meta: {
      className: "w-[80px]",
      onClick(item: ClassItem) {
        if (__classQueryState?.context) {
          __classQueryState?.context?.setParams({
            viewClassroomId: item?.id,
            classroomTab: "students",
          });
          console.log(item);
        }
      },
    },

    cell: ({ row: { original: item } }) => {
      return (
        <span className="flex text-center">
          <Badge>{item?._count?.studentSessionForms}</Badge>
        </span>
      );
    },
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
      <ActionCell trash itemId={item.id}>
        {/* <Menu>
          <Menu.Item>Hello Menu</Menu.Item>
        </Menu> */}
      </ActionCell>
    ),
  },
];

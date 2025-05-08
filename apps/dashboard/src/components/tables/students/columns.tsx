"use client";

import { deleteStudentAction } from "@/actions/delete-student";
import { ClassRoomPageItem } from "@/actions/get-class-rooms";
import { StudentData } from "@/actions/get-students-list";
import ConfirmBtn from "@/components/confirm-button";
import { useLoadingToast } from "@/hooks/use-loading-toast";
import { ColumnDef } from "@tanstack/react-table";
import { useAction } from "next-safe-action/hooks";

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
  {
    header: "",
    accessorKey: "action",
    cell: ({ row: { original: item } }) => {
      const toast = useLoadingToast();
      const deleteStudent = useAction(deleteStudentAction, {
        onSuccess(args) {
          toast.success("Deleted!", {
            variant: "destructive",
          });
        },
        onError(e) {},
      });
      return (
        <div>
          <ConfirmBtn
            trash
            onClick={(e) => {
              deleteStudent.execute({
                studentId: item.id,
              });
            }}
          />
        </div>
      );
    },
  },
];

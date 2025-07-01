import { ColumnDef } from "@/types";
import { RouterOutputs } from "@api/trpc/routers/_app";

export type ClassroomSubjectData =
  RouterOutputs["subjects"]["byClassroom"][number];
export const classroomSubjectsColumn: ColumnDef<ClassroomSubjectData>[] = [
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row: { original: item } }) => (
      <div>
        <div>{item.subject?.title}</div>
      </div>
    ),
  },
];

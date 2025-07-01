import { ColumnDef } from "@/types";
import { RouterOutputs } from "@api/trpc/routers/_app";

export type ClassroomSubjectData =
  RouterOutputs["enrollments"]["index"]["data"][number];
export const columns: ColumnDef<ClassroomSubjectData>[] = [
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row: { original: item } }) => (
      <div>
        <div>
          <>{item.surname}</>
        </div>
      </div>
    ),
  },
];

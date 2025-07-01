import { ColumnDef } from "@/types";
import { RouterOutputs } from "@school-clerk/api/trpc/routers/_app";

export type ClassroomSubjectData = RouterOutputs["students"]["get"];
export const columns: ColumnDef<ClassroomSubjectData>[] = [
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row: { original: item } }) => (
      <div>
        <div>
          <>{item.id}</>
        </div>
      </div>
    ),
  },
];

import { useTRPC } from "@/trpc/client";
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { DataTable } from "./tables/subjects/table";
import { Suspense } from "react";
import { TableSkeleton } from "./tables/skeleton";

export function ClassroomSubject({ departmentId }) {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Content departmentId={departmentId} />
    </Suspense>
  );
}

function Content({ departmentId }) {
  const trpc = useTRPC();
  const qc = useQueryClient();
  const { data, error } = useSuspenseQuery(
    trpc.subjects.getByClassroom.queryOptions(
      {
        departmentId,
      },
      {
        initialData() {
          return [];
        },
      },
    ),
  );
  const { data: allSubjects } = useSuspenseQuery(
    trpc.subjects.all.queryOptions({}),
  );
  return (
    <div>
      <DataTable data={data} />
    </div>
  );
}

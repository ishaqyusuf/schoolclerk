import { getCachedClassroomStudents } from "@/actions/cache/classrooms";
import { timeout } from "@/utils/timeout";
import { randomInt } from "@/utils/utils";
import { Skeleton } from "@school-clerk/ui/skeleton";
import { useAsyncMemo } from "use-async-memo";
import { NoResults } from "../tables/students/empty-states";
import { DataTable } from "../tables/students/table";
import { useTRPC } from "@/trpc/client";
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { TableSkeleton } from "../tables/skeleton";
import { Suspense } from "react";
import { useClassesParams } from "@/hooks/use-classes-params";
import { useStudentParams } from "@/hooks/use-student-params";

export function StudentOverview({}) {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Content />
    </Suspense>
  );
}
function Content({}) {
  const { setParams, ...params } = useStudentParams();

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useSuspenseQuery(
    trpc.students.overview.queryOptions(
      {
        studentId: params.studentViewId,
        termSheetId: params.studentTermSheetId,
      },
      {
        enabled: true,
        staleTime: 60 * 1000,
      },
    ),
  );
  const { data: studentTerms } = useSuspenseQuery(
    trpc.academics.getStudentTermsList.queryOptions(
      {
        studentId: params.studentViewId,
        // termSheetId: params.studentTermSheetId,
      },
      {
        enabled: true,
        staleTime: 60 * 1000,
      },
    ),
  );

  const ctx = useClassesParams();
  return (
    <>
      <div></div>
    </>
  );
}

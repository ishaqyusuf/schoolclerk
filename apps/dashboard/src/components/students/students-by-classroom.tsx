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

export function StudentsByClassRoom({ departmentId }) {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Content departmentId={departmentId} />
    </Suspense>
  );
}
function Content({ departmentId }) {
  const students = useAsyncMemo(async () => {
    if (!departmentId) {
      return null;
    }
    await timeout(randomInt(500));
    const s = await getCachedClassroomStudents(departmentId);
    return s;
  }, [departmentId]);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data, error } = useSuspenseQuery(
    trpc.students.get.queryOptions(
      {
        departmentId,
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
      <div>
        {!students?.data ? (
          <Skeleton />
        ) : students?.data?.length == 0 ? (
          <NoResults />
        ) : (
          <>
            <DataTable
              createAction={(e) => {
                ctx.setParams({
                  secondaryTab: "student-form",
                });
              }}
              // filterDataPromise={filterDataPromise}
              data={students.data}
              // loadMore={loadMore}
              // pageSize={pageSize}
              // hasNextPage={hasNextPage}
              // page={page}
            />
          </>
        )}
      </div>
    </>
  );
}

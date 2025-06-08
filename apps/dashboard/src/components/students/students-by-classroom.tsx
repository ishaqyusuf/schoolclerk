import { getCachedClassroomStudents } from "@/actions/cache/classrooms";
import { timeout } from "@/utils/timeout";
import { randomInt } from "@/utils/utils";
import { Skeleton } from "@school-clerk/ui/skeleton";
import { useAsyncMemo } from "use-async-memo";
import { NoResults } from "../tables/students/empty-states";
import { DataTable } from "../tables/students/table";

export function StudentsByClassRoom({ departmentId }) {
  const students = useAsyncMemo(async () => {
    if (!departmentId) {
      return null;
    }
    await timeout(randomInt(500));
    const s = await getCachedClassroomStudents({
      departmentId,
    });

    return s;
  }, [departmentId]);

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
              // filterDataPromise={filterDataPromise}
              data={students.data}
              // loadMore={loadMore}
              // pageSize={pageSize}
              // hasNextPage={hasNextPage}
              // page={page}
            />
          </>
        )}
        {/* {students?.data?.map((student) => (
          <div dir="rtl" key={student?.id}>
            <p className="">{student?.studentName}</p>
          </div>
        ))} */}
      </div>
    </>
  );
}

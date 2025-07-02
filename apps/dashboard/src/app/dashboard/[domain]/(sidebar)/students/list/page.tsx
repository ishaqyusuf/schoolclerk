import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import { Metadata } from "next";
import { SearchParams } from "nuqs";
import { loadStudentFilterParams } from "@/hooks/use-student-filter-params";
import { StudentSearchFilter } from "@/components/student-search-filter";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/tables/skeleton";
import { DataTable } from "@/components/tables/students/data-table";

export const metadata: Metadata = {
  title: "Students",
};
type Props = {
  searchParams: Promise<SearchParams>;
};
export default async function Page(props: Props) {
  const queryClient = getQueryClient();
  const searchParams = await props.searchParams;
  const filter = loadStudentFilterParams(searchParams);

  await queryClient.fetchInfiniteQuery(
    trpc.students.index.infiniteQueryOptions({}),
  );
  return (
    <HydrateClient>
      <div className="flex justify-between py-6">
        <StudentSearchFilter />
      </div>
      <div className="flex flex-col gap-6">
        <Suspense fallback={<TableSkeleton />}>
          <DataTable />
        </Suspense>
      </div>
    </HydrateClient>
  );
}

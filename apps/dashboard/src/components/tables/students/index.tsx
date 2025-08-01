import { studentFilterData } from "@/actions/cache/student-filter-data";
import { getSaasProfileCookie } from "@/actions/cookies/login-session";
import { getStudentListPageAction } from "@/actions/get-students-list";

import { EmptyState, NoResults } from "./empty-states";
import { DataTable } from "./table";

type Props = {
  //   page: number;
  //   query?: string | null;
  //   sort?: string[] | null;
  //   start?: string | null;
  //   end?: string | null;
  //   statuses?: string[] | null;
  //   customers?: string[] | null;
  query?;
};

const pageSize = 25;

export async function StudentsTable({ query }: Props) {
  const { start, end, statuses, customers, sort, page } = query;
  const filter = {
    start,
    end,
    statuses,
    customers,
  };
  const profile = await getSaasProfileCookie();
  const filterDataPromise = studentFilterData();

  async function loadMore({ from, to }: { from: number; to: number }) {
    "use server";

    return getStudentListPageAction({
      // start
      // to,
      // from: from + 1,
      // searchQuery: query,
      sort,
      ...query,
      // filter,
    });
  }
  const { data, meta } = await getStudentListPageAction({
    ...query,
    // searchQuery: query,
    // sort,
    // filter,
    // to: pageSize,
  });

  const hasNextPage = Boolean(
    meta?.count && meta.count / (page + 1) > pageSize,
  );

  if (!data?.length) {
    if (
      query?.length ||
      Object.values(filter).some((value) => value !== null)
    ) {
      return <NoResults />;
    }

    return <EmptyState />;
  }
  return (
    <DataTable
      filterDataPromise={filterDataPromise}
      data={data as any}
      loadMore={loadMore}
      pageSize={pageSize}
      hasNextPage={hasNextPage}
      // page={page}
    />
  );
}

"use client";

import { useStudentFilterParams } from "@/hooks/use-student-filter-params";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { TableProvider } from "..";
import { LoadMore } from "@/components/load-more";
import { Table, TableBody } from "@school-clerk/ui/table";
import { TableRow } from "../table-row";
import { TableHeaderComponent } from "../table-header";
import { columns } from "./columns";

export function DataTable({}) {
  const trpc = useTRPC();
  const { filter } = useStudentFilterParams();

  const { ref, inView } = useInView();

  const infiniteQueryOptions = (
    trpc.students.index as any
  ).infiniteQueryOptions(
    {
      ...filter,
    },
    {
      getNextPageParam: ({ meta }) => {
        console.log({ meta });
        return meta?.cusor?.toString();
      },
    },
  );
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery(infiniteQueryOptions);

  const tableData = useMemo(() => {
    return data?.pages.flatMap((page) => (page as any)?.data ?? []) ?? [];
  }, [data]);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <TableProvider
      args={[
        {
          columns: columns,
          data: tableData,
          // hasNextPage,
          // loadMore,
          // pageSize,
          // setParams,
          // params,
          tableMeta: {
            deleteAction(id) {
              // deleteStudent.execute({
              //   studentId: id,
              // });
            },
            rowClick(id, rowData) {
              // setParams({
              //   studentViewId: id,
              // });
            },
          },
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        <Table dir="rtl">
          <TableHeaderComponent />

          <TableBody>
            <TableRow />
          </TableBody>
        </Table>
        <LoadMore ref={ref} hasNextPage={hasNextPage} />
      </div>
    </TableProvider>
  );
}

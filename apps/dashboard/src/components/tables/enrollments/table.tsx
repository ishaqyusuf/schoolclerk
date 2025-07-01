"use client";

import React, { use, useEffect, useMemo } from "react";
import { deleteStudentAction } from "@/actions/delete-student";
import { StudentData } from "@/actions/get-students-list";
import { MiddaySearchFilter } from "@/components/midday-search-filter/search-filter";
import { useLoadingToast } from "@/hooks/use-loading-toast";
import { useStudentParams } from "@/hooks/use-student-params";
import { PageFilterData } from "@/types";
import { useAction } from "next-safe-action/hooks";

import { Button } from "@school-clerk/ui/button";
import { Table, TableBody } from "@school-clerk/ui/table";

import { TableProvider } from "..";
import { TableHeaderComponent } from "../table-header";
import { TableRow } from "../table-row";

import { Icons } from "@/components/icons";
import { columns } from "./columns";
import { useTRPC } from "@/trpc/client";
import { useStudentFilterParams } from "@/hooks/use-student-filter-params";
import { useInView } from "react-intersection-observer";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { LoadMore } from "@/components/load-more";

type Props = {
  // data?: any[];
  // loadMore?: (query) => Promise<any>;
  // pageSize?: number;
  // hasNextPage?: boolean;
  // filterDataPromise?;
};

export function DataTable({}: Props) {
  const trpc = useTRPC();
  const { filter, hasFilters } = useStudentFilterParams();
  const { ref, inView } = useInView();

  const infiniteQueryOptions = (
    trpc.enrollments.index as any
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
    return data?.pages.flatMap((page) => page?.data ?? []) ?? [];
  }, [data]);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleDeleteInvoice = (id: string) => {
    // setData((prev) => {
    //   return prev.filter((item) => item.id !== id);
    // });
    // deleteInvoice.execute({ id });
  };
  const toast = useLoadingToast();
  // const hasNextPage = false;
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
        {JSON.stringify({ hasNextPage })}

        <div className="flex">
          {/* <MiddaySearchFilter placeholder={"Search"} filterList={filterData} /> */}
          <div className="flex-1"></div>
          <Button
            className="whitespace-nowrap"
            variant="outline"
            onClick={() => {
              // setParams({
              //   createStudent: true,
              // });
            }}
          >
            <Icons.add className="size-4 mr-2" />
            New Student
          </Button>
        </div>
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

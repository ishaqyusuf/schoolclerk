"use client";

import React, { use, useEffect, useState } from "react";
import { StudentData } from "@/actions/get-students-list";
import { MiddaySearchFilter } from "@/components/midday-search-filter/search-filter";
import { useClassesParams } from "@/hooks/use-classes-params";
import { useStudentParams } from "@/hooks/use-student-params";
import { PageFilterData } from "@/types";
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useInView } from "react-intersection-observer";

import { Button } from "@school-clerk/ui/button";
import { Spinner } from "@school-clerk/ui/spinner";
import { Table, TableBody } from "@school-clerk/ui/table";

import { ClassroomTableHeader } from "./classroom-table-header";
import { columns } from "./columns";
import { ClassRow } from "./row";

type Props = {
  data: StudentData[];
  loadMore: ({
    from,
    to,
  }: {
    from: number;
    to: number;
  }) => Promise<{ data: StudentData[]; meta: { count: number } }>;
  pageSize: number;
  hasNextPage: boolean;
  filterDataPromise;
};

export function DataTable({
  data: initialData,
  loadMore,
  pageSize,
  hasNextPage: initialHasNextPage,
  filterDataPromise,
}: Props) {
  const [data, setData] = useState(initialData);
  const [from, setFrom] = useState(pageSize);
  const { ref, inView } = useInView();
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const { setParams, openStudentId } = useStudentParams();
  const filterData: PageFilterData[] = filterDataPromise
    ? use(filterDataPromise)
    : [];
  //   const deleteInvoice = useAction(deleteInvoiceAction);
  //   const { date_format: dateFormat } = useUserContext((state) => state.data);

  const selectedInvoice = data.find((invoice) => invoice?.id === openStudentId);

  const setOpen = (id?: string) => {
    if (id) {
      setParams({ openStudentId: id });
    } else {
      setParams(null);
    }
  };

  const handleDeleteInvoice = (id: string) => {
    setData((prev) => {
      return prev.filter((item) => item.id !== id);
    });

    // deleteInvoice.execute({ id });
  };

  const table = useReactTable({
    data,
    getRowId: ({ id }) => id,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      deleteInvoice: handleDeleteInvoice,
      //   dateFormat,
    },
  });

  const loadMoreData = async () => {
    const formatedFrom = from;
    const to = formatedFrom + pageSize * 2;

    try {
      const { data, meta } = await loadMore({
        from: formatedFrom,
        to,
      });

      setData((prev) => [...prev, ...data]);
      setFrom(to);
      setHasNextPage(meta.count > to);
    } catch {
      setHasNextPage(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreData();
    }
  }, [inView]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <MiddaySearchFilter
          placeholder={"Search"}
          filterList={filterData}
          // filterList={[
          //   {
          //     value: "search",
          //   },
          //   {
          //     value: "departmentId",
          //     label: 'Department',
          //     options:
          //   }
          // ]}
        />
        <div className="flex-1"></div>
        <Button
          variant="outline"
          onClick={() =>
            setParams({
              createStudent: true,
            })
          }
        >
          Create invoice
        </Button>
      </div>
      <Table>
        <ClassroomTableHeader table={table} />

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <ClassRow key={row.id} row={row} setOpen={setOpen} />
          ))}
        </TableBody>
      </Table>
      {hasNextPage && (
        <div className="mt-6 flex items-center justify-center" ref={ref}>
          <div className="flex items-center space-x-2 px-6 py-5">
            <Spinner />
            <span className="text-sm text-[#606060]">Loading more...</span>
          </div>
        </div>
      )}
    </div>
  );
}

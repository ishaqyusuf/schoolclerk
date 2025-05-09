"use client";

import React, { useEffect, useState } from "react";
import { MiddaySearchFilter } from "@/components/midday-search-filter/search-filter";
import { useTermBillableParams } from "@/hooks/use-term-billable-params";
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useInView } from "react-intersection-observer";

import { Button } from "@school-clerk/ui/button";
import { Spinner } from "@school-clerk/ui/spinner";
import { Table, TableBody } from "@school-clerk/ui/table";

import { TableProvider } from "..";
import { TableHeaderComponent } from "../table-header";
import { columns, Item } from "./columns";
import { ClassRow } from "./row";

type Props = {
  data: Item[];
  loadMore: ({
    from,
    to,
  }: {
    from: number;
    to: number;
  }) => Promise<{ data: Item[]; meta: { count: number } }>;
  pageSize: number;
  hasNextPage: boolean;
};

export function DataTable({
  data: initialData,
  loadMore,
  pageSize,
  hasNextPage: initialHasNextPage,
}: Props) {
  const [data, setData] = useState(initialData);
  const [from, setFrom] = useState(pageSize);
  const { ref, inView } = useInView();
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const { setParams, ...params } = useTermBillableParams();

  //   const deleteInvoice = useAction(deleteInvoiceAction);
  //   const { date_format: dateFormat } = useUserContext((state) => state.data);

  const setOpen = (id?: string) => {
    if (id) {
      setParams({});
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
    <TableProvider args={[table, setParams, params]}>
      <div className="flex flex-col gap-4">
        <div className="flex">
          <MiddaySearchFilter
            placeholder={"Search"}
            filterList={[
              {
                value: "search",
                icon: "Search",
              },
            ]}
          />
          <div className="flex-1"></div>
          <Button
            variant="outline"
            onClick={() => {
              setParams({
                createTermBillable: true,
              });
            }}
          >
            Create Bill
          </Button>
        </div>
        <Table>
          <TableHeaderComponent />

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
    </TableProvider>
  );
}

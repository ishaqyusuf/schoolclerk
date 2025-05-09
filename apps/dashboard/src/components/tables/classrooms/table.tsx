"use client";

import React, { useEffect, useState } from "react";
import { MiddaySearchFilter } from "@/components/midday-search-filter/search-filter";
import { useClassesParams } from "@/hooks/use-classes-params";
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
import { TableRow } from "../table-row";
import { columns, type ClassItem } from "./columns";

type Props = {
  data: ClassItem[];
  loadMore: ({
    from,
    to,
  }: {
    from: number;
    to: number;
  }) => Promise<{ data: ClassItem[]; meta: { count: number } }>;
  pageSize: number;
  hasNextPage: boolean;
};

export function DataTable({ data, loadMore, pageSize, hasNextPage }: Props) {
  const { setParams, ...params } = useClassesParams();

  const handleDeleteInvoice = (id: string) => {
    // setData((prev) => {
    //   return prev.filter((item) => item.id !== id);
    // });
    // deleteInvoice.execute({ id });
  };

  return (
    <TableProvider
      args={[
        {
          setParams,
          params,
          columns,
          tableMeta: {
            deleteAction: handleDeleteInvoice,
            rowClick(id, rowData) {
              setParams({
                viewClassroomId: id,
              });
            },
          },
          pageSize,
          hasNextPage,
          data,
        },
      ]}
    >
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
            onClick={() =>
              setParams({
                createClassroom: true,
              })
            }
          >
            Create invoice
          </Button>
        </div>
        <Table className="table-fixed">
          <TableHeaderComponent />

          <TableBody>
            <TableRow />
          </TableBody>
        </Table>
        {/* {hasNextPage && (
          <div className="mt-6 flex items-center justify-center" ref={ref}>
            <div className="flex items-center space-x-2 px-6 py-5">
              <Spinner />
              <span className="text-sm text-[#606060]">Loading more...</span>
            </div>
          </div>
        )} */}
      </div>
    </TableProvider>
  );
}

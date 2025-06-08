"use client";

import React, { useEffect } from "react";
import { deleteClassroomDepartmentAction } from "@/actions/delete-department";
import { MiddaySearchFilter } from "@/components/midday-search-filter/search-filter";
import { useClassesParams } from "@/hooks/use-classes-params";
import { useLoadingToast } from "@/hooks/use-loading-toast";
import { useAction } from "next-safe-action/hooks";

import { Button } from "@school-clerk/ui/button";
import { Spinner } from "@school-clerk/ui/spinner";
import { Table, TableBody } from "@school-clerk/ui/table";

import { TableProvider } from "..";
import { TableHeaderComponent } from "../table-header";
import { TableRow } from "../table-row";
import { __classQueryState, columns, type ClassItem } from "./columns";

type Props = {
  data: ClassItem[];
  loadMore: (query) => Promise<any>;
  pageSize: number;
  hasNextPage: boolean;
};

export function DataTable({ data, loadMore, pageSize, hasNextPage }: Props) {
  const classQueryState = useClassesParams();
  const { setParams, ...params } = classQueryState;
  __classQueryState.context = classQueryState;
  // useEffect(() => {}, []);
  const toast = useLoadingToast();
  const deleteAction = useAction(deleteClassroomDepartmentAction, {
    onSuccess(args) {
      toast.success("Deleted!", {
        variant: "destructive",
      });
    },
    onError(e) {
      console.log(e);
    },
  });
  const handleDeleteInvoice = (id: string) => {
    console.log("DELET", { id });
    toast.loading("Deleting...");
    deleteAction.execute({
      id,
    });
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
            // rowClick(id, rowData) {
            //   setParams({
            //     viewClassroomId: id,
            //   });
            // },
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

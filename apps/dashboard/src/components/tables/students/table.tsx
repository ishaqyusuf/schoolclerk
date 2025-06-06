"use client";

import React, { use } from "react";
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
import { columns } from "./columns";

type Props = {
  data: StudentData[];
  loadMore: (query) => Promise<any>;
  pageSize: number;
  hasNextPage: boolean;
  filterDataPromise;
};

export function DataTable({
  data,
  loadMore,
  pageSize,
  hasNextPage,
  filterDataPromise,
}: Props) {
  const { setParams, ...params } = useStudentParams();
  const filterData: PageFilterData[] = filterDataPromise
    ? use(filterDataPromise)
    : [];
  //   const deleteInvoice = useAction(deleteInvoiceAction);
  //   const { date_format: dateFormat } = useUserContext((state) => state.data);

  const handleDeleteInvoice = (id: string) => {
    // setData((prev) => {
    //   return prev.filter((item) => item.id !== id);
    // });
    // deleteInvoice.execute({ id });
  };
  const toast = useLoadingToast();
  const deleteStudent = useAction(deleteStudentAction, {
    onSuccess(args) {
      toast.success("Deleted!", {
        variant: "destructive",
      });
    },
    onError(e) {},
  });
  return (
    <TableProvider
      args={[
        {
          columns,
          data,
          hasNextPage,
          loadMore,
          pageSize,
          setParams,
          params,
          tableMeta: {
            deleteAction(id) {
              deleteStudent.execute({
                studentId: id,
              });
            },
            rowClick(id, rowData) {
              setParams({
                studentViewId: id,
              });
            },
          },
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        <div className="flex">
          <MiddaySearchFilter placeholder={"Search"} filterList={filterData} />
          <div className="flex-1"></div>
          <Button
            variant="outline"
            onClick={() =>
              setParams({
                createStudent: true,
              })
            }
          >
            Create student
          </Button>
        </div>
        <Table>
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

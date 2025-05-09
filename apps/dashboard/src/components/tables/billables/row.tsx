"use client";

import { flexRender, type Row } from "@tanstack/react-table";

import { cn } from "@school-clerk/ui/cn";
import { TableCell, TableRow } from "@school-clerk/ui/table";

import { Item } from "./columns";

type Props = {
  row: Row<Item>;
  setOpen: (id?: string) => void;
};

export function ClassRow({ row, setOpen }: Props) {
  return (
    <>
      <TableRow
        className="h-[57px]  cursor-pointer hover:bg-transparent"
        key={row.id}
      >
        {row.getVisibleCells().map((cell, index) => (
          <TableCell
            key={cell.id}
            className={cn(
              index === 2 && "w-[50px]",
              (cell.column.id === "actions" ||
                cell.column.id === "recurring" ||
                cell.column.id === "invoice_number" ||
                cell.column.id === "issue_date") &&
                "hidden md:table-cell",
            )}
            onClick={() =>
              index !== row.getVisibleCells().length - 1 && setOpen(row.id)
            }
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
}

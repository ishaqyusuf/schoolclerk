import { flexRender } from "@tanstack/react-table";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@school-clerk/ui/cn";
import { TableHead, TableHeader, TableRow } from "@school-clerk/ui/table";

import { useTable } from ".";

const tableHeaderVariants = cva("", {
  variants: {},
  defaultVariants: {},
});
export function TableHeaderComponent({}) {
  const {
    table,
    setParams,
    params: { sort },
  } = useTable();

  const [column, value] = sort || [];

  const createSortQuery = (name: string) => {
    const [currentColumn, currentValue] = sort || [];

    if (name === currentColumn) {
      if (currentValue === "asc") {
        setParams({ sort: [name, "desc"] });
      } else if (currentValue === "desc") {
        setParams({ sort: null });
      } else {
        setParams({ sort: [name, "asc"] });
      }
    } else {
      setParams({ sort: [name, "asc"] });
    }
  };
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="">
          {/* <CheckboxHeader /> */}
          {headerGroup.headers.map((header, index) => {
            if (!header.id.includes("__"))
              return (
                <TableHead
                  className={cn(
                    "whitespace-nowrap",
                    (header.column.columnDef.meta as any)?.className,
                    "h-10 uppercase",
                  )}
                  key={`${header.id}_${index}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
          })}
          {/* <ActionHeader /> */}
        </TableRow>
      ))}
    </TableHeader>
  );
}

import { Icons } from "@/components/icons";
import { useClassesParams } from "@/hooks/use-classes-params";
import { flexRender } from "@tanstack/react-table";

import { Button } from "@school-clerk/ui/button";
import { cn } from "@school-clerk/ui/cn";
import { TableHead, TableHeader, TableRow } from "@school-clerk/ui/table";

import { columns } from "./columns";

export function ClassroomTableHeader({ table }) {
  const { setParams, sort } = useClassesParams({ shallow: false });
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
        <TableRow key={headerGroup.id}>
          {/* <CheckboxHeader /> */}
          {headerGroup.headers.map((header, index) => {
            if (!header.id.includes("__"))
              return (
                <TableHead
                  className={cn("whitespace-nowrap")}
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

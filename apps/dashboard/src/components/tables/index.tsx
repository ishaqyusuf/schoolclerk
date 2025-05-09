import { createContextFactory } from "@/utils/context-factory";
import { useReactTable } from "@tanstack/react-table";

export const { useContext: useTable, Provider: TableProvider } =
  createContextFactory(function (
    table: ReturnType<typeof useReactTable<any>>,
    setParams?,
    params?,
  ) {
    return {
      table,
      setParams,
      params,
    };
  });

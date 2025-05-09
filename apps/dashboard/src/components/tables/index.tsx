import { createContextFactory } from "@/utils/context-factory";

export const { useContext: useTable, Provider: TableProvider } =
  createContextFactory(function (table, setParams, params) {
    return {
      table,
      setParams,
      params,
    };
  });

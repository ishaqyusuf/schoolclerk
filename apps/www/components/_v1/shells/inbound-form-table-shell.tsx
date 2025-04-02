"use client";

import { useMemo, useState, useTransition } from "react";
import { openModal } from "@/lib/modal";
import { TableShellProps } from "@/types/data-table";
import { ISalesOrderItem } from "@/types/sales";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@gnd/ui/button";

import {
    OrderRowAction,
    PrintOrderMenuAction,
} from "../actions/sales-menu-actions";
import {
    _FilterColumn,
    Cell,
    CheckColumn,
    ColumnHeader,
    DateCellContent,
    PrimaryCellContent,
    SecondaryCellContent,
} from "../columns/base-columns";
import { DataTable2 } from "../data-table/data-table-2";
import { InboundColumns } from "../forms/sales-inbound-order-form/inbound-columns";

export default function InboundFormTableShell<T>({
    data,
    pageInfo,
    searchParams,
    suppliers,
    create,
}: TableShellProps<ISalesOrderItem> & {
    suppliers: string[];
    create;
}) {
    const [isPending, startTransition] = useTransition();

    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

    const columns = InboundColumns(selectedRowIds, setSelectedRowIds, data);
    return (
        <>
            <DataTable2
                searchParams={searchParams}
                columns={columns}
                pageInfo={pageInfo}
                data={data}
                filterableColumns={[
                    {
                        id: "_supplier",
                        title: "Supplier",
                        // single: true,
                        options: [
                            { label: "No Supplier", value: "No Supplier" },
                            ...suppliers?.map((label) => ({
                                label,
                                value: label,
                            })),
                        ],
                    },
                ]}
                searchableColumns={[
                    {
                        id: "_q" as any,
                        title: "",
                    },
                ]}
                BatchAction={({ items }) => (
                    <>
                        <Button
                            className="h-8"
                            onClick={() => openModal("inboundModal", items)}
                        >
                            Create
                        </Button>
                    </>
                )}
            />
        </>
    );
}

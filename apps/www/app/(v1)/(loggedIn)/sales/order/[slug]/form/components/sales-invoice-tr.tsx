"use client";

import * as React from "react";
import { SalesFormCtx } from "@/app/(v1)/(loggedIn)/sales/_actions/sales-form";
import AutoComplete2 from "@/components/_v1/auto-complete-tw";
import Combobox from "@/components/_v1/combo-box";
import Money from "@/components/_v1/money";
import { store } from "@/store";
import { updateFooterInfo } from "@/store/invoice-item-component-slice";
import { ISalesOrder, ISalesOrderForm } from "@/types/sales";
import { CheckedState } from "@radix-ui/react-checkbox";

import { Checkbox } from "@gnd/ui/checkbox";
import { FormField } from "@gnd/ui/form";
import { Input } from "@gnd/ui/input";
import { Label } from "@gnd/ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@gnd/ui/table";

import { InvoiceItemRowContext } from "../invoice-item-row-context";
import InvoiceTableRowAction from "./invoice-table-row-action";
import ItemCell from "./item-cell";
import QtyCostCell from "./qty-cost-cell";
import SwingCell from "./swing-cell";

interface IProps {
    rowIndex;
    field;
    form;
    ctx: SalesFormCtx;
    startTransition2;
    isPending;
}
export interface SalesInvoiceCellProps {
    rowIndex;
    form: ISalesOrderForm;
    ctx?: SalesFormCtx;
}
export const SalesInvoiceTr = ({
    field,
    startTransition2,
    isPending,
    form,
    ctx,
    rowIndex: i,
}: IProps) => {
    //   const orderFormSlice = useAppSelector((state) => state.orderForm);
    // const watchItems = form.watch("items");
    // const [isPending, startTransition] = React.useTransition();
    const baseKey = `items.${i}`;

    //   const itemTotal = form.watch([`${baseKey}.qty`, `${baseKey}.price`] as any);
    const profitRate = form.watch("meta.sales_percentage");
    const profileEstimate = form.watch("meta.profileEstimate");
    const mockPercent = form.watch("meta.mockupPercentage");
    const [qty, price, rate] = form.watch([
        `${baseKey}.qty`,
        `${baseKey}.price`,
        `${baseKey}.rate`,
    ]);
    //  const qty = form.watchValues(`${baseKey}.price`)
    const rowContext = {
        baseKey,
        profitRate,
        profileEstimate,
        mockPercent,
        qty,
        rate,
        price,
    };

    return (
        <InvoiceItemRowContext.Provider value={rowContext as any}>
            <TableRow className="border-b-0 hover:bg-none">
                {isPending ? (
                    <TableCell colSpan={9} />
                ) : (
                    <>
                        <TableCell className="p-0 px-1 font-medium">
                            {i + 1}
                        </TableCell>
                        <TableCell id="component" className="p-0 px-1">
                            <FormField<ISalesOrder>
                                name={`items.${i}.meta.isComponent`}
                                control={form.control}
                                render={({ field }) => (
                                    <Checkbox
                                        id="component"
                                        checked={field.value as CheckedState}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                        </TableCell>
                        <ItemCell ctx={ctx} rowIndex={i} form={form} />
                        <SwingCell rowIndex={i} form={form} ctx={ctx} />
                        <TableCell id="supplier" className="p-0 px-1">
                            <FormField<ISalesOrder>
                                name={`items.${i}.supplier`}
                                control={form.control}
                                render={({ field }) => (
                                    <AutoComplete2
                                        allowCreate
                                        fluid
                                        {...field}
                                        options={ctx?.suppliers}
                                    />
                                )}
                            />
                        </TableCell>
                        <QtyCostCell form={form} rowIndex={i} />

                        <TotalCell form={form} rowIndex={i} />

                        <TableCell id="tax" align="center" className="p-0 px-1">
                            <TaxSwitchCell form={form} rowIndex={i} />
                        </TableCell>
                    </>
                )}
                <InvoiceTableRowAction
                    startTransition={startTransition2}
                    form={form}
                    rowIndex={i}
                />
            </TableRow>
        </InvoiceItemRowContext.Provider>
    );
};
function TotalCell({ rowIndex, form }) {
    const baseKey = `items.${rowIndex}`;
    const itemTotal = form.watch(`${baseKey}.total`);
    return (
        <TableCell align="right" id="total" className="p-0 px-1">
            <Label className="whitespace-nowrap">
                {/* {itemTotal > 0 && <span>$</span>} {itemTotal || "0.00"} */}
                <Money value={itemTotal} />
            </Label>
        </TableCell>
    );
}
function TaxSwitchCell({
    form,
    rowIndex,
}: {
    form: ISalesOrderForm;
    rowIndex;
}) {
    const keyName: any = `items.${rowIndex}.meta.tax`;
    const [checked, setChecked] = React.useState<CheckedState | undefined>(
        true,
    );
    React.useEffect(() => {
        const v = form.getValues(keyName);
        // if (v)
        setChecked(v);
    }, []);
    return (
        <Checkbox
            className=""
            id="tax"
            checked={checked}
            onCheckedChange={(e) => {
                setChecked(e);
                form.setValue(keyName, e);
                store.dispatch(
                    updateFooterInfo({
                        rowIndex,
                        taxxable: e == true,
                    }),
                );
            }}
        />
    );
}

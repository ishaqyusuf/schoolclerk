"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { fixPaymentAction } from "@/app/(v1)/(loggedIn)/sales/_actions/sales-payment";
import Btn from "@/components/_v1/btn";
import Money from "@/components/_v1/money";
import { useDataPage } from "@/lib/data-page-context";
import { keyValue } from "@/lib/utils";
import { useAppSelector } from "@/store";
import { ISalesOrder } from "@/types/sales";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@gnd/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@gnd/ui/table";

export default function CostBreakdown() {
    const { data: order } = useDataPage<ISalesOrder>();
    let paidReceipt = 0;
    order?.payments?.map((p) => (paidReceipt += p?.amount || 0));
    let pendingPayment = (order.grandTotal || 0) - paidReceipt;
    let offsetPayment = Math.round(pendingPayment - (order?.amountDue || 0));
    const data = [
        keyValue("Payment Option", order?.meta?.payment_option),
        keyValue("Labour", <Money value={order?.meta?.labor_cost} />),
        keyValue("Sub Total", <Money value={order?.subTotal} />),
        keyValue(
            `Tax (${order?.taxPercentage || 0}%)`,
            <Money value={order?.tax} />,
        ),
        keyValue(
            `C.C.C (${order?.meta?.ccc_percentage || 0}%)`,
            <Money value={order?.meta?.ccc || 0} />,
        ),
        keyValue(`Total`, <Money value={order?.grandTotal} />),
    ];
    if (order.type == "order") {
        data.push(
            ...[
                keyValue(
                    `Paid`,
                    <Money
                        value={(order.grandTotal || 0) - (order.amountDue || 0)}
                    />,
                ),
                keyValue(`Pending`, <Money value={order.amountDue || 0} />),
            ],
        );
    }
    const [isPending, startTransaction] = useTransition();
    const router = useRouter();
    async function fixPayment() {
        startTransaction(async () => {
            await fixPaymentAction({
                amountDue: +pendingPayment,
                id: order.id,
            });
            toast.success("Fixed!");
            router.refresh();
        });
    }
    return (
        <div className="sm:col-span-1">
            <Card className="max-sm:border-none">
                <CardHeader>
                    <CardTitle>Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="">
                    <Table>
                        <TableBody>
                            {data.map((line, index) => (
                                <TableRow key={index}>
                                    <TableCell className="p-1 font-bold text-muted-foreground">
                                        {line.key}
                                    </TableCell>
                                    <TableCell className="p-1.5 text-right">
                                        {line.value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {offsetPayment != 0 && order.type == "order" && (
                        <div className="mt-4 space-y-2">
                            <p className="text-sm font-semibold text-red-500">
                                Due amount does not correspond with the payment
                                history
                            </p>
                            <Btn
                                onClick={fixPayment}
                                isLoading={isPending}
                                className="h-8 w-full"
                            >
                                Fix
                            </Btn>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

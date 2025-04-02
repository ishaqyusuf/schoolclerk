"use client";

import Link from "next/link";
import { useDataPage } from "@/lib/data-page-context";
import { formatDate } from "@/lib/use-day";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store";
import { ICustomer } from "@/types/customers";
import { ISalesDashboard } from "@/types/dashboard";
import { ISalesOrder } from "@/types/sales";

import { Button } from "@gnd/ui/button";

import { OrderInvoiceCell } from "../../../app/(v1)/(loggedIn)/sales/orders/components/cells/sales-columns";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Table, TableBody, TableCell, TableRow } from "../../ui/table";
import {
    Cell,
    PrimaryCellContent,
    SecondaryCellContent,
} from "../columns/base-columns";

interface Props {
    className?;
}
export default function RecentSalesDashboardCard({ className }: Props) {
    const { data: db } = useDataPage<ISalesDashboard>();
    return (
        <Card className={cn(className)}>
            <CardHeader className="">
                <div className="flex items-center justify-between">
                    <CardTitle>Recent Sales</CardTitle>
                    <Button asChild variant="link">
                        <Link href="/sales/orders" className="text-sm">
                            All Sales
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="">
                <Table>
                    <TableBody>
                        {db?.recentSales?.map((order, key) => (
                            <TableRow key={key}>
                                <TableCell className="p-1">
                                    <Cell
                                        row={order}
                                        link="/sales/order/slug"
                                        slug={order.orderId}
                                    >
                                        <PrimaryCellContent>
                                            {order.orderId}
                                        </PrimaryCellContent>
                                        <SecondaryCellContent>
                                            {formatDate(order.createdAt)}
                                        </SecondaryCellContent>
                                    </Cell>
                                </TableCell>
                                <TableCell className="p-1">
                                    <Cell
                                        row={order}
                                        link="/sales/customer/slug"
                                        slug={order?.customerId}
                                    >
                                        <PrimaryCellContent>
                                            {order?.customer?.name}
                                        </PrimaryCellContent>
                                        <SecondaryCellContent>
                                            {order?.customer?.phoneNo}
                                        </SecondaryCellContent>
                                    </Cell>
                                </TableCell>
                                <TableCell align="right" className="p-1">
                                    <div>
                                        <OrderInvoiceCell order={order} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

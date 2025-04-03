"use client";

import { ProdItemActions } from "@/components/_v1/actions/prod-item-actions";
import { PrimaryCellContent } from "@/components/_v1/columns/base-columns";
import Money from "@/components/_v1/money";
import StatusBadge from "@/components/_v1/status-badge";
import XProgress from "@/components/_v1/x-progress";
import { useDataPage } from "@/lib/data-page-context";
import { formatDate } from "@/lib/use-day";
import { useAppSelector } from "@/store";
import { ISalesOrder, ISalesOrderItem } from "@/types/sales";
import { IInboundOrderItems } from "@/types/sales-inbound";

import { Badge } from "@gnd/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@gnd/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@gnd/ui/table";

export default function ItemDetailsSection() {
    const { data: order } = useDataPage<ISalesOrder>();
    const isProd = order?.ctx?.prodPage;

    return (
        <div className="">
            <Card className="max-sm:border-none">
                <CardHeader>
                    <CardTitle>Items</CardTitle>
                </CardHeader>
                <CardContent className="max-sm:-mt-4">
                    <div className="grid divide-y sm:hidden">
                        {order.items?.map((item, key) => (
                            <div className="grid gap-2 py-2" key={key}>
                                <PrimaryCellContent className="text-sm leading-relaxed">
                                    {item.description}{" "}
                                    <span className="mx-2">x{item.qty}</span>
                                </PrimaryCellContent>
                                <div className="items-centerspace-x-2 flex">
                                    <p className="whitespace-nowrap text-sm font-semibold uppercase text-muted-foreground">
                                        {item.swing}
                                    </p>
                                    {item.supplier && (
                                        <Badge className="bg-accent leading-none text-accent-foreground hover:bg-accent">
                                            {item.supplier}
                                        </Badge>
                                    )}
                                    <div className="flex-1"></div>
                                    {!isProd && (
                                        <div className="text-right text-sm font-semibold text-muted-foreground">
                                            {item.total && (
                                                <Money value={item.total} />
                                            )}
                                        </div>
                                    )}
                                </div>
                                {item.swing && (
                                    <div className="flex items-end justify-between space-x-2">
                                        <div className="grid gap-1">
                                            <div className="flex justify-end text-sm font-semibold">
                                                {item.meta.produced_qty || 0} of{" "}
                                                {item.qty} completed
                                            </div>
                                            <XProgress
                                                completed={
                                                    item.meta.produced_qty
                                                }
                                                total={item.qty}
                                            />
                                        </div>
                                        {isProd && (
                                            <div>
                                                <div className="p-2 font-semibold text-muted-foreground">
                                                    {item.swing && (
                                                        <ProdItemActions
                                                            item={item}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <Table className="max-sm:hidden">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-1">Item</TableHead>
                                <TableHead className="px-1">Swing</TableHead>
                                <TableHead className="w-16 px-1 text-center">
                                    Qty
                                </TableHead>
                                {!isProd && (
                                    <TableHead className="t w-20 px-1 text-left">
                                        Cost
                                    </TableHead>
                                )}
                                <TableHead className="w-20 px-1">
                                    Production
                                </TableHead>
                                {isProd && (
                                    <>
                                        <TableHead className="w-20 px-1 text-left"></TableHead>
                                    </>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.items?.map((item, key) => (
                                <TableRow key={key}>
                                    <TableCell className="p-2">
                                        <p className="uppercase">
                                            {item.description}
                                        </p>
                                        <div className="inline-flex space-x-2">
                                            {item.supplier && (
                                                <Badge className="bg-accent leading-none text-accent-foreground hover:bg-accent">
                                                    {item.supplier}

                                                    {item.meta.supplyDate &&
                                                        item.supplier &&
                                                        ` | ${formatDate(
                                                            item.meta
                                                                .supplyDate,
                                                        )}`}
                                                </Badge>
                                            )}
                                            {item.supplier && (
                                                <ItemInbound
                                                    item={item}
                                                    inbound={
                                                        item
                                                            .inboundOrderItem?.[0]
                                                    }
                                                />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-2 ">
                                        <p className="whitespace-nowrap font-semibold text-muted-foreground">
                                            {item.swing}{" "}
                                        </p>
                                    </TableCell>
                                    <TableCell className="p-2 text-center font-semibold text-muted-foreground">
                                        <p>{item.qty}</p>
                                    </TableCell>
                                    {!isProd && (
                                        <TableCell className="p-2 text-right font-semibold text-muted-foreground">
                                            <Money
                                                value={item.total}
                                                validOnly
                                            />
                                        </TableCell>
                                    )}
                                    <TableCell className="p-2 text-muted-foreground">
                                        {item.swing ? (
                                            <div className="grid gap-1">
                                                <span>
                                                    {item.meta.produced_qty ||
                                                        0}{" "}
                                                    of {item.qty}
                                                </span>
                                                <XProgress
                                                    completed={
                                                        item.meta.produced_qty
                                                    }
                                                    total={item.qty}
                                                />
                                            </div>
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>
                                    {isProd && (
                                        <>
                                            <TableCell className="p-2 font-semibold text-muted-foreground">
                                                {item.swing && (
                                                    <ProdItemActions
                                                        item={item}
                                                    />
                                                )}
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
function ItemInbound({
    inbound,
    item,
}: {
    item: ISalesOrderItem;
    inbound?: IInboundOrderItems;
}) {
    if (!inbound) {
        if (!item.meta.produced_qty)
            return <StatusBadge>Item not available</StatusBadge>;
        return <></>;
    }
    if (inbound.location) return <Badge>{inbound.location}</Badge>;
    return <StatusBadge>{inbound.status}</StatusBadge>;
}

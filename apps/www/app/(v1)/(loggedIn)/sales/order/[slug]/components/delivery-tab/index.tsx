"use client";

import { DateCellContent } from "@/components/_v1/columns/base-columns";
import { Icons } from "@/components/_v1/icons";
import { useModal } from "@/components/common/modal/provider";
import { useDataPage } from "@/lib/data-page-context";

import { Button } from "@gnd/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@gnd/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@gnd/ui/table";

import CreateDeliveryModal from "../../_modal/create-delivery";
import { SalesOverview } from "../../type";

export default function DeliveryTabIndex() {
    const { data: order } = useDataPage<SalesOverview>();
    const modal = useModal();
    let deliveries = order.itemDeliveries.map((item) => {
        return {
            ...item,
            item: order.items.find((i) => i.id == item.orderItemId),
        };
    });
    return (
        <div>
            <Card className="">
                <CardHeader className="">
                    <div className="flex items-center justify-between">
                        <CardTitle className="">
                            <span>Deliveries</span>
                        </CardTitle>
                        <div>
                            <Button
                                onClick={() => {
                                    // modal.openModal(
                                    //     <CreateDeliveryModal order={order} />
                                    // );
                                }}
                                size={"sm"}
                            >
                                <Icons.add className="mr-4 size-4" />
                                <span>Create Delivery</span>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                {deliveries?.length ? (
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Qty</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {deliveries.map((item) => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <DateCellContent>
                                                    {item.createdAt}
                                                </DateCellContent>
                                            </TableCell>
                                            <TableCell>
                                                {item.item?.description}
                                            </TableCell>
                                            <TableCell>{item.qty}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                ) : (
                    <CardContent className="flex h-[40vh] flex-col items-center justify-center text-muted-foreground">
                        {/* <Icons. */}
                        <span>No Deliveries</span>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}

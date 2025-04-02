import { Icons } from "@/components/_v1/icons";
import { TCell } from "@/components/(clean-code)/data-table/table-cells";
import { _modal } from "@/components/common/modal/provider";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";

import { Button } from "@gnd/ui/button";

import { openTxForm } from "../tx-form";
import { customerStore } from "./store";

export default function SalesTab() {
    const ctx = customerStore();
    return (
        <TabsContent value="sales">
            <div className="">
                <div className="flex justify-end gap-4">
                    <Button
                        onClick={() => {
                            // _modal.close();
                            // setTimeout(() => {
                            openTxForm({
                                phoneNo: ctx?.profile?.phoneNo,
                            });
                            // openPayPortal(ctx.profile?.phoneNo);
                            // }, 500);
                        }}
                        size="xs"
                    >
                        <Icons.reciept className="mr-2 size-4" />
                        Make Payment
                    </Button>
                    <Button disabled size="xs">
                        {/* <Icons.reciept className="mr-2 size-4" /> */}
                        Report
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableHead>Date</TableHead>
                        <TableHead>Order No</TableHead>
                        <TableHead>P.O</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Pending</TableHead>
                    </TableHeader>
                    <TableBody>
                        {ctx.salesInfo?.orders?.map((order) => (
                            <TableRow key={order.orderId}>
                                <TCell>
                                    <TCell.Date>{order.createdAt}</TCell.Date>
                                </TCell>
                                <TCell>
                                    <TCell.Secondary className="font-mono uppercase">
                                        {order.orderId}
                                    </TCell.Secondary>
                                </TCell>
                                <TCell>
                                    <TCell.Secondary className="font-mono uppercase">
                                        {order.po}
                                    </TCell.Secondary>
                                </TCell>
                                <TCell align="right">
                                    <TCell.Money value={order.grandTotal} />
                                </TCell>
                                <TCell align="right">
                                    <TCell.Money value={order.amountDue} />
                                </TCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TabsContent>
    );
}

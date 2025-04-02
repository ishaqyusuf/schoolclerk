import { TCell } from "@/components/(clean-code)/data-table/table-cells";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@gnd/ui/table";
import { TabsContent } from "@gnd/ui/tabs";

import { customerStore } from "./store";

export default function Quotes() {
    const ctx = customerStore();
    return (
        <TabsContent value="quotes">
            <div className="">
                <Table>
                    <TableHeader>
                        <TableHead>Date</TableHead>
                        <TableHead>Order No</TableHead>
                        <TableHead align="right">Amount</TableHead>
                    </TableHeader>
                    <TableBody>
                        {ctx.salesInfo?.quotes?.map((order) => (
                            <TableRow key={order.orderId}>
                                <TCell>
                                    <TCell.Date>{order.createdAt}</TCell.Date>
                                </TCell>
                                <TCell>
                                    <TCell.Secondary className="font-mono uppercase">
                                        {order.orderId}
                                    </TCell.Secondary>
                                </TCell>
                                <TCell align="right">
                                    <TCell.Money value={order.grandTotal} />
                                </TCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TabsContent>
    );
}

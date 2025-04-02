import { Label } from "@gnd/ui/label";
import { Progress } from "@gnd/ui/progress";

import { GetSalesOrderListItem } from "../../use-case/sales-list-use-case";

interface Props {
    status: GetSalesOrderListItem["stats"]["dispatchCompleted"];
    title?: string;
}
export function SalesItemStatus({ status, title }: Props) {
    return (
        <div className="my-2 rounded-lg  border p-2 px-4">
            <div className="mb-2">
                <Label className="">{title}</Label>
            </div>
            <Progress
                className="h-2"
                value={status?.percentage || 0}
                color={"green"}
            />
            <div className="mt-1 flex gap-2 text-xs text-muted-foreground">
                <div className="font-mono">
                    {`${status?.score || "-"}/${status?.total || "-"}`}
                </div>
                <div className="flex-1"></div>
                <div className="font-mono">{`${
                    status?.percentage || "-"
                }%`}</div>
            </div>
        </div>
    );
}

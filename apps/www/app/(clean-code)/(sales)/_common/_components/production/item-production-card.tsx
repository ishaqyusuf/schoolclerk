import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Menu } from "@/components/(clean-code)/menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Label } from "@gnd/ui/label";

import { Admin } from "../overview-sheet.bin/common/admin";
import { ItemProps } from "../overview-sheet.bin/common/sales-item-card";
import Badge from "../overview-sheet.bin/components/badge";
import { zSalesOverview } from "../overview-sheet.bin/utils/store";
import { ItemAssignProd } from "./item-assign-prod";
import { ItemAssignments } from "./item-assignments";

const SalesItemContext = createContext<ReturnType<typeof useSalesItemContext>>(
    null as any,
);
export const useSalesItem = () => useContext(SalesItemContext);
const useSalesItemContext = (props: ItemProps) => {
    const z = zSalesOverview();
    useEffect(() => {
        // z.overview.itemGroup.indexOf()
    }, []);
    function toggleItem() {
        if (z.expandProdItemUID == props.itemUid) {
            z.dotUpdate("expandProdItemUID", null);
        } else {
            //
            if (!props.item?.analytics?.control?.produceable)
                toast.error("Item not produceable");
            else {
                z.dotUpdate("expandProdItemUID", props.itemUid);
            }
        }
    }
    const expanded = useMemo(
        () => z.expandProdItemUID == props.itemUid,
        [z.expandProdItemUID, props.itemUid],
    );
    const pendingQty = props.item?.analytics?.pending?.assignment?.total;
    return {
        ...props,
        pendingQty,
        toggleItem,
        expanded,
    };
};
export function ItemProductionCard(props: ItemProps) {
    const ctx = useSalesItemContext(props);
    const { item } = ctx;
    const z = zSalesOverview();
    return (
        <SalesItemContext.Provider value={ctx}>
            <div
                className={cn(
                    "group my-3 border sm:rounded-lg",
                    ctx.expanded &&
                        "border-muted-foreground/40 bg-muted/40 shadow-lg",
                )}
            >
                <div className="flex">
                    <div
                        onClick={() => {
                            ctx.toggleItem();
                        }}
                        className="flex flex-1 cursor-pointer items-center gap-4 p-2 px-4 hover:group-[]:bg-muted/40"
                    >
                        <Label className="text-base uppercase">
                            {item.title}
                        </Label>
                        <Badge value={item.size} />
                        <Badge value={item.swing} />
                        <div className="flex-1"></div>
                    </div>
                    {/* <div className="flex-1"></div> */}
                    <div className="p-2">
                        <Admin>
                            <Menu>
                                <Menu.Item>Item 1</Menu.Item>
                            </Menu>
                        </Admin>
                    </div>
                </div>
                {(ctx.expanded || !z.adminMode) && (
                    <div className="border-t p-4">
                        <ItemAssignProd />
                        <ItemAssignments />
                    </div>
                )}
            </div>
        </SalesItemContext.Provider>
    );
}

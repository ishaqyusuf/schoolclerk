import Link from "next/link";
import { revalidateTable } from "@/components/(clean-code)/data-table/use-infinity-data-table";
import { Menu } from "@/components/(clean-code)/menu";
import { _modal } from "@/components/common/modal/provider";
import { Move } from "lucide-react";

import { useToast } from "@gnd/ui/use-toast";

import { moveOrderUseCase } from "../../../use-case/sales-book-form-use-case";
import { salesOverviewStore } from "../store";

export function MoveMenuAction({}) {
    const ctx = salesOverviewStore();
    const type = ctx.overview.type;
    const isDyke = ctx.overview.dyke;
    const { toast, dismiss, update } = useToast();
    async function _moveSales() {
        const to = type == "order" ? "quote" : "order";

        toast({
            duration: 10000,
            title: `Moved to ${to}`,
            variant: "spinner",
        });

        return;
        const resp = await moveOrderUseCase(ctx.overview.orderId, to);
        revalidateTable();
        console.log({ resp });

        if (resp.error) {
            // toast.error(resp.error);
            return;
        }
        _modal.close();

        // toast.success(`Moved to ${to}`, {
        //     action: {
        //         label: "Open",
        //         onClick(event) {},
        //     },
        // });
        // ctx.refreshList();
        // ctx.closeModal();
        // toast.success("Success", {
        //     action: {
        //         label: "Open",
        //         onClick(event) {},
        //     },
        // });
    }
    return (
        <Menu.Item onClick={_moveSales} Icon={Move}>
            {type == "order" ? "Move to Quote" : "Move to Sales"}
        </Menu.Item>
    );
}

"use client";

import { useModal } from "@/components/common/modal/provider";
import { openModal } from "@/lib/modal";
import { ModalName } from "@/store/slicers";
import { MenuIcon, MoreHorizontal } from "lucide-react";

import { Button } from "@gnd/ui/button";

import MobileMenuCtx from "./mobile-menu-ctx";

interface Props {
    data;
}
export default function MobileMenuBtn({ data }: Props) {
    const modal = useModal();
    return (
        <Button
            onClick={() => {
                modal.openSheet(<MobileMenuCtx item={data} />);
            }}
            size="icon"
            className="h-5 w-5 p-0"
            variant={"secondary"}
        >
            <MoreHorizontal className="size-4" />
        </Button>
    );
}

"use client";

import { Icons } from "@/components/_v1/icons";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createPortal } from "react-dom";

import { Button } from "@gnd/ui/button";

export default Object.assign(({ children }) => {
    const Element = document?.getElementById("headerNav");
    if (!Element) return;
    return createPortal(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="icon" className="h-6 w-6" variant="outline">
                    <Icons.more className="size-4" />
                </Button>
            </DropdownMenuTrigger>
        </DropdownMenu>,
        Element,
    );
}, {});

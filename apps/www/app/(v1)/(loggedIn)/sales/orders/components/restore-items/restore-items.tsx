"use client";

import { useTransition } from "react";
import Btn from "@/components/_v1/btn";
import { toast } from "sonner";

import { Button } from "@gnd/ui/button";

import { restoreItems } from "./action";

export default function RestoreOrders() {
    const [loading, startLoading] = useTransition();

    return (
        <>
            <Btn
                isLoading={loading}
                onClick={async () => {
                    startLoading(async () => {
                        const resp = await restoreItems();
                        console.log(resp);
                        toast.message(resp);
                    });
                }}
            >
                Restore
            </Btn>
        </>
    );
}


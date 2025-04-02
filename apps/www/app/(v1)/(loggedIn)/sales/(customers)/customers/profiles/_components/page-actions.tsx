"use client";

import { Icons } from "@/components/_v1/icons";
import { useModal } from "@/components/common/modal/provider";

import { Button } from "@gnd/ui/button";

import CustomerProfileModal from "./employee-profile-modal";

export default function PageAction() {
    const modal = useModal();
    return (
        <>
            <Button
                onClick={() => {
                    modal.openModal(<CustomerProfileModal />);
                }}
                size={"sm"}
            >
                <Icons.add className="mr-4 size-4" />
                <span>New</span>
            </Button>
        </>
    );
}

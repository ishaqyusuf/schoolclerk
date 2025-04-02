import { Icons } from "@/components/_v1/icons";
import Modal from "@/components/common/modal";
import { _modal } from "@/components/common/modal/provider";
import { useForm } from "react-hook-form";

import { Button } from "@gnd/ui/button";

import { useQueryTabStore } from "./data-store";

export function QueryTabAction({}) {
    const t = useQueryTabStore();
    if (t?.pageInfo?.links?.length < 2) return null;
    return (
        <Button
            onClick={() => {
                _modal.openModal(<QueryTabModal />);
            }}
            variant="outline"
        >
            <Icons.settings className="mr-2 size-4" />
            <span>Tab</span>
        </Button>
    );
}
function QueryTabModal({}) {
    const store = useQueryTabStore();
    const form = useForm({
        defaultValues: {
            tabs: store.pageInfo?.links,
        },
    });

    return <Modal.Content></Modal.Content>;
}

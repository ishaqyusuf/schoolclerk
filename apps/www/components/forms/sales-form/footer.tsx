import { openSalesOverview } from "@/app/(clean-code)/(sales)/_common/_components/sales-overview-sheet";
import { openTxForm } from "@/app/(clean-code)/(sales)/_common/_components/tx-form";
import { useFormDataStore } from "@/app/(clean-code)/(sales)/sales-book/(form)/_common/_stores/form-data-store";
import { Icons } from "@/components/_v1/icons";
import Money from "@/components/_v1/money";
import { toast } from "sonner";

import { Button } from "@gnd/ui/button";

import { SalesFormSave } from "./sales-form-save";

export function Footer({}) {
    const zus = useFormDataStore();
    let amountDue = zus.metaData.pricing?.dueAmount;
    return (
        <div className="border-t pt-2">
            <div className="flex justify-end gap-4">
                {
                    <Button
                        onClick={() => {
                            console.log(zus.metaData);
                            if (!zus.metaData?.cad)
                                toast.error(
                                    "Payment requires a valid customer name.",
                                );
                            else
                                openTxForm({
                                    phoneNo: zus.metaData.customer?.phone,
                                    customerId: zus.metaData.cad,
                                    paymentMethod: "terminal",
                                    payables: [
                                        {
                                            amountDue,
                                            id: zus.metaData.id,
                                            orderId: zus.metaData.salesId,
                                        },
                                    ],
                                });
                        }}
                        size="xs"
                        disabled={!amountDue || !zus.metaData.salesId}
                    >
                        <Icons.dollar className="mr-2 size-4" />
                        <Money value={amountDue}></Money>
                    </Button>
                }
                <Button
                    disabled={!zus.metaData.id}
                    onClick={() => {
                        openSalesOverview({
                            salesId: zus.metaData.id,
                        });
                    }}
                    size="xs"
                    variant="outline"
                >
                    <span>Overview</span>
                </Button>
                <SalesFormSave type="button" />
            </div>
        </div>
    );
}

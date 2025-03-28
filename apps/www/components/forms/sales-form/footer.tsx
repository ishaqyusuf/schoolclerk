import { openSalesOverview } from "@/app/(clean-code)/(sales)/_common/_components/sales-overview-sheet";
import { useFormDataStore } from "@/app/(clean-code)/(sales)/sales-book/(form)/_common/_stores/form-data-store";
import { Button } from "@/components/ui/button";

import { SalesFormSave } from "./sales-form-save";

export function Footer({}) {
    const zus = useFormDataStore();
    return (
        <div className="border-t pt-2">
            <div className="flex justify-end gap-4">
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

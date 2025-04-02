import Button from "@/components/common/button";
import FormInput from "@/components/common/controls/form-input";
import { cn, sum } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@gnd/ui/collapsible";
import { Form, FormField } from "@gnd/ui/form";
import { Input } from "@gnd/ui/input";
import { Label } from "@gnd/ui/label";

import { LineItemOverview } from "../../data-access/dto/sales-item-dto";
import { submitAssignmentUseCase } from "../../use-case/sales-prod.use-case";
import { useAssignment } from "./item-assignments";
import { useSalesItem } from "./item-production-card";

export function SubmitForm() {
    const itemCtx = useSalesItem();
    const ctx = useAssignment();
    const form = ctx.form;
    async function submit() {
        const s = await form.trigger();
        const formData = form.getValues();
        formData.qty = formData.qty || sum([formData.lhQty, formData.rhQty]);
        console.log(s);
        const item = itemCtx.item;
        if (s) {
            await submitAssignmentUseCase(
                {
                    salesOrderItemId: item.salesItemId,
                    assignmentId: ctx.assignment.id,
                    salesOrderId: item.orderId,
                    ...formData,
                },
                item?.analytics?.control?.produceable,
            );
            toast.success("Submitted");
        } else {
            toast.error("Invalid entry");
        }
    }
    return (
        <div className="gap-4 border-b py-2 sm:flex">
            <Label className="font-mono">Submit Assignment</Label>
            <div className="flex-1">
                <Form {...form}>
                    <div className="mb-2">
                        <QtyInput label="lh Qty" />
                        <QtyInput label="rh Qty" />
                        <QtyInput label="qty" />
                    </div>
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="flex w-full">
                                <span>Note</span>
                                <div className="flex-1"></div>
                                <span>
                                    <ChevronsUpDown className="size-4" />
                                </span>
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-2">
                            <FormInput
                                type="textarea"
                                control={form.control}
                                name="note"
                            />
                        </CollapsibleContent>
                    </Collapsible>

                    <div className="flex justify-end gap-2">
                        <Button
                            onClick={(e) => {
                                ctx.setSubmit(false);
                            }}
                            variant="destructive"
                        >
                            Close
                        </Button>
                        <Button action={submit}>Submit</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
function QtyInput({ label }) {
    const qtyKey = label?.split(" ")?.[0];
    const qtyFormKey = label?.split(" ")?.join("");

    const ctx = useAssignment();
    const submitable = ctx.assignment?.pending?.[qtyKey];
    // const qty = ctx.form.watch(qtyFormKey);

    if (!submitable) return null;
    return (
        <div className="flex items-center justify-end gap-4">
            <Label className="font-mono uppercase">
                {label} ({submitable})
            </Label>
            <div className="flex w-auto items-end">
                {/* <Button size="xs" variant="link">
                    -
                </Button> */}
                <FormField
                    control={ctx.form.control}
                    name={qtyFormKey}
                    render={(props) => (
                        <Input
                            value={props.field.value}
                            onChange={(e) => {
                                // props.field.onChange(e);
                                ctx.form.setValue(qtyFormKey, +e.target.value);
                            }}
                            className={cn(
                                "h-8 w-20 border-0 border-b p-1 text-center font-mono",
                            )}
                            inputMode="numeric"
                            type="number"
                        />
                    )}
                />
                {/* <Button size="xs" variant="link">
                    +
                </Button> */}
            </div>
        </div>
    );
}

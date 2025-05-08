import { useTermBillableParams } from "@/hooks/use-term-billable-params";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@school-clerk/ui/sheet";

import { FormContext } from "../billable/form-context";
import { BillableForm } from "../forms/billable-form";

export function BillableCreateSheet({}) {
  const { createTermBillable, setParams } = useTermBillableParams();
  const isOpen = createTermBillable;
  if (!isOpen) return null;

  return (
    <FormContext>
      <Sheet open={isOpen} onOpenChange={() => setParams(null)}>
        <SheetContent className="flex flex-col gap-2">
          <SheetHeader>
            <SheetTitle>Billable Form</SheetTitle>
          </SheetHeader>
          <BillableForm />
        </SheetContent>
      </Sheet>
    </FormContext>
  );
}

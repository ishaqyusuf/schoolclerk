import { useSchoolFeeParams } from "@/hooks/use-school-fee-params";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@school-clerk/ui/sheet";

import { SchoolFeeForm } from "../forms/school-fee-form";
import { FormContext } from "../school-fee/form-context";

export function SchoolFeeCreateSheet({}) {
  const { createSchoolFee, setParams } = useSchoolFeeParams();
  const isOpen = createSchoolFee;
  if (!isOpen) return null;

  return (
    <FormContext>
      <Sheet open={isOpen} onOpenChange={() => setParams(null)}>
        <SheetContent className="flex flex-col gap-2">
          <SheetHeader>
            <SheetTitle>Fee Form</SheetTitle>
          </SheetHeader>
          <SchoolFeeForm />
        </SheetContent>
      </Sheet>
    </FormContext>
  );
}

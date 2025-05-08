import { useClassesParams } from "@/hooks/use-classes-params";
import { useStudentParams } from "@/hooks/use-student-params";
import { useTermBillableParams } from "@/hooks/use-term-billable-params";

import { SheetHeader, SheetTitle } from "@school-clerk/ui/sheet";

import { CustomSheet, CustomSheetContent } from "../custom-sheet-content";
import { Form } from "../forms/student-form";
import { FormContext } from "../students/form-context";

export function StudentCreateSheet({}) {
  const { createStudent, setParams } = useStudentParams();
  const isOpen = createStudent;
  if (!isOpen) return null;

  return (
    <FormContext>
      <CustomSheet
        floating
        rounded
        size="lg"
        open={isOpen}
        onOpenChange={() => setParams(null)}
        sheetName="create-student"
      >
        <SheetHeader>
          <SheetTitle>Student Form</SheetTitle>
        </SheetHeader>
        <CustomSheetContent className="flex flex-col gap-2">
          <Form />
        </CustomSheetContent>
      </CustomSheet>
    </FormContext>
  );
}

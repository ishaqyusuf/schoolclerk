import { useClassesParams } from "@/hooks/use-classes-params";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@school-clerk/ui/sheet";

import { FormContext } from "../classroom/form-context";
import { CustomSheet, CustomSheetContent } from "../custom-sheet-content";
import { Form } from "../forms/classroom-form";

export function ClassroomCreateSheet({}) {
  const { createClassroom, setParams } = useClassesParams();
  const isOpen = Boolean(createClassroom);

  return (
    <FormContext>
      <CustomSheet
        floating
        rounded
        size="lg"
        open={isOpen}
        onOpenChange={() => setParams(null)}
        sheetName="create-classroom"
      >
        <SheetHeader>
          <SheetTitle>Student Form</SheetTitle>
        </SheetHeader>
        <CustomSheetContent className="mb-5 flex flex-col gap-2 bg-red-400">
          <Form />
        </CustomSheetContent>
      </CustomSheet>
    </FormContext>
  );
}

import { useClassesParams } from "@/hooks/use-classes-params";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@school-clerk/ui/sheet";

import { FormContext } from "../classroom/form-context";
import { Form } from "../forms/classroom-form";
import { ClassroomSheetContent } from "./classroom-sheet-content";

export function ClassroomCreateSheet({}) {
  const { type, setParams } = useClassesParams();
  const isOpen = Boolean(type == "create" || type == "edit");

  return (
    <FormContext>
      <Sheet open={isOpen} onOpenChange={() => setParams(null)}>
        <SheetContent className="flex flex-col gap-2">
          <SheetHeader>
            <SheetTitle>Classroom Form</SheetTitle>
          </SheetHeader>
          <Form />
        </SheetContent>
      </Sheet>
    </FormContext>
  );
}

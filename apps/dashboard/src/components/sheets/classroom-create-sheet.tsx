import { useClassesParams } from "@/hooks/use-classes-params";

import { Sheet } from "@school-clerk/ui/sheet";

import { FormContext } from "../classroom/form-context";

export function ClassroomCreateSheet({}) {
  const { type, setParams } = useClassesParams();
  const isOpen = Boolean(type == "create" || type == "edit");
  return (
    <FormContext>
      <Sheet open={isOpen} onOpenChange={() => setParams(null)}></Sheet>
    </FormContext>
  );
}

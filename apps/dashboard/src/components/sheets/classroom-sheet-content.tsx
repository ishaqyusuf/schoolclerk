import { createClassroomAction } from "@/actions/create-classroom";
import { useClassesParams } from "@/hooks/use-classes-params";
import { useAction } from "next-safe-action/hooks";
import { useFormContext } from "react-hook-form";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@school-clerk/ui/sheet";

import FormInput from "../controls/form-input";
import { SubmitButton } from "../submit-button";

export function ClassroomSheetContent({}) {
  const { type, setParams } = useClassesParams();
  const { watch, control, handleSubmit, formState } = useFormContext();
  const createClassRoom = useAction(createClassroomAction, {
    onSuccess(args) {
      setParams(null);
    },
    onError(e) {},
  });
  const data = watch();
  return (
    <SheetContent className="flex flex-col gap-2">
      <SheetHeader>
        <SheetTitle>Classroom Form</SheetTitle>
      </SheetHeader>
      <form onSubmit={handleSubmit(createClassRoom.execute)}>
        <FormInput name="className" label="Class Name" control={control} />
        <div className="flex justify-end">
          <SubmitButton isSubmitting={createClassRoom?.isExecuting}>
            Submit
          </SubmitButton>
        </div>
      </form>
    </SheetContent>
  );
}

import { getCachedClassRooms } from "@/actions/cache/classrooms";
import { getSaasProfileCookie } from "@/actions/cookies/login-session";
import { createClassroomAction } from "@/actions/create-classroom";
import { useClassesParams } from "@/hooks/use-classes-params";
import { useTermBillableParams } from "@/hooks/use-term-billable-params";
import { useAction } from "next-safe-action/hooks";
import { useAsyncMemo } from "use-async-memo";

import { Button } from "@school-clerk/ui/button";

import { useBillableFormContext } from "../billable/form-context";
import { useClassroomFormContext } from "../classroom/form-context";
import FormInput from "../controls/form-input";
import { CustomSheetContentPortal } from "../custom-sheet-content";
import { SubmitButton } from "../submit-button";

export function Form({}) {
  const { setParams } = useClassesParams();
  const { watch, control, trigger, handleSubmit, formState } =
    useClassroomFormContext();
  const create = useAction(createClassroomAction, {
    onSuccess(args) {
      setParams(null);
    },
    onError(e) {
      console.log(e);
    },
  });

  return (
    <div className="grid gap-4 ">
      <FormInput name="className" label="Class Name" control={control} />
      <CustomSheetContentPortal>
        <form onSubmit={handleSubmit(create.execute)}>
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => {
                trigger().then((e) => {
                  console.log(formState);
                });
              }}
            ></Button>
            <SubmitButton isSubmitting={create?.isExecuting}>
              Submit
            </SubmitButton>
          </div>
        </form>
      </CustomSheetContentPortal>
    </div>
  );
}

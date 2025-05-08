import { getCachedClassRooms } from "@/actions/cache/classrooms";
import { getSaasProfileCookie } from "@/actions/cookies/login-session";
import { createStudentAction } from "@/actions/create-student";
import { useClassesParams } from "@/hooks/use-classes-params";
import { useTermBillableParams } from "@/hooks/use-term-billable-params";
import { useAction } from "next-safe-action/hooks";
import { useAsyncMemo } from "use-async-memo";

import { Button } from "@school-clerk/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@school-clerk/ui/collapsible";
import { SheetPortal } from "@school-clerk/ui/sheet";

import { useBillableFormContext } from "../billable/form-context";
import { CollapseForm } from "../collapse-form";
import FormInput from "../controls/form-input";
import FormSelect from "../controls/form-select";
import { CustomSheetContentPortal } from "../custom-sheet-content";
import { FormDebugBtn } from "../form-debug-btn";
import { useStudentFormContext } from "../students/form-context";
import { SubmitButton } from "../submit-button";

export function Form({}) {
  const { billableId, setParams } = useTermBillableParams();
  const { watch, control, trigger, handleSubmit, formState } =
    useStudentFormContext();
  const create = useAction(createStudentAction, {
    onSuccess(args) {
      setParams(null);
    },
    onError(e) {
      console.log(e);
    },
  });

  const classList = useAsyncMemo(async () => {
    const profile = await getSaasProfileCookie();
    const classList = await getCachedClassRooms(profile.termId);
    return classList;
  }, [billableId]);
  return (
    <form className="grid gap-4" onSubmit={handleSubmit(create.execute)}>
      <FormInput name="name" label="Name" control={control} />
      <div className="grid grid-cols-2 gap-4">
        <FormInput name="surname" label="Surname" control={control} />
        <FormInput name="otherName" label="Other Name" control={control} />
      </div>
      <FormSelect
        name="gender"
        label="Gender"
        options={["Male", "Female"]}
        control={control}
      />
      <div className="">
        <CollapseForm label="Parent">
          <FormInput name="guardian.name" label="Name" control={control} />
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              name="guardian.phone"
              label="Phone"
              type="phone"
              control={control}
            />
            <FormInput
              name="guardian.phone2"
              type="phone"
              label="Phone 2"
              control={control}
            />
          </div>
        </CollapseForm>
      </div>
      <CustomSheetContentPortal>
        <div className="flex justify-end">
          <FormDebugBtn />
          <SubmitButton isSubmitting={create?.isExecuting}>Submit</SubmitButton>
        </div>
      </CustomSheetContentPortal>
    </form>
  );
}

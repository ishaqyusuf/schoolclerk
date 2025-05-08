import { getCachedClassRooms } from "@/actions/cache/classrooms";
import { getSaasProfileCookie } from "@/actions/cookies/login-session";
import { createSchoolFeeAction } from "@/actions/create-school-fee";
import { useSchoolFeeParams } from "@/hooks/use-school-fee-params";
import { useAction } from "next-safe-action/hooks";
import { useAsyncMemo } from "use-async-memo";

import { Button } from "@school-clerk/ui/button";

import FormInput from "../controls/form-input";
import { useSchoolFeeFormContext } from "../school-fee/form-context";
import { SubmitButton } from "../submit-button";

export function SchoolFeeForm({}) {
  const { schoolFeeId, setParams } = useSchoolFeeParams();
  const { watch, control, trigger, handleSubmit, formState } =
    useSchoolFeeFormContext();
  const create = useAction(createSchoolFeeAction, {
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
  }, [schoolFeeId]);
  return (
    <form className="grid gap-4" onSubmit={handleSubmit(create.execute)}>
      <FormInput name="title" label="Billable Title" control={control} />
      <FormInput
        name="description"
        label="Description"
        type="textarea"
        control={control}
      />
      <FormInput name="amount" type="number" label="Amount" control={control} />
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() => {
            trigger().then((e) => {
              console.log(formState);
            });
          }}
        >
          AA
        </Button>
        <SubmitButton isSubmitting={create?.isExecuting}>Submit</SubmitButton>
      </div>
    </form>
  );
}

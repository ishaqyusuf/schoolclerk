import { getCachedClassRooms } from "@/actions/cache/classrooms";
import { loadSaasProfile } from "@/actions/cookies/login-session";
import { createBillableAction } from "@/actions/create-school-fee";
import { useClassesParams } from "@/hooks/use-classes-params";
import { useTermBillableParams } from "@/hooks/use-term-billable-params";
import { useAction } from "next-safe-action/hooks";
import { useAsyncMemo } from "use-async-memo";

import { Button } from "@school-clerk/ui/button";

import { useBillableFormContext } from "../billable/form-context";
import FormInput from "../controls/form-input";
import { SubmitButton } from "../submit-button";

export function BillableForm({}) {
  const { billableId, setParams } = useTermBillableParams();
  const { watch, control, trigger, handleSubmit, formState } =
    useBillableFormContext();
  const create = useAction(createBillableAction, {
    onSuccess(args) {
      setParams(null);
    },
    onError(e) {
      console.log(e);
    },
  });

  const classList = useAsyncMemo(async () => {
    const profile = await loadSaasProfile();
    const classList = await getCachedClassRooms(profile.termId);
    return classList;
  }, [billableId]);
  return (
    <form className="grid gap-4" onSubmit={handleSubmit(create.execute)}>
      <FormInput name="title" label="Billable Title" control={control} />
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

import { useFormContext } from "react-hook-form";

import { FormDebugBtn } from "./form-debug-btn";
import { SubmitButton } from "./submit-button";

interface Props {
  action;
  label?;
  noDebug?: boolean;
}
export function FormActionButton({ action, noDebug, label = "Submit" }: Props) {
  const { handleSubmit } = useFormContext();
  return (
    <form className="grid gap-4" onSubmit={handleSubmit(action.execute)}>
      <div className="flex justify-end">
        {!noDebug || <FormDebugBtn />}
        <SubmitButton isSubmitting={action?.isExecuting}>Submit</SubmitButton>
      </div>
    </form>
  );
}

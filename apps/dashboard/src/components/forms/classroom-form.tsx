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
import { useFieldArray } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@school-clerk/ui/table";
import ConfirmBtn from "../confirm-button";

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
  const departments = useFieldArray({
    control,
    name: "departments",
    keyName: "_id",
  });
  return (
    <div className="grid gap-4 ">
      <FormInput name="className" label="Class Name" control={control} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.fields.map((d, i) => (
            <TableRow key={d._id}>
              <TableCell>
                <FormInput name={`departments.${i}.name`} control={control} />
              </TableCell>
              <TableCell className="w-12">
                <ConfirmBtn
                  trash
                  onClick={(e) => {
                    departments.remove(i);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            departments.append({ name: "" });
          }}
        >
          Add Department
        </Button>
      </div>
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

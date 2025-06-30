import { createClassroomAction } from "@/actions/create-classroom";
import { useAction } from "next-safe-action/hooks";

import { Button } from "@school-clerk/ui/button";

import FormInput from "../controls/form-input";
import { CustomSheetContentPortal } from "../custom-sheet-content";
import { SubmitButton } from "../submit-button";
import { useFieldArray } from "react-hook-form";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@school-clerk/ui/table";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQuestionFormContext } from "../questions/form-context";
import { useQuestionFormParams } from "@/hooks/use-question-form-params";
import FormSelect from "../controls/form-select";
import { cn } from "@school-clerk/ui/cn";
import { Textarea } from "@school-clerk/ui/textarea";
import { arabic } from "@/fonts";
import { useEffect } from "react";

export function Form({}) {
  const { watch, control, trigger, handleSubmit, formState, register, reset } =
    useQuestionFormContext();
  const create = useAction(createClassroomAction, {
    onSuccess(args) {
      setParams(null);
    },
    onError(e) {
      console.log(e);
    },
  });
  const { params, setParams } = useQuestionFormParams();
  const trpc = useTRPC();
  const { data: formData } = useQuery(
    trpc.questions.getForm.queryOptions({
      postId: params.postId > 0 ? params.postId : undefined,
    }),
  );
  useEffect(() => {
    reset(formData);
  }, [formData]);
  const saveMutation = useMutation(
    trpc.questions.saveQuestion.mutationOptions({
      onSuccess: (data) => {},
    }),
  );

  function onSubmit(data) {
    const className = classrooms?.data?.find(
      (a) => a.id == data?.classDepartmentId,
    );
    data.className = className?.displayName;
    console.log({ data });

    saveMutation.mutate(data);
  }
  const { data: classrooms } = useQuery(trpc.classrooms.all.queryOptions({}));
  return (
    <div className="grid gap-4 ">
      <div className="grid grid-cols-2 gap-4">
        <FormInput name="subject" label="Subject" control={control} />
        <FormSelect
          className=""
          control={control}
          label="Class"
          name={`classDepartmentId`}
          options={classrooms?.data || []}
          titleKey={"displayName"}
          valueKey={"id"}
        />
      </div>
      <div className="">
        <Textarea
          className={cn("h-[300px]", arabic.className, "px-4  text-lg")}
          dir="rtl"
          {...register("question")}
        />
      </div>
      <CustomSheetContentPortal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => {
                trigger().then((e) => {
                  console.log(formState);
                });
              }}
            ></Button>
            <SubmitButton isSubmitting={saveMutation?.isPending}>
              Submit
            </SubmitButton>
          </div>
        </form>
      </CustomSheetContentPortal>
    </div>
  );
}

import { ClassroomSubjectData } from "@/components/tables/subjects/columns";
import { useZodForm } from "@/hooks/use-zod-form";
import { useState } from "react";
import z from "zod";
import { usePostMutate } from "../../use-global";
import { useTRPC } from "@/trpc/client";
import { useQueryClient } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@school-clerk/ui/popover";
import { Form } from "@school-clerk/ui/form";
import FormInput from "@/components/controls/form-input";
import FormSelect from "@/components/controls/form-select";
import { SubmitButton } from "@/components/submit-button";
import { ClassSubject, SubjectPostData } from "@api/db/queries/first-term-data";
import { generateRandomString } from "@school-clerk/utils";

interface SubjectFormProps {
  subject: Partial<ClassSubject>;
  children?;
  selectableSubjects: Partial<SubjectPostData>[];
}
export function SubjectForm({
  children,
  subject,
  selectableSubjects,
}: SubjectFormProps) {
  const { postId, classId, subjectId, type } = subject;
  //   selectableSubjects?.[0]?.
  const [opened, setOpened] = useState(false);
  const subjectForm = useZodForm(
    z.object({
      title: z.string(),
    }),
    {
      defaultValues: {
        title: "",
      },
    },
  );
  const form = useZodForm(
    z.object({
      subjectId: z.string(),
      type: z.string(),
      classId: z.number(),
    }),
    {
      defaultValues: {
        type,
        classId,
        subjectId: String(subjectId),
        // title,
        // obtainable,
        // assessmentType,
        // index,
      },
    },
  );
  const m = usePostMutate();
  const trpc = useTRPC();
  const qc = useQueryClient();
  async function onSubmit(data) {
    if (isNew) {
      m.createAction.mutate(
        {
          data: {
            code: generateRandomString(5),
            title: data.title!,
            type: "subject",
          } as SubjectPostData,
        },
        {
          onError(error, variables, context) {
            console.log(error);
          },
          onSuccess(data, variables, context) {
            qc.invalidateQueries({
              queryKey: trpc.ftd.getClassRoomSubjects.queryKey(),
            });
            form.setValue("subjectId", null);
          },
        },
      );
    }

    const events = {
      onSuccess(data, variables, context) {
        qc.invalidateQueries({
          queryKey: trpc.ftd.getClassRoomSubjects.queryKey(),
        });
      },
      onError(error, variables, context) {
        console.log(error);
      },
    };
  }
  const subjectIdWatch = form.watch("subjectId");
  const isNew = subjectIdWatch === "-1";
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormSelect
                label="Subject"
                options={[
                  {
                    label: "Create",
                    value: "-1",
                  },
                  ...(selectableSubjects?.map((s) => ({
                    label: s.title,
                    value: String(s.postId),
                  })) || []),
                ]}
                control={form.control}
                name="subjectId"
              />
              {isNew || (
                <SubmitButton isSubmitting={m.isPending}>Submit</SubmitButton>
              )}
            </form>
          </Form>
          {!isNew || (
            <Form {...subjectForm}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput
                  label="Subject"
                  control={subjectForm.control}
                  name="title"
                />
                <SubmitButton isSubmitting={m.isPending}>Create</SubmitButton>
              </form>
            </Form>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

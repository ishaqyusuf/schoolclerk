import { useTRPC } from "@/trpc/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGlobalParams, usePostMutate } from "../../use-global";
import { TableCell, TableRow } from "@school-clerk/ui/table";
import { Button } from "@school-clerk/ui/button";
import { Icons } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@school-clerk/ui/popover";
import { useState } from "react";
import { useZodForm } from "@/hooks/use-zod-form";
import z from "zod";
import { Form } from "@school-clerk/ui/form";
import FormInput from "@/components/controls/form-input";
import { SubmitButton } from "@/components/submit-button";
import FormSelect from "@/components/controls/form-select";
import { ClassSubjectAssessment } from "@api/db/queries/first-term-data";
import { ClassroomSubjectData } from "@/components/tables/subjects/columns";
import { SubjectForm } from "./subject-form";

export function ClassroomSubjects({ classRoomId }) {
  const trpc = useTRPC();
  const g = useGlobalParams();
  const opened = g.params.openClassSubjectId === classRoomId;
  const { data } = useQuery(
    trpc.ftd.getClassRoomSubjects.queryOptions(
      {
        classRoomId,
      },
      {
        enabled: opened,
      },
    ),
  );
  //   const { data: subjectList } = useQuery(
  //     trpc.ftd.subjectsList.queryOptions(null, {
  //       enabled: opened,
  //     }),
  //   );
  if (!opened) return null;
  return (
    <TableRow className="">
      <TableCell>
        <div className="">
          <div className="flex gap-4">
            <p>Subjects</p>
            <SubjectForm
              selectableSubjects={data?.subjects?.filter((a) =>
                data?.classroomSubjects?.every((b) => b.subjectId != a.postId),
              )}
              subject={{}}
            >
              Add Subject
            </SubjectForm>
          </div>
          {data?.classroomSubjects.map((subject) => (
            <div className="flex gap-4" key={subject.postId}>
              <span>{subject.title}</span>
              <div className="flex gap-4">
                {subject?.assessments?.map((a) => (
                  <Assessment assessment={a} key={a.postId}>
                    {a.title}
                  </Assessment>
                ))}
                <Assessment
                  assessment={{
                    classId: subject.classId,
                    type: "class-subject-assessment",
                    classSubjectId: subject.postId,
                    assessmentType: "secondary",
                    index: subject?.assessments?.length,
                  }}
                >
                  <span>Add</span>
                </Assessment>
              </div>
            </div>
          ))}
        </div>
      </TableCell>
    </TableRow>
  );
}

interface AssessmentProps {
  assessment: Partial<ClassroomSubjectData>;
  children?;
}
function Assessment({ assessment, children }: AssessmentProps) {
  const { postId, obtainable, classId, index, assessmentType, title } =
    assessment;
  const [opened, setOpened] = useState(false);
  const form = useZodForm(
    z.object({
      title: z.string(),
      obtainable: z.number(),
      index: z.number(),
      assessmentType: z.enum(["primary", "secondary"]),
    }),
    {
      defaultValues: {
        title,
        obtainable,
        assessmentType,
        index,
      },
    },
  );
  const m = usePostMutate();
  const trpc = useTRPC();
  const qc = useQueryClient();
  async function onSubmit({ title, obtainable, assessmentType }) {
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
    if (assessment.postId) {
      m.updateAction.mutate(
        {
          id: assessment.postId,
          data: {
            ...assessment,
            title,
            obtainable,
            assessmentType,
          },
        },
        events,
      );
    } else {
      m.createAction.mutate(
        {
          data: {
            ...assessment,
            title,
            obtainable,
            assessmentType,
          },
        },
        events,
      );
    }
  }
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput control={form.control} name="title" label="Title" />
              <FormInput
                control={form.control}
                name="index"
                label="Index"
                type="number"
              />
              <FormInput
                control={form.control}
                name="obtainable"
                label="Obtainable"
                type="number"
              />
              <FormSelect
                label="Assessment Type"
                options={["primary", "secondary"]}
                control={form.control}
                name="assessmentType"
              />
              <SubmitButton isSubmitting={m.isPending}>Submit</SubmitButton>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}

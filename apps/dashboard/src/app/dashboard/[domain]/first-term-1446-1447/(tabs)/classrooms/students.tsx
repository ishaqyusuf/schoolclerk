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
import { Fragment, useEffect, useState } from "react";
import { useZodForm } from "@/hooks/use-zod-form";
import z from "zod";
import { Form } from "@school-clerk/ui/form";
import FormInput from "@/components/controls/form-input";
import { SubmitButton } from "@/components/submit-button";
import FormSelect from "@/components/controls/form-select";
import { ClassSubjectAssessment } from "@api/db/queries/first-term-data";
import { ClassroomSubjectData } from "@/components/tables/subjects/columns";
import { SubjectForm } from "./subject-form";
import { enToAr, sum } from "@/utils/utils";
import { RouterOutputs } from "@api/trpc/routers/_app";
import { cn } from "@school-clerk/ui/cn";

export function ClassroomStudents({ classRoomId }) {
  const trpc = useTRPC();
  const g = useGlobalParams();
  const opened =
    g.params.openStudentsForClass === classRoomId &&
    g.params.tab === "classStudents";
  const { data } = useQuery(
    trpc.ftd.getClassroomStudents.queryOptions(
      {
        classRoomId,
      },
      {
        enabled: opened,
      },
    ),
  );
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (!opened) return null;
  return (
    <tr className="">
      <td>
        <div className="">
          <div className="flex gap-4">
            <p>Students</p>
          </div>
          <table>
            <thead>
              <tr>
                <th className="border"></th>
                {data?.classSubjects?.classroomSubjects?.map((cs, csi) => (
                  <th
                    className="border text-center"
                    colSpan={cs?.assessments?.length + 1}
                    key={csi}
                  >
                    {cs.title}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="border"></th>
                {data?.classSubjects?.classroomSubjects?.map((cs, csi) => (
                  <Fragment key={csi}>
                    {cs?.assessments?.map((ass, asi) => (
                      <th
                        className="transform rotate-90 h-16 border"
                        colSpan={1}
                        key={asi}
                      >
                        {ass.title}
                      </th>
                    ))}
                    <th className="border transform rotate-90">Total</th>
                  </Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.students.map((student, i) => (
                <tr className="" key={student.postId}>
                  <td className="border">
                    <div className="flex gap-2">
                      <span>{enToAr(i + 1)}.</span>
                      <span>{student.firstName}</span>
                      <span className="font-semibold">{student.surname}</span>
                      <span>{student.otherName}</span>
                    </div>
                  </td>
                  {student.subjectAssessments.map((sa, sai) => (
                    <Assessment
                      index={i % 2 == 0 ? sai : sai + 1}
                      subjectAssessment={sa}
                      key={sai}
                    />
                  ))}
                  {/* <div className="flex gap-4">
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
              </div> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
}

interface AssessmentProps {
  subjectAssessment: RouterOutputs["ftd"]["getClassroomStudents"]["students"][number]["subjectAssessments"][number]; //["assessments"][number];
  index;
}
function Assessment({ subjectAssessment, index }: AssessmentProps) {
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
    // if (assessment.postId) {
    //   m.updateAction.mutate(
    //     {
    //       id: assessment.postId,
    //       data: {
    //         ...assessment,
    //         title,
    //         obtainable,
    //         assessmentType,
    //       },
    //     },
    //     events,
    //   );
    // } else {
    //   m.createAction.mutate(
    //     {
    //       data: {
    //         ...assessment,
    //         title,
    //         obtainable,
    //         assessmentType,
    //       },
    //     },
    //     events,
    //   );
    // }
  }
  const { assessments } = subjectAssessment;
  return (
    <Fragment>
      {assessments.map((ass, asi) => (
        <td
          onClick={(e) => {
            setOpened(!opened);
          }}
          className={cn("score", index % 2 == 0 ? "bg-muted" : "bg")}
          key={asi}
        >
          {ass.studentAssessment?.markObtained}
        </td>
      ))}
      <Popover open={opened} onOpenChange={setOpened}>
        <PopoverTrigger asChild>
          {/* {children} */}
          <td className={cn("score total", index % 2 == 0 ? "bg-muted" : "bg")}>
            {sum(assessments?.map((a) => a?.studentAssessment?.markObtained))}
          </td>
        </PopoverTrigger>
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
    </Fragment>
  );
}

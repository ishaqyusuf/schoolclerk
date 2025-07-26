import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGlobalParams, usePostMutate } from "../../use-global";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@school-clerk/ui/popover";
import { Fragment, useEffect, useState } from "react";
import { useZodForm } from "@/hooks/use-zod-form";
import z from "zod";
import { StudentSubjectAssessment } from "@api/db/queries/first-term-data";
import { enToAr, sum } from "@/utils/utils";
import { RouterOutputs } from "@api/trpc/routers/_app";
import { cn } from "@school-clerk/ui/cn";
import { generateRandomString } from "@school-clerk/utils";
import { useDebounce } from "use-debounce";
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
                      studentId={student.postId}
                      student={student}
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
  student: RouterOutputs["ftd"]["getClassroomStudents"]["students"][number]; //["assessments"][number];
  index;
  studentId;
}
function Assessment({
  subjectAssessment,
  student,
  studentId,
  index,
}: AssessmentProps) {
  const { classroomSubjectId } = subjectAssessment;
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
  const { assessments: _assessments } = subjectAssessment;
  const { data: updatedAssessments } = useQuery(
    trpc.ftd.getStudentAssessments.queryOptions(
      {
        studentId,
        subjectAssessments: _assessments?.map((a) => a.subjectAssessment),
      },
      {
        enabled: opened,
      },
    ),
  );
  // useEffect(() => {
  //   if (!opened) return null;
  //   console.log({ updatedAssessments, opened, _assessments });
  // }, [updatedAssessments, _assessments]);
  const scoreUpdated = () => {
    qc.invalidateQueries({
      queryKey: trpc.ftd.getStudentAssessments.queryKey(),
    });
  };
  const assessments = updatedAssessments ?? _assessments;
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
            {assessments?.map((a, ai) => (
              <AssessmentInput
                key={ai}
                label={a.subjectAssessment?.title}
                onUpdate={scoreUpdated}
                meta={{
                  classId: student?.classId,
                  type: "student-subject-assessment",
                  studentId: student.postId,
                  subjectAssessmentId: a.subjectAssessment?.postId,
                  classSubjectId: a.studentAssessment?.classSubjectId,
                  calculatedScore: 0,
                  markObtained: 0,
                }}
              ></AssessmentInput>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </Fragment>
  );
}

interface AssessmentInput {
  onUpdate?;
  label?;
  value?;
  meta?: StudentSubjectAssessment;
}
function AssessmentInput({
  value: _value,
  label,
  onUpdate,
  meta,
}: AssessmentInput) {
  const [typing, setTyping] = useState(null);
  const [debounceValue] = useDebounce(typing, 300, {});
  const [focus, setFocus] = useState(false);
  // const m = usePostMutate();
  const trpc = useTRPC();
  const updater = useMutation(
    trpc.ftd.updateStudentAssessment.mutationOptions({
      onSuccess(data, variables, context) {
        onUpdate?.();
      },
    }),
  );
  const [value, setValue] = useState(_value);
  useEffect(() => {
    const _meta = { ...meta };
    _meta.markObtained = Number(value);
    if (debounceValue) {
      updater.mutate({
        meta: _meta,
      });
      // m.execute({
      //   obtained: value || 0,
      //   studentId: studentData?.id,
      //   assessmentId: subjectAssessment.id,
      //   subjectOnClassRoomId: subjectAssessment.subjectsOnClassRoomsId,
      // });
    }
  }, [debounceValue]);
  const borderColor =
    updater.isSuccess && focus
      ? "#16a34a" // Green (Success)
      : updater.isError
        ? "#dc2626" // Red (Error)
        : focus
          ? "#2563eb" // Blue (Focus)
          : "#e5e7eb"; // Gray (Default)
  return (
    <>
      <motion.div
        className="relative w-20 rounded-lg"
        transition={{ duration: 0.3 }}
        animate={{
          borderColor,
          borderStyle: updater.isPending ? "dashed" : "solid",
          borderWidth: 2,
        }}
        style={{ borderWidth: 2 }}
      >
        <span>{label}</span>
        <motion.input
          type="number"
          max={100}
          min={0}
          className="[&::-webkit-outer-spin-button]:appearance-non h-8 w-full appearance-none rounded-md border-none bg-white px-1 outline-none [&::-webkit-inner-spin-button]:appearance-none"
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onInput={() => setTyping(generateRandomString(2))}
          onChange={(e) =>
            setValue(e.target.value === "" ? "" : +e.target.value)
          }
          // animate={{ borderColor }}
          // transition={{ duration: 0.3 }}
          // style={{ borderWidth: 2 }}
        />
      </motion.div>
    </>
  );
}

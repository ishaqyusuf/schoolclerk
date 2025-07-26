import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGlobalParams, usePostMutate } from "../../use-global";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@school-clerk/ui/popover";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useZodForm } from "@/hooks/use-zod-form";
import z from "zod";
import {
  ClassSubjectAssessment,
  StudentSubjectAssessment,
} from "@api/db/queries/first-term-data";
import { enToAr, sum } from "@/utils/utils";
import { RouterOutputs } from "@api/trpc/routers/_app";
import { cn } from "@school-clerk/ui/cn";
import { generateRandomString } from "@school-clerk/utils";
import { useDebounce } from "use-debounce";
import { toast } from "@school-clerk/ui/use-toast";
import { Button } from "@school-clerk/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@school-clerk/ui/select";

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
  const [sortBy, setSortBy] = useState<"name" | "grade">("name");

  const sortedStudents = useMemo(() => {
    if (!data?.students) return [];
    const students = [...data.students];
    if (sortBy === "name") {
      return students.sort((a, b) => {
        if (a.gender !== b.gender) {
          return a.gender === "M" ? -1 : 1;
        }
        return a.firstName.localeCompare(b.firstName);
      });
    } else if (sortBy === "grade") {
      return students.sort((a, b) => {
        const aTotal = sum(
          a.subjectAssessments.flatMap((sa) =>
            sa.assessments.map((ass) => ass.studentAssessment?.markObtained || 0),
          ),
        );
        const bTotal = sum(
          b.subjectAssessments.flatMap((sa) =>
            sa.assessments.map((ass) => ass.studentAssessment?.markObtained || 0),
          ),
        );
        return bTotal - aTotal;
      });
    }
    return students;
  }, [data?.students, sortBy]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  if (!opened) return null;
  return (
    <tr className="">
      <td colSpan={100}>
        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex gap-4 mb-4 items-center">
            <p className="font-semibold text-lg">Students</p>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Sort By:</label>
              <Select
                onValueChange={(value) => setSortBy(value as "name" | "grade")}
                defaultValue={sortBy}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="grade">Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="overflow-x-auto relative" style={{ height: "600px" }}>
            <table className="w-full border-collapse bg-white">
              <thead className="sticky top-0 bg-gray-200 z-10">
                <tr>
                  <th className="border p-2 sticky left-0 bg-gray-200 z-20">
                    Student Name
                  </th>
                  {data?.classSubjects?.classroomSubjects?.map((cs, csi) => (
                    <th
                      className="border text-center p-2"
                      colSpan={cs?.assessments?.length + 1}
                      key={csi}
                    >
                      {cs.title}
                    </th>
                  ))}
                </tr>
                <tr>
                  <th className="border p-2 sticky left-0 bg-gray-200 z-20"></th>
                  {data?.classSubjects?.classroomSubjects?.map((cs, csi) => (
                    <Fragment key={csi}>
                      {cs?.assessments?.map((ass, asi) => (
                        <th
                          className="transform rotate-90 h-16 border p-2"
                          colSpan={1}
                          key={asi}
                        >
                          {ass.title}
                        </th>
                      ))}
                      <th className="border transform rotate-90 p-2">Total</th>
                    </Fragment>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedStudents.map((student, i) => (
                  <tr className="hover:bg-gray-50" key={student.postId}>
                    <td className="border p-2 sticky left-0 bg-white z-10">
                      <div className="flex gap-2 items-center">
                        <span className="font-mono text-sm text-gray-500">
                          {enToAr(i + 1)}.
                        </span>
                        <span className="font-medium">{student.firstName}</span>
                        <span className="font-semibold">{student.surname}</span>
                        <span className="text-gray-600">
                          {student.otherName}
                        </span>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </td>
    </tr>
  );
}

type ClassRoomStudent =
  RouterOutputs["ftd"]["getClassroomStudents"]["students"][number];
interface AssessmentProps {
  subjectAssessment: ClassRoomStudent["subjectAssessments"][number]; //["assessments"][number];
  student: ClassRoomStudent; //["assessments"][number];
  index;
  studentId;
}
function Assessment({ subjectAssessment, student, index }: AssessmentProps) {
  const [opened, setOpened] = useState(false);

  const { assessments: _assessments } = subjectAssessment;
  const [assessments, setAssessments] = useState(_assessments);

  const scoreUpdated = (updates: ScoreUpdates[]) => {
    setAssessments((prev) => {
      return prev.map((p) => {
        // p.studentAssessment.classSubjectId;
        const update = updates.find(
          (u) => u.subjectAssessmentId == p.subjectAssessment.postId,
        );
        if (update) {
          if (!p.studentAssessment)
            p.studentAssessment = {
              classId: student?.classId,
              type: "student-subject-assessment",
              studentId: student.postId,
              subjectAssessmentId: p.subjectAssessment?.postId,
              classSubjectId: p.subjectAssessment?.classSubjectId,
              calculatedScore: 0,
              markObtained: 0,
              // postId: update.studentSubjectAssessmentId,
            };
          p.studentAssessment.markObtained = update.markObtained;
        }
        return p;
      });
    });
  };
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
                assessmentData={a}
                value={a.studentAssessment?.markObtained}
                meta={{
                  classId: student?.classId,
                  type: "student-subject-assessment",
                  studentId: student.postId,
                  subjectAssessmentId: a.subjectAssessment?.postId,
                  classSubjectId: a.subjectAssessment?.classSubjectId,
                  calculatedScore: 0,
                  markObtained: 0,
                }}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </Fragment>
  );
}
interface ScoreUpdates {
  subjectAssessmentId;
  markObtained;
}
interface AssessmentInput {
  onUpdate?(updates: ScoreUpdates[]);
  label?;
  value?;
  // subjectAssessment: ClassSubjectAssessment
  assessmentData: ClassRoomStudent["subjectAssessments"][number]["assessments"][number];
  meta?: StudentSubjectAssessment;
}
function AssessmentInput({
  value: _value,
  label,
  onUpdate,
  meta,
  assessmentData,
}: AssessmentInput) {
  const [typing, setTyping] = useState(null);
  const [debounceValue] = useDebounce(typing, 300, {});
  const [focus, setFocus] = useState(false);
  const trpc = useTRPC();
  const updater = useMutation(
    trpc.ftd.updateStudentAssessment.mutationOptions({
      onSuccess(data, variables, context) {
        onUpdate?.([
          {
            markObtained: data.markObtained,
            subjectAssessmentId: data.subjectAssessmentId,
          },
        ]);
        toast({
          variant: "success",
          title: "Assessment updated successfully",
          description: "Assessment updated successfully",
        });
      },
      onError(error, variables, context) {
        console.log(error);
      },
    }),
  );
  const [value, setValue] = useState(_value);
  useEffect(() => {
    if (!debounceValue) return;
    const _meta = { ...meta };
    _meta.markObtained = Number(value) || 0;
    if (_meta.markObtained > assessmentData?.subjectAssessment?.obtainable) {
      toast({
        variant: "error",
        title: "Mark obtained cannot be greater than obtainable mark",
        description: "Mark obtained cannot be greater than obtainable mark",
      });
      return;
    }

    updater.mutate({
      meta: _meta,
    });
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
        className="relative inline-flex gap-2 rounded-lg"
        transition={{ duration: 0.3 }}
        dir="rtl"
        animate={{
          borderColor,
          borderStyle: updater.isPending ? "dashed" : "solid",
          borderWidth: 2,
        }}
        style={{ borderWidth: 2 }}
      >
        <div className="bg-muted px-2 flex items-center">{label}</div>
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
        />
        <div className=" px-2 flex items-center">
          /{assessmentData?.subjectAssessment?.obtainable}
        </div>
      </motion.div>
    </>
  );
}

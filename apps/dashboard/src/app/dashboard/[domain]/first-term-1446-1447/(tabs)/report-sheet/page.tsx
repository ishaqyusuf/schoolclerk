"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@school-clerk/ui/collapsible";
import { Badge } from "@school-clerk/ui/badge";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Table, TableBody, TableRow, TableCell } from "@school-clerk/ui/table";
import { Checkbox } from "@school-clerk/ui/checkbox";
import { cn } from "@school-clerk/ui/cn";
import { useGlobalParams } from "../../use-global";
import { PrintLayout } from "./print-layout";
import { sortClassroomStudents } from "../../utils";
import { useStore } from "../../store";
import { Label } from "@school-clerk/ui/label";

export default function ReportSheetPage() {
  const trpc = useTRPC();
  const { data: classrooms, isLoading: isLoadingClassrooms } = useQuery(
    trpc.ftd.classRooms.queryOptions(),
  );
  const g = useGlobalParams();
  const { data: printList } = useQuery(
    trpc.ftd.studentPrintData.queryOptions(
      {
        studentIds: g.params.selectedStudentIds,
      },
      {
        enabled: !!g.params.selectedStudentIds?.length,
      },
    ),
  );

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-72 border-r bg-gray-50 overflow-y-auto hide-on-print">
        <h2 className="text-lg font-semibold mb-4">Classrooms</h2>
        {isLoadingClassrooms ? (
          <p>Loading classrooms...</p>
        ) : (
          <div className="space-y-2">
            {classrooms?.map((classroom) => (
              <ClassroomItem key={classroom.postId} classroom={classroom} />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 print:p-0 overflow-y-auto space-y-8 print:space-y-0">
        <h1 className="text-2xl print:hidden font-bold mb-4 print:hover:">
          Report Sheet Print Page
        </h1>
        <div className="print:hidden">
          <Checkbox
            checked={g.params.printHideSubjects}
            onCheckedChange={(e) =>
              g.setParams({
                printHideSubjects: !g.params.printHideSubjects,
              })
            }
          />
          <Label>Hide Subjects</Label>
        </div>
        {printList?.map((p) => <PrintLayout key={p.student.postId} data={p} />)}
      </div>
    </div>
  );
}

interface ClassroomItemProps {
  classroom: any;
}

function ClassroomItem({ classroom }: ClassroomItemProps) {
  const g = useGlobalParams();
  // const [isOpen, setIsOpen] = useState(g.params.printFilterClassIds);
  const isOpen = g.params.printFilterClassIds?.includes(classroom.postId);
  const trpc = useTRPC();
  const { data: students, isLoading: isLoadingStudents } = useQuery(
    trpc.ftd.getClassroomStudents.queryOptions(
      { classRoomId: classroom.postId },
      { enabled: isOpen },
    ),
  );
  const store = useStore();
  useEffect(() => {
    if (!students?.students?.length) {
      console.log("NO STUDENTS");
      return;
    }
    const sorted = sortClassroomStudents([...students?.students], "grade");
    sorted.map((a, i) => {
      store.update(`studentGrade.${a.postId}`, {
        totalScore: a.totalScore!,
        position:
          sorted.filter((b) => b.totalScore! > a.totalScore!)?.length + 1,
        totalStudents: sorted.length,
        comment: a.comment,
        // percentage: a.percentageScore,
        totalObtainable: a.totalObtainable!,
      });
    });
    console.log({ sorted });
    // const posistioned = students.students
    //   .map((a) => {
    //     let totalScore = 0;
    //     a.subjectAssessments.map((sa) => {
    //       sa.assessments.map((sas) => {
    //         if (sas.subjectAssessment?.assessmentType == "primary") {
    //           totalScore += Number(sas.studentAssessment?.markObtained) || 0;
    //         }
    //       });
    //     });
    //     return {
    //       totalScore,
    //       studentId: a.postId,
    //     };
    //   })
    //   .sort((a, b) => a.totalScore - b.totalScore);
    // console.log(posistioned);
  }, [students]);
  const sortedStudents = useMemo(() => {
    // console.log("DATA>>>>");
    return sortClassroomStudents([...(students?.students || [])], "name");
  }, [students?.students]);
  // const { data: classRoom } = useQuery(
  //   trpc.ftd.class.queryOptions(
  //     { classRoomId: classroom.postId },
  //     { enabled: isOpen },
  //   ),
  // );

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={(e) => {
        const newRes = e
          ? [...(g.params.printFilterClassIds || []), classroom.postId]
          : g.params.printFilterClassIds?.filter(
              (a) => a != classroom.postId,
            ) || null;
        g.setParams({
          printFilterClassIds: newRes,
        });
      }}
      className="w-full space-y-2"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border p-2 py-2 text-left font-medium transition-all hover:bg-gray-100 [&[data-state=open]>svg]:rotate-180">
        {classroom.classTitle}
        {isOpen ? (
          <ChevronDownIcon className="h-4 w-4" />
        ) : (
          <ChevronRightIcon className="h-4 w-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 p-2 pb-2">
        {isLoadingStudents ? (
          <p>Loading students...</p>
        ) : (
          <Table dir="rtl" className="">
            <TableBody>
              {sortedStudents?.map((student: any) => (
                <TableRow onClick={(e) => {}} key={student.postId}>
                  <TableCell className="inline-flex  gap-2 items-center">
                    <Checkbox
                      checked={g.params.selectedStudentIds?.includes(
                        student.postId,
                      )}
                      onCheckedChange={(checked) => {
                        const newRes = checked
                          ? [
                              ...(g.params.selectedStudentIds || []),
                              student.postId,
                            ]
                          : g.params.selectedStudentIds?.filter(
                              (a) => a != student.postId,
                            ) || null;
                        g.setParams({
                          selectedStudentIds: newRes,
                        });
                      }}
                    />
                    <div dir="rtl" className="font-medium inline-flex gap-1">
                      {[
                        student.firstName,
                        student.surname,
                        student.otherName,
                      ].map((a) => (
                        <span>{a}</span>
                      ))}
                    </div>

                    {student.payments?.map((payment: any, index: number) => (
                      <Badge
                        key={index}
                        className={cn(
                          payment.status === "paid"
                            ? "bg-green-500"
                            : "bg-red-500",
                          "text-white",
                        )}
                      >
                        {payment.term} - {payment.paymentType}
                      </Badge>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

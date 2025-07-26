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
import { useState } from "react";
import { Table, TableBody, TableRow, TableCell } from "@school-clerk/ui/table";
import { Checkbox } from "@school-clerk/ui/checkbox";
import { cn } from "@school-clerk/ui/cn";
import { useGlobalParams } from "../../use-global";
import { PrintLayout } from "./print-layout";

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
        throwOnError(error) {
          console.log(error);
        },
        enabled: !!g.params.selectedStudentIds?.length,
      },
    ),
  );

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-72 border-r bg-gray-50 overflow-y-auto">
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
      <div className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Report Sheet Print Page</h1>
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
  const [isOpen, setIsOpen] = useState(false);
  const trpc = useTRPC();
  const { data: students, isLoading: isLoadingStudents } = useQuery(
    trpc.ftd.getClassroomStudents.queryOptions(
      { classRoomId: classroom.postId },
      { enabled: isOpen },
    ),
  );

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
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
              {students?.students?.map((student: any) => (
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
                    <p className="font-medium inline-flex gap-1">
                      {[
                        student.firstName,
                        student.surname,
                        student.otherName,
                      ].map((a) => (
                        <span>{a}</span>
                      ))}
                    </p>

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

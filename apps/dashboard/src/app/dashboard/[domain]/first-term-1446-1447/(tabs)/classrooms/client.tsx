"use client";


import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useGlobalParams } from "../../use-global";
import { Table, TableBody, TableCell, TableRow } from "@school-clerk/ui/table";
import { Fragment } from "react";
import { ClassroomSubjects } from "./subjects";
import { ClassroomStudents } from "./students";

import { Button } from "@school-clerk/ui/button";

import { CreateStudent } from "./create-student";

export function Client() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.ftd.classRooms.queryOptions());
  const g = useGlobalParams();
  return (
    <>
      <Table dir={"rtl"} className="">
        <TableBody>
          {data?.map((classroom) => (
            <Fragment key={classroom.postId}>
              <TableRow className="">
                <TableCell className="inline-flex items-center gap-4">
                  <span> {classroom.classTitle}</span>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        g.params.openClassSubjectId === classroom.postId &&
                        g.params.tab === "classSubjects"
                          ? "default"
                          : "secondary"
                      }
                      onClick={(e) => {
                        g.setParams({
                          openClassSubjectId: classroom.postId,
                          tab: "classSubjects",
                        });
                      }}
                    >
                      Subjects
                    </Button>
                    <Button
                      variant={
                        g.params.openStudentsForClass === classroom.postId &&
                        g.params.tab === "classStudents"
                          ? "default"
                          : "secondary"
                      }
                      onClick={(e) => {
                        g.setParams({
                          openStudentsForClass: classroom.postId,
                          tab: "classStudents",
                        });
                      }}
                    >
                      Students
                    </Button>
                    <CreateStudent classId={classroom.postId} />
                  </div>
                </TableCell>
              </TableRow>
              <ClassroomSubjects classRoomId={classroom.postId} />
              <ClassroomStudents classRoomId={classroom.postId} />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

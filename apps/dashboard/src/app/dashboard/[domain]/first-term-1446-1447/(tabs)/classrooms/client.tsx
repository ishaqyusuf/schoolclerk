"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useGlobalParams, usePostMutate } from "../../use-global";
import { Table, TableBody, TableCell, TableRow } from "@school-clerk/ui/table";
import { Fragment } from "react";
import { ClassroomSubjects } from "./subjects";
import { ClassroomStudents } from "./students";

import { Button } from "@school-clerk/ui/button";

import { CreateStudent } from "./create-student";
import { CreateClassroom } from "./create-class-room";
import { Menu } from "@/components/menu";

export function Client() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.ftd.classRooms.queryOptions());
  const g = useGlobalParams();
  const m = usePostMutate();
  const updateIndex = (id, inddex) =>
    m.updateAction.mutate(
      {
        id,
        data: {
          classIndex: inddex,
        },
      },
      {
        onSuccess(data, variables, context) {},
      },
    );
  return (
    <>
      <div className="">
        <CreateClassroom />
      </div>
      <Table dir={"rtl"} className="">
        <TableBody>
          {data?.map((classroom) => (
            <Fragment key={classroom.postId}>
              <TableRow className="">
                <TableCell className="inline-flex items-center gap-4">
                  <span>
                    <Menu Icon={null} label={`${classroom.classIndex}.`}>
                      {["1", "2", "3", "4", "5"].map((i) => (
                        <Menu.Item
                          onClick={(e) => {
                            updateIndex(classroom.postId, Number(i));
                          }}
                        >
                          {i}
                        </Menu.Item>
                      ))}
                    </Menu>{" "}
                    {classroom.classTitle}
                  </span>
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

"use client";

import { Menu } from "@/components/menu";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useGlobalParams } from "../../use-global";
import { Table, TableBody, TableCell, TableRow } from "@school-clerk/ui/table";
import { Fragment } from "react";
import { ClassroomSubjects } from "./subjects";

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
                  <span>
                    <Menu>
                      <Menu.Item
                        onClick={(e) => {
                          g.setParams({
                            openClassSubjectId: classroom.postId,
                          });
                        }}
                      >
                        Subjects
                      </Menu.Item>
                    </Menu>
                  </span>
                  <span> {classroom.classTitle}</span>
                </TableCell>
              </TableRow>
              <ClassroomSubjects classRoomId={classroom.postId} />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

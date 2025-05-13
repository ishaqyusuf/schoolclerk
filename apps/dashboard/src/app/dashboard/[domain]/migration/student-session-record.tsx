"use client";

import React from "react";
import { generateRandomString } from "@/utils/utils";
import { useAsyncMemo } from "use-async-memo";

import { Badge } from "@school-clerk/ui/badge";
import { Button } from "@school-clerk/ui/button";
import { cn } from "@school-clerk/ui/cn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@school-clerk/ui/table";

import { loadCookie, loadGenders } from "./cookie";
import { sessionRecord } from "./data";
import { GenderCell } from "./gender-cell";
import { NameCell } from "./name-cell";
import { SessionCheckbox } from "./session-name-checkbox";
import { SessionViewAction } from "./session-view-action";
import { useMigrationStore } from "./store";
import { undotName } from "./utils";

export default function StudentSessionRecord() {
  const store = useMigrationStore();
  const mem = useAsyncMemo(async () => {
    const data = sessionRecord();
    const cook = await loadCookie();
    return {
      data,
      cook,
    };
  }, [store.refreshToken]);

  const { data, cook } = mem || {};
  function unmerge(classRoom, names) {
    names.map((name) => {
      store.delete(`studentMerge.${classRoom}.${name}`);
    });
    store.update("refreshToken", generateRandomString());
  }
  if (!data) return;
  return (
    <>
      <SessionViewAction />
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Terms</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(data)?.map(([className, classData]) => (
            <React.Fragment key={className}>
              {/* {Object.entries(classData?.students)
                ?.sort((a, b) => a?.[0]?.localeCompare(b?.[0], ["ar"]))
                .map(([studentName, studentData]) => ( */}
              {classData.students
                ?.filter((std) => {
                  if (cook?.studentEntrolledIn == "some")
                    return std.terms?.length < 3;
                  else if (cook?.studentEntrolledIn == "all")
                    return std?.terms?.length == 3;
                  return true;
                })
                .map((studentData) => (
                  <TableRow
                    className={cn(
                      cook?.class && cook?.class != className && "hidden",
                    )}
                    key={studentData.fullName}
                  >
                    <TableCell>
                      <div className="flex gap-4 px-4">
                        <SessionCheckbox
                          dotName={studentData.fullName}
                          classRoom={className}
                        />
                        <div className="">
                          <NameCell student={undotName(studentData.fullName)} />
                          <div className="text-muted-foreground">
                            {studentData?.mergeNames?.map((mn) => (
                              <NameCell student={undotName(mn)} />
                            ))}
                          </div>
                        </div>
                        {!studentData?.mergeNames?.length || (
                          <Button
                            size="xs"
                            onClick={(e) => {
                              unmerge(className, studentData?.mergeNames);
                            }}
                          >
                            Unmerge
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="w-12">
                      <GenderCell name={studentData.firstName} />
                    </TableCell>
                    <TableCell>
                      <Badge>{className}</Badge>
                    </TableCell>
                    <TableCell>
                      {studentData.terms?.map((t, i) => (
                        <Badge key={i}>{t}</Badge>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { firstTermData } from "@/migration/first-term-data";
import { secondTermRawData } from "@/migration/second-term-data";
import { thirdTermData } from "@/migration/third-term-data";
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
  const [raw, setRaw] = useState({
    firstTermData,
    secondTermRawData,
    thirdTermData,
  });
  const mem = useAsyncMemo(async () => {
    const data = sessionRecord();
    const cook = await loadCookie();
    return {
      data,
      cook,
    };
  }, [store.refreshToken, raw]);

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
          {Object.entries(data)?.map(([className, classData], di) => (
            <React.Fragment key={di}>
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
                .map((studentData, si) => (
                  <TableRow
                    className={cn(
                      cook?.class && cook?.class != className && "hidden",
                    )}
                    key={si}
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

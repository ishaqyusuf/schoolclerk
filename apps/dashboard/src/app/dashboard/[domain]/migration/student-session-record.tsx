"use client";

import React, { useEffect, useState } from "react";
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

import { loadCookie } from "./cookie";
import { sessionRecord } from "./data";
import { GenderCell } from "./gender-cell";
import { NameCell } from "./name-cell";
import { PaymentCell } from "./payments-cell";
import { SessionCheckbox } from "./session-name-checkbox";
import { SessionViewAction } from "./session-view-action";
import { useMigrationStore } from "./store";
import { undotName } from "./utils";

export default function StudentSessionRecord({
  studentPayments,
  genders,
  studentMerge,
}) {
  const store = useMigrationStore();

  useEffect(() => {
    store.reset({
      studentPayments,
      genders,
      studentMerge,
    });
  }, []);
  const [raw, setRaw] = useState({
    firstTermData,
    secondTermRawData,
    thirdTermData,
  });
  const mem = useAsyncMemo(async () => {
    const cook = await loadCookie();
    return {
      // data,
      cook,
    };
  }, [store.refreshToken, raw]);

  const data = sessionRecord();
  const { cook } = mem || {};
  function unmerge(classRoom, names) {
    names.map((name) => {
      store.delete(`studentMerge.${classRoom}.${name}`);
    });
    store.update("refreshToken", generateRandomString());
  }
  if (!data) return;
  return (
    <>
      {/* <Button
        onClick={async (e) => {
          const gender = store.genders;
          const studentData = [];
          Object.entries(store.studentPayments).map(([className, data]) => {
            Object.entries(data)?.map(([name, student]) => {
              studentData.push(student);
            });
          });
          const studentMerge = store.studentMerge;
          await dumpData(gender, studentData, studentMerge);
          console.log({
            gender,
            studentMerge,
            studentData,
          });
        }}
      >
        Dump Data
      </Button> */}
      <SessionViewAction />
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Merge</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Terms</TableHead>
            <TableHead>Payment</TableHead>
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
                          <div className="text-muted-foreground flex gap-2">
                            {studentData?.mergeNames?.map((mn) => (
                              <NameCell student={undotName(mn)} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell className="w-12">
                      <GenderCell name={studentData.firstName} />
                    </TableCell>
                    <TableCell>
                      <Badge>{className}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {(["1st", "2nd", "3rd"] as any).map((t) => (
                          <div key={t}>
                            <Badge
                              variant={"default"}
                              className={cn(
                                !studentData.terms?.includes(t)
                                  ? "bg-muted-foreground"
                                  : "bg-green-800",
                                studentData?.paymentData?.storePayments
                                  ?.billables?.[t]?.omit && "bg-red-600",
                              )}
                            >
                              {t}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="w-12">
                      <PaymentCell student={studentData} />
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

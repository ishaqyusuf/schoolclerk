import React from "react";

import { Badge } from "@school-clerk/ui/badge";
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
import { NameCell } from "./name-cell";
import { SessionCheckbox } from "./session-name-checkbox";
import { SessionViewAction } from "./session-view-action";
import { undotName } from "./utils";

export default async function StudentSessionRecord() {
  const data = sessionRecord();
  const genders = await loadGenders();
  const cook = await loadCookie();
  const sessioData = {};

  return (
    <>
      <SessionViewAction />
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Terms</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(data)?.map(([className, classData]) => (
            <React.Fragment key={className}>
              {Object.entries(classData?.students)
                ?.sort((a, b) => a?.[0]?.localeCompare(b?.[0], ["ar"]))
                .map(([studentName, studentData]) => (
                  <TableRow
                    className={cn(
                      cook?.class && cook?.class != className && "hidden",
                    )}
                    key={studentName}
                  >
                    <TableCell>
                      <div className="flex gap-4 px-4">
                        <SessionCheckbox
                          dotName={studentName}
                          classRoom={className}
                        />
                        <NameCell student={undotName(studentName)} />
                      </div>
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

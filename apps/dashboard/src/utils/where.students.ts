import { Prisma } from "@school-clerk/db";

import { SearchParamsKeys, SearchParamsType } from "./search-params";
import { composeQuery } from "./utils";

export function whereStudents(query: SearchParamsType) {
  console.log({ query });
  const where: Prisma.StudentsWhereInput[] = [
    {
      sessionForms: {
        some: {
          schoolSessionId: query.sessionId,
        },
      },
    },
  ];
  if (query.departmentId) {
    where.push({
      sessionForms: {
        some: {
          schoolSessionId: query.sessionId,
          classroomDepartmentId:
            query.departmentId == "undocumented" ? null : query.departmentId,
        },
      },
    });
  }
  Object.entries(query).map(([key, value]) => {
    if (!value) return;
    switch (key as SearchParamsKeys) {
      case "studentId":
        where.push({
          id: value,
        });
        break;
    }
  });

  return composeQuery(where);
}

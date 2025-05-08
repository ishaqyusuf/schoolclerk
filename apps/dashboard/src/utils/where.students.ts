import { Prisma } from "@school-clerk/db";

import { SearchParamsType } from "./search-params";
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
  return composeQuery(where);
}

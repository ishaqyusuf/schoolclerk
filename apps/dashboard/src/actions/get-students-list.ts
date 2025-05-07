import { SearchParamsType } from "@/utils/search-params";
import { whereStudents } from "@/utils/where.students";

import { prisma } from "@school-clerk/db";

import { loadSaasProfile } from "./cookies/login-session";

export async function getStudentsListAction(query: SearchParamsType = {}) {
  const profile = await loadSaasProfile();
  const where = whereStudents(query);
  const students = await prisma.students.findMany({
    where,
    select: {
      id: true,
      name: true,
      otherName: true,
      surname: true,
      dob: true,
      gender: true,
      sessionForms: {
        where: {
          schoolSessionId: profile.sessionId,
        },
        select: {
          id: true,
          classroomDepartment: {
            select: {
              departmentLevel: true,
              departmentName: true,
              classRoom: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          termForms: {
            where: {
              sessionTermId: profile?.termId,
            },
            take: 1,
            select: {
              id: true,
            },
          },
        },
        take: 1,
      },
    },
  });
  return {
    meta: {},
    data: students.map((student) => {}),
  };
}

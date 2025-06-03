"use server";

import { PageDataMeta, PageItemData } from "@/types";
import { SearchParamsType } from "@/utils/search-params";
import { studentDisplayName } from "@/utils/utils";
import { whereStudents } from "@/utils/query.students";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";

export type StudentData = PageItemData<typeof getStudentsListAction>;
export async function getStudentsListAction(query: SearchParamsType = {}) {
  const profile = await getSaasProfileCookie();
  query.sessionId = profile.sessionId;
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
              id: true,
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
    orderBy: [
      {
        gender: "asc",
      },
      {
        name: "asc",
      },
    ],
  });
  return {
    meta: {} as PageDataMeta,
    data: students.map((student) => {
      const [{ termForms: [termForm] = [], id, classroomDepartment }] =
        student.sessionForms;
      const classRoom = classroomDepartment?.classRoom;
      const className = classRoom?.name;
      const departmentName = classroomDepartment?.departmentName;
      const departmentId = classroomDepartment?.id;
      return {
        id: student.id,
        gender: student.gender,
        studentName: studentDisplayName(student),
        department: Array.from(new Set([className, departmentName])).join(" "),
        departmentId,
        classId: classRoom?.id,
      };
    }),
  };
}

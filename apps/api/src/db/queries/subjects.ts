import type {
  GetAllSubjects,
  GetClassroomSubjects,
} from "@api/trpc/schemas/students";
import { prisma, type Database } from "@school-clerk/db";

export async function getAllSubjects(db: Database, params: GetAllSubjects) {
  const subjects = await prisma.subject.findMany({
    where: {
      schoolProfileId: params.schoolProfileId,
    },
    select: {
      id: true,
      title: true,
      schoolProfileId: true,
    },
  });
  return subjects;
}
export async function getClassroomSubjects(
  db: Database,
  params: GetClassroomSubjects,
) {
  const subjects = await db.departmentSubject.findMany({
    where: {
      classRoomDepartmentId: params?.departmentId,
    },
    select: {
      id: true,
      subject: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  return subjects;
}

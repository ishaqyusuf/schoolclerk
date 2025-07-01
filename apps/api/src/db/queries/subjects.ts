import type { TRPCContext } from "@api/trpc/init";
import type {
  GetAllSubjects,
  GetClassroomSubjects,
} from "@api/trpc/schemas/students";
import { prisma, type Database } from "@school-clerk/db";

export async function getAllSubjects(
  { db, profile }: TRPCContext,
  params: GetAllSubjects
) {
  const subjects = await db.subject.findMany({
    where: {
      schoolProfileId: profile.schoolId,
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
  params: GetClassroomSubjects
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
export async function getSubjectByName(ctx: TRPCContext, name: string) {
  let subject = await ctx.db.subject.findFirst({
    where: {
      schoolProfileId: ctx?.profile?.schoolId,
      title: name,
    },
  });
  if (!subject)
    return await ctx.db.subject.create({
      data: {
        title: name,
        schoolProfileId: ctx?.profile?.schoolId,
      },
    });
  return subject;
}
export async function getClassroomSubjectByName(
  ctx: TRPCContext,
  name: string,
  classDepartmentId: string
) {
  const subject = await getSubjectByName(ctx, name);
  let classroomSubject = await ctx.db.departmentSubject.findFirst({
    where: {
      classRoomDepartmentId: classDepartmentId,
      subjectId: subject.id,
      sessionTermId: ctx?.profile.termId,
    },
    include: { subject: true },
  });
  if (!classroomSubject)
    return await ctx.db.departmentSubject.create({
      data: {
        classRoomDepartmentId: classDepartmentId,
        subjectId: subject.id,
        sessionTermId: ctx?.profile.termId,
      },
      include: {
        subject: true,
      },
    });
  return classroomSubject;
}

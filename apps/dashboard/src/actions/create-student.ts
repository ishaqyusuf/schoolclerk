"use server";

import { revalidatePath } from "next/cache";
import z from "zod";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";
import { actionClient } from "./safe-action";
import { createStudentSchema } from "./schema";

export type CreateClassRoom = z.infer<typeof createStudentSchema>;
export async function createStudent(data: CreateClassRoom) {
  const profile = await getSaasProfileCookie();
  return await prisma.$transaction(async (tx) => {
    const student = await tx.students.create({
      data: {
        gender: data.gender,
        name: data.name,
        otherName: data.otherName,
        surname: data.surname,
        schoolProfileId: profile.schoolId,
        dob: data.dob,
        sessionForms: {
          create: {
            schoolSessionId: profile.sessionId,
            schoolProfileId: profile.schoolId,
            classroomDepartmentId: data.classRoomId || undefined,
            termForms: {
              create: {
                schoolProfileId: profile.schoolId,
                sessionTermId: profile.termId,
                schoolSessionId: profile.sessionId,
              },
            },
          },
        },
      },
    });
    return student;
  });
}
export const createStudentAction = actionClient
  .schema(createStudentSchema)
  .action(async ({ parsedInput: data }) => {
    const resp = await createStudent(data);
    revalidatePath("/student/list");
    return resp;
  });

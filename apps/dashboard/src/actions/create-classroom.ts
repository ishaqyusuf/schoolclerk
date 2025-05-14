"use server";

import z from "zod";

import { prisma } from "@school-clerk/db";

import { classChanged } from "./cache/cache-control";
import { getSaasProfileCookie } from "./cookies/login-session";
import { actionClient } from "./safe-action";
import { createClassroomSchema } from "./schema";

export type CreateClassRoom = z.infer<typeof createClassroomSchema>;
export async function createClassroom(data: CreateClassRoom) {
  const profile = await getSaasProfileCookie();

  return await prisma.$transaction(async (tx) => {
    if (!data.departments?.length)
      data.departments = [
        {
          name: data.className,
        },
      ];
    const resp = await tx.classRoom.upsert({
      where: {
        schoolSessionId_name: {
          name: data.className,
          schoolSessionId: profile.sessionId,
        },
      },
      update: {
        classRoomDepartments: {
          createMany: {
            data: data.departments?.map((d) => ({
              departmentName: d.name,
              schoolProfileId: profile.schoolId,
            })),
          },
        },
      },
      create: {
        name: data.className,
        schoolSessionId: profile.sessionId,
        schoolProfileId: profile.schoolId,
        classRoomDepartments: {
          createMany: {
            data: data.departments?.map((d) => ({
              departmentName: d.name,
              schoolProfileId: profile.schoolId,
            })),
          },
        },
      },
    });
    return resp;
    // const resp = tx.classRoom.create({
    //   data: {
    //     name: data.className,
    //     schoolSessionId: profile.sessionId,
    //     schoolProfileId: profile.schoolId,
    //     classRoomDepartments: {
    //       createMany: {
    //         data: data.departments?.map((d) => ({
    //           departmentName: d.name,
    //           schoolProfileId: profile.schoolId,
    //         })),
    //       },
    //     },
    //   },
    // });
    // return resp;
  });
}
export const createClassroomAction = actionClient
  .schema(createClassroomSchema)
  .action(async ({ parsedInput: data }) => {
    const profile = await getSaasProfileCookie();
    const resp = await createClassroom(data);
    classChanged();
    return resp;
  });

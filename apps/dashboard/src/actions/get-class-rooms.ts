"use server";

import { AsyncFnType } from "@/types";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";

export type ClassRoomPageItem = AsyncFnType<
  typeof getClassRooms
>["data"][number];
export async function getClassRooms(params) {
  const profile = await getSaasProfileCookie();

  const classRooms = await prisma.classRoomDepartment.findMany({
    where: {
      classRoom: {
        schoolSessionId: profile?.sessionId,
      },
    },
    select: {
      id: true,
      departmentName: true,
      classRoom: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log({
    classRooms,
  });
  return {
    data: classRooms,
    meta: {} as any,
  };
}

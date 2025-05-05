"use server";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";

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
  return {
    data: classRooms,
    meta: {} as any,
  };
}

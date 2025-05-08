"use server";

import { AsyncFnType, PageItemData } from "@/types";
import { SearchParamsType } from "@/utils/search-params";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";

export type ClassRoomPageItem = PageItemData<typeof getClassRooms>;
export async function getClassRooms(params: SearchParamsType) {
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

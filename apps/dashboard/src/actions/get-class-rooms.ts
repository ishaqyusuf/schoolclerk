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
      id: !params?.departmentId ? undefined : params.departmentId,
      classRoom: {
        schoolSessionId: profile?.sessionId,
        name: params.className ? params.className : undefined,
        session: {
          id: profile.sessionId,
        },
      },
    },
    select: {
      id: true,
      departmentName: true,
      _count: {
        select: {
          studentSessionForms: {
            where: {
              student: {
                deletedAt: null,
              },
            },
          },
        },
      },
      classRoom: {
        select: {
          session: {
            select: {
              title: true,
              id: true,
            },
          },
          name: true,
          id: true,
        },
      },
    },
  });

  return {
    data: classRooms.map(({ ...a }) => {
      const displayName = a.departmentName?.includes(a.classRoom?.name)
        ? a.departmentName
        : `${a.classRoom?.name} ${a.departmentName}`;
      return {
        ...a,
        displayName,
      };
    }),
    meta: {} as any,
  };
}

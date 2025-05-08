"use server";

import { unstable_cache } from "next/cache";
import { whereClassroom } from "@/utils/where.classroom";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "../cookies/login-session";

export async function getCachedClassRooms(termId) {
  const profile = await getSaasProfileCookie();
  return unstable_cache(
    async () => {
      const where = whereClassroom({
        sessionId: profile.sessionId,
      });
      const classrooms = await prisma.classRoom.findMany({
        where,
        include: {
          classRoomDepartments: {
            include: {},
          },
        },
      });
      return classrooms
        .map((c) => {
          return c.classRoomDepartments.map((d) => {
            return {
              departmentId: d.id,
              classId: c.id,
              name: [c.name, d.departmentName].filter(Boolean).join(" "),
            };
          });
        })
        .flat();
    },
    [`classrooms_${termId}`],
    {
      tags: [`classrooms_${termId}`],
    },
  )();
}

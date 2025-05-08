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
        include: {},
      });
      return classrooms;
    },
    [`classrooms_${termId}`],
    {
      tags: [`classrooms_${termId}`],
    },
  )();
}

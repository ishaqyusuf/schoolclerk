"use server";

import { unstable_cache } from "next/cache";
import { whereClassroom } from "@/utils/where.classroom";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "../cookies/login-session";

export async function getCachedFees(termId) {
  const profile = await getSaasProfileCookie();
  return unstable_cache(
    async () => {
      const items = await prisma.feeHistory.findMany({
        where: {
          termId,
          current: true,
        },
        select: {
          id: true,
          amount: true,
          current: true,
          fee: {
            select: {
              id: true,
              title: true,
              description: true,
            },
          },
        },
      });
      return items.map((item) => ({
        historyId: item.id,
        feeId: item.fee.id,
        title: item.fee.title,
        description: item.fee.description,
        amount: item.amount,
      }));
    },
    [`fees_${termId}`],
    {
      tags: [`fees_${termId}`],
    },
  )();
}

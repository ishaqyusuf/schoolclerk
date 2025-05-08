import { PageItemData } from "@/types";
import { SearchParamsType } from "@/utils/search-params";
import { whereStudents } from "@/utils/where.students";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";

export type SchoolFeePageItem = PageItemData<typeof getSchoolFees>;
export async function getSchoolFees(query: SearchParamsType = {}) {
  const profile = await getSaasProfileCookie();

  const fees = await prisma.fees.findMany({
    where: {},
    select: {
      amount: true,
      description: true,
      title: true,
      feeHistory: {
        // schoolSessionId: profile.sessionId,
        select: {
          schoolSessionId: true,
          amount: true,
        },
      },
    },
  });
  return {
    meta: {},
    data: fees.map((dept) => {
      return dept;
    }),
  };
}

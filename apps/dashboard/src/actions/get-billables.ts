import { PageItemData } from "@/types";
import { SearchParamsType } from "@/utils/search-params";
import { whereStudents } from "@/utils/where.students";

import { prisma } from "@school-clerk/db";

import { loadSaasProfile } from "./cookies/login-session";

export type SchoolFeePageItem = PageItemData<typeof getBillables>;
export async function getBillables(query: SearchParamsType = {}) {
  const profile = await loadSaasProfile();

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

import { SearchParamsType } from "@/utils/search-params";
import { whereStudents } from "@/utils/where.students";

import { prisma } from "@school-clerk/db";

import { loadSaasProfile } from "./cookies/login-session";

export async function getTermBillables(query: SearchParamsType = {}) {
  const profile = await loadSaasProfile();
  const billables = await prisma.departmentTermBillable.findMany({
    where: {
      sessionTermId: profile.termId,
    },
    select: {
      billablePrice: {
        select: {
          amount: true,
          billable: {
            select: {
              description: true,
              title: true,
            },
          },
        },
      },
      classRoomDepartments: {
        select: {
          departmentName: true,
          classRoom: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return {
    meta: {},
    data: billables.map((dept) => {
      return dept;
    }),
  };
}

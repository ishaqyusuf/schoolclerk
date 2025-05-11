import { PageDataMeta, PageItemData } from "@/types";
import { SearchParamsType } from "@/utils/search-params";

import { prisma } from "@school-clerk/db";

export type PageItem = PageItemData<typeof getStudentFees>;
export async function getStudentFees(query: SearchParamsType = {}) {
  const data = await prisma.studentFee.findMany({
    where: {
      schoolProfileId: query.schoolProfileId,
      OR: [
        {
          studentTermForm: {
            sessionTermId: query.termId,
          },
        },
        {
          pendingAmount: {
            gt: 0,
          },
        },
      ],
    },
    select: {
      billAmount: true,
      pendingAmount: true,
      updatedAt: true,
      feeTitle: true,
      description: true,

      studentTermForm: {
        select: {
          sessionTerm: {
            select: {
              title: true,
              id: true,
              session: {
                select: {
                  title: true,
                },
              },
            },
          },
          student: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return {
    meta: {} as PageDataMeta,
    data: data.map((dept) => {
      return dept;
    }),
  };
}

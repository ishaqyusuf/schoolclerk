import { PageDataMeta, PageItemData } from "@/types";
import { SearchParamsType } from "@/utils/search-params";

import { prisma } from "@school-clerk/db";

export type PageItem = PageItemData<typeof getTransactions>;
export async function getTransactions(query: SearchParamsType = {}) {
  const billables = await prisma.walletTransactions.findMany({
    where: {
      wallet: {
        schoolProfileId: query.schoolProfileId,
      },
      OR: [
        {
          billPayment: {
            deletedAt: null,
          },
        },
        {
          studentPayment: {
            deletedAt: null,
          },
        },
      ],
    },
    select: {
      amount: true,
      summary: true,
      type: true,
    },
  });
  return {
    meta: {} as PageDataMeta,
    data: billables.map((dept) => {
      return dept;
    }),
  };
}

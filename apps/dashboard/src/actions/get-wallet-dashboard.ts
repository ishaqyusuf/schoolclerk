"use server";

import { prisma } from "@school-clerk/db";

import { getFinanceCookie } from "./cookies/finance-dashboard";
import { getSaasProfileCookie } from "./cookies/login-session";

export async function getWalletDashboard() {
  const profile = await getSaasProfileCookie();
  const financeCookie = await getFinanceCookie();
  const wallets = await prisma.wallet.findMany({
    where: {
      schoolProfileId: profile.schoolId,
      sessionTermId: profile.termId,
    },
    select: {
      _count: {
        select: {
          transactions: {},
        },
      },
      transactions: {},
    },
  });

  const transactions = await prisma.walletTransactions.groupBy({
    by: ["type"],
    _sum: {
      amount: true,
    },
    where: {
      OR: [
        { studentPayment: null },
        {
          studentPayment: {
            studentTermForm: {
              sessionForm: {
                Student: {
                  deletedAt: null,
                },
              },
            },
          },
        },
      ],
      wallet: {
        sessionTermId: profile.termId,
      },
    },
  });
  const pendingBillByWalletType = await prisma.bills.groupBy({
    by: ["title"],
    _sum: {
      amount: true,
    },
    where: {
      billPaymentId: null,
      billableHistory: {
        termId: profile.termId,
      },
    },
  });
  const pendingFeeByWalletType = await prisma.studentFee.groupBy({
    by: ["feeTitle"],
    where: {
      studentTermForm: {
        sessionTermId: profile.termId,
      },
    },
    _sum: {
      billAmount: true,
      pendingAmount: true,
    },
  });
  return {
    wallets,
    transactions,
    pendingFeeByWalletType,
    pendingBillByWalletType,
  };
}

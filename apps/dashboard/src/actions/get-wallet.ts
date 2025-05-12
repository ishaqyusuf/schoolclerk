"use server";

import { prisma } from "@school-clerk/db";

import { walletAdded } from "./cache/cache-control";
import { getSaasProfileCookie } from "./cookies/login-session";

export async function getWalletAction(name, tx: typeof prisma = prisma) {
  const profile = await getSaasProfileCookie();
  const w = await tx.wallet.findFirst({
    where: {
      name,
      schoolProfileId: profile.schoolId,
      sessionTermId: profile.termId,
    },
  });
  if (w) return w;
  const wallet = await tx.wallet.upsert({
    where: {
      name_schoolProfileId_sessionTermId: {
        name,
        schoolProfileId: profile.schoolId,
        sessionTermId: profile.termId,
      },
    },
    create: {
      name,
      schoolProfileId: profile.schoolId,
      sessionTermId: profile.termId,
    },
    update: {},
  });
  walletAdded();
  return wallet;
}

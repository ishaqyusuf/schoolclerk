"use server";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";

export async function getWalletAction(name) {
  const profile = await getSaasProfileCookie();
  const wallet = await prisma.wallet.upsert({
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
  return wallet;
}

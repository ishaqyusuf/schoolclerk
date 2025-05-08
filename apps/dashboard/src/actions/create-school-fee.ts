"use server";

import { revalidatePath } from "next/cache";
import z from "zod";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";
import { actionClient } from "./safe-action";
import { createBillableSchema } from "./schema";

export type CreateBillableForm = z.infer<typeof createBillableSchema>;
export async function createBillable(data: CreateBillableForm) {
  const profile = await getSaasProfileCookie();

  return await prisma.$transaction(async (tx) => {
    await tx.fees.create({
      data: {
        title: data.title,
        schoolProfileId: profile.schoolId,
        feeHistory: {
          create: {
            amount: data.amount,
            current: true,
            schoolSessionId: profile.sessionId,
            termId: profile.termId,
          },
        },
      },
    });
  });
}
export const createBillableAction = actionClient
  .schema(createBillableSchema)
  .action(async ({ parsedInput: data }) => {
    const resp = await createBillable(data);
    revalidatePath("/academic/classes");
    return resp;
  });

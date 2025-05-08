"use server";

import { revalidatePath } from "next/cache";
import z from "zod";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";
import { actionClient } from "./safe-action";
import { createBillableSchema, createSchoolFeeSchema } from "./schema";

export type CreateBillableForm = z.infer<typeof createSchoolFeeSchema>;
export async function createSchoolFee(data: CreateBillableForm) {
  const profile = await getSaasProfileCookie();

  return await prisma.$transaction(async (tx) => {
    await tx.fees.create({
      data: {
        title: data.title,
        amount: data.amount,
        schoolProfileId: profile.schoolId,
        description: data.description,
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
export const createSchoolFeeAction = actionClient
  .schema(createBillableSchema)
  .action(async ({ parsedInput: data }) => {
    const resp = await createSchoolFee(data);
    revalidatePath("/academic/classes");
    return resp;
  });

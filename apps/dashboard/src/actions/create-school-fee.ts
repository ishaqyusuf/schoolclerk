"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { transaction } from "@/utils/db";
import z from "zod";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";
import { actionClient } from "./safe-action";
import { createBillableSchema, createSchoolFeeSchema } from "./schema";

export type CreateSchoolFeeForm = z.infer<typeof createSchoolFeeSchema>;
export async function createSchoolFee(
  data: CreateSchoolFeeForm,
  tx: typeof prisma,
) {
  const profile = await getSaasProfileCookie();
  return await tx.fees.create({
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
}
export const createSchoolFeeAction = actionClient
  .schema(createBillableSchema)
  .action(async ({ parsedInput: data }) => {
    return await transaction(async (tx) => {
      const profile = await getSaasProfileCookie();
      const resp = await createSchoolFee(data, tx);
      revalidateTag(`fees_${profile.termId}`);
      revalidatePath("/academic/classes");
      return resp;
    });
  });

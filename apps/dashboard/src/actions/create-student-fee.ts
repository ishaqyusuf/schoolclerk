"use server";

import { revalidatePath } from "next/cache";
import z from "zod";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";
import { getWalletAction } from "./get-wallet";
import { actionClient } from "./safe-action";
import { studentFeeSchema } from "./schema";

export type Type = z.infer<typeof studentFeeSchema>;
export async function createStudentFee(data: Type) {
  const profile = await getSaasProfileCookie();

  return await prisma.$transaction(async (tx) => {
    const wallet = await getWalletAction(data.title);
    const fee = await tx.studentFee.create({
      data: {
        billAmount: data.amount,
        pendingAmount: data.amount,
        schoolProfileId: profile.schoolId,
        studentTermFormId: data.studentTermId,
        schoolSessionId: profile.sessionId,
        feeHistoryId: data.feeId,
        // description: data.feeDescription
      },
    });
    // const student = await prisma
  });
}
export const createStudentFeeAction = actionClient
  .schema(studentFeeSchema)
  .action(async ({ parsedInput: data }) => {
    const resp = await createStudentFee(data);
    revalidatePath("/student/list");
    return resp;
  });

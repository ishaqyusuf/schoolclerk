"use server";

import { revalidatePath } from "next/cache";
import { AsyncFnType } from "@/types";
import { transaction } from "@/utils/db";
import z from "zod";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";
import { getWalletAction } from "./get-wallet";
import { actionClient } from "./safe-action";
import { studentFeeSchema } from "./schema";

export type Type = z.infer<typeof studentFeeSchema>;
export async function createStudentFee(data: Type, tx: typeof prisma = prisma) {
  const profile = await getSaasProfileCookie();

  const fee = await tx.studentFee.create({
    data: {
      billAmount: data.amount,
      pendingAmount: data.amount,
      schoolProfileId: profile.schoolId,
      studentTermFormId: data.studentTermId,
      schoolSessionId: profile.sessionId,
      feeHistoryId: data.feeId,
      description: data.title,
      // description: data.feeDescription
    },
    select: {
      id: true,
      description: true,
      studentTermForm: {
        select: {
          id: true,
          sessionTermId: true,
        },
      },
    },
  });
  return fee;
  // const student = await prisma
}
export const createStudentFeeAction = actionClient
  .schema(studentFeeSchema)
  .action(async ({ parsedInput: data }) => {
    const res = await transaction(async (tx) => {
      const resp = await createStudentFee(data, tx);
      revalidatePath("/student/list");
      return resp;
    });
  });

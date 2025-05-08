"use server";

import { revalidatePath } from "next/cache";
import { sum } from "@/utils/utils";
import z from "zod";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";
import { getWalletAction } from "./get-wallet";
import { actionClient } from "./safe-action";
import { studentFeePaymentSchema } from "./schema";

export type CreateClassRoom = z.infer<typeof studentFeePaymentSchema>;
export async function createStudentFeePayment(data: CreateClassRoom) {
  const profile = await getSaasProfileCookie();

  return await prisma.$transaction(async (tx) => {
    const wallet = await getWalletAction(data.paymentType);
    const p = await tx.studentFee.update({
      where: {
        id: data.studentFeeId,
      },
      data: {
        receipts: {
          create: {
            type: "FEE",
            paymentType: data.paymentType,
            amount: data.amount,
            schoolProfile: {
              connect: { id: profile.schoolId },
            },
            studentTermForm: {
              connect: { id: data.termId },
            },
            walletTransaction: {
              create: {
                amount: data.amount,
                walletId: wallet.id,
                type: data.paymentType,
              },
            },
          },
        },
      },
      select: {
        billAmount: true,
        receipts: {
          select: {
            amount: true,
          },
        },
      },
    });
    const paid = sum(p.receipts, "amount");
    await tx.studentFee.update({
      where: {
        id: data.studentFeeId,
      },
      data: {
        pendingAmount: p.billAmount - paid,
      },
    });
  });
}
export const createStudentFeePaymentAction = actionClient
  .schema(studentFeePaymentSchema)
  .action(async ({ parsedInput: data }) => {
    const resp = await createStudentFeePayment(data);
    revalidatePath("/student/list");
    return resp;
  });

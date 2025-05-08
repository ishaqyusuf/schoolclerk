"use server";

import { revalidatePath } from "next/cache";
import { transaction } from "@/utils/db";
import { sum } from "@/utils/utils";
import z from "zod";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";
import { getWalletAction } from "./get-wallet";
import { actionClient } from "./safe-action";
import { studentFeePaymentSchema } from "./schema";

export type CreateClassRoom = z.infer<typeof studentFeePaymentSchema>;
export async function createStudentFeePayment(
  data: CreateClassRoom,
  tx: typeof prisma = prisma,
) {
  const profile = await getSaasProfileCookie();

  const wallet = await getWalletAction(data.paymentType, tx);
  const p = await tx.studentFee.update({
    where: {
      id: data.studentFeeId,
      studentTermFormId: data.termId,
    },
    data: {
      receipts: {
        create: {
          type: "FEE",
          description: "",
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
      pendingAmount: {
        decrement: data.amount,
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

  return p;
}
export const createStudentFeePaymentAction = actionClient
  .schema(studentFeePaymentSchema)
  .action(async ({ parsedInput: data }) => {
    return await transaction(async (tx) => {
      const resp = await createStudentFeePayment(data, tx);
      revalidatePath("/student/list");
      return resp;
    });
  });

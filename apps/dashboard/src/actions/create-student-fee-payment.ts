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
  console.log({ wallet, data });

  // const r = await tx.studentPayment.create({
  //   data: {
  //     studentFee: {
  //       connect: {
  //         id: data.studentFeeId,
  //       },
  //     },
  //     type: "FEE",
  //     description: "x",
  //     paymentType: data.paymentType,
  //     amount: data.amount,
  //     schoolProfile: {
  //       connect: { id: profile.schoolId },
  //     },
  //     studentTermForm: {
  //       connect: { id: data.termId },
  //     },
  //     walletTransaction: {
  //       create: {
  //         amount: data.amount,
  //         // walletId: wallet.id,
  //         type: data.paymentType,

  //         wallet: {
  //           connect: {
  //             id: wallet.id,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  // console.log({ r });
  const p = await tx.studentFee.update({
    where: {
      id: data.studentFeeId,
    },
    data: {
      receipts: {
        create: {
          type: "FEE",
          description: "x",
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
              // walletId: wallet.id,
              type: data.paymentType,

              wallet: {
                connect: {
                  id: wallet.id,
                },
              },
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

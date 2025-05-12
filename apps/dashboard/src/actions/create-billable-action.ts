"use server";

import { transaction } from "@/utils/db";
import z from "zod";

import { prisma } from "@school-clerk/db";

import { billablesChanged } from "./cache/cache-control";
import { getSaasProfileCookie } from "./cookies/login-session";
import { actionClient } from "./safe-action";
import { createBillableSchema } from "./schema";

export type CreateBillableForm = z.infer<typeof createBillableSchema>;
export async function createBillable(
  data: CreateBillableForm,
  tx: typeof prisma,
) {
  const profile = await getSaasProfileCookie();
  const resp = await tx.billable.create({
    data: {
      title: data.title,
      amount: data.amount,
      schoolProfileId: profile.schoolId,
      description: data.description,
      type: data.type,
      billableHistory: {
        create: {
          amount: data.amount,
          current: true,
          schoolSessionId: profile.sessionId,
          termId: profile.termId,
        },
      },
    },
  });
  billablesChanged();
  return resp;
}
export const createBillableAction = actionClient
  .schema(createBillableSchema)
  .action(async ({ parsedInput: data }) => {
    return await transaction(async (tx) => {
      const resp = await createBillable(data, tx);

      return resp;
    });
  });

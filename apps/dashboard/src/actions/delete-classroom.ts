"use server";

import { transaction } from "@/utils/db";
import z from "zod";

import { prisma } from "@school-clerk/db";

import { classChanged } from "./cache/cache-control";
import { getSaasProfileCookie } from "./cookies/login-session";
import { actionClient } from "./safe-action";
import { deleteSchema } from "./schema";

export type Data = z.infer<typeof deleteSchema>;
export async function deleteClassroom(data: Data, tx: typeof prisma = prisma) {
  const profile = await getSaasProfileCookie();

  await tx.classRoom.update({
    where: {
      id: data.id,
    },
    data: {
      deletedAt: new Date(),
      classRoomDepartments: {
        updateMany: {
          where: {},
          data: {
            deletedAt: new Date(),
          },
        },
      },
    },
  });
}
export const deleteClassroomAction = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput: data }) => {
    return await transaction(async (tx) => {
      const resp = await deleteClassroom(data, tx);
      classChanged();
      return resp;
    });
  });

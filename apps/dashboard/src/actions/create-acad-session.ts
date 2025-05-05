"use server";

import { z } from "zod";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";
import { actionClient } from "./safe-action";

export const createAcadSessionSchema = z.object({
  title: z.string(),
  terms: z.array(
    z.object({
      startDate: z.date().optional(),
      endDate: z.date().optional(),
    }),
  ),
});

export const createAcadSessionAction = actionClient
  .schema(createAcadSessionSchema)
  .action(async ({ parsedInput: data }) => {
    const profile = await getSaasProfileCookie();
    await prisma.schoolSession.create({
      data: {
        title: data.title,
        school: {
          connect: {
            id: profile?.schoolId,
          },
        },
        terms: {
          createMany: data.terms?.length
            ? {
                data: data.terms.map((d) => ({
                  schoolId: profile?.schoolId,
                  ...d,
                })),
              }
            : undefined,
        },
      },
    });
  });

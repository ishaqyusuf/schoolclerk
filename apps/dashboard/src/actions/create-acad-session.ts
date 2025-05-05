"use server";

import { z } from "zod";

import { prisma } from "@school-clerk/db";

import { getSaasProfileCookie } from "./cookies/login-session";
import { actionClient } from "./safe-action";
import { createAcadSessionSchema } from "./schema";

export const createAcadSessionAction = actionClient
  .schema(createAcadSessionSchema)
  .action(async ({ parsedInput: data }) => {
    // throw new Error("....");
    const resp = await prisma.$transaction(async (tx) => {
      const profile = await getSaasProfileCookie();
      const schoolSession = await tx.schoolSession.create({
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
                    title: d.title,
                    startDate: d.startDate,
                    endDate: d.endDate,
                  })),
                }
              : undefined,
          },
        },
        select: {
          terms: {
            orderBy: {
              startDate: "desc",
            },
          },
        },
      });
      return schoolSession;
    });
    console.log(resp);
    await prisma.schoolSession.deleteMany({});
    await prisma.sessionTerm.deleteMany({});
    throw new Error();
    // const termId = resp?.terms?.
    return resp;
  });

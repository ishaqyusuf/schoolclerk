"use server";

import z from "zod";

import { db } from "@school-clerk/db";

import { actionClient } from "./safe-action";

export async function createSchool() {
  const s = await db.saasAccount.create({
    data: {
      // email:
    },
  });
}
const schema = z.object({});
actionClient
  .schema(schema)
  .metadata({})
  .action(async(({ parsedInput: { input } }) => {}));

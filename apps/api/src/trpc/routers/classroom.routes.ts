import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../init";
import { classroomQuerySchema, questionQuerySchema } from "../schemas/schemas";

import { loadQuestions } from "@api/db/queries/questions";
import { getClassrooms } from "@api/db/queries/classroom";
export const classroomRouter = createTRPCRouter({
  all: publicProcedure
    .input(classroomQuerySchema)
    .query(async ({ input, ctx }) => {
      const result = await getClassrooms(ctx, input);
      return result;
    }),
  getForm: publicProcedure
    .input(
      z.object({
        postId: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await loadQuestions(ctx, input);
      return result?.[0];
    }),
  test: publicProcedure.query(async ({ input, ctx: { db } }) => {
    return {
      id: 1,
    };
  }),
});

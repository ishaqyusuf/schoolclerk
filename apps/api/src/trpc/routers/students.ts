import { createTRPCRouter, publicProcedure } from "../init";
import { getStudents, getStudentsQueryParams } from "../../db/queries/students";
import { getStudentsSchema } from "../schemas/schemas";
export const studentsRouter = createTRPCRouter({
  filters: publicProcedure.query(async ({ input, ctx }) => {
    console.log("FILTERS");
    return getStudentsQueryParams(ctx);
  }),
  index: publicProcedure
    .input(getStudentsSchema)
    .query(async ({ input, ctx }) => {
      return getStudents(ctx, input);
    }),
  test: publicProcedure.query(async ({ input, ctx: { db } }) => {
    return {
      id: 1,
    };
  }),
});

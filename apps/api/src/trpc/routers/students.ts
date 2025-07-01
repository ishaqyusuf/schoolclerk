import { createTRPCRouter, publicProcedure } from "../init";
import { getStudents } from "../../db/queries/students";
import { getStudentsSchema } from "../schemas/students";
export const studentsRouter = createTRPCRouter({
  get: publicProcedure
    .input(getStudentsSchema)
    .query(async ({ input, ctx: { db } }) => {
      return getStudents(db, input);
    }),
  test: publicProcedure.query(async ({ input, ctx: { db } }) => {
    return {
      id: 1,
    };
  }),
});

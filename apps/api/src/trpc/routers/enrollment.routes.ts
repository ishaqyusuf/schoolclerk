import { createTRPCRouter, publicProcedure } from "../init";
import { getStudents } from "../../db/queries/students";
import { getStudentsSchema } from "../schemas/students";
import { enrollmentQuerySchema } from "../schemas/schemas";
import { enrollmentsIndex } from "@api/db/queries/enrollment-query";
export const enrollmentsRouter = createTRPCRouter({
  index: publicProcedure
    .input(enrollmentQuerySchema)
    .query(async ({ input, ctx }) => {
      const result = await enrollmentsIndex(ctx, input);
      return result;
    }),
});

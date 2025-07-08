import { createTRPCRouter, publicProcedure } from "../init";
import {
  getStudents,
  getStudent,
  getStudentsQueryParams,
} from "../../db/queries/students";
import {
  getStudentOverviewSchema,
  getStudentsSchema,
} from "../schemas/schemas";
import { studentsOverview } from "@api/db/queries/students.overview";
export const studentsRouter = createTRPCRouter({
  filters: publicProcedure.query(async ({ input, ctx }) => {
    return getStudentsQueryParams(ctx);
  }),
  index: publicProcedure
    .input(getStudentsSchema)
    .query(async ({ input, ctx }) => {
      return getStudents(ctx, input);
    }),
  getStudent: publicProcedure
    .input(getStudentsSchema)
    .query(async ({ input, ctx }) => {
      return getStudent(ctx, input);
    }),
  overview: publicProcedure
    .input(getStudentOverviewSchema)
    .query(async (props) => {
      return studentsOverview(props.ctx, props.input);
    }),
  getStudentPaymentHistory: publicProcedure.query(async ({ ctx, input }) => {
    return getStudentPaymentHistory(ctx, input);
  }),
});

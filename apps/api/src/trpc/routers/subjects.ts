import {
  getAllSubjects,
  getClassroomSubjects,
} from "../../db/queries/subjects";
import { createTRPCRouter, publicProcedure } from "../init";
import {
  getAllSubjectsSchema,
  getClassroomSubjectsSchema,
} from "../schemas/students";
export const subjectsRouter = createTRPCRouter({
  all: publicProcedure.input(getAllSubjectsSchema).query(async (q) => {
    return await getAllSubjects(q.ctx.db, q.input);
  }),
  getByClassroom: publicProcedure
    .input(getClassroomSubjectsSchema)
    .query(async ({ input, ctx: { db } }) => {
      return await getClassroomSubjects(db, input);
    }),
});

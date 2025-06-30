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
    // console.log(q.ctx.)
    return await getAllSubjects(q.ctx, q.input);
  }),
  byClassroom: publicProcedure
    .input(getClassroomSubjectsSchema)
    .query(async ({ input, ctx: { db } }) => {
      console.log(input);

      return [];
      // return await getClassroomSubjects(db, input);
    }),
});

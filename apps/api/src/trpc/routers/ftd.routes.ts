import z from "zod";
import { createTRPCRouter, publicProcedure } from "../init";
import {
  createPost,
  generateFirstTermData,
  getClassrooms,
  getClassroomStudents,
  getClassroomSubjects,
  getStudentAssessments,
  getSubjects,
  updatePost,
  updateStudentAssessment,
} from "@api/db/queries/first-term-data";

export const ftdRouter = createTRPCRouter({
  generateFirstTermData: publicProcedure
    .input(
      z.object({
        payload: z.any(),
      })
    )
    .mutation(async (props) => {
      return generateFirstTermData(props.ctx, props.input.payload);
    }),
  classRooms: publicProcedure.query(async (props) => {
    return getClassrooms(props.ctx);
  }),
  subjectsList: publicProcedure.query(async (props) => {
    return getSubjects(props.ctx);
  }),
  getClassroomStudents: publicProcedure
    .input(
      z.object({
        classRoomId: z.number(),
      })
    )
    .query(async (props) => {
      return getClassroomStudents(props.ctx, props.input.classRoomId);
    }),
  getStudentAssessments: publicProcedure
    .input(
      z.object({
        studentId: z.number(),
        subjectAssessments: z.array(z.any()),
      })
    )
    .query(async (props) => {
      return getStudentAssessments(props.ctx, props.input);
    }),
  getClassRoomSubjects: publicProcedure
    .input(
      z.object({
        classRoomId: z.number(),
      })
    )
    .query(async (props) => {
      return getClassroomSubjects(props.ctx, props.input.classRoomId);
    }),
  updateStudentAssessment: publicProcedure
    .input(
      z.object({
        meta: z.object({
          studentId: z.number(),
          subjectAssessmentId: z.number(),
          classSubjectId: z.number(),
          classId: z.number(),
          markObtained: z.number().optional().nullable(),
          calculatedScore: z.number().optional().nullable(),
        }),
      })
    )
    .mutation(async (props) => {
      return await updateStudentAssessment(props.ctx, props.input);
    }),
  createPost: publicProcedure
    .input(
      z.object({
        data: z.any(),
        // id: z.number(),
      })
    )
    .mutation(async (props) => {
      return await createPost(props.ctx, props.input.data);
    }),
  updatePost: publicProcedure
    .input(
      z.object({
        data: z.any(),
        id: z.number(),
      })
    )
    .mutation(async (props) => {
      return await updatePost(props.ctx, props.input.id, props.input.data);
    }),
});

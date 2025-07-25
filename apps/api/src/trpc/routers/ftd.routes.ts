import z from "zod";
import { createTRPCRouter, publicProcedure } from "../init";
import {
  createPost,
  generateFirstTermData,
  getClassrooms,
  getClassroomStudents,
  getClassroomSubjects,
  getSubjects,
  updatePost,
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
  getClassRoomSubjects: publicProcedure
    .input(
      z.object({
        classRoomId: z.number(),
      })
    )
    .query(async (props) => {
      return getClassroomSubjects(props.ctx, props.input.classRoomId);
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

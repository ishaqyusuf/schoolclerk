import { z } from "zod";

export const questionDataSchema = z.object({
  id: z.number().optional().nullable(),
  question: z.string().optional(),
  type: z.string().optional().nullable(),
  subject: z.string().optional(),
  classDepartmentId: z.string().optional(),
  className: z.string().optional(),
  subjectId: z.string().optional().nullable(),
});
export type QuestionData = z.infer<typeof questionDataSchema>;

export const questionQuerySchema = z.object({
  subjectId: z.string().optional().nullable(),
  postId: z.number().optional().nullable(),
  classDepartmentId: z.string().optional().nullable(),
});
export type QuestionQuery = z.infer<typeof questionQuerySchema>;

export const classroomQuerySchema = z.object({
  id: z.number().optional().nullable(),
  departmentId: z.string().optional().nullable(),
  className: z.string().optional().nullable(),
});
export type ClassroomQuery = z.infer<typeof classroomQuerySchema>;

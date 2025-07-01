import { z } from "@hono/zod-openapi";

export const questionDataSchema = z.object({
  id: z.number().optional().nullable(),
  question: z.string().optional(),
  type: z.string().optional().nullable(),
  subject: z.string(),
  classDepartmentId: z.string(),
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

export const enrollmentQuerySchema = z.object({
  previousSessionId: z.string().optional().nullable(),
  previousTermId: z.string().optional().nullable(),
  currentSessionId: z.string().optional().nullable(),
  currentTermId: z.string().optional().nullable(),
  previousClassDepartmentId: z.string().optional().nullable(),
  currentClassDepartmentId: z.string().optional().nullable(),
});
export type EnrollmentQuery = z.infer<typeof enrollmentQuerySchema>;

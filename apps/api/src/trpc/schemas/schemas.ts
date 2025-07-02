import { z } from "@hono/zod-openapi";

export const paginationSchema = z.object({
  size: z.number().nullable().optional(),
  sort: z.string().nullable().optional(),
  start: z.number().nullable().optional(),
  search: z.string().nullable().optional(),
});
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

export const getStudentsSchema = z
  .object({
    sessionId: z.string().optional().nullable(),
    departmentId: z.string().optional().nullable(),
    departmentTitles: z.array(z.string()).optional().nullable(),
    // departmentTitles: z.string().optional().nullable(),
    classroomTitle: z.string().optional().nullable(),
    sessionTermId: z.string().optional().nullable(),
  })
  .merge(paginationSchema);
export type GetStudentsSchema = z.infer<typeof getStudentsSchema>;
export const getStudentOverviewSchema = z.object({
  studentId: z.string(),
  termSheetId: z.string(),
});
export type GetStudentOverviewSchema = z.infer<typeof getStudentOverviewSchema>;

export const getStudentTermsListSchema = z.object({
  studentId: z.string(),
});
export type GetStudentTermListSchema = z.infer<
  typeof getStudentTermsListSchema
>;

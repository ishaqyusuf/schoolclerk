import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter } from "../init";
import { studentsRouter } from "./students.routes";
import { subjectsRouter } from "./subjects";
import { questionsRouter } from "./question.routes";
import { classroomRouter } from "./classroom.routes";
import { enrollmentsRouter } from "./enrollment.routes";
import { academicsRouter } from "./academics.routes";
export const appRouter = createTRPCRouter({
  students: studentsRouter,
  enrollments: enrollmentsRouter,
  subjects: subjectsRouter,
  questions: questionsRouter,
  classrooms: classroomRouter,
  academics: academicsRouter,
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;

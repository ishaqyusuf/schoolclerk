import { z } from "@hono/zod-openapi";
import { createTRPCRouter, publicProcedure } from "../init";
import {
  getStudentTermsListSchema,
  questionDataSchema,
  questionQuerySchema,
} from "../schemas/schemas";

import { loadQuestions, saveQuestion } from "@api/db/queries/questions";
import { getStudentTermsList } from "@api/db/queries/academic-terms";
export const academicsRouter = createTRPCRouter({
  getStudentTermsList: publicProcedure
    .input(getStudentTermsListSchema)
    .query(async (props) => {
      return getStudentTermsList(props.ctx, props.input);
    }),
});

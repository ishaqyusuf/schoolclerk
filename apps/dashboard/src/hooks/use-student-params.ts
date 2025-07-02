import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { z } from "zod";

const lineItemSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});
export const studentFilterParamsSchema = {
  termId: parseAsString,
  classDepartmentId: parseAsString,
};
export function useStudentParams(options?: { shallow: boolean }) {
  const [params, setParams] = useQueryStates(
    {
      createStudent: parseAsBoolean,
      studentViewId: parseAsString,
      studentViewTab: parseAsString,
      studentTermSheetId: parseAsString,
    },
    options,
  );
  return {
    ...params,
    setParams,
  };
}

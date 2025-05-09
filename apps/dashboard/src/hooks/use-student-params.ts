import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { z } from "zod";

const lineItemSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export function useStudentParams(options?: { shallow: boolean }) {
  const [params, setParams] = useQueryStates(
    {
      createStudent: parseAsBoolean,
      openStudentId: parseAsString,
      studentViewTab: parseAsString,
      // ...studentPageQuery,
    },
    options,
  );

  return {
    ...params,
    setParams,
  };
}

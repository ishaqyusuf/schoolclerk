import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsJson,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import { z } from "zod";

const lineItemSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const tabs = ["overview", "students"] as const;
export type TabType = (typeof tabs)[number];
export function useClassesParams(options?: { shallow: boolean }) {
  const [params, setParams] = useQueryStates(
    {
      createClassroom: parseAsBoolean,
      viewClassroomId: parseAsString,
      classroomTab: parseAsStringEnum<TabType>(tabs as any),
    },
    options,
  );

  return {
    ...params,
    setParams,
  };
}

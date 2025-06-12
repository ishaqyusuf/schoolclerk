import {
  parseAsBoolean,
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
const secondaryTabs = [
  "student-form",
  "subject-form",
  "student-overview",
] as const;
export type TabType = (typeof tabs)[number];
export type SecondaryTabTypes = (typeof secondaryTabs)[number];
export function useClassesParams(options?: { shallow: boolean }) {
  const [params, setParams] = useQueryStates(
    {
      createClassroom: parseAsBoolean,
      viewClassroomId: parseAsString,
      classroomTab: parseAsStringEnum<TabType>(tabs as any),
      secondaryTab: parseAsStringEnum<SecondaryTabTypes>(secondaryTabs as any),
    },
    options,
  );

  return {
    ...params,
    setParams,
  };
}

import { RouterInputs } from "@api/trpc/routers/_app";
import { useQueryStates } from "nuqs";
import { createLoader, parseAsArrayOf, parseAsString } from "nuqs/server";

type StudentFilterKeys = keyof Exclude<RouterInputs["students"]["index"], void>;
export const studentFilterParamsSchema = {
  classroomTitle: parseAsString,
  departmentId: parseAsString,
  departmentTitles: parseAsArrayOf(parseAsString),
  sessionTermId: parseAsString,
  sessionId: parseAsString,
  search: parseAsString,
} satisfies Partial<Record<StudentFilterKeys, any>>;

export function useStudentFilterParams() {
  const [filter, setFilters] = useQueryStates(studentFilterParamsSchema);
  return {
    filter,
    setFilters,
    hasFilters: Object.values(filter).some((value) => value !== null),
  };
}
export const loadStudentFilterParams = createLoader(studentFilterParamsSchema);

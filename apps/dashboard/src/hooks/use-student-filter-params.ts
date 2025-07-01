import { useQueryStates } from "nuqs";
import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
export const studentFilterParamsSchema = {
  previousSessionId: parseAsString,
  previousTermId: parseAsString,
  currentTermId: parseAsString,
  currentSessionId: parseAsString,
  previousClassDepartmentId: parseAsString,
  currentClassDepartmentId: parseAsString,
};
export function useStudentFilterParams() {
  const [filter, setFilters] = useQueryStates(studentFilterParamsSchema);
  return {
    filter,
    setFilters,
    hasFilters: Object.values(filter).some((value) => value !== null),
  };
}
export const loadStudentFilterParams = createLoader(studentFilterParamsSchema);

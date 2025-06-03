import { loadCookie } from "./cookie";
import { classList, getTermsData } from "./data";
import { Filter } from "./filter";
import { List } from "./list";
import {
  loadGenders,
  loadStudentMergeData,
  loadStudentPayments,
} from "./server";
import StudentSessionRecord from "./student-session-record";

export default async function Migration() {
  const cook = await loadCookie();

  const [genders, studentPayments, studentMerge] = await Promise.all([
    loadGenders(),
    loadStudentPayments(),
    loadStudentMergeData(),
  ]);
  const ctx = { studentPayments, genders, studentMerge };
  return (
    <div className="space-y-4 p-4">
      <div></div>
      <div>
        <Filter
          config={cook}
          terms={["first", "second", "third"]}
          classes={Array.from(new Set(classList))}
        />
      </div>
      <View view="all students">
        <List />
      </View>
      <View view="student session record">
        <StudentSessionRecord {...ctx} />
      </View>
    </div>
  );
}
interface ViewProps {
  view: "all students" | "student session record";
  children?;
}
async function View({ view, children }: ViewProps) {
  const cook = await loadCookie();
  if (cook?.view != view) return null;

  return children;
}

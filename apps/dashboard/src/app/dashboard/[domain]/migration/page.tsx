import { firstTermData } from "@/migration/first-term-data";
import { secondTermRawData } from "@/migration/second-term-data";

import { cn } from "@school-clerk/ui/cn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@school-clerk/ui/table";

import { loadCookie } from "./cookie";
import { Filter } from "./filter";

export default async function Migration() {
  const data = [firstTerm(), secondTerm()];
  const cook = await loadCookie();
  //   const classList =
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
      <div className="">
        {data.map((term) => (
          <div
            className={cn(cook?.term && cook?.term != term?.term && "hidden")}
          >
            {term.result.map((classRoom, classId) => (
              <div
                className={cn(
                  cook?.class &&
                    cook?.class != classRoom?.className &&
                    "hidden",
                )}
                key={classId}
              >
                <div className="my-4 text-lg font-bold" dir="rtl">
                  <div className="">{classRoom?.className}</div>
                </div>
                <div dir="rtl" className="flex py-2">
                  {classRoom?.subjects?.map((c, ci) => (
                    <span className="px-4" key={ci}>
                      {c}
                    </span>
                  ))}
                </div>
                <Table dir="rtl">
                  <TableHeader className="h-auto">
                    <TableRow className="h-auto">
                      <TableHead align="left">Student</TableHead>
                      {classRoom?.subjects?.map((s, si) => (
                        <TableHead className="srotate-90 h-28" key={si}>
                          {s}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classRoom?.students.map((student) => (
                      <TableRow>
                        <TableCell>
                          <div className="flex">
                            <div className="font-bold">{student.firstName}</div>
                            <div className="px-2">{student.surname}</div>
                            <div className="px-2 text-blue-500">
                              {student.otherName}
                            </div>
                          </div>
                        </TableCell>
                        {student?.scores?.map((s, si) => (
                          <TableCell align="center" key={si}>
                            {s}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
const classList = [];
function transformClassName(_) {
  return _?.split(" ")
    ?.filter(Boolean)
    ?.join(" ")
    ?.replace("الأول", "الأوّل")
    ?.replace("الاعدادي", "الإعدادي");
}
function firstTerm() {
  const result = firstTermData.map((classRoom) => {
    let students = [];
    let subjects = [];
    classRoom.rawData?.split("\n").map((line, index) => {
      line = line?.replaceAll("،", ",");
      if (index == 0) {
        const [n, ...s] = line.split(",").map((a) => a.trim());
        subjects = s;
      } else {
        let [name, ...scores] = line?.split(","); //?.replaceAll("  ", " ");
        name = name?.includes("-") ? name?.split("-")?.[1] : name;
        let [firstName, surname, otherName] = name
          ?.split(name.includes(".") ? "." : " ")
          ?.filter(Boolean);
        firstName = firstName?.includes("-")
          ? firstName?.split("-")?.[1]
          : firstName;
        students.push({
          firstName,
          surname,
          otherName,
          scores,
        });
      }
    });
    classRoom.class = transformClassName(classRoom.class);
    classList.push(classRoom.class);
    return {
      students,
      subjects,
      className: classRoom.class,
    };
  });
  return {
    result,
    term: "first",
  };
}

function secondTerm() {
  const result = [];
  let classData = {
    name: null,
    students: [],
    subjects: [],
  };
  secondTermRawData
    .split("\n")
    ?.filter(Boolean)
    .map((line) => {
      let [fasl, className] = line?.split(":");

      if (fasl === "الفصل") {
        className = transformClassName(className);
        if (classData?.name) result.push({ ...classData });
        classData = {
          name: className,
          students: [],
          subjects: [],
        };
        classList.push(className);
        return;
      }
      line = line.replaceAll("؛", ";")?.replaceAll(". ", ";");
      const [name, ...scores] = line.split(";");
      if (name === "اسم") {
        //
        classData.subjects = scores;
      } else {
        let [firstName, surname, otherName] = name
          ?.split(name.includes(".") ? "." : " ")
          ?.filter(Boolean);
        classData.students.push({
          firstName,
          surname,
          otherName,
          scores,
        });
      }
    });
  if (classData?.name) result.push({ ...classData });
  return {
    result,
    term: "second",
  };
}

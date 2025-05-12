import { firstTermData } from "@/migration/first-term-data";
import { secondTermRawData } from "@/migration/second-term-data";
import { thirdTermData } from "@/migration/third-term-data";
import { arToEn } from "@/utils/utils";

import { dotName, getClassCode, getClassSubjectList } from "./utils";

export const classList = [];
export function sessionRecord() {
  const terms = getTermsData();
  const records: {
    [className in string]: {
      studentCount: number;
      students: {
        [name in string]: {
          terms: Term["term"][];
          fullTerm?: boolean;
          partTerm?: boolean;
        };
      };
    };
  } = {};
  terms.map((term) => {
    term.result.map((res) => {
      if (!records?.[res.className]) {
        records[res.className] = {
          studentCount: 0,
          students: {},
        };
      }
      const students = records[res.className].students;
      res.students.map((student) => {
        const fullName = dotName(student as any);
        // [student.firstName, student.surname, student.otherName]
        //   //   ?.filter(Boolean)
        //   ?.join(".")
        //   ?.split(" ")
        //   ?.filter(Boolean)
        //   ?.join(" ");
        if (!students[fullName])
          students[fullName] = {
            terms: [term.term],
          };
        else students[fullName].terms.push(term.term);
      });
    });
  });
  return records;
}
export function getTermsData() {
  return [firstTerm(), secondTerm(), thirdTerm()];
}
function transformClassName(_) {
  return _?.split(" ")
    ?.filter(Boolean)
    ?.join(" ")
    ?.replace("الأول", "الأوّل")
    ?.replace("الاعدادي", "الإعدادي");
}
function firstTerm(): Term {
  const result = firstTermData.map((classRoom) => {
    let students = [];
    let subjects = [];
    classRoom.rawData?.split("\n").map((line, index) => {
      line = line?.replaceAll("،", ",");
      if (index == 0) {
        const [n, ...s] = line.split(",").map((a) => a.trim());
        subjects = s?.map((_s) => ({
          name: _s,
        }));
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
    } satisfies Class;
  });
  return {
    result,
    term: "first",
  };
}

function secondTerm(): Term {
  const result = [];
  let classData = {
    className: null,
    students: [],
    subjects: [] as Class["subjects"],
  };
  secondTermRawData
    .split("\n")
    ?.filter(Boolean)
    .map((line) => {
      line = line.replaceAll("؛", ";")?.replaceAll(". ", ";");
      let [fasl, className] = line?.split(":");

      if (fasl === "الفصل") {
        className = transformClassName(className);
        if (classData?.className) result.push({ ...classData });
        classData = {
          className: className,
          students: [],
          subjects: [],
        };
        classList.push(className);

        return;
      }
      const [name, ...scores] = line.split(";");
      if (name === "اسم") {
        //
        classData.subjects = scores.map((s) => ({
          name: s,
        }));
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
  if (classData?.className) result.push({ ...classData });
  return {
    result,
    term: "second",
  };
}
function thirdTerm(): Term {
  studentId = 0;
  let cls: Class = null as any;
  const _classList = [] as Class[];
  let gender: Student["gender"] = "M";
  thirdTermData.split("\n").map((line) => {
    if (line.includes("📃")) {
      if (cls) {
        _classList.push({ ...cls });
        cls = null as any;
      }
      const clsName = line?.replace("📃", "")?.trim();
      const clsCode = getClassCode(clsName);
      cls = {
        className: clsName,

        students: [],
        code: clsCode,
        subjects: getClassSubjectList(clsCode as any),
        subs: [],
        subsCount: 0,
      };
      if (!cls.subjects) return null;
      cls.subs = cls.subjects
        .map((a) => (a.subs.length ? a.subs : [null]))
        .flat() as any;
      gender = "M";
      studentClassId = 0;
      cls.subsCount = cls.subs?.filter(Boolean).length;
      return;
    }
    if (!line || ["-", "."].some((c) => !line?.replaceAll(c, "").trim())) {
      if (cls?.students?.length) gender = "F";
      return null;
    }
    const [name, ...params] = line?.includes(". ") ? line.split(". ") : [line];
    // console.log(name);
    const trimmedName = name?.split(".")?.filter(Boolean).join(".");

    if (!trimmedName) {
      if (cls?.students?.length) gender = "F";
      return null;
    }
    const [firstName, fathersName, otherName] = trimmedName
      ?.split(trimmedName?.includes(".") ? "." : " ")
      ?.filter(Boolean);
    // if (nameSplt?.length > 2 || nameSplt?.length == 1 || !nameSplt?.length)
    //   console.log(trimmedName);
    const student: Student = {
      gender,
      text: line,
      studentClassId: (studentClassId += 1),
      studentId: (studentId += 1),
      firstName,
      surname: fathersName,
      otherName: otherName,
      payments: [],
      examStatus: "",
      scores: [],
    };
    // console.log(student.studentClassId, student.studentId);
    params?.map((p) => {
      p = p.split(".").filter(Boolean).join(".")?.trim();
      if (quranClasses.includes(p as any)) {
        student.quranClass = p as any;
        return;
      }
      if (p == "م") {
        student.payments.push({
          paymentType: "fee",
          term: "3rd",
          status: "not applicable",
        });
        student.examStatus = examStatus.free;
        return;
      }
      if (p.startsWith("رس")) {
        const a = +arToEn(p.replace("رس", ""));
        student.payments.push({
          paymentType: "fee",
          status: a == 3000 ? "paid" : "paid",
          term: "2nd",
          amountPaid: a,
          amountPending: 3000 - a,
        });
        return;
      }
      if (p.startsWith("ر")) {
        const a = +arToEn(p.replace("ر", ""));
        student.payments.push({
          paymentType: "fee",
          status: a == 3000 ? "paid" : "part paid",
          term: "3rd",
          amountPaid: a,
          amountPending: 3000 - a,
        });
        student.examStatus = a == 3000 ? examStatus.paid : examStatus.permitted;
        return;
      }
      switch (p) {
        case "ق":
          student.payments.push({
            paymentType: "entrance",
            status: "paid",
            term: "3rd",
            amountPaid: 500,
          });
          return;
        case "ق*":
          student.payments.push({
            paymentType: "entrance",
            status: "pending",
            term: "3rd",
            amountPending: 500,
          });
          return;
        case "*":
          student.examStatus = examStatus.noStatus;
          return;
      }
    });
    cls.students.push(student);
  });
  if (cls) _classList.push(cls);
  return { result: _classList, term: "third" };
}
interface Term {
  term: "first" | "second" | "third";
  result: Class[];
}
interface Class {
  className: string;
  students: Student[];
  code?;
  subjects: ReturnType<typeof getClassSubjectList>;
  subs?: Class["subjects"][number]["subs"];
  subsCount?;
}
interface PaymentStatus {
  status: "paid" | "part paid" | "pending" | "not applicable";
  paymentType: "fee" | "entrance";
  amountPaid?: number;
  amountPending?: number;
  term: "1st" | "2nd" | "3rd";
}
interface Student {
  studentId: number;
  studentClassId: number;
  firstName: string;
  surname?: string;
  otherName: string;
  //   fullName: string;
  payments: PaymentStatus[];
  gender: "M" | "F";
  examStatus;
  scores: string[];
  text: string;
  quranClass?: QuranClass;
}
export const quranClasses = ["ق:تج", "ق:ح", "ق:أ", "ق:م", "ق:ج"] as const;
type QuranClass = NonNullable<typeof quranClasses>[number];
let studentId = 0;
let studentClassId = 0;
export const examStatus = {
  permitted: "مس",
  paid: "مد",
  free: "م",
  noStatus: "x",
};

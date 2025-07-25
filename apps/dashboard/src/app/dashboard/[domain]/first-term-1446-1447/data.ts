import { arToEn, enToAr } from "@/utils/utils";

export const data = `الأوّل التمهيدي ا class
male
إبراهيم.عبد القادر. ق: ت: ح: مح:
أحمد عليّ. ق:٥٥ ت:٢٥ ح:٥٥ مح:٧٠
أحمد غاتى. ق:٤٥ ت:٢٠ ح:٣٠ مح:
إسحاق.إسحاق.ميماسى. ق:٩٨ ت:٥٨ ح:٨ مح:
إسماعيل محمد. ق:٥٠ ت:٢٠ ح:٤٠ مح:
أنس إبراهيم. ق:٥٠ ت:٢٠ ح:٣٠ مح:٧٠
أنس رشيد. ق: ت: ح: مح:
شريف.عبد الواسع. ق:٢٠ ت:٢٠ ح:٢٠ مح:٢٠
عبد الرحمان.محمد. ق:٧٠ ت:٥٠ ح:٦٠ مح:
عبد الرحمان.يوسف. ق: ت: ح: مح:
عبد السلام.دنميرومو. ق:٩٠ ت:٨٠ ح:٧٠ مح:٨٥
عبد الله.إسحاق.ميماسى. ق: ت: ح: مح:
عبد الله.صالح. ق: ت: ح: مح:١٠٠
عبد الله.عبد الله. ق:٩٦ ت:٨٠ ح:٩٨ مح:
عبد الله.لقمان. ق:٧٥ ت:٦٠ ح:٦٠ مح:٤٠
عبد الله.لقمان.ميماسى. ق:٨٠ ت:٤٠ ح:٨٠ مح:٢٠
عبد الله.يوسف.ألاتى. ق:٧٠ ت:٢٠ ح:٥٠ مح:٨٥
عبد القادر.عليّ. ق:٥٠ ت:٢٠ ح:٤٠ مح:٩٠
عبد الواسع.إسماعيل. ق:٧٥ ت:٢٠ ح:٦٠ مح:٤٠
عيسى عيسى. ق:٥٠ ت:٢٠ ح:٤٠ مح:
عمر مصطفى. ق:٨٥ ت:٢٠ ح:٥٥ مح:١٠٠
قريب.نافع.أويدى. ق: ت: ح: مح:
محمد.داود. ق: ت: ح: مح:١٠٠
محمد.عبد الرحمان. ق: ت: ح: مح:
محمد طـٰه.إسحاق. ق:١٠٠ ت:١٠٠ ح:١٠٠ مح:١٠٠
محمود أويدى. ق: ت: ح: مح:
محمود ميياكي. ق:٤٠ ت:٦٠ ح:٦٠ مح:٦٠
مختار إيشولى. ق: ت: ح: مح:٤٠
مفتاح.ألابي. ق: ت: ح: مح:
يوسف داود. ق:٩٥ ت:٨٠ ح:٩٠ مح:١٠٠
female
أسماء.ميماسى. ق:٧٠ ت:٢٠ ح:٦٠ مح:
حبيبة مسعود. ق:٧٠ ت:٢٠ ح:٦٠ مح:
حديزة.عبدالواسع. ق: ت: ح: مح:
حليمة.محمد سليمان. ق: ت: ح: مح:
حنيفة.سليمان. ق:٥٥ ت:٢٥ ح:٤٠ مح:١٠٠
راضية إسماعيل. ق:٥٥ ت:٢٥ ح:٤٥ مح:٧٠
رحمة الله.عبد الواسع. ق: ت: ح: مح:
زينة.أحمد. ق:٨٠ ت:٦٠ ح:٨٠ مح:٨٠
صبيرة عثمان. ق: ت: ح: مح:
عبيدة.سراج الدين. ق: ت: ح: مح:٧٠
عائشة إشوولى. ق: ت: ح: مح:
عائشة.عبد الله. ق:١٠٠ ت:٩٥ ح:٩٧ مح:
عائشة يونس. ق:٧٠ ت:٣٠ ح:٦٠ مح:٦٠
عليّة إبراهيم. ق:٥٥ ت:٢٥ ح:٤٠ مح:٣٠
فاطمة لقمان. ق:٧٥ ت:٢٥ ح:٤٠ مح:٨٠
محبوبة إسحاق. ق: ت: ح: مح:
مزيدة.يحيى. ق:٥٥ ت:٢٠ ح:٤٠ مح:٤٥
مطمئنة.أولاييوولى. ق:٥٥ ت:٣٠ ح:٤٥ مح:٥٥
منيرة لقمان. ق:٥٠ ت:٢٠ ح:٤٠ مح:٦٠
مويدين.كمال الدين. ق:٤٠ ت:٢٠ ح:٢٠ مح:٢٠
 
الأوّل التمهيدي ب class
male
آدم إلياس. ق:٦٥ ت:٩٨ ح:٩٥ مح:٨٥
إبراهيم آدم. ق:٨٥ ت:٥٤ ح:٤٠ مح:٩٥
أبو بكر.إسحاق. ق:٩٠ ت:٨٥ ح:٤٥ مح:
حسن مسعود. ق:٨٥ ت:٨٥ ح:٣٠ مح:٧٠
حسين مسعود. ق:٨٧ ت:٨٠ ح:٣٥ مح:٥٠
سلطان غاتى. ق:٥٥ ت:٤٠ ح:٣٠ مح:
عبد الحليم.يحيى. ق:٥٨ ت:٦٠ ح:٣٠ مح:٤٥
عبد القادر.جامع. ق:٩٨ ت:٩٥ ح:٨٥ مح:٨٠
مصطفى.عبد القادر. ق: ت: ح: مح:٩٠
عبد الله.إيشولى. ق:٥٠ ت:٥٠ ح:٣٠ مح:١٠٠
عبد الله.سليمان. ق:٥٦ ت:٦٨ ح:٣٠ مح:٤٥
عبد الله.عبد القادر. ق:٥٥ ت:٦٠ ح:٦٠ مح:٩٥
عبد الله.غاتى. ق:٣٠ ت:٣٠ ح:٣٠ مح:
عبد الملك.عبد القادر. ق: ت: ح: مح:٨٠
عبد الملك.عبد اللطيف. ق:٣٠ ت:٤٥ ح:٣٠ مح:٨٠
محمد الأوّل.إبراهيم. ق: ت: ح: مح:
محمد دنميرومو. ق:٥٠ ت:٤٥ ح:٤٠ مح:٦٥
محمد.سراج الدين. ق:٤٠ ت:٤٠ ح:٣٠ مح:١٠٠
محمد عثمان. ق: ت: ح: مح:٨٠
يوسف آدم. ق:٤٠ ت:٣٠ ح:٦٥ مح:٨٥
female
حليمة ميياكي. ق:٨٠ ت:٦٠ ح:٤٥ مح:٦٠
سلامة إسحاق. ق:٧٠ ت:٢٠ ح:٤٠ مح:
نعمة أونيكون. ق: ت: ح: مح:

الثاني التمهيدي class
male
إبراهيم.إسحاق. ق: ت: ح: أ: نص:
أنس أولاييوولى. ق:٨٠ ت: ح: أ:٤٤ نص:
عبد الخالق.معروف. ق:٨٥ ت: ح: أ:٤٠ نص:
عبد الرحمان.أحمد. ق:٨٥ ت: ح: أ: نص:
عبد الرحمان.مصطفى. ق:٩٧ ت: ح: أ:٥٠ نص:
عبد القادر.ميماسى. ق:٨٣ ت:٢٥ ح:٨٠ أ:٤٨ نص:
عبد المقسط.إسماعيل. ق:٨٠ ت:٢٠ ح:٧٠ أ:٥٥ نص:
محمد يوسف. ق: ت: ح: أ: نص:
female
فاطمة إدريس. ق:٩٥ ت:٦٥ ح:٨٨ أ: نص:٩٥
فاطمة دنميرومو. ق:١٠٠ ت:٢٠ ح:٨٥ أ: نص:١٠٠
شريفة.عبد الواسع. ق:٩٥ ت:٢٥ ح:٩٣ أ:٧٠ نص:١٠٠
عائشة.يوسف.إبراهيم. ق:١٠٠ ت:٢٠ ح:٥٠ أ:٤٠ نص:
مريم دنميرومو. ق:٩٨ ت:٢٠ ح:٩٣ أ:٩٠ نص:٨٥
مؤمنة.عبد الكبير. ق:١٠٠ ت:٢٥ ح:٩٧ أ:٧٠ نص:٩٠
هاجر أمودى. ق: ت: ح: أ: نص:
هاجر دنميرومو. ق:١٠٠ ت:٢٠ ح:٩٨ أ:٩٥ نص:١٠٠

الثاني الإبتدائي class
male
إبراهيم.عبد القادر. م: ف:;٤٥ س: أ:;٣.٥ ع:٢٠ تج:- ح:٥٠ ذ:-  ق،ل:١٦
أنس عثمان. م:٣ ف:٣;٤٠ س:٣ أ:;٠.٥ ع:٥٥ تج:- ح:٤٥ ذ:-  ق،ل:١٥
جلال الدين.يوسف. م:٥ ف:٦ س: أ:;٠.٥ ع:٣٠ تج:- ح:٥٠ ذ:-  ق،ل:
حسن ميماسى. م:٢ ف:٢;٣٠ س:٠ أ:٣;٠.٥ ع:٣٥ تج:- ح:- ذ:-  ق،ل:٥٠
حسين ميماسى. م:٢ ف:٢;١٠ س:- أ:- ع:٣٥ تج:- ح:- ذ:-  ق،ل:١٠
ذو القرنين.غاتى. م:٧ ف:٨;٧٥ س:- أ:;٢ ع:٨٠ تج:- ح:٥٥ ذ:-  ق،ل:٨٨
عبد الباسط.مرتضى. م: ف:;٢٥ س: أ:;٠.٥ ع:٣٥ تج:- ح:٥٠ ذ:-  ق،ل:١٠
عبد الحميد.سعيد. م:- ف:;١٠ س:٣ أ:;٠.٥ ع:١٠ تج:- ح:- ذ:-  ق،ل:
عبد الرحمان.سليمان. م:٣ ف:٣;٤٥ س:٤ أ:;٠.٥ ع:٢٠ تج:- ح:٥٠ ذ:-  ق،ل:١٠
عبد السلام.أحمد. م:٨ ف:٧;٩٠ س:٨ أ:٠;١.٥ ع:٩٥ تج:- ح:٧٠ ذ:-  ق،ل:٨٨
عبد القيوم.عبد الغني. م: ف:;٣٠ س: أ:;٠.٥ ع:٤٠ تج:- ح:٤٥ ذ:- ق،ل:١٠
عبد المتين.يحيى. م:١٠ ف:١٠;٨٥ س:٧ أ:٨;٣.٥ ع:٧٠ تج:- ح:٩٠ ذ:-  ق،ل:
عبد الملك.عبد الكبير. م:٧ ف:٥;٥٠ س:٦ أ:٦;١ ع:٤٥ تج:- ح:٥٠ ذ:-  ق،ل:٥٠
علي أحمد. م:٣ ف:٣;٢٠ س:٥ أ:;٥ ع:٤٠ تج:- ح:٤٠ ذ:-  ق،ل:١٥
محمد سليمان. م:٢ ف:٤;٤٥ س:٦ أ:;٠.٥ ع:٤٠ تج:- ح:٥٥ ذ:-  ق،ل:
محمد ناصر.عبد القادر. م: ف:;٣٠ س: أ:;٤ ع:١٠ تج:- ح:٥٥ ذ:-  ق،ل:٣٠
منصور بللو. م:٤ ف:٤;٢٥ س:٤ أ:;٠.٥ ع:٦٥ تج:- ح:٧٥ ذ:-  ق،ل:٢٠
female
أسماء جامع. م:٧ ف:٨;٥٠ س:٤ أ:;٠.٥ ع:٨٥ تج:- ح:٤٠ ذ:-  ق،ل:٦٤
حسينة عثمان. م:- ف:- س:٢ أ:- ع:١٠ تج:- ح:- ذ:-  ق،ل:١٠
ريحانة سليمان. م:٣ ف:٤;٣٠ س:٥ أ:;٠.٥ ع:٦٠ تج:- ح:٤٠ ذ:-  ق،ل:١٥
زينب حسن. م:٤ ف:٧;٧٠ س:- أ:٢.٥ ع:٥٥ تج:- ح:٧٠ ذ:-  ق،ل:٢٨
سلامة قاسم. م:٤ ف:٤;٥٠ س:- أ:;٠.٥ ع:٦٠ تج:- ح:- ذ:-  ق،ل:٢٠
عائشة.عبد القادر. م:- ف:;٢٥ س:- أ:٠;٠.٥ ع:٣٠ تج:- ح:٢٠ ذ:-  ق،ل:١٥
عائشة.عيسى. م:٧ ف:٦;٤٥ س:٥ أ:;٠.٥ ع:٤٠ تج:- ح:٧٥ ذ:-  ق،ل:٢٠
علية إسماعيل. م:- ف:;٧٥ س:- أ:٦;٤ ع:٩٥ تج:- ح:٢٠ ذ:- ق،ل:٨٦
فردوس.أولاييوولى. م: ف:;٤٥ س: أ:;١.٥ ع:٩٥ تج:- ح:- ذ:- ق،ل:٧٤
فريدة إبراهيم. م: ف:;٥٠ س: أ:;١ ع:٧٠ تج:- ح:- ذ:-  ق،ل:٣٦
مريم.عبد القادر. م:٤ ف:٨;٥٥ س:٥ أ:;٠.٥ ع:٧٥ تج:- ح:٣٥ ذ:-  ق،ل:٤٠
مريم.عبد الكبير. م:١٠ ف:٩;٨٥ س:٧ أ:٣.٥ ع:٩٠ تج:- ح:٩٥ ذ:-  ق،ل:٩٢
ميمونة.عبد القادر. م:٩ ف:٩;٧٠ س:٥ أ:;٥ ع:٩٠ تج:- ح:٦٥ ذ:- ق،ل:٦٤`;

export const courseCodes = {
  ع: "العربية",
  ف: "الفقه",
  //   ج: "التجويد",
  م: "المتون",
  ح: "الحديث",
  ذ: "الأذكار",
  "ق،ل": "قواعد اللغة العربية",
  أ: "الأدب",
  س: "السيرة",
  ص: "الصرف",
  نح: "النحو",
  مح: "المحفوظة",
  ق: "القرآن",
  نص: "النصوص",
  تج: "التجويد",
  ت: "التوحيد",
};

interface Data {
  course: string;
  subjects: {
    code: string;
    subject: string;
    assessments: {
      code: string;
      type: "test" | "exam";
      obtainable: number;
    }[];
  }[];
  students: {
    firstName: string;
    surname: string;
    otherName: string;
    gender: "M" | "F";
    rawData: string;
    assessments: {
      subjectCode: string;
      assessmentCode: string;
      score: number;
    }[];
  }[];
}
export function transformData(): Data[] {
  const lines = data.split("\n").filter((l) => l.trim());
  const result: Data[] = [];

  let currentClass: Data | null = null;
  let currentGender: "M" | "F" = "M";

  const parseStudentLine = (line: string, gender: "M" | "F") => {
    const subjectCodeKeys = Object.keys(courseCodes);
    const subjectCodeRegex = new RegExp(` (${subjectCodeKeys.join("|")}):`);
    const match = line.match(subjectCodeRegex);

    let namePart = line;
    let scoresPart = "";

    if (match && typeof match.index !== "undefined") {
      namePart = line.substring(0, match.index).trim();
      scoresPart = line.substring(match.index).trim();
    } else {
      namePart = line.trim();
    }

    const cleanedName = namePart.replace(/\.$/, "").trim();
    const nameParts = cleanedName.includes(".")
      ? cleanedName.split(".").filter((p) => p)
      : cleanedName.split(" ").filter((p) => p);

    const firstName = nameParts[0] || "";
    const surname = nameParts[1] || "";
    const otherName = nameParts.slice(2).join(" ") || "";

    const assessments: {
      subjectCode: string;
      assessmentCode: string;
      score: number;
    }[] = [];

    if (scoresPart) {
      const scoreRegex = /([\u0621-\u064A\u0600-\u06FF،]+):([^ ]*)/g;
      let scoreMatch;
      while ((scoreMatch = scoreRegex.exec(scoresPart)) !== null) {
        const subjectCode = scoreMatch[1].trim();
        const scoreStr = scoreMatch[2].trim();

        if (scoreStr.includes(";")) {
          const [test, exam] = scoreStr.split(";");
          if (test && test !== "-") {
            assessments.push({
              subjectCode,
              assessmentCode: "test",
              score: parseFloat(arToEn(test)) || 0,
            });
          }
          if (exam && exam !== "-") {
            assessments.push({
              subjectCode,
              assessmentCode: "exam",
              score: parseFloat(arToEn(exam)) || 0,
            });
          }
        } else if (scoreStr && scoreStr !== "-") {
          assessments.push({
            subjectCode,
            assessmentCode: "exam",
            score: parseFloat(arToEn(scoreStr)) || 0,
          });
        }
      }
    }

    return {
      student: {
        firstName,
        surname,
        otherName,
        gender,
        rawData: line,
        assessments,
      },
    };
  };

  for (const line of lines) {
    if (line.includes(" class")) {
      if (currentClass) {
        result.push(currentClass);
      }
      const course = line.replace(" class", "").trim();
      currentClass = {
        course,
        subjects: [],
        students: [],
      };
    } else if (line.trim() === "male") {
      currentGender = "M";
    } else if (line.trim() === "female") {
      currentGender = "F";
    } else if (currentClass) {
      const { student } = parseStudentLine(line, currentGender);
      if (student.firstName) {
        currentClass.students.push(student);
      }
    }
  }

  if (currentClass) {
    result.push(currentClass);
  }

  for (const classData of result) {
    const subjectAssessments: Record<string, Set<string>> = {};
    const allSubjectsForClass = new Set<string>();

    for (const student of classData.students) {
      const scoreRegex = /([\u0621-\u064A\u0600-\u06FF،]+):/g;
      let match;
      const subjectCodeKeys = Object.keys(courseCodes);
      const subjectCodeRegex = new RegExp(` (${subjectCodeKeys.join("|")}):`);
      const firstSubjectMatch = student.rawData.match(subjectCodeRegex);
      let scoresRaw = student.rawData;
      if (firstSubjectMatch && typeof firstSubjectMatch.index !== "undefined") {
        scoresRaw = student.rawData.substring(firstSubjectMatch.index);
      }

      while ((match = scoreRegex.exec(scoresRaw)) !== null) {
        allSubjectsForClass.add(match[1]);
      }

      for (const ass of student.assessments) {
        if (!subjectAssessments[ass.subjectCode]) {
          subjectAssessments[ass.subjectCode] = new Set();
        }
        subjectAssessments[ass.subjectCode].add(ass.assessmentCode);
      }
    }

    const finalSubjects = [];
    for (const code of Array.from(allSubjectsForClass).sort()) {
      const assessmentTypes = subjectAssessments[code]
        ? Array.from(subjectAssessments[code]).sort()
        : [];

      const assessments: {
        code: string;
        type: "test" | "exam";
        obtainable: number;
      }[] = [];

      if (assessmentTypes.includes("test")) {
        assessments.push({ code: "test", type: "test", obtainable: 10 });
      }
      if (assessmentTypes.includes("exam")) {
        assessments.push({ code: "exam", type: "exam", obtainable: 90 });
      }
      if (assessments.length === 0) {
        assessments.push({ code: "exam", type: "exam", obtainable: 100 });
      }

      finalSubjects.push({
        code: code,
        subject: courseCodes[code as keyof typeof courseCodes] || code,
        assessments,
      });
    }

    classData.subjects = finalSubjects;
  }

  return result;
}

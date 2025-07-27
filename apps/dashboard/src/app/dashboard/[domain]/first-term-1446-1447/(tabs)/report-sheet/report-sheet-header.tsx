import { moonDance } from "@/fonts";
import { enToAr } from "@/utils/utils";
import { cn } from "@school-clerk/ui/cn";
import { PrintLayoutProps } from "./print-layout";
import { useStore } from "../../store";

const schoolName = `مدرسـة دار الحديث لتحفيـظ القرآن والسنـة`;

export function ReportSheetHeader(
  // { term = "الثالثة", fasl, data, student }
  { data }: PrintLayoutProps,
) {
  const store = useStore();
  const report = store?.studentGrade?.[String(data?.student?.postId)];
  return (
    <div className="mb-3">
      <div className="space-y-4 flex flex-col">
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-bold  text-black/70">{schoolName}</p>

          <p className={cn(moonDance.className, "text-base text-black")}>
            Sannushehu Street, Isale-koko, Ojagboro, Isale Gambari, Ilorin,
            Kwara State, Nigeria.
          </p>
        </div>
        <div className="space-y-1">
          <div className="w-full border-b-4 border-muted-foreground"></div>
          <div className="under-line w-full"></div>
        </div>
        <div className="space-y-2   font-semibold" dir="rtl">
          <div className="flex gap-2">
            <div className="flex w-2/3 items-end">
              <div className="whitespace-nowrap text-black/70">
                اسم التلميذ/التلميذة
              </div>
              <span>:</span>
              <div className="inline-flex w-full border-b-2 border-dashed border-muted-foreground px-4 text-xl">
                {/* {student.fullName} */}
                {[
                  data.student.firstName,
                  data.student.surname,
                  data.student.otherName,
                ]?.map((p, i) => <div className="px-2">{p}</div>)}
              </div>
            </div>
            <div className="flex items-end">
              <span className="text-black/70">العام الدراسي</span>
              <span>:</span>
              <span className="mx-1">١٤٤٦/١٤٤٧هـ</span>
            </div>
          </div>
          <div className="flex-wraps flex items-end gap-2 whitespace-nowrap ">
            <div className="flex items-end">
              <span className="text-black/70">الفصل</span>
              <span>:</span>
              <span className="mx-1 border-b border-muted-foreground">
                {data.classroom.title}
              </span>
            </div>
            <div className="flex items-end">
              <span className="text-black/70">الفترة</span>
              <span>:</span>
              <span className="mx-1 border-b border-muted-foreground">
                {`term`}
              </span>
            </div>
            <div className="">
              <span className="text-black/70">المجموع الكلي </span>
              <span>:</span>
              <span className="mx-1 border-b border-muted-foreground">
                {`${enToAr(report?.totalScore)}/${enToAr(
                  report?.totalObtainable,
                )}`}
              </span>
            </div>
            <div className="">
              <span className="text-black/70">عدد الطلاب في الفصل</span>
              <span>:</span>
              <span className="mx-1 border-b border-muted-foreground">
                {enToAr(data.grade.totalStudents)}
              </span>
            </div>
            <div className="">
              <span className="text-black/70">الدرجة</span>
              <span>:</span>
              <span className="mx-1 border-b border-muted-foreground">
                {`${enToAr(data.grade.position)}`}
              </span>
            </div>
            <div className="">
              <span className="text-black/70">تاريخ العودة للعام الجديد</span>
              <span>:</span>
              <span className="mx-1 border-b border-muted-foreground">
                {enToAr("27/07/25")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

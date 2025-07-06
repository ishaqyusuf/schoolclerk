import { useStudentParams } from "@/hooks/use-student-params";
import { RouterOutputs } from "@api/trpc/routers/_app";
import { Button } from "@school-clerk/ui/button";
import { Icons } from "@school-clerk/ui/icons";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@school-clerk/ui/sheet";
import { Menu } from "../menu";
import { cn } from "@school-clerk/ui/cn";
import { useStudentsStore } from "@/store/student";
interface Props {
  overview: RouterOutputs["students"]["overview"];
}
export function StudentOverviewSheetHeader({ overview }: Props) {
  const { setParams, ...params } = useStudentParams();
  const current = overview?.studentTerms?.find(
    (t) => t?.termId == params?.studentViewTermId,
  );
  const store = useStudentsStore();
  return (
    <>
      <SheetHeader>
        <SheetTitle>
          {/* {overview?.student?.studentName} */}
          <div className="inline-flex p-1 gap-2 px-4">
            <span>
              {/* {current?.term || "Select Term"} */}
              {overview?.student?.studentName}
            </span>
            <Menu
              noSize
              Trigger={
                <Button className="size-5 rounded-xl p-0" variant="secondary">
                  <Icons.ChevronDown className="size-4" />
                </Button>
              }
            >
              {store?.studentsList?.map((student) => (
                <Menu.Item
                  dir="rtl"
                  onClick={(e) => {
                    setParams({
                      studentViewId: student?.id,
                      studentTermSheetId: student.termFormId,
                      studentViewTermId: student.termFormSessionTermId,
                    });
                  }}
                  shortCut={
                    params.studentViewTermId == student.id ? (
                      <Icons.Check />
                    ) : undefined
                  }
                  className={cn(
                    params.studentViewTermId == student.id && "bg-green-200",
                  )}
                  key={student.id}
                >
                  <div className="whitespace-nowrap">
                    {student?.studentName}
                  </div>
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </SheetTitle>
        <SheetDescription>
          <span>{current?.departmentName}</span>

          <div className="inline-flex p-1 gap-2 px-4">
            <span>{current?.term || "Select Term"}</span>
            <Menu
              noSize
              Trigger={
                <Button className="size-5 rounded-xl p-0" variant="secondary">
                  <Icons.ChevronDown className="size-4" />
                </Button>
              }
            >
              {overview?.studentTerms?.map((term) => (
                <Menu.Item
                  onClick={(e) => {
                    setParams({
                      studentViewTermId: term.termId,
                      studentTermSheetId: term.studentTermId,
                    });
                  }}
                  shortCut={
                    params.studentViewTermId == term.termId ? (
                      <Icons.Check />
                    ) : undefined
                  }
                  className={cn(
                    params.studentViewTermId == term.termId && "bg-green-200",
                  )}
                  key={term.termId}
                >
                  <span className="whitespace-nowrap">{term?.term}</span>
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </SheetDescription>
      </SheetHeader>
    </>
  );
}

import { RouterOutputs } from "@api/trpc/routers/_app";
import { ReportSheetHeader } from "./report-sheet-header";
import { cn } from "@school-clerk/ui/cn";
import { arabic } from "@/fonts";
import { ReportSheetFooter } from "./report-sheet-footer";
import { enToAr } from "@school-clerk/utils";
import { useGlobalParams } from "../../use-global";
export interface PrintLayoutProps {
  data: RouterOutputs["ftd"]["studentPrintData"][number];
}
export function PrintLayout(props: PrintLayoutProps) {
  const g = useGlobalParams();
  return (
    <div
      className={cn(
        " p-4 mx-auto border shadow-lg bg-white print:p-0 print:mx-0 print:border-0 print:shadow-none print:bg-transparent  space-y-8 pt-10 text-lg",
        arabic.className,
        `result-lines-${props.data?.lineCount}`,
        g.params.printHideSubjects || "--h-[11.6in] h-[297mm]",
      )}
    >
      <ReportSheetHeader data={props.data} />
      <div
        className={cn(
          "flex flex-col text-xl",
          g.params.printHideSubjects && "hidden print:flex",
        )}
      >
        {/* {props.data?.lineCount} */}
        {props?.data?.tables?.map((table, ti) => (
          <table
            dir={"rtl"}
            className={cn(
              "w-full result",
              `lines-${props.data?.lineCount}`,
              ti == 0 && "border-t border-muted-foreground",
            )}
            key={ti}
          >
            <thead className="">
              <tr>
                {table.columns?.map((c, ci) => (
                  <th
                    key={ci}
                    className={cn(
                      ci > 0 && "w-24",
                      ci === table.columns.length - 1 && "w-28",
                      ci === table?.columns?.length - 1 ? "last" : "",
                      ci == 0 && "first",
                    )}
                  >
                    <div className="inline-flex">
                      <span>{c.label}</span>
                      {c.subLabel ? <span>{c.subLabel}</span> : null}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((r, ri) => (
                <tr key={ri}>
                  {r.columns.map((rc, rci) => (
                    <td
                      className={cn(
                        rci === r?.columns?.length - 1 ? "last" : "",
                        rci == 0 && "first",
                      )}
                      align={rci > 0 ? "center" : "right"}
                      key={rci}
                    >
                      {rc.value ? enToAr(rc.value) : "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
      <ReportSheetFooter data={props.data} />
    </div>
  );
}

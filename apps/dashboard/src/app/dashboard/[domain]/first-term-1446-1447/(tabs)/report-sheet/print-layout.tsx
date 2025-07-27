import { RouterOutputs } from "@api/trpc/routers/_app";
import { ReportSheetHeader } from "./report-sheet-header";
import { cn } from "@school-clerk/ui/cn";
import { arabic } from "@/fonts";
import { ReportSheetFooter } from "./report-sheet-footer";
export interface PrintLayoutProps {
  data: RouterOutputs["ftd"]["studentPrintData"][number];
}
export function PrintLayout(props: PrintLayoutProps) {
  return (
    <div
      className={cn(
        "size-a4 p-4 mx-auto border shadow-lg bg-white print:p-0 print:mx-0 print:border-0 print:shadow-none print:bg-transparent h-[11.6in] space-y-8 pt-10 text-lg",
        arabic.className,
      )}
    >
      <ReportSheetHeader data={props.data} />
      <div className="flex flex-col text-xl">
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
                      {rc.value || "-"}
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

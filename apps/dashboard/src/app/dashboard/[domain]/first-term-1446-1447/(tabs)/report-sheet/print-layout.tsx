import { RouterOutputs } from "@api/trpc/routers/_app";
import { ReportSheetHeader } from "./report-sheet-header";

export interface PrintLayoutProps {
  data: RouterOutputs["ftd"]["studentPrintData"][number];
}
export function PrintLayout(props: PrintLayoutProps) {
  return (
    <div className="">
      <ReportSheetHeader data={props.data} />
      {props?.data?.tables?.map((table, ti) => (
        <table dir={"rtl"} className="w-full" key={ti}>
          <thead className="">
            <tr>
              {table.columns?.map((c, ci) => (
                <th key={ci}>
                  <span>{c.label}</span>
                  <span>{c.subLabel}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r, ri) => (
              <tr key={ri}>
                {r.columns.map((rc, rci) => (
                  <td key={rci}>{rc.value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}

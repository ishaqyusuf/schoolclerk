"use client";

import { BillableCreateSheet } from "./billable-create-sheet";
import { ClassroomCreateSheet } from "./classroom-create-sheet";
import { SchoolFeeCreateSheet } from "./school-fee-create-sheet";
import { StaffCreateSheet } from "./staff-create-sheet";
import { StudentCreateSheet } from "./student-create-sheet";
import { StudentOverviewSheet } from "./student-overview-sheet";

type Props = {
  //   defaultCurrency?: string;
};

export async function GlobalSheets({}: Props) {
  return (
    <>
      <ClassroomCreateSheet />
      <BillableCreateSheet />
      <SchoolFeeCreateSheet />
      <StudentCreateSheet />
      <StudentOverviewSheet />
      <StaffCreateSheet />

      {/* We preload the invoice data (template, invoice number etc) */}
      {/* <Suspense fallback={null}>
        <InvoiceCreateSheetServer teamId={userData?.team_id} />
      </Suspense> */}
    </>
  );
}

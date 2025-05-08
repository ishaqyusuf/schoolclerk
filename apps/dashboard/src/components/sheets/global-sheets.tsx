"use client";

import { BillableCreateSheet } from "./billable-create-sheet";
import { ClassroomCreateSheet } from "./classroom-create-sheet";
import { SchoolFeeCreateSheet } from "./school-fee-create-sheet";
import { StudentCreateSheet } from "./student-create-sheet";

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

      {/* We preload the invoice data (template, invoice number etc) */}
      {/* <Suspense fallback={null}>
        <InvoiceCreateSheetServer teamId={userData?.team_id} />
      </Suspense> */}
    </>
  );
}

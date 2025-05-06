import { Suspense } from "react";

import { ClassroomCreateSheet } from "./classroom-create-sheet";

type Props = {
  //   defaultCurrency?: string;
};

export async function GlobalSheets({}: Props) {
  return (
    <>
      <ClassroomCreateSheet />

      {/* We preload the invoice data (template, invoice number etc) */}
      {/* <Suspense fallback={null}>
        <InvoiceCreateSheetServer teamId={userData?.team_id} />
      </Suspense> */}
    </>
  );
}

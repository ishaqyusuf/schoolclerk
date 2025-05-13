"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/animated-number";
import FormInput from "@/components/controls/form-input";
import FormSelect from "@/components/controls/form-select";
import { Icons } from "@/components/icons";
import { Menu } from "@/components/menu";
import { generateRandomString } from "@/utils/utils";
import { Form, FormProvider, useFieldArray, useForm } from "react-hook-form";

import { Button } from "@school-clerk/ui/button";
import { cn } from "@school-clerk/ui/cn";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@school-clerk/ui/table";

import { StudentRecord } from "./data";
import { useMigrationStore } from "./store";
import { dotName } from "./utils";

export function PaymentCell({ student }: { student: StudentRecord }) {
  const store = useMigrationStore();
  const { paid, payable, entranceStatus } = student?.paymentData || {};
  const [open, openChanged] = useState(false);
  return (
    <div className="flex">
      <Menu
        open={open}
        onOpenChanged={openChanged}
        Icon={null}
        label={
          <div className="inline-flex gap-4">
            {!entranceStatus || (
              <span
                className={cn(
                  "uppercase",
                  entranceStatus == "paid" ? "text-green-700" : null,
                )}
              >
                Form:{entranceStatus}
              </span>
            )}
            <div
              className={cn(
                "inline-flex",
                paid > 0
                  ? paid == payable
                    ? "text-green-700"
                    : "text-red-700"
                  : "",
              )}
            >
              <AnimatedNumber maximumFractionDigits={0} value={paid} />
              <span>/</span>
              <AnimatedNumber maximumFractionDigits={0} value={payable} />
            </div>
          </div>
        }
        noSize
      >
        <div className="min-w-max max-w-md p-4">
          <PayData student={student} openChanged={openChanged} />
        </div>
      </Menu>
    </div>
  );
}
function PayData({
  student,
  openChanged,
}: {
  student: StudentRecord;
  openChanged;
}) {
  const form = useForm({
    defaultValues: {
      ...student.paymentData?.storePayments,
    },
  });
  const store = useMigrationStore();
  function save() {
    const _name = dotName(student as any);
    const data = form.getValues();
    store.update(`studentPayments.${student.classRoom}.${_name}`, data);
    store.update("refreshToken", generateRandomString());
  }
  const arr = useFieldArray({
    control: form.control,
    name: "payments",
    keyName: "_id",
  });

  return (
    <FormProvider {...form}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Paid In</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {arr.fields.map((f, i) => (
            <TableRow key={i}>
              <TableCell>
                <FormSelect
                  className="w-24"
                  control={form.control}
                  name={`payments.${i}.paymentType`}
                  options={["fee", "entrance"]}
                />
              </TableCell>
              <TableCell>
                <FormSelect
                  className="w-24"
                  control={form.control}
                  name={`payments.${i}.term`}
                  options={["1st", "2nd", "3rd"]}
                />
              </TableCell>
              <TableCell>
                <FormSelect
                  className="w-24"
                  control={form.control}
                  name={`payments.${i}.paidIn`}
                  options={["1st", "2nd", "3rd"]}
                />
              </TableCell>
              <TableCell>
                <FormInput
                  midday={{
                    prefix: "NGN ",
                  }}
                  className="w-24"
                  control={form.control}
                  name={`payments.${i}.amountPaid`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <Button
                size="xs"
                onClick={(e) => {
                  arr.append({} as any);
                }}
              >
                <Icons.add className="size-4" />
              </Button>
              <Button
                size="xs"
                onClick={(e) => {
                  save();
                  openChanged(false);
                }}
              >
                Save
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </FormProvider>
  );
}

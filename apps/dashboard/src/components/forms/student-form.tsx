import { getCachedClassRooms } from "@/actions/cache/classrooms";
import { getCachedFees } from "@/actions/cache/fees";
import { getSaasProfileCookie } from "@/actions/cookies/login-session";
import { createStudentAction } from "@/actions/create-student";
import { useLoadingToast } from "@/hooks/use-loading-toast";
import { useTermBillableParams } from "@/hooks/use-term-billable-params";
import { timeout } from "@/utils/timeout";
import { randomInt } from "@/utils/utils";
import { useAction } from "next-safe-action/hooks";
import { useFieldArray } from "react-hook-form";
import { useAsyncMemo } from "use-async-memo";

import { Button } from "@school-clerk/ui/button";
import { cn } from "@school-clerk/ui/cn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@school-clerk/ui/table";

import { CollapseForm } from "../collapse-form";
import Formdate from "../controls/form-date";
import FormInput from "../controls/form-input";
import FormSelect from "../controls/form-select";
import { NumberInput } from "../currency-input";
import { CustomSheetContentPortal } from "../custom-sheet-content";
import { FormDebugBtn } from "../form-debug-btn";
import { Icons } from "../icons";
import { Menu } from "../menu";
import { useStudentFormContext } from "../students/form-context";
import { SubmitButton } from "../submit-button";

export function Form({}) {
  const { setParams } = useTermBillableParams();
  const { watch, control, getValues, reset, trigger, handleSubmit, formState } =
    useStudentFormContext();
  const toast = useLoadingToast();
  const onError = (e) => {
    console.log(e);
  };
  const onSuccess = (args?) => {
    toast.success("Created");
  };
  const create = useAction(createStudentAction, {
    onSuccess(args) {
      onSuccess(args);
      setParams(null);
    },
    onError,
  });
  const createAndNew = useAction(createStudentAction, {
    onSuccess(args) {
      onSuccess(args);
      // reset()
    },
    onError,
  });

  const classList = useAsyncMemo(async () => {
    await timeout(randomInt(250));
    const profile = await getSaasProfileCookie();
    const classList = await getCachedClassRooms(profile.termId);
    return classList;
  }, []);
  return (
    <div className="grid gap-4">
      <FormInput name="name" label="Name" control={control} />
      <div className="grid grid-cols-2 gap-4">
        <FormInput name="surname" label="Surname" control={control} />
        <FormInput name="otherName" label="Other Name" control={control} />
        <FormSelect
          name="gender"
          label="Gender"
          options={["Male", "Female"]}
          control={control}
        />{" "}
        <Formdate control={control} label="DoB" name="dob" />
      </div>
      <FormSelect
        control={control}
        name="classRoomId"
        options={classList}
        valueKey="departmentId"
        label="Class"
        titleKey="name"
      />

      <div className="">
        <CollapseForm label="Parent">
          <FormInput name="guardian.name" label="Name" control={control} />
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              name="guardian.phone"
              label="Phone"
              type="phone"
              control={control}
            />
            <FormInput
              name="guardian.phone2"
              type="phone"
              label="Phone 2"
              control={control}
            />
          </div>
        </CollapseForm>
      </div>
      <PaymentSection />
      <CustomSheetContentPortal>
        <div className="flex justify-end">
          <FormDebugBtn />
          <form
            onSubmit={handleSubmit(create.execute, (arg) => {
              toast.error("Invalid Form");
            })}
          >
            <div className="flex">
              <SubmitButton size="sm" isSubmitting={create?.isExecuting}>
                Submit
              </SubmitButton>
              <Menu
                Icon={Icons.more}
                Trigger={
                  <Button className="border-l" type="button" size="sm">
                    {/* <Icons.more className="size-4" /> */}
                    <span>&</span>
                  </Button>
                }
              >
                <Menu.Item
                  onClick={async (e) => {
                    // e.preventDefault();
                    const isValid = await trigger(); // run validation manually
                    if (isValid) {
                      const values = getValues();
                      createAndNew.execute(values); // only execute if form is valid
                    } else {
                      toast.error("Invalid Form");
                    }
                  }}
                >
                  New
                </Menu.Item>
              </Menu>
            </div>
          </form>
        </div>
      </CustomSheetContentPortal>
    </div>
  );
}
function PaymentSection({}) {
  const { control } = useStudentFormContext();
  const list = useAsyncMemo(async () => {
    await timeout(randomInt(250));
    const profile = await getSaasProfileCookie();
    const list = await getCachedFees(profile.termId);
    console.log(list);
    return list;
  }, []);
  const fees = useFieldArray({
    control,
    name: "fees",
    keyName: "_id",
  });

  return (
    <CollapseForm label="Fees">
      <div className="flex justify-end py-2">
        <Menu label={"Add Fee"} Icon={Icons.add}>
          {list?.map((l) => (
            <Menu.Item
              disabled={!!fees.fields.find((a) => a.feeId == l.feeId)}
              onClick={(e) => {
                fees.append({
                  feeId: l.historyId,
                  amount: l.amount,
                  paid: 0,
                  title: l.title,
                });
              }}
              key={l.feeId}
            >
              <p>{l.title}</p>
              <p>{l.description}</p>
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <Table className={cn(fees.fields.length || "hidden")}>
        <TableHeader>
          <TableRow>
            <TableHead>Fee</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Paid Amount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fees.fields.map((field, fi) => (
            <TableRow key={field._id}>
              <TableCell>{field.title}</TableCell>
              <TableCell>
                <NumberInput prefix="NGN " value={field.amount} readOnly />
              </TableCell>
              <TableCell>
                <FormInput
                  midday={{
                    prefix: "NGN ",
                  }}
                  control={control}
                  name={`fees.${fi}.paid`}
                  type="number"
                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={(e) => {
                    fees.remove(fi);
                  }}
                  size="icon"
                  variant="destructive"
                >
                  <Icons.X className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CollapseForm>
  );
}

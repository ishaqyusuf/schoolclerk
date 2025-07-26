"use client";

import { Button } from "@school-clerk/ui/button";
import { usePostMutate } from "../../use-global";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { composePayments } from "../../data";
import { Payment, PaymentRaw } from "@api/db/queries/first-term-data";
import { toast } from "@school-clerk/ui/use-toast";
import { Badge } from "@school-clerk/ui/badge";
import { Menu } from "@/components/menu";
import { useEffect, useState } from "react";
import { Input } from "@school-clerk/ui/input";

export default function PaymentsPage() {
  const { createAction, deleteAction } = usePostMutate();
  const trpc = useTRPC();
  const { isLoading, data } = useQuery(trpc.ftd.getPaymentsList.queryOptions());

  const qc = useQueryClient();
  const handleComposePayment = () => {
    const s = composePayments();

    createAction.mutate(
      {
        data: s.map(
          (line) =>
            ({
              type: "raw-payment",
              line,
            }) as PaymentRaw,
        ),
      },
      {
        onSuccess(data, variables, context) {
          toast({
            title: "Payment Composed",
            description: `Payment composed successfully with`,
            variant: "success",
          });
          qc.invalidateQueries({
            queryKey: trpc.ftd.getPaymentsList.queryKey(),
          });
        },
      },
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Payments</h1>
        <div className="flex gap-4">
          <Button
            onClick={handleComposePayment}
            disabled={createAction.isPending}
          >
            {createAction.isPending ? "Composing..." : "Compose Payment"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleComposePayment}
            disabled={createAction.isPending}
          >
            {deleteAction.isPending ? "Clearing..." : "Clear"}
          </Button>
        </div>
      </div>
      {isLoading ? (
        <p>Loading payments...</p>
      ) : (
        <div className="rounded-md border">
          <table dir="rtl" className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Line
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payments
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.payments?.map((payment) => (
                <tr key={payment.postId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.line}
                  </td>

                  <td className="px-6 flex gap-4 py-4 whitespace-nowrap">
                    {payment?.appliedPayments?.map((ap) => (
                      <Badge>
                        {ap?.term}
                        {" - "} {ap?.paymentType}
                      </Badge>
                    ))}
                    <PaymentAction line={payment.line} id={payment.postId} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
function PaymentAction({ line, id }) {
  const [name, ...rest] = line?.split(". ");
  const searchParts = name
    ?.split(name?.includes(".") ? "." : " ")
    ?.filter(Boolean);
  const [opened, setOpened] = useState(false);
  const trpc = useTRPC();
  const m = usePostMutate();
  const { data, isPending } = useQuery(
    trpc.ftd.studentSearch.queryOptions(
      {
        searchParts,
      },
      {
        enabled: opened,
      },
    ),
  );
  const create = async ({
    amount,
    status,
    term,
    type,
    paymentType,
    postId,
    rawPaymentId,
    studentId,
  }: Payment) => {
    m.createAction.mutate({
      data: {
        amount,
        status,
        term,
        type,
        paymentType,
        postId,
        rawPaymentId,
        studentId,
      },
    });
  };
  useEffect(() => {
    if (!opened) return;
    console.log(searchParts);
  }, [searchParts, opened]);
  function AmountForm({ onApply }) {
    const [amount, setAmount] = useState<string>("");
    return (
      <>
        <Menu.Label>Amount</Menu.Label>
        {amount}
        <Input
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <Button
          onClick={(e) => {
            onApply({
              amount,
            });
          }}
        >
          Save
        </Button>
      </>
    );
  }
  const PaymentTerms = ({ studentId, paymentType, classId = null }) => (
    <>
      {["third", "second", "first"].map((term) => (
        <Menu.Item
          key={term}
          SubMenu={
            paymentType == "form" ? undefined : (
              <AmountForm
                onApply={({ amount }) => {
                  create({
                    amount,
                    studentId,
                    status: "applied",
                    term: term as any,
                    paymentType,
                    type: "student-payment",
                    rawPaymentId: id,
                  });
                }}
              />
            )
          }
          onClick={
            paymentType != "form"
              ? undefined
              : (e) => {
                  create({
                    amount: 1000,
                    studentId,
                    status: "applied",
                    term: term as any,
                    paymentType,
                    type: "student-payment",
                    rawPaymentId: id,
                  });
                }
          }
        >
          {term} {" Term"}
        </Menu.Item>
      ))}
    </>
  );
  const PaymentTypes = ({ studentId = null, classId = null }) => (
    <>
      <Menu.Item
        SubMenu={
          <>
            <PaymentTerms
              studentId={studentId}
              classId={classId}
              paymentType={"form"}
            />
          </>
        }
      >
        Form
      </Menu.Item>
      <Menu.Item
        SubMenu={
          <>
            <PaymentTerms
              studentId={studentId}
              classId={classId}
              paymentType={"fee"}
            />
          </>
        }
      >
        Fee
      </Menu.Item>
    </>
  );
  return (
    <Menu noSize open={opened} onOpenChanged={setOpened}>
      <Menu.Label>
        <div dir="rtl" className="flex gap-1">
          {searchParts?.map((p, pi) => <span key={pi}>{p}</span>)}
        </div>
      </Menu.Label>
      {isPending ? (
        <Menu.Item disabled>Loading</Menu.Item>
      ) : !data?.classrooms?.length && !data?.students?.length ? (
        <Menu.Item>No Data Found</Menu.Item>
      ) : (
        <>
          <Menu.Item
            SubMenu={data?.classrooms?.map((c) => (
              <Menu.Item
                SubMenu={<PaymentTypes classId={c.postId} />}
                key={c.postId}
              >
                {c.classTitle}
              </Menu.Item>
            ))}
          >
            Create Student
          </Menu.Item>
          {data?.students?.map((student) => (
            <Menu.Item
              dir="rtl"
              SubMenu={<PaymentTypes classId={student.studentId} />}
              shortCut={
                <span className="whitespace-nowrap">{student?.classRoom}</span>
              }
              key={student.studentId}
            >
              <span className="whitespace-nowrap">{student.fullName}</span>
            </Menu.Item>
          ))}
        </>
      )}
    </Menu>
  );
}

"use client";

import { Button } from "@school-clerk/ui/button";
import { usePostMutate } from "../../use-global";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { composePayments } from "../../data";
import { PaymentRaw } from "@api/db/queries/first-term-data";
import { toast } from "@school-clerk/ui/use-toast";

export default function PaymentsPage() {
  const { createAction } = usePostMutate();
  const trpc = useTRPC();
  const { isLoading } = useQuery(trpc.ftd.getPaymentsList.queryOptions());

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
        <Button
          onClick={handleComposePayment}
          disabled={createAction.isPending}
        >
          {createAction.isPending ? "Composing..." : "Compose Payment"}
        </Button>
      </div>
      {isLoading ? (
        <p>Loading payments...</p>
      ) : (
        <div className="rounded-md border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* {data?.payments?.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.paymentId
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.paymentId ? "Applied" : "Not Applied"}
                    </span>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

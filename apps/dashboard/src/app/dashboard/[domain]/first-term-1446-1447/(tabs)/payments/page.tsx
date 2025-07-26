'use client';

import { Button } from "@school-clerk/ui/button";
import { usePostMutate } from "../../use-global";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function PaymentsPage() {
  const { createAction } = usePostMutate();
  const trpc = useTRPC();
  const { data: payments, isLoading } = useQuery(
    trpc.ftd.getPaymentsList.queryOptions()
  );

  const handleComposePayment = () => {
    createAction.mutate({
      data: {
        type: "payment",
        // Mock data for now
        amount: Math.floor(Math.random() * 1000) + 100,
        studentId: `student-${Math.random().toString(36).substring(7)}`,
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Payments</h1>
        <Button onClick={handleComposePayment} disabled={createAction.isPending}>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments?.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.studentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.paymentId ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                      {payment.paymentId ? "Applied" : "Not Applied"}
                    </span>
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
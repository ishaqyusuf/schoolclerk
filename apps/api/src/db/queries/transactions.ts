import { composeQueryData } from "@api/query-response";
import type { TRPCContext } from "@api/trpc/init";
import type {
  TransactionsQuerySchema,
  TransactionsSummaryQuery,
} from "@api/trpc/schemas/schemas";
import { composeQuery } from "@api/utils";
import type { Prisma } from "@school-clerk/db";

export async function getTransactions(
  ctx: TRPCContext,
  query: TransactionsQuerySchema
) {
  if (!query.termId) query.termId = ctx.profile.termId;
  const model = ctx.db.studentFee;
  const { response, searchMeta, where } = await composeQueryData(
    query,
    whereTransactions(query),
    model
  );
  const list = await model.findMany({
    where,
    ...searchMeta,
    select: {
      id: true,
      //   amount: true,
      //   studentPayment,
    },
  });
}
function whereTransactions(query: TransactionsQuerySchema) {
  const where: Prisma.WalletTransactionsWhereInput[] = [];
  Object.entries(query).forEach(([key, value]) => {
    if (!value) return;
    switch (key as keyof TransactionsQuerySchema) {
    }
  });
  return composeQuery(where);
}

export async function getTransactionsSummary(
  ctx: TRPCContext,
  query: TransactionsSummaryQuery
) {
  const where = whereTransactions(query);
}

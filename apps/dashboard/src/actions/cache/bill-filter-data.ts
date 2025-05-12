"use server";

import { getSaasProfileCookie } from "../cookies/login-session";
import { getCachedBillables } from "./billables";
import { _getWalletTypes } from "./wallet-types";

export async function billsFilterData() {
  const profile = await getSaasProfileCookie();

  const fn = async () => {
    const [billables, walletTypes] = await Promise.all([
      getCachedBillables(),
      _getWalletTypes(),
    ]);
    return {
      billables,
      walletTypes,
    };
  };
  return await fn();
}

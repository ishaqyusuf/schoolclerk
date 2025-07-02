import { SearchParamsKeys } from "@/utils/search-params";
import { IconKeys } from "../icons";
import { RouterInputs, RouterOutputs } from "@api/trpc/routers/_app";

type T = RouterInputs["students"]["index"];
type NonVoidT = Exclude<T, void>;
//get keys
type Keys = keyof NonVoidT;

export const searchIcons: Partial<{
  [id in Keys]: IconKeys;
}> = {
  //   "order.no": "orders",
  //   "customer.name": "user",
  //   phone: "phone",
  //   search: "Search",
  //   "production.assignedToId": "production",
  //   "production.assignment": "production",
  //   "production.status": "production",
  //   production: "production",
  // "sales.rep": "r"
};

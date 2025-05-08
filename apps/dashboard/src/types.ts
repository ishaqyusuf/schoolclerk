import { Primitive } from "@radix-ui/react-primitive";

import { IconKeys } from "./components/icons";
import { SearchParamsKeys } from "./utils/search-params";

export type AsyncFnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;
export type PageItemData<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>["data"][number];

export type PrimitiveDivProps = React.ComponentPropsWithoutRef<
  typeof Primitive.div
>;
export type PageFilterData = {
  value: SearchParamsKeys;
  icon: IconKeys;
  label?: string;
  options?: {
    label?: string;
    value?: string;
  }[];
};
export type PageDataMeta = {
  count?;
};

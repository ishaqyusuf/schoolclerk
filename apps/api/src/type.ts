import { Primitive } from "@radix-ui/react-primitive";

export type PageDataMeta = {
  count?;
  page?;
  next?: {
    size?;
    start?;
  };
  cursor?;
  hasPreviousePage?;
  hasNextPage?;
};
export type ColumnMeta = {
  preventDefault?: boolean;
  className?: string;
};
export type PageFilterData = {
  value?: string;
  icon?: any;
  type: "checkbox" | "input" | "date" | "date-range";
  label?: string;
  options?: {
    label: string;
    subLabel?: string;
    value: string;
  }[];
};

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

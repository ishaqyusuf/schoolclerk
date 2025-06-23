export type PageDataMeta = {
  count?;
  page?;
  next?: {
    size?;
    start?;
  };
};
export type ColumnMeta = {
  preventDefault?: boolean;
  className?: string;
};

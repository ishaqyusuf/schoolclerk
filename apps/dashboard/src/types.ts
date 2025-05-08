export type AsyncFnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;
export type PageItemData<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>["data"][number];

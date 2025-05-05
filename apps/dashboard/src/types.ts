export type AsyncFnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;

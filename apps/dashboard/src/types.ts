import { Primitive } from "@radix-ui/react-primitive";

export type AsyncFnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;
export type PageItemData<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>["data"][number];

export type PrimitiveDivProps = React.ComponentPropsWithoutRef<
  typeof Primitive.div
>;

import { OrderInventory } from "@/db";

export type IOrderInventory = OrderInventory & {
    product: IOrderInventory;
};

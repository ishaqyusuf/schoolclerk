import { SalesCommision } from "@/db";
import { IUser } from "@/types/hrm";
import { ISalesOrder } from "@/types/sales";

export interface ICommissions extends Omit<SalesCommision, "meta"> {
    user: IUser;
    order: ISalesOrder;
}

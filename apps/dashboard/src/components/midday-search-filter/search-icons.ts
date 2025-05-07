import { IconKeys } from "../_v1/icons";
import { SearchParamsKeys } from "../(clean-code)/data-table/search-params";

export const searchIcons: Partial<{
    [id in SearchParamsKeys]: IconKeys;
}> = {
    "order.no": "orders",
    "customer.name": "user",
    phone: "phone",
    search: "Search",
    "production.assignedToId": "production",
    "production.assignment": "production",
    "production.status": "production",
    production: "production",
    // "sales.rep": "r"
};

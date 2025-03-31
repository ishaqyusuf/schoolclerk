"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/db";
import { Tags } from "@/utils/constants";

import { getCustomerFormAction } from "../get-customer-form";

export async function checkExistingCustomerByPhone(phoneNo) {
    return await unstable_cache(
        async (phoneNo) => {
            if (!phoneNo) return null;
            if (phoneNo) {
                const customer = await prisma.customers.findFirst({
                    where: {
                        phoneNo,
                    },
                });
                if (customer) {
                    return await getCustomerFormAction(customer.id);
                }
                return null;
            }
        },
        [Tags.salesCustomers],
        {
            tags: [Tags.salesCustomers],
        },
    )(phoneNo);
}

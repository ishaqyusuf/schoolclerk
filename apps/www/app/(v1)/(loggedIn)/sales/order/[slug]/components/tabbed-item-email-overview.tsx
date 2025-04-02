"use client";

import { useDataPage } from "@/lib/data-page-context";
import { ISalesOrder } from "@/types/sales";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@gnd/ui/tabs";

import DeliveryTabIndex from "./delivery-tab";
import ItemDetailsSection from "./item-details";

export default function TabbedItemEmailOverview() {
    const { data: order } = useDataPage<ISalesOrder>();
    const isProd = order?.ctx?.prodPage;
    return (
        <div className="">
            <Tabs defaultValue="items" className="">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="items">Items</TabsTrigger>
                    <TabsTrigger value="delivery">Delivery</TabsTrigger>
                    {/* <TabsTrigger value="emails">Notification</TabsTrigger> */}
                </TabsList>
                <TabsContent value="items">
                    <ItemDetailsSection />
                </TabsContent>
                <TabsContent value="emails">
                    {/* <SalesEmailSection /> */}
                </TabsContent>
                <TabsContent value="delivery">
                    <DeliveryTabIndex />
                </TabsContent>
            </Tabs>
        </div>
    );
}

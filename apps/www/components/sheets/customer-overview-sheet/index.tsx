"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCustomerOverviewQuery } from "@/hooks/use-customer-overview-query";
import { usePageTitle } from "@/hooks/use-page-title";

import { Button } from "@gnd/ui/button";
import { SheetDescription, SheetHeader, SheetTitle } from "@gnd/ui/sheet";

import { CustomSheet, CustomSheetContent } from "../custom-sheet-content";
import { GeneralTab } from "./general-tab";
import { PayPortalTab } from "./pay-portal-tab";

export function CustomerOverviewSheet() {
    const ctx = useCustomerOverviewQuery();
    const pt = usePageTitle();

    const currenTab = ctx.params?.tab;
    const [customerName, setCustomerName] = useState(null);
    useEffect(() => {
        if (!ctx.opened) return;
        function _title(_t) {
            return [_t, customerName].filter(Boolean).join(" - ");
        }
        pt.setTitle(
            {
                general: _title(`Overview`),
                sales: _title(`Sales`),
                quotes: _title(`Quotes`),
                transactions: _title(`Transactions`),
                "pay-portal": _title(`Pay Portal`),
            }[currenTab],
        );
    }, [currenTab, ctx.opened, pt, customerName]);
    return (
        <CustomSheet
            open={ctx.opened}
            rounded
            size="xl"
            floating
            onOpenChange={(e) => {
                ctx.close();
                pt.reset();
            }}
        >
            <Tabs
                value={currenTab}
                onValueChange={(e) => {
                    ctx.setParams({
                        tab: e as any,
                    });
                }}
                className=""
            >
                <SheetHeader>
                    <SheetTitle>Customer Overview</SheetTitle>
                    <SheetDescription>
                        <TabsList className="flex w-full justify-start">
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="sales">Sales</TabsTrigger>
                            <TabsTrigger value="quotes">Quotes</TabsTrigger>
                            <TabsTrigger value="transactions">
                                Transactions
                            </TabsTrigger>
                            <TabsTrigger value="pay-portal">
                                Pay Portal
                            </TabsTrigger>
                        </TabsList>
                    </SheetDescription>
                </SheetHeader>
            </Tabs>
            <CustomSheetContent className="-mt-4">
                <Tabs value={currenTab}>
                    <TabsContent value="general">
                        <GeneralTab setCustomerName={setCustomerName} />
                    </TabsContent>
                    <TabsContent value="pay-portal">
                        <PayPortalTab />
                    </TabsContent>
                </Tabs>
            </CustomSheetContent>
        </CustomSheet>
    );
}

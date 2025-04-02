"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/_v1/icons";
import { closeModal } from "@/lib/modal";
import { sales } from "@/lib/sales/sales-helper";

import { TabsContent } from "@gnd/ui/tabs";

import MobileMenuCtx from "../mobile-menu-ctx";
import { MobileMenu, MobileOption } from "../mobile-menu-item";

export function SalesProductionMobileMenu({ data }) {
    function openAssignProd(order) {
        // modal?.open(<AssignProductionModal order={order} />);
    }
    return (
        <TabsContent value="production">
            <MobileMenu>
                <MobileOption
                    href={`/sales/productions/${data?.slug}`}
                    onClick={closeModal as any}
                    Icon={Icons.open}
                    label="Open"
                />
                <MobileOption
                    onClick={() => {
                        // sales.productionModal(data);
                        openAssignProd(data);
                    }}
                    Icon={Icons.flag}
                    label={data?.prodId ? "Update Assignment" : "Assign"}
                />
                {data?.prodStatus == "Completed" ? (
                    <MobileOption
                        onClick={() => {
                            sales.markIncomplete(data);
                            closeModal();
                        }}
                        Icon={Icons.flag}
                        label={"Incomplete"}
                    />
                ) : (
                    <>
                        <MobileOption
                            onClick={() => {
                                sales._clearAssignment(data);
                            }}
                            Icon={Icons.close}
                            label={"Clear Assign"}
                        />
                        <MobileOption
                            label="Mark as Completed"
                            Icon={Icons.check}
                            onClick={() => sales.completeProduction(data)}
                        />
                    </>
                )}
            </MobileMenu>
        </TabsContent>
    );
}

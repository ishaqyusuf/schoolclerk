"use client";

import { useTransition } from "react";
import { _revalidate } from "@/app/(v1)/_actions/_revalidate";
import Btn from "@/components/_v1/btn";
import { SecondaryCellContent } from "@/components/_v1/columns/base-columns";
import {
    DeleteRowAction,
    EditRowAction,
    RowActionCell,
} from "@/components/_v1/data-table/data-table-row-actions";
import { TableCol } from "@/components/common/data-table/table-cells";
import { useModal } from "@/components/common/modal/provider";
import { toast } from "sonner";

import { Badge } from "@gnd/ui/badge";

import { deleteCustomerProfile, makeDefaultCustomerProfile } from "./actions";
import CustomerProfileModal from "./employee-profile-modal";
import { ICustomerProfile } from "./type";

interface Props {
    item: ICustomerProfile;
}
function ProfileName({ item }: Props) {
    return (
        <TableCol>
            <TableCol.Primary>{item.title}</TableCol.Primary>
        </TableCol>
    );
}
function Options({ item }: Props) {
    const [isLoading, startTransition] = useTransition();

    async function makeDefault() {
        startTransition(async () => {
            await makeDefaultCustomerProfile(item.id);
            toast.success("Profile set successfully.");
            //  route.refresh();
            _revalidate("customerProfiles");
        });
    }
    const modal = useModal();
    return (
        <RowActionCell>
            <SecondaryCellContent>
                {item.defaultProfile ? (
                    <Badge>Default</Badge>
                ) : (
                    <Btn
                        isLoading={isLoading}
                        onClick={makeDefault}
                        variant="secondary"
                        className="flex h-8"
                    >
                        <span className="whitespace-nowrap">
                            {"Set Default"}
                        </span>
                    </Btn>
                )}
            </SecondaryCellContent>
            <DeleteRowAction row={item} action={deleteCustomerProfile} />
            <EditRowAction
                onClick={() => {
                    modal.openModal(
                        <CustomerProfileModal defaultValues={{ ...item }} />,
                    );
                }}
            />
        </RowActionCell>
    );
}
function SalesMargin({ item }: Props) {
    return <>{item.coefficient}%</>;
}
function NetTerms({ item }: Props) {
    return <>{item.meta?.net}</>;
}
function Quote({ item }: Props) {
    return <>{item.meta?.goodUntil} days</>;
}
export let Cells = {
    ProfileName,
    Options,
    SalesMargin,
    Quote,
    NetTerms,
};

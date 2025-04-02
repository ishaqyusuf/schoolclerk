"use client";

import { _revalidate } from "@/app/(v1)/_actions/_revalidate";
import FormInput from "@/components/common/controls/form-input";
import Modal from "@/components/common/modal";
import { useModal } from "@/components/common/modal/provider";
import { permissions } from "@/lib/data/role";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Checkbox } from "@gnd/ui/checkbox";
import { Form } from "@gnd/ui/form";
import { Label } from "@gnd/ui/label";
import { ScrollArea } from "@gnd/ui/scroll-area";

import {
    GetRoleFormAction,
    getRoleFormAction,
    saveRoleAction,
} from "./roles.actions";

export function useRoleModal() {
    const modal = useModal();
    return {
        async open(id = null) {
            const data = await getRoleFormAction(id);
            console.log(data);

            modal.openModal(<RoleModal defaultValues={data} />);
        },
    };
}

export default function RoleModal({
    defaultValues,
}: {
    defaultValues: GetRoleFormAction;
}) {
    const form = useForm({
        defaultValues,
    });
    const modal = useModal();
    async function onSubmit() {
        const data = form.getValues();
        if (!data.name) toast.error("Provide a valid role title");
        await saveRoleAction(data);
        toast.success("Saved");
        modal.close();
        _revalidate("roles");
    }
    return (
        <Form {...form}>
            <Modal.Content size="sm">
                <Modal.Header
                    title={defaultValues.roleId ? "Edit Role" : "Create Role"}
                />
                <div className="grid gap-4">
                    <FormInput
                        control={form.control}
                        name="name"
                        label="Role Title"
                    />
                    <div>
                        <div className="grid grid-cols-7 gap-3 bg-accent p-1">
                            <Label className="col-span-5">Permission</Label>
                            <Label className="col-span-1 text-center">
                                View
                            </Label>
                            <Label className="col-span-1 text-center">
                                Edit
                            </Label>
                        </div>
                        <ScrollArea className="h-[300px]">
                            <div className="divide-y divide-accent">
                                {permissions.map((permission) => (
                                    <div
                                        key={permission}
                                        className="grid grid-cols-7 items-center gap-2 p-1"
                                    >
                                        <Label className="col-span-5 capitalize">
                                            {permission}
                                        </Label>
                                        {["view", "edit"].map((k) => {
                                            const _k =
                                                `permission.${k} ${permission}` as any;
                                            return (
                                                <PermissionCheckBox
                                                    key={k}
                                                    permission={_k}
                                                    form={form}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
                <Modal.Footer
                    onSubmit={onSubmit}
                    submitText={defaultValues.roleId ? "Update" : "Create"}
                />
            </Modal.Content>
        </Form>
    );
}
function PermissionCheckBox({ permission, form }: { permission; form }) {
    const value = form.watch(permission);
    return (
        <div className="text-center">
            <Checkbox
                checked={value}
                onCheckedChange={(e) => {
                    form.setValue(permission, e);
                }}
            />
        </div>
    );
}

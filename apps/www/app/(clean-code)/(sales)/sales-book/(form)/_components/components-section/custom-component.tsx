import { useMemo } from "react";
import {
    createCustomComponentUseCase,
    updateCustomComponentUseCase,
} from "@/app/(clean-code)/(sales)/_common/use-case/step-component-use-case";
import AutoComplete from "@/components/_v1/common/auto-complete";
import Button from "@/components/common/button";
import FormInput from "@/components/common/controls/form-input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useFormDataStore } from "../../_common/_stores/form-data-store";
import { ComponentHelperClass } from "../../_utils/helpers/zus/step-component-class";
import { UseStepContext } from "./ctx";

interface Props {
    ctx: UseStepContext;
}
export function CustomComponent({ ctx }: Props) {
    const zus = useFormDataStore();
    const stepForm = ctx.cls.getStepForm();
    const form = useForm({
        defaultValues: {
            title: "",
            basePrice: "",
            salesPrice: "",
        },
    });
    const customInputs = useMemo(
        () => ctx.stepComponents?.filter((s) => s._metaData.custom),
        [ctx.stepComponents],
    );
    const hasCost = useMemo(
        () => ctx.items?.filter((s) => s.salesPrice)?.length > 0,
        [ctx.items],
    );
    async function _continue() {
        const data = form.getValues();
        console.log(data);

        if (!data.title) {
            toast.error("Invalid custom input");
            return;
        }
        let cls: ComponentHelperClass;
        let eProd = customInputs?.find((s) => s.title == data.title);

        if (!eProd) {
            eProd = (await createCustomComponentUseCase({
                title: data.title,
                price: data.basePrice ? +data.basePrice : null,
                stepId: stepForm?.stepId,
            })) as any;
            cls = new ComponentHelperClass(
                ctx.cls.itemStepUid,
                eProd.uid,
                eProd,
            );
            if (data.basePrice) {
                await cls.fetchUpdatedPrice();
            }
            ctx.cls.addStepComponent(eProd);
        } else {
            if (eProd.basePrice != data.basePrice && data.basePrice) {
                eProd = await updateCustomComponentUseCase({
                    price: +data.basePrice,
                    id: eProd.id,
                });
                cls = new ComponentHelperClass(
                    ctx.cls.itemStepUid,
                    eProd.uid,
                    eProd,
                );
                await cls.fetchUpdatedPrice();
            }
        }
        if (eProd) {
            if (!cls)
                cls = new ComponentHelperClass(ctx.cls.itemStepUid, eProd.uid);
            cls.selectComponent();
        }
    }
    return (
        <Form {...form}>
            <div className="group relative flex min-h-[25vh]  flex-col  gap-4 p-2 xl:min-h-[40hv]">
                {/* {customInputs?.length ? (
                    <AutoComplete
                        onSelect={(value: any) => {
                            form.setValue("salesPrice", value?.salesPrice);
                            form.setValue("basePrice", value?.basePrice);
                        }}
                        itemText={"label"}
                        allowCreate
                        itemValue={"value"}
                        options={customInputs}
                        size="sm"
                        form={form}
                        formKey={"title"}
                        label={"Custom"}
                        perPage={10}
                    />
                ) : ( */}
                <FormInput
                    label="Custom"
                    size="sm"
                    control={form.control}
                    name="title"
                    className="uppercase"
                />
                {/* )} */}
                {hasCost ? (
                    <FormInput
                        label="Price"
                        type="number"
                        size="sm"
                        prefix="$"
                        control={form.control}
                        name="basePrice"
                    />
                ) : null}
                <div className="flex justify-end">
                    <Button onClick={_continue}>Continue</Button>
                </div>
            </div>
        </Form>
    );
}

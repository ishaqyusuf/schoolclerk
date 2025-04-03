import { SalesFormZusData } from "@/app/(clean-code)/(sales)/types";
import { cn } from "@/lib/utils";
import { FieldPath } from "react-hook-form";

import { Label } from "@gnd/ui/label";

import { useFormDataStore } from "../../../_common/_stores/form-data-store";
import { CustomerSearch } from "../customer-search";
import { Input, LineSwitch } from "../line-input";

export function AddressTab({}) {
    const zus = useFormDataStore();

    const sameAddress = zus.metaData?.sameAddress;
    return (
        <div
            className={cn(
                "lg:max-w-5xl xl:max-w-4xl",
                sameAddress && "lg:max-w-2xl xl:max-w-xl",
            )}
        >
            <div
                className={cn(
                    " gap-4  p-4 sm:gap-10 lg:gap-16",
                    !sameAddress ? "grid grid-cols-2" : "",
                )}
            >
                <AddressForm addressType="billing" />
                <AddressForm addressType="shipping" />
            </div>
        </div>
    );
}
interface InputProps {
    name: FieldPath<SalesFormZusData["metaData"]["billing"]>;
    label?: string;
    namePrefix;
    disabled?;
}
function AddressInput({ name, namePrefix, disabled, label }: InputProps) {
    // const namePrefix = addressType;
    return (
        <Input
            disabled={disabled}
            label={label}
            name={`metaData.${namePrefix}.${name}` as any}
        />
    );
}
function AddressForm({ addressType }) {
    const config = {
        billing: {
            title: "Billing Address",
        },
        shipping: {
            title: "Shipping Address",
        },
    }[addressType];
    const zus = useFormDataStore();

    const isShipping = addressType == "shipping";
    const sameAddress = zus.metaData?.sameAddress;
    const isBusiness = zus.metaData?.customer?.isBusiness;
    const namePrefix = isShipping && sameAddress ? "billing" : addressType;
    const disabled = isShipping && sameAddress;
    if (isShipping && sameAddress) return null;
    return (
        <div className="mt-2">
            <div className="flex h-10 items-center gap-2 border-b">
                <Label className="text-xl">{config.title}</Label>
                <div className="flex-1"></div>
                <CustomerSearch addressType={addressType} />
                <div className="flex items-center gap-2">
                    {isShipping ? (
                        <></>
                    ) : (
                        <>
                            <Label>Business</Label>
                            <LineSwitch name="metaData.customer.isBusiness" />
                        </>
                    )}
                </div>
            </div>
            {isShipping || (
                <div className="mt-4 flex items-center">
                    <Label>Shipping Address: (Same as Billing)</Label>
                    <div className="flex-1"></div>
                    <div className="flex items-center space-x-4">
                        <LineSwitch name="metaData.sameAddress" />
                    </div>
                </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-4">
                {!isShipping && isBusiness ? (
                    <div className="col-span-2">
                        <Input
                            label="Business Name"
                            name="metaData.customer.businessName"
                        />
                    </div>
                ) : (
                    <div className="col-span-2">
                        <AddressInput
                            disabled={disabled}
                            namePrefix={namePrefix}
                            label="Customer Name"
                            name="name"
                        />
                    </div>
                )}
                <AddressInput
                    disabled={disabled}
                    namePrefix={namePrefix}
                    label="Primary Phone"
                    name="primaryPhone"
                />
                <AddressInput
                    disabled={disabled}
                    namePrefix={namePrefix}
                    label="Email"
                    name="email"
                />
                <div className="col-span-2">
                    <AddressInput
                        disabled={disabled}
                        namePrefix={namePrefix}
                        label="Address"
                        name="address1"
                    />
                </div>
                <AddressInput
                    disabled={disabled}
                    namePrefix={namePrefix}
                    label="Secondary Phone"
                    name="secondaryPhone"
                />
                <AddressInput
                    disabled={disabled}
                    namePrefix={namePrefix}
                    label="State"
                    name="state"
                />
                <AddressInput
                    disabled={disabled}
                    namePrefix={namePrefix}
                    label="City"
                    name="city"
                />
                <AddressInput
                    disabled={disabled}
                    namePrefix={namePrefix}
                    label="Zip Code"
                    name="zipCode"
                />
            </div>
        </div>
    );
}

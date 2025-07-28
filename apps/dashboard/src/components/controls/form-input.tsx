import { InputHTMLAttributes } from "react";
import { useDataSkeleton } from "@/hooks/use-data-skeleton";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { NumericFormat, type NumericFormatProps } from "react-number-format";

import { Button } from "@school-clerk/ui/button";
import { cn } from "@school-clerk/ui/cn";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@school-clerk/ui/form";
import { Input } from "@school-clerk/ui/input";
import { Label } from "@school-clerk/ui/label";
import { Skeleton } from "@school-clerk/ui/skeleton";
import { Textarea } from "@school-clerk/ui/textarea";

import { NumberInput } from "../currency-input";

interface Props<T> {
  label?: string;
  placeholder?: string;
  className?: string;
  suffix?: string;
  type?: string;
  list?: boolean;
  size?: "sm" | "default" | "xs";
  prefix?: string;
  tabIndex?;
  uppercase?: boolean;
  inlineLabel?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  numericProps?: NumericFormatProps;

  // defaultValue?:boolean
}
export default function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOptionType = any,
>({
  label,
  placeholder,
  className,
  suffix,
  type,
  list,
  prefix,
  uppercase,
  tabIndex,
  size = "default",
  inputProps,
  numericProps,
  inlineLabel,
  ...props
}: Partial<ControllerProps<TFieldValues, TName>> & Props<TOptionType>) {
  const load = useDataSkeleton();
  return (
    <FormField
      {...(props as any)}
      render={({ field, fieldState }) => (
        <FormItem
          className={cn(
            className,
            props.disabled && "text-muted-foreground",
            "mx-1",
            inlineLabel && "flex items-center gap-2",
          )}
        >
          {label && (
            <FormLabel className={cn(fieldState.error && "border-red-400")}>
              {label}
            </FormLabel>
          )}
          <FormControl {...inputProps}>
            {load?.loading ? (
              <>
                <Skeleton className="h-8 w-full" />
              </>
            ) : (
              <>
                {numericProps ? (
                  <div className="relative font-mono">
                    <NumericFormat
                      value={field.value}
                      {...numericProps}
                      {...{ className }}
                      onValueChange={(e) => {
                        // if (numericProps.type == '')
                        field.onChange(e.floatValue);
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={cn(
                      (suffix || prefix) && "flex items-center space-x-1",
                      "",
                    )}
                  >
                    {prefix && (
                      <div
                        className={cn(
                          size == "sm" && "",
                          "sbg-muted-foreground/50 h-full px-1 text-sm",
                        )}
                      >
                        {prefix}
                      </div>
                    )}
                    {type == "textarea" ? (
                      <Textarea
                        tabIndex={tabIndex}
                        placeholder={placeholder}
                        className={cn(fieldState.error && "border-red-400")}
                        {...(list
                          ? {
                              defaultValue: field.value,
                              onChange: field.onChange,
                            }
                          : field)}
                        // value={""}
                      />
                    ) : (
                      <Input
                        tabIndex={tabIndex}
                        type={type}
                        placeholder={placeholder}
                        // {...field}
                        // value={""}
                        {...inputProps}
                        className={cn(
                          uppercase && "uppercase",
                          fieldState.error && "border-red-400",
                          size == "sm" && "h-8",
                        )}
                        {...(list
                          ? {
                              defaultValue: field.value,
                              //   onChange: field.onChange,
                            }
                          : field)}
                        // onChange={field.onChange}
                        // defaultValue={field.value}
                        onChange={(e) => {
                          if (type == "number")
                            e.target.value
                              ? field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
                                    : null,
                                )
                              : field.onChange(null);
                          else field.onChange(e);
                        }}
                      />
                    )}
                    {suffix && (
                      <Button
                        type="button"
                        size={size as any}
                        variant={"outline"}
                        className={size == "sm" ? "h-8" : ""}
                      >
                        {suffix}
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
}

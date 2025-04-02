"use client";

import Link from "next/link";
import { Icons } from "@/components/_v1/icons";
import FormInput from "@/components/common/controls/form-input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@gnd/ui/button";
import { Input } from "@gnd/ui/input";

export default function CustomerLoginPage() {
    const form = useForm({
        resolver: zodResolver(
            z.object({
                email: z.string().min(1),
                password: z.string().min(1),
                type: z.string().min(1),
            }),
        ),
        defaultValues: {
            email: "",
            password: "",
            type: "shop",
        },
    });
    async function submit(data) {}
    return (
        <div className="  bg-gray-50 dark:bg-gray-900">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)}>
                    <div className="mx-auto flex  min-h-[70vh]  max-w-3xl flex-col justify-center space-y-8 px-4">
                        <div className="flex items-center space-x-4">
                            <Icons.logoLg />
                            <div className="text-2xl font-bold">
                                Welcome Back!
                            </div>
                        </div>
                        <Card>
                            <CardHeader />
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <FormInput
                                        label="Email"
                                        control={form.control}
                                        placeholder="m@example.com"
                                        type="email"
                                        name="email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormInput
                                        control={form.control}
                                        name="password"
                                        type="password"
                                        label="Password"
                                    />
                                </div>
                                <Button className="w-full">Login</Button>
                            </CardContent>
                            <CardFooter className="text-center">
                                <div className="text-sm">
                                    {"Don't"} have an account?
                                    <Link
                                        className="ml-1 underline"
                                        href="/register"
                                    >
                                        Create an Account
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </Form>
        </div>
    );
}

"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, useForm, FormProvider} from "react-hook-form";  
import {toast} from "sonner";
import {z} from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { errorToJSON } from "next/dist/server/render";
import { authClient } from "@/lib/auth-client";



const loginSchema = z.object({
    email: z.email("Please enter valid email address"),
    password: z.string().min(4, "Password length should be atleast 4 ")
});

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm ({

}){
    const router = useRouter();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });
    const onSubmit = async(values: LoginFormValues) => {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            callbackURL: "/"
        },{
            onSuccess: ()=>{
                router.push("/");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message);
            }
        });
    };

    const isPending = form.formState.isSubmitting;
    const {errors} = form.formState;

    return(
        <div className="flex flex-col gap-2">
            <Card >
                <CardHeader className="text-center">
                    <CardTitle>
                        Welcome Back
                    </CardTitle>
                    <CardDescription>
                        Login to contine
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-4">
                                <Button 
                                    variant="outline"
                                    className="w-full"
                                    type="button"
                                    disabled={isPending}

                                >Continue with Google
                                </Button>
                                <Button 
                                    variant="outline"
                                    className="w-full"
                                    type="button"
                                    disabled={isPending}
                                >Continue with Github
                                </Button>
                            </div>
                            <div className=" p-4 w-full flex flex-col items-center justify-center">
                                <fieldset className="w-full max-w-xs flex flex-col">
                                <FieldGroup className="flex flex-col gap-4 items-center justify-center">
                                    <Field>
                                        <FieldLabel htmlFor="email" className="text-2xl font-semibold" >Email</FieldLabel>
                                        <Input id="username" type="email" placeholder="m@example.com" {...form.register("email")}/> 
                                        {errors.email ? (<p className="text-sm text-red-500 font-medium mt-1">{errors.email.message}</p>):(
                                            <FieldDescription>
                                            Enter your username
                                        </FieldDescription>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="password" className="text-2xl font-semibold" >Password</FieldLabel>
                                        <Input id="password" type="password" placeholder="******"></Input>
                                        {errors.password ? (
                                            <p className="text-sm text-red-500 font-medium mt-1">{errors.password.message}</p>
                                        ): (
                                        <FieldDescription>
                                            Enter your Password
                                        </FieldDescription>
                                        )}
                                    </Field>
                                </FieldGroup>
                            </fieldset>
                            </div>
                            
                            <div className="my-4">
                                <Button className="w-full" 
                                type="submit" 
                                disabled={isPending}

                            >Login
                            </Button>
                            <div className="my-2 text-center">
                                Don't have an account? {" "}
                                <Link href="/signup" className="underline underline-offset-4  ">Sign up</Link>
                            </div>
                            </div>
                            
                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </div>
    )
}


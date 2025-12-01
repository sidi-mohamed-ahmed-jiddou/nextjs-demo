"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUp } from "@/actions/users"
import * as yup from "yup";
import { authClient } from "@/lib/auth-client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
})

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {


    const [isLoading, setIsLoading] = useState(false);
    const [isSigningInWithGoogle, setIsSigningInWithGoogle] = useState(false);
    const router = useRouter();

    const form = useForm<yup.InferType<typeof formSchema>>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const signUpWithGoogle = async () => {
        setIsSigningInWithGoogle(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
            });
        } catch (error) {
            toast.error("Une erreur s'est produite lors de la connexion");
        } finally {
            setIsSigningInWithGoogle(false);
        }
    };

    async function onSubmit(values: yup.InferType<typeof formSchema>) {
        setIsLoading(true);
        try {
            const res = await signUp(values.name, values.email, values.password);
            if (res.success) {
                toast.success("Registration successful, check your email for verification");
                router.push("/login");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Registration failed");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="m@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button className="w-full" disabled={isLoading} type="submit">
                                {isLoading ? (
                                    <Loader2 className="size-4 animate-spin" />
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                type="button"
                                onClick={signUpWithGoogle}
                            >
                                {isSigningInWithGoogle ? (
                                    <Loader2 className="size-4 animate-spin" />
                                ) : (
                                    "Sign up with Google"
                                )}
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline underline-offset-4">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

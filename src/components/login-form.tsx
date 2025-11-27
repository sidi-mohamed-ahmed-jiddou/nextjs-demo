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
import { signIn } from "@/actions/users"
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {


  const [isLoading, setIsLoading] = useState(false);
  const [isSigningInWithGoogle, setIsSigningInWithGoogle] = useState(false);
  const router = useRouter();

  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInWithGoogle = async () => {
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
      const result = await signIn(values.email, values.password);

      if (result.success) {
        toast.success("Login successful");
        router.push("/dashboard");
      } else {
        // Afficher le message d'erreur spécifique retourné par le serveur
        toast.error(result.message || "Email ou mot de passe incorrect");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
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
                  "Login"
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={signInWithGoogle}
              >
                {isSigningInWithGoogle ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Login with Google"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

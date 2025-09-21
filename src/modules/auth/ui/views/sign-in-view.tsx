"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";

import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon, Eye, EyeOff } from "lucide-react";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().default(false),
  })
  .strict();

type FormSchema = z.infer<typeof formSchema>;

const SignInView = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSignIn: SubmitHandler<FormSchema> = async (data) => {
    setPending(true);
    setError(null);
    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            setPending(false);
            router.push("/");
            if (data.rememberMe) {
              console.log("Remember me is checked - extend session duration");
            }
          },
          onError: ({ error }) => {
            setError(error.message);
          },
        },
      );
    } catch (err) {
      console.log(err);
    } finally {
      setPending(false);
    }
  };

  const onSocialSignIn = async (provider: "github" | "google") => {
    setPending(true);
    setError(null);
    try {
      await authClient.signIn.social(
        {
          provider: provider,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            setPending(false);
          },
          onError: ({ error }) => {
            setError(error.message);
          },
        },
      );
    } catch (err) {
      console.log(err);
    } finally {
      setPending(false);
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked - redirect to reset password page");
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  return (
    <div className="flex flex-col gap-6 shadow-2xl shadow-main-300/30 rounded-2xl">
      <Card className="bg-transparent shadow-none border-none py-0 overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2 overflow-hidden rounded-2xl">
          <div className="relative bg-blue-200/10 dark:bg-white/5 backdrop-blur-xl border-r border-white/20 dark:border-slate-700/30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 dark:to-black/20" />
            <div className="absolute -right-2 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent to-black/10 dark:to-black/30 blur-md" />

            <Form {...form}>
              <form
                className="relative z-10 p-6 md:p-8"
                onSubmit={form.handleSubmit(onSignIn)}
              >
                <div className="flex flex-col gap-6">
                  <Logo />
                  <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                      Login to your account
                    </h1>
                    <p className="text-muted-foreground text-balance text-sm">
                      Welcome back! Please enter your details.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={pending}
                              type="email"
                              placeholder="Email address"
                              className="h-11 bg-white/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm focus:border-indigo-400 dark:focus:border-gray-500 focus:ring-indigo-400/20 transition-all duration-200"
                              {...field}
                            />
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
                          <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                disabled={pending}
                                type={showPassword ? "text" : "password"}
                                placeholder="*******"
                                className="h-11 pr-12 bg-white/50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm focus:border-indigo-400 dark:focus:border-gray-500 focus:ring-indigo-400/20 transition-all duration-200"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md
                                  text-slate-400 dark:text-slate-500
                                  hover:text-slate-600 dark:hover:text-slate-300
                                  hover:bg-slate-100/50 dark:hover:bg-slate-700/30
                                  backdrop-blur-sm transition-all duration-200
                                  focus:outline-none focus:ring-2 focus:ring-indigo-400/20 focus:ring-offset-0"
                                tabIndex={-1}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              disabled={pending}
                              onCheckedChange={field.onChange}
                              className="mt-0.5 data-[state=checked]:bg-gray-500 data-[state=checked]:border-gray-500 dark:data-[state=checked]:bg-gray-600 dark:data-[state=checked]:border-gray-600"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal text-slate-600 dark:text-slate-400 cursor-pointer">
                            Remember me
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <button
                      disabled={pending}
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium underline underline-offset-2 hover:underline-offset-4 transition-all duration-200 cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {!!error && (
                    <Alert className="bg-red-50/80 dark:bg-red-950/30 border-red-200/60 dark:border-red-800/60 backdrop-blur-sm">
                      <OctagonAlertIcon className="h-4 w-4 !text-red-600 dark:!text-red-400" />
                      <AlertTitle className="text-red-800 dark:text-red-300">
                        {error}
                      </AlertTitle>
                    </Alert>
                  )}

                  <Button
                    disabled={pending}
                    type="submit"
                    className="relative w-full h-12 cursor-pointer
                      bg-gradient-to-b from-slate-100 to-slate-200 hover:from-slate-50 hover:to-slate-200
                       rounded-full shadow-lg
                      shadow-slate-200/60
                      dark:bg-gradient-to-b dark:from-slate-900/30 dark:to-slate-700/10
                      dark:hover:bg-slate-500/30 dark:hover:text-gray-300
                       border-slate-200/50 dark:border-slate-600/50
                     dark:hover:border-slate-500/30
                      dark:shadow-black/10
                      hover:shadow-xl hover:shadow-slate-300/70 dark:hover:shadow-md dark:hover:shadow-black/20
                      text-slate-700 dark:text-slate-200
                      font-semibold transition-all duration-300 transform
                      active:scale-80
                      disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-bl from-white/60 via-white/20 to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent rounded-xl" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent  dark:via-white/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-400/40 to-transparent dark:via-transparent" />

                    {pending ? (
                      <div className="flex items-center justify-center gap-2 relative z-10">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400/30 dark:border-white/30 border-t-slate-600 dark:border-t-white" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <span className="relative z-10">Sign in</span>
                    )}
                  </Button>

                  <div className="relative text-center text-[12px]">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200/60 dark:border-slate-700/60" />
                    </div>
                    <span className="bg-white/80 dark:bg-[#222530] text-slate-600 dark:text-slate-400 relative px-4 backdrop-blur-sm rounded-full">
                      Or continue with
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      disabled={pending}
                      variant="outline"
                      type="button"
                      className="h-11 bg-white/60 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm hover:bg-blue-50/5 hover:shadow-lg    dark:hover:bg-slate-500/30  transition-all duration-200 cursor-pointer items-center flex"
                      onClick={() => onSocialSignIn("google")}
                    >
                      <FaGoogle /> Google
                    </Button>
                    <Button
                      disabled={pending}
                      variant="outline"
                      type="button"
                      className="h-11 bg-white/60 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm hover:bg-blue-50/5 hover:shadow-lg   dark:hover:bg-slate-500/30  transition-all duration-200 cursor-pointer"
                      onClick={() => onSocialSignIn("github")}
                    >
                      <FaGithub className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/sign-up"
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInView;

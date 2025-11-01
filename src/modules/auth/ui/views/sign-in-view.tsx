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
import AuthView from "@/modules/auth/ui/views/auth-view";
import { cn } from "@/lib/utils";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().default(false).nullish(),
  })
  .strict();

type FormSchema = z.infer<typeof formSchema>;

const SignInView = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

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

  return (
    <div className="flex flex-col gap-6 shadow-2xl shadow-main-300/30 rounded-2xl">
      <Card className="border-none py-0 relative bg-black/20  shadow-2xl border border-white/20 overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2 overflow-hidden rounded-2xl">
          <div className="relative  border-r border-white/20 dark:border-slate-700/30">
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
                              className="flex-1 px-5 py-6 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/30 transition-all"
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
                                className=" flex-1 px-5 py-6 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/30 transition-all pr-12 duration-200"
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
                              checked={field.value ?? false}
                              disabled={pending}
                              onCheckedChange={field.onChange}
                              className="mt-0.5 data-[state=checked]:bg-gray-500 data-[state=checked]:border-gray-500 border-gray-200"
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

                  {/* CTA Button */}
                  <div className="relative w-full h-12 cursor-pointer flex items-center justify-center">
                    <Button
                      disabled={pending}
                      type="submit"
                      className={cn(
                        "relative h-12 rounded-xl font-semibold text-sm uppercase tracking-wide text-white w-full overflow-hidden group",
                        "bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-60% to-[#1D1F1F]/50 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden",
                      )}
                    >
                      {/* Inner glow overlay */}
                      <span className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[5]"></span>

                      {/* Top edge glow */}
                      <span className="absolute left-[40%] top-0 z-[6] h-[2px] w-[60%] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-60 group-hover:left-4 transition-all duration-500 pointer-events-none"></span>

                      {/* Bottom edge glow */}
                      <span className="absolute bottom-0 left-4 z-[6] h-[2px] w-[35%] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-60 group-hover:left-[60%] transition-all duration-500 pointer-events-none"></span>

                      {pending ? (
                        <div className="flex items-center justify-center gap-2 relative z-10">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400/30 dark:border-white/30 border-t-slate-600 dark:border-t-white" />
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <span className="relative z-10">Sign in</span>
                      )}
                    </Button>
                  </div>

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
                      type="button"
                      className="h-11 bg-[#232628] backdrop-blur-sm hover:bg-gray-500/30 hover:shadow-lg  transition-all duration-200 cursor-pointer text-white flex items-center justify-center gap-2"
                      onClick={() => onSocialSignIn("google")}
                    >
                      <FaGoogle /> Google
                    </Button>
                    <Button
                      disabled={pending}
                      type="button"
                      className="h-11 bg-[#232628] backdrop-blur-sm hover:bg-gray-500/30 hover:shadow-lg  transition-all duration-200 cursor-pointer text-white flex items-center justify-center gap-2"
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
          {/* Auth View Section */}
          <AuthView />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInView;

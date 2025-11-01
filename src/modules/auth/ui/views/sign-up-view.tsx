"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";

import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import AuthView from "@/modules/auth/ui/views/auth-view";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { cn } from "@/lib/utils";

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormSchema = z.infer<typeof formSchema>;

const SignUpView = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSignUp: SubmitHandler<FormSchema> = async (data) => {
    setPending(true);
    setError(null);
    try {
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            setPending(false);
            router.push("/");
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

  return (
    <div className="flex flex-col gap-6 shadow-2xl shadow-main-300/30 rounded-2xl">
      <Card className="border-none py-0 relative bg-black/20 shadow-2xl border border-white/20 overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2 overflow-hidden rounded-2xl">
          {/* Sign Up Form Section */}
          <div className="relative border-r border-white/20 dark:border-slate-700/30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 dark:to-black/20" />
            <div className="absolute -right-2 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent to-black/10 dark:to-black/30 blur-md" />

            <Form {...form}>
              <form
                className="relative z-10 p-6 md:p-8"
                onSubmit={form.handleSubmit(onSignUp)}
              >
                <div className="flex flex-col gap-6">
                  <Logo />
                  <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                      Create your account
                    </h1>
                    <p className="text-muted-foreground text-balance text-sm">
                      Get started with your new account today.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="John Doe"
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
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

                    {/* Password */}
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
                                type={showPassword ? "text" : "password"}
                                placeholder="*******"
                                className="flex-1 px-5 py-6 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/30 transition-all pr-12"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 dark:text-slate-500 hover:text-slate-300 hover:bg-slate-700/30 backdrop-blur-sm transition-all duration-200"
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

                    {/* Confirm Password */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="*******"
                                className="flex-1 px-5 py-6 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/30 transition-all pr-12"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 dark:text-slate-500 hover:text-slate-300 hover:bg-slate-700/30 backdrop-blur-sm transition-all duration-200"
                              >
                                {showConfirmPassword ? (
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

                  {!!error && (
                    <Alert className="bg-red-50/80 dark:bg-red-950/30 border-red-200/60 dark:border-red-800/60 backdrop-blur-sm">
                      <OctagonAlertIcon className="h-4 w-4 !text-red-600 dark:!text-red-400" />
                      <AlertTitle className="text-red-800 dark:text-red-300">
                        {error}
                      </AlertTitle>
                    </Alert>
                  )}

                  {/* Sign Up Button */}
                  <Button
                    disabled={pending}
                    type="submit"
                    className={cn(
                      "relative h-12 rounded-xl font-semibold text-sm uppercase tracking-wide text-white w-full overflow-hidden group",
                      "bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-60% to-[#1D1F1F]/50 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed",
                    )}
                  >
                    <span className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[5]" />
                    <span className="absolute left-[40%] top-0 z-[6] h-[2px] w-[60%] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-60 group-hover:left-4 transition-all duration-500" />
                    <span className="absolute bottom-0 left-4 z-[6] h-[2px] w-[35%] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-60 group-hover:left-[60%] transition-all duration-500" />

                    {pending ? (
                      <div className="flex items-center justify-center gap-2 relative z-10">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400/30 dark:border-white/30 border-t-slate-600 dark:border-t-white" />
                        <span>Creating...</span>
                      </div>
                    ) : (
                      <span className="relative z-10">Sign Up</span>
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="relative text-center text-[12px]">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200/60 dark:border-slate-700/60" />
                    </div>
                    <span className="bg-[#1D1F1F]/80 text-slate-400 relative px-4 backdrop-blur-sm rounded-full">
                      Or continue with
                    </span>
                  </div>

                  {/* Social Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      disabled={pending}
                      type="button"
                      className="h-11 bg-[#232628] backdrop-blur-sm hover:bg-gray-500/30 hover:shadow-lg transition-all duration-200 cursor-pointer text-white flex items-center justify-center gap-2"
                      onClick={() => onSocialSignIn("google")}
                    >
                      <FaGoogle /> Google
                    </Button>
                    <Button
                      disabled={pending}
                      type="button"
                      className="h-11 bg-[#232628] backdrop-blur-sm hover:bg-gray-500/30 hover:shadow-lg transition-all duration-200 cursor-pointer text-white flex items-center justify-center gap-2"
                      onClick={() => onSocialSignIn("github")}
                    >
                      <FaGithub className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>

                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/sign-in"
                      className="underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>

          {/* Auth Side View */}
          <AuthView />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpView;

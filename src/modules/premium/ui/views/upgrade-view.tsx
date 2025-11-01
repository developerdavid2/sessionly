"use client";

import React, { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";

export const UpgradeView = () => {
  const [monthly, setMonthly] = useState(true);
  const trpc = useTRPC();

  const { data: products } = useSuspenseQuery(
    trpc.premium.getProducts.queryOptions(),
  );

  const { data: currentSubscription } = useSuspenseQuery(
    trpc.premium.getCurrentSubscription.queryOptions(),
  );

  // Safe products array
  const productsList = products ?? [];

  // helper to safely read price amount (handles unions / legacy fields)
  const getPriceAmount = (product: any): number =>
    (product?.prices?.[0]?.priceAmount ??
      product?.prices?.[0]?.amount ??
      0) as number;

  // Filter products by billing interval (safe)
  const filteredProducts = productsList.filter(
    (product) =>
      product.prices?.[0]?.recurringInterval === (monthly ? "month" : "year"),
  );

  // Sort products by price to maintain consistent order
  const sortedProducts = [...filteredProducts].sort(
    (a, b) => getPriceAmount(a) - getPriceAmount(b),
  );

  return (
    <section className="flex-1 py-16 sm:py-20 md:py-24 px-3 sm:px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 -rotate-45 w-16 h-[120%] bg-gradient-to-b from-cyan-100 via-blue-300 to-transparent blur-[100px] sm:blur-[120px] opacity-35"></div>
      </div>

      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] opacity-40 pointer-events-none">
        <Image
          src="/logo-large-dark.webp"
          fill
          alt="Logo"
          className="w-full h-full object-contain"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 30%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 30%, black 100%)",
          }}
        />
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h5 className="text-2xl md:text-3xl font-medium mb-3">
            You are on the{" "}
            <span className="font-semibold text-cyan-400">
              {currentSubscription
                ? `${currentSubscription.name} (${
                    currentSubscription.recurringInterval === "month"
                      ? "Monthly"
                      : currentSubscription.recurringInterval === "year"
                        ? "Yearly"
                        : currentSubscription.recurringInterval
                  })`
                : "Free"}
            </span>{" "}
            plan
          </h5>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent tracking-tighter">
            Choose your plan
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Upgrade or change your subscription to unlock more features
          </p>
        </div>

        <div className="relative z-20 mx-auto flex w-[300px] sm:w-[375px] rounded-3xl border-2 border-white/10 bg-neutral-800/50 backdrop-blur-md p-2 mb-12 md:mb-20 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_4px_16px_rgba(0,0,0,0.2)]">
          <div
            className={cn(
              "absolute left-2 top-2 h-[calc(100%-16px)] w-[calc(50%-8px)] rounded-2xl transition-transform duration-500 ease-out",
              "bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-60% to-[#1D1F1F]/50",
              "shadow-[0_8px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.3)]",
              "before:absolute before:-top-12 before:left-8 before:right-8 before:h-24 before:bg-gray-500/30 before:blur-2xl before:content-['']",
              !monthly && "translate-x-full",
            )}
          />

          <button
            className={cn(
              "relative z-10 h-12 sm:h-14 flex-1 text-xs sm:text-sm font-bold uppercase transition-colors duration-500 rounded-xl",
              monthly ? "text-white" : "text-gray-400 hover:text-gray-300",
            )}
            onClick={() => setMonthly(true)}
          >
            Monthly
          </button>
          <button
            className={cn(
              "relative z-10 h-12 sm:h-14 flex-1 text-xs sm:text-sm font-bold uppercase transition-colors duration-500 rounded-xl",
              !monthly ? "text-white" : "text-gray-400 hover:text-gray-300",
            )}
            onClick={() => setMonthly(false)}
          >
            Annual
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-5xl lg:max-w-6xl mx-auto">
          {sortedProducts.map((product, index) => {
            const isHighlighted = product.metadata.variant === "highlighted";
            const isCurrentProduct = currentSubscription?.id === product.id;
            const isPremium = !!currentSubscription;

            let buttonText = "Upgrade";
            let onClick = () => authClient.checkout({ products: [product.id] });

            if (isCurrentProduct) {
              buttonText = "Current Plan";
              onClick = () => authClient.customer.portal();
            } else if (isPremium) {
              buttonText = "Change Plan";
              onClick = () => authClient.customer.portal();
            }

            const price = getPriceAmount(product) / 100;
            const features = product.benefits.map(
              (benefit: any) => benefit.description,
            );

            return (
              <div
                key={product.id}
                className={cn(
                  "relative p-6 sm:p-8 transition-all duration-500",
                  isHighlighted
                    ? "bg-[#1D1F1F] border-2 border-gray-500/40 rounded-3xl"
                    : "bg-gradient-to-tr from-[#171717] to-zinc-850 border-2 border-gray-700/50 rounded-3xl",
                  index === 0 && "lg:rounded-tl-3xl lg:rounded-bl-3xl z-[9]",
                  index === sortedProducts.length - 1 &&
                    "lg:rounded-tr-3xl lg:rounded-br-3xl z-[9]",
                  isHighlighted && "z-10",
                )}
              >
                {isHighlighted && (
                  <div className="absolute h-72 left-0 right-0 top-0 -z-10 bg-gradient-to-b from-slate-500/20 via-slate-600/10 to-transparent rounded-t-3xl" />
                )}

                {product.metadata.logo && (
                  <div
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 flex items-center justify-center",
                      isHighlighted
                        ? "-top-12 sm:-top-16 w-24 h-24 sm:w-32 sm:h-32"
                        : "-top-10 sm:-top-12 w-20 h-20 sm:w-24 sm:h-24",
                    )}
                  >
                    <div
                      className={cn(
                        "relative w-full h-full rounded-full flex items-center justify-center",
                        isHighlighted
                          ? "bg-gradient-to-tr from-gray-800 to-zinc-800 shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
                          : "bg-gradient-to-br from-gray-700 to-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
                        "border-3 border-gray-500",
                      )}
                    >
                      <Image
                        src={product.metadata.logo as string}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-2xl grayscale-75"
                      />
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    "relative flex flex-col items-center",
                    product.metadata.logo
                      ? isHighlighted
                        ? "pt-16 sm:pt-20"
                        : "pt-12 sm:pt-16"
                      : "pt-4",
                  )}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={cn(
                        "relative z-20 border-2 px-4 sm:px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                        isHighlighted
                          ? "border-cyan-400/50 text-cyan-400 bg-cyan-500/10"
                          : "border-gray-600 text-gray-300 bg-gray-800/50",
                      )}
                    >
                      {product.name}
                    </div>
                    {product.metadata.badge && (
                      <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 font-medium">
                        {product.metadata.badge}
                      </span>
                    )}
                  </div>

                  <div className="relative z-20 flex items-center justify-center mb-2">
                    <div
                      className={cn(
                        "flex items-start text-5xl sm:text-6xl font-bold",
                        isHighlighted ? "text-cyan-400" : "text-white",
                      )}
                    >
                      <span className="text-2xl sm:text-3xl mt-2">$</span>
                      <CountUp
                        start={price}
                        end={price}
                        duration={0.4}
                        useEasing={false}
                        preserveValue
                      />
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 ml-2 mt-6 sm:mt-8 uppercase font-medium">
                      / {product.prices?.[0]?.recurringInterval}
                    </div>
                  </div>

                  {product.description && (
                    <div
                      className={cn(
                        "relative z-20 w-full text-center text-sm text-gray-400 pb-6 sm:pb-8 mb-6 sm:mb-8",
                        isHighlighted
                          ? "border-b border-cyan-800/50"
                          : "border-b border-gray-700/50",
                      )}
                    >
                      {product.description}
                    </div>
                  )}

                  <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 w-full">
                    {features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                            isHighlighted ? "bg-cyan-500/20" : "bg-gray-700/50",
                          )}
                        >
                          <Check
                            className={cn(
                              "w-3 h-3",
                              isHighlighted ? "text-cyan-400" : "text-gray-400",
                            )}
                          />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="w-full mx-auto flex items-center justify-center">
                    <Button
                      className={cn(
                        "relative h-11 sm:h-12 rounded-xl font-semibold text-xs sm:text-sm uppercase tracking-wide text-white w-full sm:w-[70%] overflow-hidden group",
                        isHighlighted
                          ? "bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800/50 shadow-xl"
                          : "bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-60% to-[#1D1F1F]/50 shadow-2xl",
                      )}
                      onClick={onClick}
                      disabled={isCurrentProduct}
                    >
                      {!isHighlighted && (
                        <span className="absolute inset-0 bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-20% to-[#1D1F1F]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      )}

                      <span className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[5]"></span>

                      <span className="absolute left-[40%] top-0 z-[6] h-[2px] w-[60%] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-60 group-hover:left-4 transition-all duration-500 pointer-events-none"></span>

                      <span className="absolute bottom-0 left-4 z-[6] h-[2px] w-[35%] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-60 group-hover:left-[60%] transition-all duration-500 pointer-events-none"></span>

                      <span className="relative z-10 flex items-center justify-center">
                        {buttonText}
                      </span>
                    </Button>
                  </div>

                  {isCurrentProduct && (
                    <p className="mt-4 sm:mt-6 text-center text-xs text-green-400 font-medium">
                      <span className="mx-2">✓</span>
                      Active subscription
                      <span className="mx-2">✓</span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const UpgradeViewLoading = () => {
  return (
    <LoadingState
      title="Loading"
      description="Please wait while we load the plans."
    />
  );
};

export const UpgradeViewError = () => {
  return (
    <ErrorState
      title="Error loading plans"
      description="Something went wrong"
    />
  );
};

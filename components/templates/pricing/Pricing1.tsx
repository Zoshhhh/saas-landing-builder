"use client";

import React, { useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type ComponentColors = {
  backgroundColor?: string;
  textColor?: string;
  cardBackgroundColor?: string;
  cardBorderColor?: string;
  highlightedCardBorderColor?: string;
  priceTextColor?: string;
  featureTextColor?: string;
  featureIconColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  highlightedButtonBackgroundColor?: string;
  highlightedButtonTextColor?: string;
};

type Pricing1Props = {
  content?: string;
  colors?: ComponentColors;
};

export default function Pricing1({ content, colors }: Pricing1Props) {
  useEffect(() => {
    console.log("Pricing1 content:", content);
  }, [content, colors]);

  let title = "Choose Your Plan";
  let plans = [
    {
      name: "Basic",
      price: "9",
      features: ["1 user", "10 projects", "5GB storage", "Basic support"],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "29",
      features: ["5 users", "50 projects", "100GB storage", "Priority support", "Advanced analytics"],
      cta: "Try Pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "99",
      features: ["Unlimited users", "Unlimited projects", "1TB storage", "24/7 support", "Custom integrations"],
      cta: "Contact Sales",
    },
  ];

  return (
      <section
          className="py-16"
          style={{
            backgroundColor: colors?.backgroundColor || "#F9FAFB",
          }}
      >
        <div className="container mx-auto px-4">
          <h2
              className="text-3xl font-bold text-center mb-12"
              style={{ color: colors?.textColor || "#111827" }}
          >
            {title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
                <div
                    key={index}
                    className={`rounded-lg shadow-lg overflow-hidden border ${
                        plan.highlighted ? "ring-2" : ""
                    }`}
                    style={{
                      backgroundColor: colors?.cardBackgroundColor || "white",
                      borderColor: plan.highlighted
                          ? colors?.highlightedCardBorderColor || "#4F46E5"
                          : colors?.cardBorderColor || "#E5E7EB",
                    }}
                >
                  <div className="p-6">
                    <h3
                        className="text-2xl font-semibold mb-2"
                        style={{ color: colors?.textColor || "#111827" }}
                    >
                      {plan.name}
                    </h3>
                    <p
                        className="text-4xl font-bold mb-4"
                        style={{ color: colors?.priceTextColor || "#111827" }}
                    >
                      ${plan.price}
                      <span className="text-gray-500 text-base font-normal">/month</span>
                    </p>
                    <ul className="mb-6 space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check
                                className="h-5 w-5 mr-2"
                                style={{ color: colors?.featureIconColor || "#10B981" }}
                            />
                            <span style={{ color: colors?.featureTextColor || "#4B5563" }}>{feature}</span>
                          </li>
                      ))}
                    </ul>
                    <Button
                        className="w-full"
                        style={{
                          backgroundColor: plan.highlighted
                              ? colors?.highlightedButtonBackgroundColor || "#4F46E5"
                              : colors?.buttonBackgroundColor || "transparent",
                          color: plan.highlighted
                              ? colors?.highlightedButtonTextColor || "white"
                              : colors?.buttonTextColor || "#4F46E5",
                          borderColor: colors?.buttonTextColor || "#4F46E5",
                        }}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}
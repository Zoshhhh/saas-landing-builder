"use client";

import React, { useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type ComponentColors = {
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  cardBackgroundColor?: string;
  cardBorderColor?: string;
  highlightedCardBorderColor?: string;
  highlightedShadowColor?: string;
  priceTextColor?: string;
  featureTextColor?: string;
  featureIconColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  highlightedButtonBackgroundColor?: string;
  highlightedButtonTextColor?: string;
};

type Pricing3Props = {
  content?: string;
  colors?: ComponentColors;
};

export default function Pricing3({ content, colors }: Pricing3Props) {
  useEffect(() => {
    console.log("Pricing3 content:", content);
  }, [content, colors]);

  let title = "Pricing Plans";
  let subtitle = "Choose the perfect plan for your needs";
  let plans = [
    {
      name: "Starter",
      price: "15",
      description: "Perfect for individuals and small teams",
      features: ["Up to 5 users", "10GB storage", "Basic reporting", "24/7 email support"],
      cta: "Start for free",
    },
    {
      name: "Growth",
      price: "49",
      description: "Ideal for growing businesses",
      features: [
        "Up to 20 users",
        "100GB storage",
        "Advanced reporting",
        "Priority support",
        "Team collaboration tools",
      ],
      cta: "Get started",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale organizations",
      features: [
        "Unlimited users",
        "Unlimited storage",
        "Custom reporting",
        "Dedicated account manager",
        "Advanced security features",
      ],
      cta: "Contact sales",
    },
  ];

  return (
      <section
          className="py-16"
          style={{
            backgroundColor: colors?.backgroundColor || "#EEF2FF",
          }}
      >
        <div className="container mx-auto px-4">
          <h2
              className="text-3xl font-bold text-center mb-4"
              style={{ color: colors?.titleColor || "#1E3A8A" }}
          >
            {title}
          </h2>
          <p
              className="text-xl text-center mb-12"
              style={{ color: colors?.subtitleColor || "#4B5563" }}
          >
            {subtitle}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
                <div
                    key={index}
                    className={`rounded-2xl overflow-hidden transition-transform ${
                        plan.highlighted ? "transform md:-translate-y-4" : ""
                    }`}
                    style={{
                      backgroundColor: colors?.cardBackgroundColor || "white",
                      border: plan.highlighted
                          ? `2px solid ${colors?.highlightedCardBorderColor || "#4F46E5"}`
                          : `1px solid ${colors?.cardBorderColor || "#E5E7EB"}`,
                      boxShadow: plan.highlighted
                          ? `0px 10px 20px ${colors?.highlightedShadowColor || "rgba(79, 70, 229, 0.3)"}`
                          : "none",
                    }}
                >
                  <div className="p-8">
                    <h3
                        className="text-2xl font-semibold mb-2"
                        style={{ color: colors?.titleColor || "#1E3A8A" }}
                    >
                      {plan.name}
                    </h3>
                    <p
                        className="mb-4"
                        style={{ color: colors?.subtitleColor || "#4B5563" }}
                    >
                      {plan.description}
                    </p>
                    <p
                        className="text-4xl font-bold mb-6"
                        style={{ color: colors?.priceTextColor || "#1E3A8A" }}
                    >
                      {plan.price === "Custom" ? (
                          "Custom"
                      ) : (
                          <>
                            ${plan.price}
                            <span className="text-base font-normal">/month</span>
                          </>
                      )}
                    </p>
                    <ul className="mb-8 space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check
                                className="h-5 w-5 mr-3"
                                style={{ color: colors?.featureIconColor || "#4F46E5" }}
                            />
                            <span style={{ color: colors?.featureTextColor || "#4B5563" }}>
                        {feature}
                      </span>
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
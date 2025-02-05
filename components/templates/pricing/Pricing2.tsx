"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Feature {
  name: string;
  desc: string;
  icon: React.ReactNode;
}

interface Plan {
  name: string;
  desc: string;
  price: number;
  isMostPop: boolean;
  features: string[];
}

type ComponentColors = {
  backgroundColor?: string;
  textColor?: string;
  subtitleColor?: string;
  descriptionColor?: string;
  featureIconBackgroundColor?: string;
  featureIconColor?: string;
  featureTextColor?: string;
  planBackgroundColor?: string;
  planTextColor?: string;
  planBorderColor?: string;
  priceTextColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  featureCheckIconColor?: string;
};

type Pricing2Props = {
  content?: string;
  colors?: ComponentColors;
};

const Pricing2: React.FC<Pricing2Props> = ({ content, colors }) => {
  useEffect(() => {
    console.log("Pricing2 content:", content);
  }, [content, colors]);

  let title = "Pay as you grow";
  let subtitle = "Pricing";
  let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur consequat nunc.";

  let plan: Plan = {
    name: "Basic plan",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 32,
    isMostPop: true,
    features: [
      "Curabitur faucibus",
      "Nulla facilisi",
      "Donec euismod",
      "Vestibulum feugiat",
      "Morbi malesuada",
      "Nunc ultricies",
      "Phasellus viverra",
    ],
  };

  let features: Feature[] = [
    {
      name: "Scalable",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: "📈",
    },
    {
      name: "Flexible",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: "🔄",
    },
    {
      name: "Smooth",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: "🌊",
    },
    {
      name: "Secure",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      icon: "🔒",
    },
  ];

  return (
      <section
          className="relative py-14"
          style={{
            backgroundColor: colors?.backgroundColor || "#F9FAFB",
          }}
      >
        <div className="max-w-screen-xl mx-auto md:px-8">
          <div className="relative max-w-xl space-y-3 px-4 md:px-0">
            <h3
                className="font-semibold"
                style={{ color: colors?.subtitleColor || "#2563EB" }}
            >
              {subtitle}
            </h3>
            <p
                className="text-3xl font-semibold sm:text-4xl"
                style={{ color: colors?.textColor || "#111827" }}
            >
              {title}
            </p>
            <div className="max-w-xl">
              <p style={{ color: colors?.descriptionColor || "#4B5563" }}>{description}</p>
            </div>
          </div>

          <div className="mt-16 justify-between gap-8 md:flex">
            {/* Liste des fonctionnalités */}
            <ul className="flex-1 max-w-md space-y-10 px-4 md:px-0">
              {features.map((item, idx) => (
                  <li key={idx} className="flex gap-x-3">
                    <div
                        className="flex-none w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: colors?.featureIconBackgroundColor || "#E0F2FE",
                          color: colors?.featureIconColor || "#2563EB",
                        }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4
                          className="text-lg font-medium"
                          style={{ color: colors?.featureTextColor || "#111827" }}
                      >
                        {item.name}
                      </h4>
                      <p className="mt-2 md:text-sm" style={{ color: colors?.descriptionColor || "#4B5563" }}>
                        {item.desc}
                      </p>
                    </div>
                  </li>
              ))}
            </ul>

            {/* Plan principal */}
            <div
                className="flex-1 flex flex-col border-y mt-6 md:max-w-xl md:rounded-xl md:border md:border-x-none md:shadow-lg md:mt-0"
                style={{
                  backgroundColor: colors?.planBackgroundColor || "white",
                  borderColor: colors?.planBorderColor || "#E5E7EB",
                }}
            >
              <div className="p-4 py-8 border-b md:p-8">
                <div className="justify-between flex">
                  <div className="max-w-xs">
                  <span
                      className="text-2xl font-semibold sm:text-3xl"
                      style={{ color: colors?.planTextColor || "#111827" }}
                  >
                    {plan.name}
                  </span>
                    <p className="mt-3 sm:text-sm" style={{ color: colors?.descriptionColor || "#4B5563" }}>
                      {plan.desc}
                    </p>
                  </div>
                  <div
                      className="flex-none text-2xl font-semibold sm:text-3xl"
                      style={{ color: colors?.priceTextColor || "#111827" }}
                  >
                    ${plan.price} <span className="text-xl font-normal">/mo</span>
                  </div>
                </div>
                <Button
                    className="mt-4 w-full"
                    style={{
                      backgroundColor: colors?.buttonBackgroundColor || "#3B82F6",
                      color: colors?.buttonTextColor || "white",
                    }}
                >
                  Get Started
                </Button>
              </div>

              <ul className="p-4 space-y-3 sm:grid sm:grid-cols-2 md:block md:p-8 lg:grid">
                <div className="pb-2 col-span-2 font-medium">
                  <p style={{ color: colors?.textColor || "#111827" }}>Features</p>
                </div>
                {plan.features.map((featureItem, idx) => (
                    <li key={idx} className="flex items-center gap-5">
                  <span
                      className="h-5 w-5"
                      style={{ color: colors?.featureCheckIconColor || "#2563EB" }}
                  >
                    ✔️
                  </span>
                      <span style={{ color: colors?.featureTextColor || "#4B5563" }}>{featureItem}</span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Pricing2;
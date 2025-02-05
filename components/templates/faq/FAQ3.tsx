"use client";

import React, { useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type ComponentColors = {
  backgroundColor?: string;
  titleColor?: string;
  accordionBackgroundColor?: string;
  accordionBorderColor?: string;
  questionTextColor?: string;
  questionHoverBackgroundColor?: string;
  answerTextColor?: string;
};

type FAQ3Props = {
  content?: string;
  colors?: ComponentColors;
};

export default function FAQ3({ content, colors }: FAQ3Props) {
  useEffect(() => {
    console.log("FAQ3 content:", content);
  }, [content, colors]);

  let title = "Frequently Asked Questions";
  let faqs = [
    {
      question: "How do I get started?",
      answer:
          "Getting started is easy! Simply sign up for an account on our website, and you'll be guided through the setup process step by step.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
          "We accept all major credit cards (Visa, MasterCard, American Express, Discover) as well as PayPal and bank transfers for certain plans.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
          "Yes, we have mobile apps available for both iOS and Android devices. You can download them from the App Store or Google Play Store.",
    },
    {
      question: "How secure is my data?",
      answer:
          "We take data security very seriously. All data is encrypted in transit and at rest, and we use industry-standard security measures to protect your information.",
    },
    {
      question: "Can I integrate with other tools?",
      answer:
          "We offer integrations with a wide range of popular tools and services. Check our integrations page for a full list of available connections.",
    },
    {
      question: "What kind of customer support do you offer?",
      answer:
          "We provide 24/7 customer support via email and chat. Our Enterprise customers also have access to dedicated phone support and a personal account manager.",
    },
  ];

  return (
      <section
          className="py-12"
          style={{
            backgroundColor: colors?.backgroundColor || "#F9FAFB",
          }}
      >
        <div className="container mx-auto px-4">
          <h2
              className="text-3xl font-bold text-center mb-8"
              style={{
                color: colors?.titleColor || "#1E3A8A",
              }}
          >
            {title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
                <Accordion key={index} type="single" collapsible className="rounded-lg shadow transition-all duration-300">
                  <AccordionItem
                      value={`item-${index}`}
                      style={{
                        backgroundColor: colors?.accordionBackgroundColor || "white",
                        borderColor: colors?.accordionBorderColor || "#E5E7EB",
                      }}
                      className="border rounded-lg"
                  >
                    <AccordionTrigger
                        className="px-4 py-3 transition-colors duration-200"
                        style={{
                          color: colors?.questionTextColor || "#1E3A8A",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = colors?.questionHoverBackgroundColor || "#F3F4F6")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors?.accordionBackgroundColor || "white")}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent
                        className="px-4 pb-3 pt-1 transition-opacity duration-200"
                        style={{
                          color: colors?.answerTextColor || "#4B5563",
                        }}
                    >
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            ))}
          </div>
        </div>
      </section>
  );
}
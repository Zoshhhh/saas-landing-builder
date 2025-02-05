"use client";

import React, { useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type ComponentColors = {
  backgroundColor?: string;
  titleColor?: string;
  accordionBackgroundColor?: string;
  accordionBorderColor?: string;
  questionTextColor?: string;
  answerTextColor?: string;
  hoverColor?: string;
};

type FAQ1Props = {
  content?: string;
  colors?: ComponentColors;
};

export default function FAQ1({ content, colors }: FAQ1Props) {
  useEffect(() => {
    console.log("FAQ1 content:", content);
  }, [content, colors]);

  let title = "Frequently Asked Questions";
  let faqs = [
    {
      question: "How do I get started?",
      answer:
          "To get started, simply sign up for an account on our website. Once you've verified your email, you can immediately begin creating your first project.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
          "We accept all major credit cards (Visa, MasterCard, American Express) as well as PayPal. For enterprise customers, we also offer invoicing options.",
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial on all our plans. No credit card is required to start your trial.",
    },
    {
      question: "How secure is my data?",
      answer:
          "We take data security very seriously. All data is encrypted in transit and at rest. We use industry-standard security measures and regularly undergo security audits.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer:
          "Yes, you can cancel your subscription at any time. If you cancel, you'll retain access to the service until the end of your current billing period.",
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
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                  <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="rounded-lg shadow-sm border transition-all duration-300"
                      style={{
                        backgroundColor: colors?.accordionBackgroundColor || "white",
                        borderColor: colors?.accordionBorderColor || "#E5E7EB",
                      }}
                  >
                    <AccordionTrigger
                        className="px-6 py-4 text-left transition-colors duration-200"
                        style={{
                          color: colors?.questionTextColor || "#1E3A8A",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = colors?.hoverColor || "#F3F4F6")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors?.accordionBackgroundColor || "white")}
                    >
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent
                        className="px-6 pb-4 pt-2"
                        style={{
                          color: colors?.answerTextColor || "#4B5563",
                        }}
                    >
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
  );
}
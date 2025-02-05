"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type ComponentColors = {
  backgroundColor?: string;
  titleColor?: string;
  categoryTextColor?: string;
  categoryActiveTextColor?: string;
  categoryActiveBackgroundColor?: string;
  categoryHoverBackgroundColor?: string;
  questionTextColor?: string;
  questionActiveBackgroundColor?: string;
  questionHoverBackgroundColor?: string;
  answerTextColor?: string;
  borderColor?: string;
};

type FAQ2Props = {
  content?: string;
  colors?: ComponentColors;
};

export default function FAQ2({ content, colors }: FAQ2Props) {
  useEffect(() => {
    console.log("FAQ2 content:", content);
  }, [content, colors]);

  let title = "Frequently Asked Questions";
  let faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account?",
          answer:
              "To create an account, click on the 'Sign Up' button in the top right corner of our homepage. Fill in your details and follow the prompts to complete the registration process.",
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes, we offer a 14-day free trial on all our plans. No credit card is required to start your trial.",
        },
      ],
    },
    {
      category: "Pricing & Billing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
              "We accept all major credit cards (Visa, MasterCard, American Express) as well as PayPal. For enterprise customers, we also offer invoicing options.",
        },
        {
          question: "Can I cancel my subscription at any time?",
          answer:
              "Yes, you can cancel your subscription at any time. If you cancel, you'll retain access to the service until the end of your current billing period.",
        },
      ],
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          question: "How secure is my data?",
          answer:
              "We take data security very seriously. All data is encrypted in transit and at rest. We use industry-standard security measures and regularly undergo security audits.",
        },
        {
          question: "Do you comply with GDPR?",
          answer:
              "Yes, we are fully compliant with GDPR. We have implemented all necessary measures to ensure the protection of user data in accordance with GDPR requirements.",
        },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState(faqs[0].category);
  const [activeQuestion, setActiveQuestion] = useState("");

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
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Navigation des catégories */}
              <div className="md:w-1/3">
                <nav className="space-y-1">
                  {faqs.map((category) => (
                      <button
                          key={category.category}
                          className={cn(
                              "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                              activeCategory === category.category
                                  ? "font-semibold"
                                  : "text-gray-600",
                          )}
                          style={{
                            backgroundColor:
                                activeCategory === category.category
                                    ? colors?.categoryActiveBackgroundColor || "#E0E7FF"
                                    : "transparent",
                            color:
                                activeCategory === category.category
                                    ? colors?.categoryActiveTextColor || "#1E40AF"
                                    : colors?.categoryTextColor || "#374151",
                          }}
                          onClick={() => setActiveCategory(category.category)}
                      >
                        {category.category}
                      </button>
                  ))}
                </nav>
              </div>

              {/* Contenu des questions */}
              <div className="md:w-2/3">
                {faqs.map(
                    (category) =>
                        category.category === activeCategory && (
                            <div key={category.category} className="space-y-4">
                              {category.questions.map((faq) => (
                                  <div
                                      key={faq.question}
                                      className="rounded-lg shadow-sm border transition-all duration-300"
                                      style={{
                                        backgroundColor: colors?.questionActiveBackgroundColor || "white",
                                        borderColor: colors?.borderColor || "#E5E7EB",
                                      }}
                                  >
                                    <button
                                        className="w-full text-left px-6 py-4 focus:outline-none transition-colors"
                                        style={{
                                          color: colors?.questionTextColor || "#1E3A8A",
                                        }}
                                        onClick={() =>
                                            setActiveQuestion(
                                                activeQuestion === faq.question ? "" : faq.question
                                            )
                                        }
                                    >
                                      <span className="font-medium">{faq.question}</span>
                                    </button>
                                    {activeQuestion === faq.question && (
                                        <div
                                            className="px-6 pb-4 pt-2 transition-opacity duration-200"
                                            style={{
                                              color: colors?.answerTextColor || "#4B5563",
                                            }}
                                        >
                                          {faq.answer}
                                        </div>
                                    )}
                                  </div>
                              ))}
                            </div>
                        )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
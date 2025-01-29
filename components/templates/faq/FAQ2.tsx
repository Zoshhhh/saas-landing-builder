"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type FAQ2Props = {
  content?: string
}

export default function FAQ2({ content }: FAQ2Props) {
  useEffect(() => {
    console.log("FAQ2 content:", content)
  }, [content])

  let title = "Frequently Asked Questions"
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
  ]

  if (content) {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, "text/html")

      const titleElement = doc.querySelector("h2")
      if (titleElement) title = titleElement.textContent || title

      const categoryElements = doc.querySelectorAll("h3")
      if (categoryElements.length > 0) {
        faqs = Array.from(categoryElements).map((categoryElement) => {
          const category = categoryElement.textContent || ""
          const questionElements = categoryElement.nextElementSibling?.querySelectorAll("dt, dd")
          const questions = []
          if (questionElements) {
            for (let i = 0; i < questionElements.length; i += 2) {
              const question = questionElements[i].textContent || ""
              const answer = questionElements[i + 1].textContent || ""
              questions.push({ question, answer })
            }
          }
          return { category, questions }
        })
      }
    } catch (error) {
      console.error("Error parsing content:", error)
    }
  }

  const [activeCategory, setActiveCategory] = useState(faqs[0].category)
  const [activeQuestion, setActiveQuestion] = useState(faqs[0].questions[0].question)

  return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <nav className="space-y-1">
                  {faqs.map((category) => (
                      <button
                          key={category.category}
                          className={cn(
                              "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                              activeCategory === category.category
                                  ? "bg-blue-100 text-blue-900"
                                  : "text-gray-600 hover:bg-gray-100",
                          )}
                          onClick={() => setActiveCategory(category.category)}
                      >
                        {category.category}
                      </button>
                  ))}
                </nav>
              </div>
              <div className="md:w-2/3">
                {faqs.map(
                    (category) =>
                        category.category === activeCategory && (
                            <div key={category.category} className="space-y-4">
                              {category.questions.map((faq) => (
                                  <div key={faq.question} className="bg-white rounded-lg shadow-sm border border-gray-200">
                                    <button
                                        className={cn(
                                            "w-full text-left px-6 py-4 focus:outline-none transition-colors",
                                            activeQuestion === faq.question ? "bg-blue-50" : "hover:bg-gray-50",
                                        )}
                                        onClick={() => setActiveQuestion(faq.question)}
                                    >
                                      <span className="font-medium text-gray-900">{faq.question}</span>
                                    </button>
                                    {activeQuestion === faq.question && (
                                        <div className="px-6 pb-4 pt-2 text-gray-600">{faq.answer}</div>
                                    )}
                                  </div>
                              ))}
                            </div>
                        ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}


"use client"

import React, { useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FAQ1Props = {
  content?: string
}

export default function FAQ1({ content }: FAQ1Props) {
  useEffect(() => {
    console.log("FAQ1 content:", content)
  }, [content])

  let title = "Frequently Asked Questions"
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
  ]

  if (content) {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, "text/html")

      const titleElement = doc.querySelector("h2")
      if (titleElement) title = titleElement.textContent || title

      const faqElements = doc.querySelectorAll("dt, dd")
      if (faqElements.length > 0) {
        faqs = []
        for (let i = 0; i < faqElements.length; i += 2) {
          const question = faqElements[i].textContent || ""
          const answer = faqElements[i + 1].textContent || ""
          faqs.push({ question, answer })
        }
      }
    } catch (error) {
      console.error("Error parsing content:", error)
    }
  }

  return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                  <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-gray-900">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
  )
}


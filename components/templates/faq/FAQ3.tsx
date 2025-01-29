"use client"

import React, { useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FAQ3Props = {
  content?: string
}

export default function FAQ3({ content }: FAQ3Props) {
  useEffect(() => {
    console.log("FAQ3 content:", content)
  }, [content])

  let title = "Frequently Asked Questions"
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
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
                <Accordion key={index} type="single" collapsible className="bg-white rounded-lg shadow">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">{faq.question}</AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-1">{faq.answer}</AccordionContent>
                  </AccordionItem>
                </Accordion>
            ))}
          </div>
        </div>
      </section>
  )
}


import React from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Pricing2() {
  const plans = [
    {
      name: "Free",
      price: "0",
      features: [
        { name: "1 user", included: true },
        { name: "5 projects", included: true },
        { name: "2GB storage", included: true },
        { name: "Basic support", included: true },
        { name: "Advanced analytics", included: false },
        { name: "Custom integrations", included: false },
      ],
      cta: "Sign Up",
    },
    {
      name: "Pro",
      price: "19",
      features: [
        { name: "5 users", included: true },
        { name: "20 projects", included: true },
        { name: "50GB storage", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Custom integrations", included: false },
      ],
      cta: "Start Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        { name: "Unlimited users", included: true },
        { name: "Unlimited projects", included: true },
        { name: "Unlimited storage", included: true },
        { name: "24/7 dedicated support", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Custom integrations", included: true },
      ],
      cta: "Contact Us",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white border rounded-xl overflow-hidden ${
                plan.highlighted ? "shadow-xl border-indigo-500" : "shadow-sm"
              }`}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-4">
                  {plan.price === "Custom" ? (
                    "Custom"
                  ) : (
                    <>
                      ${plan.price}
                      <span className="text-gray-500 text-base font-normal">/month</span>
                    </>
                  )}
                </p>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span className={feature.included ? "" : "text-gray-400"}>{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


import React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Pricing3() {
  const plans = [
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
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Pricing Plans</h2>
        <p className="text-xl text-center text-gray-600 mb-12">Choose the perfect plan for your needs</p>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl overflow-hidden ${
                plan.highlighted ? "shadow-xl border-2 border-indigo-500 transform md:-translate-y-4" : "shadow-lg"
              }`}
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <p className="text-4xl font-bold mb-6">
                  {plan.price === "Custom" ? (
                    "Custom"
                  ) : (
                    <>
                      ${plan.price}
                      <span className="text-gray-500 text-base font-normal">/month</span>
                    </>
                  )}
                </p>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-indigo-500 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.highlighted ? "default" : "outline"} size="lg">
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


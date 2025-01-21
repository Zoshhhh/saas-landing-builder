import React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Pricing1() {
  const plans = [
    {
      name: "Basic",
      price: "9",
      features: ["1 user", "10 projects", "5GB storage", "Basic support"],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "29",
      features: ["5 users", "50 projects", "100GB storage", "Priority support", "Advanced analytics"],
      cta: "Try Pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "99",
      features: ["Unlimited users", "Unlimited projects", "1TB storage", "24/7 support", "Custom integrations"],
      cta: "Contact Sales",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                plan.highlighted ? "ring-2 ring-indigo-500" : ""
              }`}
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold mb-4">
                  ${plan.price}
                  <span className="text-gray-500 text-base font-normal">/month</span>
                </p>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
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


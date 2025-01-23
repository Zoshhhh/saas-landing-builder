import { Zap, Palette, Globe } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Create and publish your landing page in minutes, not hours.",
  },
  {
    icon: Palette,
    title: "Customizable",
    description: "Tailor every aspect to match your brand's unique style.",
  },
  {
    icon: Globe,
    title: "SEO Optimized",
    description: "Built-in best practices to help your page rank higher.",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
          Why choose our Landing Page Generator?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


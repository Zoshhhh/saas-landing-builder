import { Button } from "@/components/ui/button"

export default function Hero2() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-purple-100 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="text-6xl font-bold tracking-tight text-gray-900">Build Something Amazing.</h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create stunning websites with our intuitive builder. Perfect for designers, developers, and creative
              professionals.
            </p>

            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Learn More
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{`${i}0K+`}</div>
                <div className="text-sm text-gray-600">{["Users", "Downloads", "Reviews", "Projects"][i - 1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


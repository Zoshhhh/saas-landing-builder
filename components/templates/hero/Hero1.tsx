import { Button } from "@/components/ui/button"

export default function Hero1() {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Welcome to Our Platform</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover amazing features and boost your productivity with our innovative solutions.
      </p>
      <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
        Get Started
      </Button>

      <div className="mt-12 max-w-4xl mx-auto">
        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
          <div className="w-full h-full p-8 flex flex-col justify-center items-center">
            <div className="w-3/4 h-6 bg-gray-300 rounded mb-4"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded mb-6"></div>
            <div className="flex space-x-4">
              <div className="w-20 h-8 bg-gray-300 rounded"></div>
              <div className="w-20 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


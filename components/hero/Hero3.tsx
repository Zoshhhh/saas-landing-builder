import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero3() {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-bold mb-16">The Landing Page.</h1>

      <div className="max-w-3xl mx-auto mb-8">
        <div className="w-full aspect-[2/1] bg-gray-100 rounded-lg relative overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4KsUttK1yhRJOWGU1GY4M6AlYSYy57.png"
            alt="Hero placeholder"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="max-w-md mx-auto mb-12">
        <p className="text-gray-600 text-lg mb-6">
          Go from design to site with Framer,
          <br />
          the web builder for creative pros.
        </p>

        <Button variant="default" size="lg" className="bg-black text-white hover:bg-black/90 shadow-lg">
          Get Started
        </Button>
      </div>

      <div className="flex justify-center items-center gap-12">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center"
            aria-label={`Logo ${i}`}
          >
            <span className="text-gray-400">Logo</span>
          </div>
        ))}
      </div>
    </section>
  )
}


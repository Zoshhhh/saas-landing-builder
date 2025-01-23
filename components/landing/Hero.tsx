import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    Create stunning landing pages in minutes
                </h1>
                <p className="mt-6 text-xl max-w-3xl">
                    Whether you're starting from scratch or using a template, our intuitive builder makes it easy to design
                    professional landing pages that convert.
                </p>
                <div className="mt-10">
                    <Link href="/dashboard">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}


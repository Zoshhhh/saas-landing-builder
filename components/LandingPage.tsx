import { Navigation } from "./landing/Navigation"
import { Hero } from "./landing/Hero"
import { Features } from "./landing/Features"
import { CTA } from "./landing/CTA"
import { Footer } from "./landing/Footer"
import Pricing from "@/components/landing/Pricing"; 

export function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">
                <Hero />
                <CTA />
                <Features />
                <Pricing />
            </main>
            <Footer />
        </div>
    )
}


import React from "react"
import { Button } from "@/components/ui/button"

export default function CTA() {
    return (
        <section className="py-16 bg-blue-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="mb-8 max-w-2xl mx-auto">
                    Join thousands of satisfied customers and take your business to the next level with our powerful platform.
                </p>
                <Button size="lg" variant="secondary">
                    Sign Up Now
                </Button>
            </div>
        </section>
    )
}


import React from "react"
import { Button } from "@/components/ui/button"

export default function About() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h2 className="text-3xl font-bold mb-4">About Us</h2>
                        <p className="text-gray-600 mb-6">
                            We are a passionate team dedicated to creating innovative solutions for businesses of all sizes. With
                            years of experience and a commitment to excellence, we strive to deliver the best products and services to
                            our clients.
                        </p>
                        <Button>Learn More</Button>
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <div className="aspect-video bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}


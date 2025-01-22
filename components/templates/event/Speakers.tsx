import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function Speakers() {
    const speakers = [
        {
            name: "Dr. Jane Smith",
            role: "AI Research Scientist",
            image: "/placeholder.svg?height=200&width=200",
            bio: "Leading expert in machine learning and neural networks.",
        },
        {
            name: "John Doe",
            role: "CEO, TechInnovate",
            image: "/placeholder.svg?height=200&width=200",
            bio: "Visionary entrepreneur with 20 years of experience in the tech industry.",
        },
        {
            name: "Sarah Johnson",
            role: "Data Science Director",
            image: "/placeholder.svg?height=200&width=200",
            bio: "Pioneering data-driven solutions for Fortune 500 companies.",
        },
        {
            name: "Michael Chen",
            role: "Blockchain Specialist",
            image: "/placeholder.svg?height=200&width=200",
            bio: "Expert in cryptocurrency and decentralized technologies.",
        },
    ]

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Speakers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {speakers.map((speaker, index) => (
                        <Card key={index} className="text-center">
                            <CardHeader>
                                <Image
                                    src={speaker.image || "/placeholder.svg"}
                                    alt={speaker.name}
                                    width={200}
                                    height={200}
                                    className="rounded-full mx-auto mb-4"
                                />
                                <CardTitle>{speaker.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-blue-600 mb-2">{speaker.role}</p>
                                <p className="text-gray-600 text-sm">{speaker.bio}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}


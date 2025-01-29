"use client"

import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

type SpeakersProps = {
    content?: string
}

export default function Speakers({ content }: SpeakersProps) {
    useEffect(() => {
        console.log("Speakers content:", content)
    }, [content])

    let title = "Featured Speakers"
    let speakers = [
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

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const titleElement = doc.querySelector("h2")
            if (titleElement) title = titleElement.textContent || title

            const speakerElements = doc.querySelectorAll(".speaker")
            if (speakerElements.length > 0) {
                speakers = Array.from(speakerElements).map((element) => ({
                    name: element.querySelector(".name")?.textContent || "",
                    role: element.querySelector(".role")?.textContent || "",
                    image: element.querySelector("img")?.getAttribute("src") || "/placeholder.svg?height=200&width=200",
                    bio: element.querySelector(".bio")?.textContent || "",
                }))
            }
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
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


"use client"

import type React from "react"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestimonialProps {
    content: string
    author: string
    role: string
    avatarSrc: string
}

const Testimonial: React.FC<TestimonialProps> = ({ content, author, role, avatarSrc }) => (
    <Card className="h-full">
        <CardContent className="pt-6">
            <div className="space-y-4">
                <p className="text-gray-600 italic">&ldquo;{content}&rdquo;</p>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={avatarSrc} alt={author} />
                        <AvatarFallback>
                            {author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{author}</p>
                        <p className="text-sm text-gray-500">{role}</p>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
)

type Testimonials1Props = {
    content?: string
}

export default function Testimonials1({ content }: Testimonials1Props) {
    useEffect(() => {
        console.log("Testimonials1 content:", content)
    }, [content])

    let title = "What Our Clients Say"
    let testimonials = [
        {
            content: "This product has completely transformed the way we work. It's a real game-changer!",
            author: "Sarah Johnson",
            role: "CEO, TechCorp",
            avatarSrc: "/placeholder.svg?height=40&width=40",
        },
        {
            content: "The user interface is intuitive and the learning curve is minimal. I highly recommend it.",
            author: "Michael Chen",
            role: "Designer, CreativeLab",
            avatarSrc: "/placeholder.svg?height=40&width=40",
        },
        {
            content: "The customer support is exceptional. They resolved all our issues in record time.",
            author: "Emily Rodriguez",
            role: "CTO, InnovateTech",
            avatarSrc: "/placeholder.svg?height=40&width=40",
        },
    ]

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const titleElement = doc.querySelector("h2")
            if (titleElement) title = titleElement.textContent || title

            const testimonialElements = doc.querySelectorAll(".testimonial")
            if (testimonialElements.length > 0) {
                testimonials = Array.from(testimonialElements).map((element) => ({
                    content: element.querySelector("p")?.textContent || "",
                    author: element.querySelector(".author")?.textContent || "",
                    role: element.querySelector(".role")?.textContent || "",
                    avatarSrc: element.querySelector("img")?.getAttribute("src") || "/placeholder.svg?height=40&width=40",
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
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Testimonial key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    )
}


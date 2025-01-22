"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

export default function Testimonials2() {
    const testimonials = [
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
        {
            content: "This solution has significantly improved our team's productivity and collaboration.",
            author: "David Smith",
            role: "Project Manager, GlobalTech",
            avatarSrc: "/placeholder.svg?height=40&width=40",
        },
        {
            content: "The analytics features provide invaluable insights for our business decisions.",
            author: "Lisa Wong",
            role: "Data Analyst, InsightCo",
            avatarSrc: "/placeholder.svg?height=40&width=40",
        },
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
                <div className="relative max-w-3xl mx-auto">
                    <Testimonial {...testimonials[currentIndex]} />
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4">
                        <Button variant="ghost" size="icon" onClick={prevTestimonial}>
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4">
                        <Button variant="ghost" size="icon" onClick={nextTestimonial}>
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}


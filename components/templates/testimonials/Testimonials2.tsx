"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialProps {
    content: string;
    author: string;
    role: string;
    avatarSrc: string;
    colors?: ComponentColors;
}

const Testimonial: React.FC<TestimonialProps> = ({ content, author, role, avatarSrc, colors }) => (
    <Card
        className="h-full border transition-transform duration-300"
        style={{
            backgroundColor: colors?.cardBackgroundColor || "white",
            borderColor: colors?.cardBorderColor || "#E5E7EB",
        }}
    >
        <CardContent className="pt-6">
            <div className="space-y-4">
                <p
                    className="italic"
                    style={{
                        color: colors?.textColor || "#4B5563",
                    }}
                >
                    &ldquo;{content}&rdquo;
                </p>
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
                        <p
                            className="font-semibold"
                            style={{
                                color: colors?.authorTextColor || "#1E3A8A",
                            }}
                        >
                            {author}
                        </p>
                        <p
                            className="text-sm"
                            style={{
                                color: colors?.roleTextColor || "#6B7280",
                            }}
                        >
                            {role}
                        </p>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

type ComponentColors = {
    backgroundColor?: string;
    titleColor?: string;
    cardBackgroundColor?: string;
    cardBorderColor?: string;
    textColor?: string;
    authorTextColor?: string;
    roleTextColor?: string;
    buttonColor?: string;
    buttonHoverColor?: string;
    activeDotColor?: string;
    inactiveDotColor?: string;
};

type Testimonials2Props = {
    content?: string;
    colors?: ComponentColors;
};

export default function Testimonials2({ content, colors }: Testimonials2Props) {
    useEffect(() => {
        console.log("Testimonials2 content:", content);
    }, [content, colors]);

    let title = "What Our Clients Say";
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
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section
            className="py-12"
            style={{
                backgroundColor: colors?.backgroundColor || "#F9FAFB",
            }}
        >
            <div className="container mx-auto px-4">
                <h2
                    className="text-3xl font-bold text-center mb-8"
                    style={{
                        color: colors?.titleColor || "#1E3A8A",
                    }}
                >
                    {title}
                </h2>
                <div className="relative max-w-3xl mx-auto">
                    <Testimonial {...testimonials[currentIndex]} colors={colors} />
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={prevTestimonial}
                            style={{
                                color: colors?.buttonColor || "#4F46E5",
                                backgroundColor: "transparent",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.color = colors?.buttonHoverColor || "#3B82F6")}
                            onMouseOut={(e) => (e.currentTarget.style.color = colors?.buttonColor || "#4F46E5")}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={nextTestimonial}
                            style={{
                                color: colors?.buttonColor || "#4F46E5",
                                backgroundColor: "transparent",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.color = colors?.buttonHoverColor || "#3B82F6")}
                            onMouseOut={(e) => (e.currentTarget.style.color = colors?.buttonColor || "#4F46E5")}
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors`}
                            style={{
                                backgroundColor: index === currentIndex ? colors?.activeDotColor || "#4F46E5" : colors?.inactiveDotColor || "#D1D5DB",
                            }}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
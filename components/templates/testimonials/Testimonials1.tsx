"use client";

import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialProps {
    content: string;
    author: string;
    role: string;
    avatarSrc: string;
    colors?: ComponentColors;
}

const Testimonial: React.FC<TestimonialProps> = ({ content, author, role, avatarSrc, colors }) => (
    <Card
        className="h-full border"
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
};

type Testimonials1Props = {
    content?: string;
    colors?: ComponentColors;
};

export default function Testimonials1({ content, colors }: Testimonials1Props) {
    useEffect(() => {
        console.log("Testimonials1 content:", content);
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
    ];

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
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Testimonial key={index} {...testimonial} colors={colors} />
                    ))}
                </div>
            </div>
        </section>
    );
}
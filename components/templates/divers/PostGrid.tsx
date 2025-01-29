"use client"

import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

type PostGridProps = {
    content?: string
}

export default function PostGrid({ content }: PostGridProps) {
    useEffect(() => {
        console.log("PostGrid content:", content)
    }, [content])

    let title = "Latest Posts"
    let posts = [
        {
            title: "Introduction to React Hooks",
            excerpt: "Learn how to use React Hooks to simplify your components.",
            image: "/placeholder.svg?height=150&width=250",
            date: "May 20, 2023",
            category: "React",
        },
        {
            title: "Building Responsive Layouts with CSS Grid",
            excerpt: "Master CSS Grid to create flexible and responsive web layouts.",
            image: "/placeholder.svg?height=150&width=250",
            date: "May 18, 2023",
            category: "CSS",
        },
        {
            title: "JavaScript ES6 Features You Should Know",
            excerpt: "Explore the powerful features introduced in ES6 and how to use them.",
            image: "/placeholder.svg?height=150&width=250",
            date: "May 16, 2023",
            category: "JavaScript",
        },
        {
            title: "Optimizing Website Performance",
            excerpt: "Learn techniques to improve your website's loading speed and performance.",
            image: "/placeholder.svg?height=150&width=250",
            date: "May 14, 2023",
            category: "Performance",
        },
        {
            title: "Introduction to TypeScript",
            excerpt: "Discover the benefits of using TypeScript in your projects.",
            image: "/placeholder.svg?height=150&width=250",
            date: "May 12, 2023",
            category: "TypeScript",
        },
        {
            title: "Creating Accessible Web Forms",
            excerpt: "Learn best practices for building inclusive and accessible web forms.",
            image: "/placeholder.svg?height=150&width=250",
            date: "May 10, 2023",
            category: "Accessibility",
        },
    ]

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const titleElement = doc.querySelector("h2")
            if (titleElement) title = titleElement.textContent || title

            const postElements = doc.querySelectorAll(".post")
            if (postElements.length > 0) {
                posts = Array.from(postElements).map((element) => ({
                    title: element.querySelector("h3")?.textContent || "",
                    excerpt: element.querySelector("p")?.textContent || "",
                    image: element.querySelector("img")?.getAttribute("src") || "/placeholder.svg?height=150&width=250",
                    date: element.querySelector(".date")?.textContent || "",
                    category: element.querySelector(".category")?.textContent || "",
                }))
            }
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <Card key={index} className="overflow-hidden">
                            <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                width={250}
                                height={150}
                                className="w-full h-40 object-cover"
                            />
                            <CardHeader>
                                <CardTitle className="text-lg">{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-2">
                                    {post.date} • {post.category}
                                </p>
                                <p className="text-gray-700 text-sm">{post.excerpt}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}


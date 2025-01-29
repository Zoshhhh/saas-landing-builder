"use client"

import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

type FeaturedPostsProps = {
    content?: string
}

export default function FeaturedPosts({ content }: FeaturedPostsProps) {
    useEffect(() => {
        console.log("FeaturedPosts content:", content)
    }, [content])

    let title = "Featured Posts"
    let featuredPosts = [
        {
            title: "Getting Started with Next.js",
            excerpt: "Learn the basics of Next.js and start building your first app.",
            image: "/placeholder.svg?height=200&width=300",
            date: "May 15, 2023",
        },
        {
            title: "10 Tips for Effective Web Design",
            excerpt: "Improve your web design skills with these essential tips.",
            image: "/placeholder.svg?height=200&width=300",
            date: "May 10, 2023",
        },
        {
            title: "The Future of AI in Web Development",
            excerpt: "Explore how AI is shaping the future of web development.",
            image: "/placeholder.svg?height=200&width=300",
            date: "May 5, 2023",
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
                featuredPosts = Array.from(postElements).map((element) => ({
                    title: element.querySelector("h3")?.textContent || "",
                    excerpt: element.querySelector("p")?.textContent || "",
                    image: element.querySelector("img")?.getAttribute("src") || "/placeholder.svg?height=200&width=300",
                    date: element.querySelector(".date")?.textContent || "",
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredPosts.map((post, index) => (
                        <Card key={index} className="overflow-hidden">
                            <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                width={300}
                                height={200}
                                className="w-full h-48 object-cover"
                            />
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 mb-2">{post.date}</p>
                                <p className="text-gray-700">{post.excerpt}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}


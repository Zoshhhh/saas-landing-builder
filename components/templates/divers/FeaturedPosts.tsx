import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function FeaturedPosts() {
    const featuredPosts = [
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

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Posts</h2>
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


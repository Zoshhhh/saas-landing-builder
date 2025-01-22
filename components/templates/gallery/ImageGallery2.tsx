"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

export default function ImageGallery2() {
    const [loading, setLoading] = useState(true)

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Image</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    <Card className="md:w-1/2">
                        <CardContent className="p-0">
                            {loading && <Skeleton className="w-full aspect-[4/3]" />}
                            <Image
                                src="/placeholder.svg?height=600&width=800"
                                alt="Featured gallery image"
                                width={800}
                                height={600}
                                className={`w-full h-auto object-cover aspect-[4/3] ${loading ? "hidden" : ""}`}
                                onLoad={() => setLoading(false)}
                            />
                        </CardContent>
                    </Card>
                    <div className="md:w-1/2 flex flex-col justify-center">
                        <h3 className="text-2xl font-semibold mb-4">Image Title</h3>
                        <p className="text-gray-600 mb-4">
                            This is a description of the featured image. You can provide details about what the image represents, its
                            significance, or any other relevant information. This text can be customized to fit your specific needs.
                        </p>
                        <p className="text-gray-600">
                            You can add more paragraphs or other content elements here to provide additional information or context
                            about the image or the topic it represents.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}


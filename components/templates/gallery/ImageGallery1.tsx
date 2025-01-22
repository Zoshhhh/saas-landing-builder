"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

const images = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
]

export default function ImageGallery1() {
    const [selectedImage, setSelectedImage] = useState(images[0])
    const [loading, setLoading] = useState(true)

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Image Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                            {loading && <Skeleton className="w-full aspect-video" />}
                            <Image
                                src={selectedImage || "/placeholder.svg"}
                                alt="Selected gallery image"
                                width={600}
                                height={400}
                                className={`w-full h-auto ${loading ? "hidden" : ""}`}
                                onLoad={() => setLoading(false)}
                            />
                        </CardContent>
                    </Card>
                    <div className="grid grid-cols-3 gap-4">
                        {images.map((img, index) => (
                            <Card
                                key={index}
                                className={`overflow-hidden cursor-pointer transition-all ${
                                    selectedImage === img ? "ring-2 ring-blue-500" : ""
                                }`}
                                onClick={() => {
                                    setSelectedImage(img)
                                    setLoading(true)
                                }}
                            >
                                <CardContent className="p-0">
                                    <Image
                                        src={img || "/placeholder.svg"}
                                        alt={`Gallery image ${index + 1}`}
                                        width={200}
                                        height={133}
                                        className="w-full h-auto"
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}


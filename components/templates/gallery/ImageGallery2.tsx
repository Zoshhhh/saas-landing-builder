"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

type ImageGallery2Props = {
    content?: string
}

export default function ImageGallery2({ content }: ImageGallery2Props) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log("ImageGallery2 content:", content)
    }, [content])

    let title = "Featured Image"
    let imageTitle = "Image Title"
    let description =
        "This is a description of the featured image. You can provide details about what the image represents, its significance, or any other relevant information. This text can be customized to fit your specific needs."
    let additionalInfo =
        "You can add more paragraphs or other content elements here to provide additional information or context about the image or the topic it represents."
    let imageSrc = "/placeholder.svg?height=600&width=800"

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const titleElement = doc.querySelector("h2")
            if (titleElement) title = titleElement.textContent || title

            const imageTitleElement = doc.querySelector("h3")
            if (imageTitleElement) imageTitle = imageTitleElement.textContent || imageTitle

            const descriptionElement = doc.querySelector("p")
            if (descriptionElement) description = descriptionElement.textContent || description

            const additionalInfoElement = doc.querySelector("p:nth-of-type(2)")
            if (additionalInfoElement) additionalInfo = additionalInfoElement.textContent || additionalInfo

            const imageElement = doc.querySelector("img")
            if (imageElement) imageSrc = imageElement.getAttribute("src") || imageSrc
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    <Card className="md:w-1/2">
                        <CardContent className="p-0">
                            {loading && <Skeleton className="w-full aspect-[4/3]" />}
                            <Image
                                src={imageSrc || "/placeholder.svg"}
                                alt="Featured gallery image"
                                width={800}
                                height={600}
                                className={`w-full h-auto object-cover aspect-[4/3] ${loading ? "hidden" : ""}`}
                                onLoad={() => setLoading(false)}
                            />
                        </CardContent>
                    </Card>
                    <div className="md:w-1/2 flex flex-col justify-center">
                        <h3 className="text-2xl font-semibold mb-4">{imageTitle}</h3>
                        <p className="text-gray-600 mb-4">{description}</p>
                        <p className="text-gray-600">{additionalInfo}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}


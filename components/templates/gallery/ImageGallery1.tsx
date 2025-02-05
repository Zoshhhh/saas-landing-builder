"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

type ComponentColors = {
    backgroundColor?: string;
    titleColor?: string;
    selectedImageBorderColor?: string;
    thumbnailBorderColor?: string;
    thumbnailHoverBorderColor?: string;
};

type ImageGalleryProps = {
    colors?: ComponentColors;
};

const images = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
];

export default function ImageGallery1({ colors }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [loading, setLoading] = useState(true);

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
                    Image Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image principale */}
                    <Card
                        className="overflow-hidden transition-all duration-300"
                        style={{
                            borderColor: colors?.selectedImageBorderColor || "#3B82F6",
                        }}
                    >
                        <CardContent className="p-0">
                            {loading && <Skeleton className="w-full aspect-video" />}
                            <Image
                                src={selectedImage || "/placeholder.svg"}
                                alt="Selected gallery image"
                                width={600}
                                height={400}
                                className={`w-full h-auto transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
                                onLoad={() => setLoading(false)}
                            />
                        </CardContent>
                    </Card>

                    {/* Miniatures */}
                    <div className="grid grid-cols-3 gap-4">
                        {images.map((img, index) => (
                            <Card
                                key={index}
                                className={`overflow-hidden cursor-pointer transition-all duration-200`}
                                style={{
                                    borderColor:
                                        selectedImage === img
                                            ? colors?.selectedImageBorderColor || "#3B82F6"
                                            : colors?.thumbnailBorderColor || "#E5E7EB",
                                }}
                                onClick={() => {
                                    setSelectedImage(img);
                                    setLoading(true);
                                }}
                                onMouseOver={(e) =>
                                    (e.currentTarget.style.borderColor = colors?.thumbnailHoverBorderColor || "#60A5FA")
                                }
                                onMouseOut={(e) =>
                                    (e.currentTarget.style.borderColor =
                                        selectedImage === img
                                            ? colors?.selectedImageBorderColor || "#3B82F6"
                                            : colors?.thumbnailBorderColor || "#E5E7EB")
                                }
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
    );
}
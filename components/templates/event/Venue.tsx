"use client"

import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Globe } from "lucide-react"

type VenueProps = {
    content?: string
}

export default function Venue({ content }: VenueProps) {
    useEffect(() => {
        console.log("Venue content:", content)
    }, [content])

    let title = "Event Venue"
    let venueName = "Tech Conference Center"
    let address = "123 Innovation Street, Tech City, TC 12345"
    let phone = "(555) 123-4567"
    let website = "www.techconferencecenter.com"

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const titleElement = doc.querySelector("h2")
            if (titleElement) title = titleElement.textContent || title

            const venueNameElement = doc.querySelector(".venue-name")
            if (venueNameElement) venueName = venueNameElement.textContent || venueName

            const addressElement = doc.querySelector(".address")
            if (addressElement) address = addressElement.textContent || address

            const phoneElement = doc.querySelector(".phone")
            if (phoneElement) phone = phoneElement.textContent || phone

            const websiteElement = doc.querySelector(".website")
            if (websiteElement) website = websiteElement.textContent || website
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <Card>
                            <CardHeader>
                                <CardTitle>{venueName}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="flex items-center">
                                    <MapPin className="mr-2 h-4 w-4" />
                                    {address}
                                </p>
                                <p className="flex items-center">
                                    <Phone className="mr-2 h-4 w-4" />
                                    {phone}
                                </p>
                                <p className="flex items-center">
                                    <Globe className="mr-2 h-4 w-4" />
                                    {website}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="md:w-1/2">
                        <div className="aspect-video bg-gray-200 rounded-lg">
                            {/* Placeholder for map */}
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                Interactive Map Placeholder
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


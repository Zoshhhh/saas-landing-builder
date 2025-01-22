import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Globe } from "lucide-react"

export default function Venue() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Event Venue</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tech Conference Center</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="flex items-center">
                                    <MapPin className="mr-2 h-4 w-4" />
                                    123 Innovation Street, Tech City, TC 12345
                                </p>
                                <p className="flex items-center">
                                    <Phone className="mr-2 h-4 w-4" />
                                    (555) 123-4567
                                </p>
                                <p className="flex items-center">
                                    <Globe className="mr-2 h-4 w-4" />
                                    www.techconferencecenter.com
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


"use client"

import type React from "react"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, BarChart } from "lucide-react"

type ServiceProps = {
    title: string
    description: string
    icon: React.ElementType
}

type ServicesProps = {
    content?: string
}

export default function Services({ content }: ServicesProps) {
    useEffect(() => {
        console.log("Services content:", content)
    }, [content])

    let title = "Our Services"
    let services: ServiceProps[] = [
        { title: "Fast Performance", description: "Optimize your website for speed", icon: Zap },
        { title: "Enhanced Security", description: "Protect your data with advanced measures", icon: Shield },
        { title: "Analytics", description: "Gain insights with comprehensive reports", icon: BarChart },
    ]

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const titleElement = doc.querySelector("h2")
            if (titleElement) title = titleElement.textContent || title

            const serviceElements = doc.querySelectorAll(".service")
            if (serviceElements.length > 0) {
                services = Array.from(serviceElements).map((element) => ({
                    title: element.querySelector("h3")?.textContent || "",
                    description: element.querySelector("p")?.textContent || "",
                    icon: getIconFromName(element.querySelector(".icon")?.textContent || ""),
                }))
            }
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    function getIconFromName(name: string): React.ElementType {
        switch (name.toLowerCase()) {
            case "zap":
                return Zap
            case "shield":
                return Shield
            case "barchart":
                return BarChart
            default:
                return Zap
        }
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <service.icon className="mr-2 h-5 w-5 text-blue-500" />
                                    {service.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{service.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}


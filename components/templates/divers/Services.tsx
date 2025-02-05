"use client"

import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, BarChart } from "lucide-react"

type ComponentColors = {
    backgroundColor?: string
    titleColor?: string
    textColor?: string
    iconColor?: string
}

type ServiceProps = {
    title: string
    description: string
    icon: React.ElementType
}

type ServicesProps = {
    content?: string
    colors?: ComponentColors
}

export default function Services({ content, colors = {} }: ServicesProps) {
    useEffect(() => {
        console.log("Services content:", content)
    }, [content])

    let title = "Our Services"
    let services: ServiceProps[] = [
        { title: "Fast Performance", description: "Optimize your website for speed", icon: Zap },
        { title: "Enhanced Security", description: "Protect your data with advanced measures", icon: Shield },
        { title: "Analytics", description: "Gain insights with comprehensive reports", icon: BarChart },
    ]

    // Gestion dynamique du `content`
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
        const iconMap: { [key: string]: React.ElementType } = {
            zap: Zap,
            shield: Shield,
            barchart: BarChart,
        }
        return iconMap[name.toLowerCase()] || Zap // Par défaut, on met Zap si inconnu
    }

    return (
        <section
            className="py-16"
            style={{
                backgroundColor: colors?.backgroundColor || "#FFFFFF",
            }}
        >
            <div className="container mx-auto px-4">
                <h2
                    className="text-3xl font-bold text-center mb-12"
                    style={{
                        color: colors?.titleColor || "#1E293B",
                    }}
                >
                    {title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="p-6 shadow-md transition-transform transform hover:scale-105">
                            <CardHeader className="flex flex-row items-center space-x-4">
                                <service.icon
                                    className="h-8 w-8"
                                    style={{ color: colors?.iconColor || "#2563EB" }}
                                />
                                <CardTitle
                                    className="text-lg font-semibold"
                                    style={{
                                        color: colors?.titleColor || "#1E293B",
                                    }}
                                >
                                    {service.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p
                                    className="text-sm"
                                    style={{
                                        color: colors?.textColor || "#4B5563",
                                    }}
                                >
                                    {service.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, BarChart } from "lucide-react"

export default function Services() {
    const services = [
        { title: "Fast Performance", description: "Optimize your website for speed", icon: Zap },
        { title: "Enhanced Security", description: "Protect your data with advanced measures", icon: Shield },
        { title: "Analytics", description: "Gain insights with comprehensive reports", icon: BarChart },
    ]

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
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


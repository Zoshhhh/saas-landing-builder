import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function Features() {
    const features = [
        { title: "Easy to Use", description: "Intuitive interface for quick setup" },
        { title: "Customizable", description: "Tailor the platform to your needs" },
        { title: "Scalable", description: "Grows with your business requirements" },
        { title: "Secure", description: "Built-in security features to protect your data" },
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}


import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"

type Hero1Props = {
    content?: string
}

export default function Hero1({ content }: Hero1Props) {
    useEffect(() => {
        console.log("Hero1 content:", content)
    }, [content])

    let title = "Welcome to Our Platform"
    let description = "Discover amazing features and boost your productivity with our innovative solutions."
    const buttonText = "Get Started"

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")
            const h2Element = doc.querySelector("h2")
            const pElement = doc.querySelector("p")

            if (h2Element) title = h2Element.textContent || title
            if (pElement) description = pElement.textContent || description
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    return (
        <section className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">{title}</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{description}</p>
            <Button size="lg" className="bg-blue-500 hover:bg-indigo-700 text-white">
                {buttonText}
            </Button>

            <div className="mt-12 max-w-4xl mx-auto">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full h-full p-8 flex flex-col justify-center items-center">
                        <div className="w-3/4 h-6 bg-gray-300 rounded mb-4"></div>
                        <div className="w-1/2 h-4 bg-gray-300 rounded mb-6"></div>
                        <div className="flex space-x-4">
                            <div className="w-20 h-8 bg-gray-300 rounded"></div>
                            <div className="w-20 h-8 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


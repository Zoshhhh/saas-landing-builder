"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

type CTAProps = {
    content?: string
}

export default function CTA({ content }: CTAProps) {
    useEffect(() => {
        console.log("CTA content:", content)
    }, [content])

    let title = "Build your websites with"
    let titleHighlight = "high performance"
    let description =
        "Nam erat risus, sodales sit amet lobortis ut, finibus eget metus. Cras aliquam ante ut tortor posuere feugiat. Duis sodales nisi id porta lacinia."
    let buttonText = "Try it out"

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const h3Element = doc.querySelector("h3")
            if (h3Element) {
                const parts = h3Element.innerHTML.split(/<span[^>]*>(.*?)<\/span>/)
                if (parts.length === 3) {
                    title = parts[0].trim()
                    titleHighlight = parts[1].trim()
                } else {
                    title = h3Element.textContent || title
                }
            }

            const pElement = doc.querySelector("p")
            if (pElement) description = pElement.textContent || description

            const buttonElement = doc.querySelector("button")
            if (buttonElement) buttonText = buttonElement.textContent || buttonText
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    return (
        <section className="max-w-screen-xl mx-auto py-12 px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                    <div className="py-4">
                        <h3 className="text-3xl text-gray-800 font-semibold md:text-4xl">
                            {title} <span className="text-blue-500">{titleHighlight}</span>
                        </h3>
                        <p className="text-gray-500 leading-relaxed mt-3">{description}</p>
                    </div>
                    <Button
                        variant="outline"
                        className="group px-4 py-2 text-blue-500 font-medium bg-indigo-50 rounded-full inline-flex items-center"
                    >
                        {buttonText}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 ml-1 duration-150 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Button>
                </div>
                <div className="w-full md:w-1/2 max-w-md">
                    <Skeleton className="w-full h-64 rounded-lg bg-gray-300" />
                </div>
            </div>
        </section>
    )
}


"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type NewsletterProps = {
    content?: string
}

export default function Newsletter({ content }: NewsletterProps) {
    useEffect(() => {
        console.log("Newsletter content:", content)
    }, [content])

    let title = "Subscribe to Our Newsletter"
    let description = "Stay up to date with our latest articles, tips, and insights. We promise not to spam you!"
    let inputPlaceholder = "Enter your email address"
    let buttonText = "Subscribe"

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const titleElement = doc.querySelector("h2")
            if (titleElement) title = titleElement.textContent || title

            const descriptionElement = doc.querySelector("p")
            if (descriptionElement) description = descriptionElement.textContent || description

            const inputElement = doc.querySelector("input")
            if (inputElement) inputPlaceholder = inputElement.getAttribute("placeholder") || inputPlaceholder

            const buttonElement = doc.querySelector("button")
            if (buttonElement) buttonText = buttonElement.textContent || buttonText
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    <p className="text-gray-600 mb-6">{description}</p>
                    <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="w-full sm:w-auto sm:flex-1 max-w-xs">
                            <Input type="email" placeholder={inputPlaceholder} className="w-full" />
                        </div>
                        <Button type="submit" className="w-full sm:w-auto">
                            {buttonText}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}


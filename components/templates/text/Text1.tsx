"use client"

import React, { useEffect } from "react"

type Text1Props = {
    content?: string
}

export default function Text1({ content }: Text1Props) {
    useEffect(() => {
        console.log("Text1 content:", content)
    }, [content])

    let title = "Text Component 1"
    let shortText = "This is a short line of text."
    let centeredParagraph =
        "This is a centered paragraph. It has a maximum width and is aligned in the center of its container. The text wraps to multiple lines if it exceeds the maximum width."
    let leftAlignedParagraph =
        "This is a left-aligned paragraph. It starts from the left side of its container and continues to the right. This is the default alignment for most text on web pages. It's easy to read and follows the natural reading direction in many languages."
    let boldText = "This is bold text."
    let italicText = "This text is italicized."
    let underlineText = "This text has an underline."
    let largerText = "This text is larger than the default size."

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const titleElement = doc.querySelector("h2")
            if (titleElement) title = titleElement.textContent || title

            const shortTextElement = doc.querySelector(".short-text")
            if (shortTextElement) shortText = shortTextElement.textContent || shortText

            const centeredParagraphElement = doc.querySelector(".centered-paragraph")
            if (centeredParagraphElement) centeredParagraph = centeredParagraphElement.textContent || centeredParagraph

            const leftAlignedParagraphElement = doc.querySelector(".left-aligned-paragraph")
            if (leftAlignedParagraphElement)
                leftAlignedParagraph = leftAlignedParagraphElement.textContent || leftAlignedParagraph

            const boldTextElement = doc.querySelector(".bold-text")
            if (boldTextElement) boldText = boldTextElement.textContent || boldText

            const italicTextElement = doc.querySelector(".italic-text")
            if (italicTextElement) italicText = italicTextElement.textContent || italicText

            const underlineTextElement = doc.querySelector(".underline-text")
            if (underlineTextElement) underlineText = underlineTextElement.textContent || underlineText

            const largerTextElement = doc.querySelector(".larger-text")
            if (largerTextElement) largerText = largerTextElement.textContent || largerText
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>

                <p className="text-sm text-gray-600 mb-4">{shortText}</p>

                <p className="text-center text-gray-700 max-w-2xl mx-auto mb-8">{centeredParagraph}</p>

                <p className="text-left text-gray-700 mb-8">{leftAlignedParagraph}</p>

                <div className="space-y-4">
                    <p className="font-bold text-gray-800">{boldText}</p>
                    <p className="italic text-gray-800">{italicText}</p>
                    <p className="underline text-gray-800">{underlineText}</p>
                    <p className="text-xl text-gray-800">{largerText}</p>
                </div>
            </div>
        </section>
    )
}


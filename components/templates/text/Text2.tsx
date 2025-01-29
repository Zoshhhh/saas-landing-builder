"use client"

import React, { useEffect } from "react"

type Text2Props = {
    content?: string
}

export default function Text2({ content }: Text2Props) {
    useEffect(() => {
        console.log("Text2 content:", content)
    }, [content])

    let title = "Text Component 2"
    let leftColumnTitle = "Left Column"
    let leftColumnParagraph =
        "This is a paragraph in the left column. It demonstrates how you can structure your content in a multi-column layout for better readability and visual appeal."
    let leftColumnList = [
        "First item in a bulleted list",
        "Second item showing list capabilities",
        "Third item to demonstrate spacing",
    ]
    let rightColumnTitle = "Right Column"
    let rightColumnParagraph =
        "This text is in the right column. Using a two-column layout can help organize information and make it easier for readers to scan and understand your content."
    let blockquote =
        "This is an example of a blockquote. It can be used to highlight important quotes or statements within your text content."
    let linkText = "This is a text link example"

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const titleElement = doc.querySelector("h2")
            if (titleElement) title = titleElement.textContent || title

            const leftColumnTitleElement = doc.querySelector(".left-column h3")
            if (leftColumnTitleElement) leftColumnTitle = leftColumnTitleElement.textContent || leftColumnTitle

            const leftColumnParagraphElement = doc.querySelector(".left-column p")
            if (leftColumnParagraphElement)
                leftColumnParagraph = leftColumnParagraphElement.textContent || leftColumnParagraph

            const leftColumnListItems = doc.querySelectorAll(".left-column li")
            if (leftColumnListItems.length > 0) {
                leftColumnList = Array.from(leftColumnListItems).map((item) => item.textContent || "")
            }

            const rightColumnTitleElement = doc.querySelector(".right-column h3")
            if (rightColumnTitleElement) rightColumnTitle = rightColumnTitleElement.textContent || rightColumnTitle

            const rightColumnParagraphElement = doc.querySelector(".right-column p")
            if (rightColumnParagraphElement)
                rightColumnParagraph = rightColumnParagraphElement.textContent || rightColumnParagraph

            const blockquoteElement = doc.querySelector("blockquote")
            if (blockquoteElement) blockquote = blockquoteElement.textContent || blockquote

            const linkElement = doc.querySelector("a")
            if (linkElement) linkText = linkElement.textContent || linkText
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">{title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">{leftColumnTitle}</h3>
                        <p className="text-gray-600 mb-4">{leftColumnParagraph}</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            {leftColumnList.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">{rightColumnTitle}</h3>
                        <p className="text-gray-600 mb-4">{rightColumnParagraph}</p>
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">{blockquote}</blockquote>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                        {linkText}
                    </a>
                </div>
            </div>
        </section>
    )
}


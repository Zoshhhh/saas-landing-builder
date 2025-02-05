"use client";

import React, { useEffect } from "react";

type ComponentColors = {
    backgroundColor?: string;
    titleColor?: string;
    textColor?: string;
    boldTextColor?: string;
    italicTextColor?: string;
    underlineTextColor?: string;
    largerTextColor?: string;
};

type Text1Props = {
    content?: string;
    colors?: ComponentColors;
};

export default function Text1({ content, colors }: Text1Props) {
    useEffect(() => {
        console.log("Text1 content:", content);
    }, [content]);

    let title = "Text Component 1";
    let shortText = "This is a short line of text.";
    let centeredParagraph =
        "This is a centered paragraph. It has a maximum width and is aligned in the center of its container. The text wraps to multiple lines if it exceeds the maximum width.";
    let leftAlignedParagraph =
        "This is a left-aligned paragraph. It starts from the left side of its container and continues to the right. This is the default alignment for most text on web pages. It's easy to read and follows the natural reading direction in many languages.";
    let boldText = "This is bold text.";
    let italicText = "This text is italicized.";
    let underlineText = "This text has an underline.";
    let largerText = "This text is larger than the default size.";

    if (content) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, "text/html");

            const titleElement = doc.querySelector("h2");
            if (titleElement) title = titleElement.textContent || title;

            const shortTextElement = doc.querySelector(".short-text");
            if (shortTextElement) shortText = shortTextElement.textContent || shortText;

            const centeredParagraphElement = doc.querySelector(".centered-paragraph");
            if (centeredParagraphElement) centeredParagraph = centeredParagraphElement.textContent || centeredParagraph;

            const leftAlignedParagraphElement = doc.querySelector(".left-aligned-paragraph");
            if (leftAlignedParagraphElement) leftAlignedParagraph = leftAlignedParagraphElement.textContent || leftAlignedParagraph;

            const boldTextElement = doc.querySelector(".bold-text");
            if (boldTextElement) boldText = boldTextElement.textContent || boldText;

            const italicTextElement = doc.querySelector(".italic-text");
            if (italicTextElement) italicText = italicTextElement.textContent || italicText;

            const underlineTextElement = doc.querySelector(".underline-text");
            if (underlineTextElement) underlineText = underlineTextElement.textContent || underlineText;

            const largerTextElement = doc.querySelector(".larger-text");
            if (largerTextElement) largerText = largerTextElement.textContent || largerText;
        } catch (error) {
            console.error("Error parsing content:", error);
        }
    }

    return (
        <section
            className="py-12"
            style={{
                backgroundColor: colors?.backgroundColor || "#FFFFFF",
            }}
        >
            <div className="container mx-auto px-4">
                <h2
                    className="text-3xl font-bold text-center mb-8"
                    style={{
                        color: colors?.titleColor || "#1E3A8A",
                    }}
                >
                    {title}
                </h2>

                <p
                    className="text-sm mb-4"
                    style={{
                        color: colors?.textColor || "#4B5563",
                    }}
                >
                    {shortText}
                </p>

                <p
                    className="text-center max-w-2xl mx-auto mb-8"
                    style={{
                        color: colors?.textColor || "#4B5563",
                    }}
                >
                    {centeredParagraph}
                </p>

                <p
                    className="text-left mb-8"
                    style={{
                        color: colors?.textColor || "#4B5563",
                    }}
                >
                    {leftAlignedParagraph}
                </p>

                <div className="space-y-4">
                    <p
                        className="font-bold"
                        style={{
                            color: colors?.boldTextColor || "#1F2937",
                        }}
                    >
                        {boldText}
                    </p>
                    <p
                        className="italic"
                        style={{
                            color: colors?.italicTextColor || "#374151",
                        }}
                    >
                        {italicText}
                    </p>
                    <p
                        className="underline"
                        style={{
                            color: colors?.underlineTextColor || "#374151",
                        }}
                    >
                        {underlineText}
                    </p>
                    <p
                        className="text-xl"
                        style={{
                            color: colors?.largerTextColor || "#1F2937",
                        }}
                    >
                        {largerText}
                    </p>
                </div>
            </div>
        </section>
    );
}
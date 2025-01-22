import React from "react"

export default function Text1() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Text Component 1</h2>

                {/* Short line of text */}
                <p className="text-sm text-gray-600 mb-4">This is a short line of text.</p>

                {/* Centered paragraph */}
                <p className="text-center text-gray-700 max-w-2xl mx-auto mb-8">
                    This is a centered paragraph. It has a maximum width and is aligned in the center of its container. The text
                    wraps to multiple lines if it exceeds the maximum width.
                </p>

                {/* Left-aligned paragraph */}
                <p className="text-left text-gray-700 mb-8">
                    This is a left-aligned paragraph. It starts from the left side of its container and continues to the right.
                    This is the default alignment for most text on web pages. It's easy to read and follows the natural reading
                    direction in many languages.
                </p>

                {/* Additional text styles */}
                <div className="space-y-4">
                    <p className="font-bold text-gray-800">This is bold text.</p>
                    <p className="italic text-gray-800">This text is italicized.</p>
                    <p className="underline text-gray-800">This text has an underline.</p>
                    <p className="text-xl text-gray-800">This text is larger than the default size.</p>
                </div>
            </div>
        </section>
    )
}


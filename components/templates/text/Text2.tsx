import React from "react"

export default function Text2() {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">Text Component 2</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        {/* Left column */}
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Left Column</h3>
                        <p className="text-gray-600 mb-4">
                            This is a paragraph in the left column. It demonstrates how you can structure your content in a
                            multi-column layout for better readability and visual appeal.
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>First item in a bulleted list</li>
                            <li>Second item showing list capabilities</li>
                            <li>Third item to demonstrate spacing</li>
                        </ul>
                    </div>

                    <div>
                        {/* Right column */}
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Right Column</h3>
                        <p className="text-gray-600 mb-4">
                            This text is in the right column. Using a two-column layout can help organize information and make it
                            easier for readers to scan and understand your content.
                        </p>
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                            "This is an example of a blockquote. It can be used to highlight important quotes or statements within
                            your text content."
                        </blockquote>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                        This is a text link example
                    </a>
                </div>
            </div>
        </section>
    )
}


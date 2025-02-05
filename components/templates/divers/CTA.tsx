"use client";

import React, { useEffect } from "react";

type ComponentColors = {
    backgroundColor?: string;
    titleColor?: string;
    subtitleColor?: string;
    textColor?: string;
    iconColor?: string;
    borderColor?: string;
};

type FeaturesProps = {
    content?: string;
    colors?: ComponentColors;
};

export default function Features({ content, colors = {} }: FeaturesProps) {
    useEffect(() => {
        console.log("Features content:", content);
    }, [content]);

    let title = "Do more with less complexity";
    let subtitle = "Features";
    let description =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius.";
    let features = [
        {
            title: "Analytics",
            desc: "Gain insights with powerful analytics tools to track performance and engagement.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                </svg>
            ),
        },
        {
            title: "Datacenter security",
            desc: "We ensure maximum security with encrypted data storage and compliance.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                </svg>
            ),
        },
        {
            title: "Build on your terms",
            desc: "Customizable and scalable solutions tailored to your business needs.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                    />
                </svg>
            ),
        },
    ];

    // Gestion dynamique du `content` en HTML
    if (content) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, "text/html");

            const titleElement = doc.querySelector("h2");
            if (titleElement) title = titleElement.textContent || title;

            const subtitleElement = doc.querySelector("h3");
            if (subtitleElement) subtitle = subtitleElement.textContent || subtitle;

            const descriptionElement = doc.querySelector("p");
            if (descriptionElement) description = descriptionElement.textContent || description;
        } catch (error) {
            console.error("Error parsing content:", error);
        }
    }

    return (
        <section
            className="py-14"
            style={{
                backgroundColor: colors?.backgroundColor || "#FFFFFF",
            }}
        >
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="max-w-xl space-y-3">
                    <h3
                        className="font-semibold"
                        style={{
                            color: colors?.subtitleColor || "#2563EB",
                        }}
                    >
                        {subtitle}
                    </h3>
                    <p
                        className="text-3xl font-semibold sm:text-4xl"
                        style={{
                            color: colors?.titleColor || "#1E293B",
                        }}
                    >
                        {title}
                    </p>
                    <p
                        style={{
                            color: colors?.textColor || "#4B5563",
                        }}
                    >
                        {description}
                    </p>
                </div>

                {/* GRID DES FEATURES */}
                <div className="mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((item, idx) => (
                            <li key={idx} className="space-y-4 flex flex-col items-start">
                                <div
                                    className="w-12 h-12 flex items-center justify-center rounded-full border shadow"
                                    style={{
                                        color: colors?.iconColor || "#2563EB",
                                        borderColor: colors?.borderColor || "#93C5FD",
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <h4
                                    className="text-lg font-semibold"
                                    style={{
                                        color: colors?.titleColor || "#1E293B",
                                    }}
                                >
                                    {item.title}
                                </h4>
                                <p
                                    style={{
                                        color: colors?.textColor || "#4B5563",
                                    }}
                                >
                                    {item.desc}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
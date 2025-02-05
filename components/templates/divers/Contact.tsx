"use client"

import React, { useEffect, createElement } from "react"

type ComponentColors = {
    backgroundColor?: string
    titleColor?: string
    textColor?: string
    iconColor?: string
    borderColor?: string
}

type ContactProps = {
    content?: string
    colors?: ComponentColors
}

export default function Contact({ content, colors = {} }: ContactProps) {
    useEffect(() => {
        console.log("Contact content:", content)
    }, [content])

    let title = "Let's connect"
    let description = "We're here to help and answer any question you might have. We look forward to hearing from you."

    let contactMethods = [
        {
            icon: "globe",
            title: "Join our community",
            desc: "Connect with us and other users.",
            link: {
                name: "Join our Discord",
                href: "#",
            },
        },
        {
            icon: "twitter",
            title: "Follow us on Twitter",
            desc: "Stay updated with our latest news.",
            link: {
                name: "Send us DMs",
                href: "#",
            },
        },
    ]

    // Fonction pour convertir les noms d'icônes en React Components
    function getIconFromName(name: string) {
        const iconMap: { [key: string]: React.ReactElement } = {
            globe: (
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
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582"
                    />
                </svg>
            ),
            twitter: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27" />
                </svg>
            ),
        }
        return iconMap[name.toLowerCase()] || iconMap["globe"]
    }

    // Gestion dynamique du `content`
    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const titleElement = doc.querySelector("h3")
            if (titleElement) title = titleElement.textContent || title

            const descriptionElement = doc.querySelector("p")
            if (descriptionElement) description = descriptionElement.textContent || description

            const contactMethodElements = doc.querySelectorAll("li")
            if (contactMethodElements.length > 0) {
                contactMethods = Array.from(contactMethodElements).map((element) => ({
                    icon: element.querySelector(".icon")?.textContent || "globe",
                    title: element.querySelector("h4")?.textContent || "",
                    desc: element.querySelector("p")?.textContent || "",
                    link: {
                        name: element.querySelector("a")?.textContent || "Learn more",
                        href: element.querySelector("a")?.getAttribute("href") || "#",
                    },
                }))
            }
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    return (
        <section
            className="py-14"
            style={{
                backgroundColor: colors?.backgroundColor || "#FFFFFF",
            }}
        >
            <div className="max-w-screen-xl mx-auto px-4 text-blue-600 gap-12 md:px-8 lg:flex">
                {/* TITRE ET DESCRIPTION */}
                <div className="max-w-md">
                    <h3
                        className="text-3xl font-semibold sm:text-4xl"
                        style={{ color: colors?.titleColor || "#1E293B" }}
                    >
                        {title}
                    </h3>
                    <p
                        className="mt-3"
                        style={{ color: colors?.textColor || "#4B5563" }}
                    >
                        {description}
                    </p>
                </div>

                {/* CONTACT METHODS */}
                <div>
                    <ul className="mt-12 gap-y-6 gap-x-12 items-center md:flex lg:gap-x-0 lg:mt-0">
                        {contactMethods.map((item, idx) => (
                            <li
                                key={idx}
                                className="space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none"
                                style={{ borderColor: colors?.borderColor || "#93C5FD" }}
                            >
                                {/* Icône */}
                                <div
                                    className="w-12 h-12 rounded-full border flex items-center justify-center"
                                    style={{ color: colors?.iconColor || "#2563EB" }}
                                >
                                    {getIconFromName(item.icon)}
                                </div>
                                {/* Titre */}
                                <h4
                                    className="text-lg font-medium xl:text-xl"
                                    style={{ color: colors?.titleColor || "#1E293B" }}
                                >
                                    {item.title}
                                </h4>
                                {/* Description */}
                                <p style={{ color: colors?.textColor || "#4B5563" }}>{item.desc}</p>
                                {/* Lien */}
                                <a
                                    href={item.link.href}
                                    className="flex items-center gap-1 text-sm duration-150 font-medium"
                                    style={{ color: colors?.iconColor || "#2563EB" }}
                                >
                                    {item.link.name}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path
                                            fillRule="evenodd"
                                            d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
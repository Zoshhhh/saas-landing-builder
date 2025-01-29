"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Footer1Props = {
    content?: string
}

export default function Footer1({ content }: Footer1Props) {
    useEffect(() => {
        console.log("Footer1 content:", content)
    }, [content])

    let description = "Nulla auctor metus vitae lectus iaculis, vel euismod massa efficitur."
    let startButtonText = "Let's get started"
    let accessButtonText = "Get access"
    let copyrightText = `© ${new Date().getFullYear()} Your Company Name. All rights reserved.`
    let footerNavs = [
        { href: "#", name: "Terms" },
        { href: "#", name: "License" },
        { href: "#", name: "Privacy" },
        { href: "#", name: "About us" },
    ]

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const descElement = doc.querySelector("p")
            if (descElement) description = descElement.textContent || description

            const buttons = doc.querySelectorAll("button")
            if (buttons.length > 0) startButtonText = buttons[0].textContent || startButtonText
            if (buttons.length > 1) accessButtonText = buttons[1].textContent || accessButtonText

            const copyrightElement = doc.querySelector("p:last-of-type")
            if (copyrightElement) copyrightText = copyrightElement.textContent || copyrightText

            const navItems = doc.querySelectorAll("ul li a")
            if (navItems.length > 0) {
                footerNavs = Array.from(navItems).map((item) => ({
                    href: item.getAttribute("href") || "#",
                    name: item.textContent || "",
                }))
            }
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    return (
        <footer className="pt-10">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
                    <p>{description}</p>
                    <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
                        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">{startButtonText}</Button>
                        <Button variant="outline" className="w-full sm:w-auto">
                            {accessButtonText}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                                <path
                                    fillRule="evenodd"
                                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>
                <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
                    <p>{copyrightText}</p>
                    <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
                        {footerNavs.map((item, idx) => (
                            <li key={idx} className="text-gray-800 hover:text-blue-600 duration-150">
                                <Link href={item.href}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}


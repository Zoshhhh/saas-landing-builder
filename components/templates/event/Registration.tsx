"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type RegistrationProps = {
    content?: string
}

export default function Registration({ content }: RegistrationProps) {
    useEffect(() => {
        console.log("Registration content:", content)
    }, [content])

    let title = "Register for the Event"
    let firstNamePlaceholder = "First Name"
    let lastNamePlaceholder = "Last Name"
    let emailPlaceholder = "Email Address"
    let ticketTypePlaceholder = "Select ticket type"
    let ticketTypes = [
        { value: "standard", label: "Standard Ticket" },
        { value: "vip", label: "VIP Ticket" },
        { value: "group", label: "Group Ticket (5+)" },
    ]
    let buttonText = "Register Now"

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const titleElement = doc.querySelector("h2")
            if (titleElement) title = titleElement.textContent || title

            const inputs = doc.querySelectorAll("input")
            inputs.forEach((input) => {
                const placeholder = input.getAttribute("placeholder")
                if (placeholder?.includes("First Name")) firstNamePlaceholder = placeholder
                if (placeholder?.includes("Last Name")) lastNamePlaceholder = placeholder
                if (placeholder?.includes("Email")) emailPlaceholder = placeholder
            })

            const selectElement = doc.querySelector("select")
            if (selectElement) {
                ticketTypePlaceholder = selectElement.getAttribute("placeholder") || ticketTypePlaceholder
                const options = selectElement.querySelectorAll("option")
                if (options.length > 0) {
                    ticketTypes = Array.from(options).map((option) => ({
                        value: option.value,
                        label: option.textContent || "",
                    }))
                }
            }

            const buttonElement = doc.querySelector("button")
            if (buttonElement) buttonText = buttonElement.textContent || buttonText
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
                <div className="max-w-md mx-auto">
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input type="text" placeholder={firstNamePlaceholder} />
                            <Input type="text" placeholder={lastNamePlaceholder} />
                        </div>
                        <Input type="email" placeholder={emailPlaceholder} />
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder={ticketTypePlaceholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {ticketTypes.map((ticket) => (
                                    <SelectItem key={ticket.value} value={ticket.value}>
                                        {ticket.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button type="submit" className="w-full">
                            {buttonText}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}


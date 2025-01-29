"use client"

import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ScheduleProps = {
    content?: string
}

export default function Schedule({ content }: ScheduleProps) {
    useEffect(() => {
        console.log("Schedule content:", content)
    }, [content])

    let title = "Event Schedule"
    let scheduleItems = [
        {
            time: "9:00 AM",
            title: "Registration and Welcome Coffee",
            description: "Start your day with a warm welcome and networking.",
        },
        {
            time: "10:00 AM",
            title: "Keynote Speech",
            description: "Opening remarks and vision for the future of technology.",
        },
        {
            time: "11:30 AM",
            title: "Panel Discussion: AI in Business",
            description: "Industry experts discuss the impact of AI on modern businesses.",
        },
        { time: "1:00 PM", title: "Lunch Break", description: "Networking lunch with fellow attendees." },
        {
            time: "2:30 PM",
            title: "Workshop: Hands-on Machine Learning",
            description: "Interactive session on practical machine learning techniques.",
        },
        { time: "4:00 PM", title: "Closing Remarks", description: "Wrap-up and key takeaways from the event." },
    ]

    if (content) {
        try {
            const parser = new DOMParser()
            const doc = parser.parseFromString(content, "text/html")

            const titleElement = doc.querySelector("h2")
            if (titleElement) title = titleElement.textContent || title

            const scheduleElements = doc.querySelectorAll(".schedule-item")
            if (scheduleElements.length > 0) {
                scheduleItems = Array.from(scheduleElements).map((element) => ({
                    time: element.querySelector(".time")?.textContent || "",
                    title: element.querySelector(".title")?.textContent || "",
                    description: element.querySelector(".description")?.textContent || "",
                }))
            }
        } catch (error) {
            console.error("Error parsing content:", error)
        }
    }

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
                <div className="space-y-4">
                    {scheduleItems.map((item, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>{item.title}</span>
                                    <span className="text-blue-600">{item.time}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}


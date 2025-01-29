"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

type Hero2Props = {
  content?: string
}

export default function Hero2({ content }: Hero2Props) {
  useEffect(() => {
    console.log("Hero2 content:", content)
  }, [content])

  let title = "Optimize your website for"
  let titleHighlight = "Search engine"
  let description =
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum"
  const subscribeText = "Subscribe to our newsletter and we'll save your time"
  const buttonText = "Subscribe"

  if (content) {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, "text/html")
      const h2Element = doc.querySelector("h2")
      const pElement = doc.querySelector("p")

      if (h2Element) {
        const parts = h2Element.innerHTML.split(/<span[^>]*>(.*?)<\/span>/)
        if (parts.length === 3) {
          title = parts[0].trim()
          titleHighlight = parts[1].trim()
        } else {
          title = h2Element.textContent || title
        }
      }
      if (pElement) description = pElement.textContent || description
    } catch (error) {
      console.error("Error parsing content:", error)
    }
  }

  return (
      <section className="py-16 mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 sm:text-center lg:text-left">
            <h1 className="text-gray-800 font-bold text-4xl xl:text-5xl">
              {title}
              <span className="text-blue-600"> {titleHighlight}</span>
            </h1>
            <p className="text-gray-500 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">{description}</p>
            <div>
              <p className="text-gray-800 py-3">{subscribeText}</p>
              <form className="items-center space-y-3 sm:justify-center sm:space-x-3 sm:space-y-0 sm:flex lg:justify-start">
                <Input type="text" placeholder="Enter your email" className="text-gray-500 w-full sm:w-72" />
                <Button type="submit" className="w-full sm:w-auto">
                  {buttonText}
                </Button>
              </form>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Skeleton className="w-full max-w-[500px] h-[300px] bg-gray-200" />
          </div>
        </div>
      </section>
  )
}


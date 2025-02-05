"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

type ComponentColors = {
  backgroundColor?: string
  textColor?: string
  highlightColor?: string
  buttonColor?: string
  buttonTextColor?: string
  inputTextColor?: string
  inputBackgroundColor?: string
}

type Hero2Props = {
  content?: string
  colors?: ComponentColors
}

export default function Hero2({ content, colors }: Hero2Props) {
  useEffect(() => {
    console.log("Hero2 content:", content)
  }, [content, colors])

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
      <section
          className="py-16 mx-auto max-w-screen-xl px-4 md:px-8"
          style={{
            backgroundColor: colors?.backgroundColor || "white",
          }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Texte */}
          <div className="space-y-4 sm:text-center lg:text-left">
            <h1
                className="font-bold text-4xl xl:text-5xl"
                style={{
                  color: colors?.textColor || "#111827",
                }}
            >
              {title}
              <span
                  style={{
                    color: colors?.highlightColor || "#3B82F6",
                  }}
              >
              {" "}
                {titleHighlight}
            </span>
            </h1>
            <p
                className="max-w-xl leading-relaxed sm:mx-auto lg:ml-0"
                style={{
                  color: colors?.textColor || "#4B5563",
                }}
            >
              {description}
            </p>
            <div>
              <p
                  className="py-3"
                  style={{
                    color: colors?.textColor || "#111827",
                  }}
              >
                {subscribeText}
              </p>
              <form className="items-center space-y-3 sm:justify-center sm:space-x-3 sm:space-y-0 sm:flex lg:justify-start">
                <Input
                    type="text"
                    placeholder="Enter your email"
                    className="w-full sm:w-72"
                    style={{
                      color: colors?.inputTextColor || "#374151",
                      backgroundColor: colors?.inputBackgroundColor || "#F3F4F6",
                    }}
                />
                <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    style={{
                      backgroundColor: colors?.buttonColor || "#3B82F6",
                      color: colors?.buttonTextColor || "white",
                    }}
                >
                  {buttonText}
                </Button>
              </form>
            </div>
          </div>

          {/* Carré gris pour indiquer l'emplacement de l'image */}
          <div className="flex justify-center lg:justify-end">
            <Skeleton
                className="w-full max-w-[500px] h-[300px] bg-gray-200 rounded-lg"
            />
          </div>
        </div>
      </section>
  )
}
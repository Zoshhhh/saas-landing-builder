"use client"

import { useEffect, useState } from "react"

interface ComponentColors {
  backgroundColor?: string
  textColor?: string
  buttonColor?: string
  buttonTextColor?: string
}

type HeaderCryptoProps = {
  content?: string
  colors?: ComponentColors
}

export default function HeaderCrypto({ content, colors }: HeaderCryptoProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    console.log("Header content:", content)
  }, [content])

  let title = "NexusTrade"
  let buttonText = "Get Started"

  if (content) {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, "text/html")
      const h1Element = doc.querySelector("h1")
      const buttonElement = doc.querySelector("button")

      if (h1Element) title = h1Element.textContent || title
      if (buttonElement) buttonText = buttonElement.textContent || buttonText
    } catch (error) {
      console.error("Error parsing content:", error)
    }
  }

  return (
    <header>
      <h1>{title}</h1>
      <button>{buttonText}</button>
    </header>
  )
}
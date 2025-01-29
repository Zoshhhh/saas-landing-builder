"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu } from "lucide-react"

type Header2Props = {
  content?: string
}

export default function Header2({ content }: Header2Props) {
  useEffect(() => {
    console.log("Header2 content:", content)
  }, [content])

  let logo = "Logo"
  let navItems = [
    { label: "Home", href: "#" },
    { label: "Products", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ]
  let searchPlaceholder = "Search..."
  let signInText = "Sign In"

  if (content) {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, "text/html")

      const logoElement = doc.querySelector(".logo")
      if (logoElement) logo = logoElement.textContent || logo

      const navElements = doc.querySelectorAll("nav a")
      if (navElements.length > 0) {
        navItems = Array.from(navElements).map((el) => ({
          label: el.textContent || "",
          href: el.getAttribute("href") || "#",
        }))
      }

      const searchElement = doc.querySelector("input[type='search']")
      if (searchElement) searchPlaceholder = searchElement.getAttribute("placeholder") || searchPlaceholder

      const signInElement = doc.querySelector(".sign-in")
      if (signInElement) signInText = signInElement.textContent || signInText
    } catch (error) {
      console.error("Error parsing content:", error)
    }
  }

  return (
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-blue-500">{logo}</span>
              <nav className="hidden md:block">
                <ul className="flex space-x-6">
                  {navItems.map((item, index) => (
                      <li key={index}>
                        <a href={item.href} className="text-gray-600 hover:text-blue-500 transition-colors">
                          {item.label}
                        </a>
                      </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Input
                    type="search"
                    placeholder={searchPlaceholder}
                    className="pl-10 pr-4 py-2 w-64 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button variant="outline" className="hidden sm:inline-flex">
                {signInText}
              </Button>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>
  )
}


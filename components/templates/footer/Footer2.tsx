"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

type Footer2Props = {
  content?: string
}

export default function Footer2({ content }: Footer2Props) {
  useEffect(() => {
    console.log("Footer2 content:", content)
  }, [content])

  let newsletterTitle = "Get our beautiful newsletter straight to your inbox."
  let emailPlaceholder = "Enter your email"
  let subscribeButtonText = "Subscribe"
  let copyrightText = `© ${new Date().getFullYear()} Your Company Name. All rights reserved.`
  let footerNavs = [
    {
      label: "Resources",
      items: [
        { href: "#", name: "Contact" },
        { href: "#", name: "Support" },
        { href: "#", name: "Documentation" },
        { href: "#", name: "Pricing" },
      ],
    },
    {
      label: "About",
      items: [
        { href: "#", name: "Terms" },
        { href: "#", name: "License" },
        { href: "#", name: "Privacy" },
        { href: "#", name: "About Us" },
      ],
    },
    {
      label: "Explore",
      items: [
        { href: "#", name: "Showcase" },
        { href: "#", name: "Roadmap" },
        { href: "#", name: "Languages" },
        { href: "#", name: "Blog" },
      ],
    },
    {
      label: "Company",
      items: [
        { href: "#", name: "Partners" },
        { href: "#", name: "Team" },
        { href: "#", name: "Careers" },
      ],
    },
  ]

  if (content) {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, "text/html")

      const titleElement = doc.querySelector("h3")
      if (titleElement) newsletterTitle = titleElement.textContent || newsletterTitle

      const inputElement = doc.querySelector("input[type='email']")
      if (inputElement) emailPlaceholder = inputElement.getAttribute("placeholder") || emailPlaceholder

      const buttonElement = doc.querySelector("button[type='submit']")
      if (buttonElement) subscribeButtonText = buttonElement.textContent || subscribeButtonText

      const copyrightElement = doc.querySelector("p")
      if (copyrightElement) copyrightText = copyrightElement.textContent || copyrightText

      const navSections = doc.querySelectorAll("ul")
      if (navSections.length > 0) {
        footerNavs = Array.from(navSections).map((section) => {
          const label = section.querySelector("h4")?.textContent || ""
          const items = Array.from(section.querySelectorAll("li a")).map((link) => ({
            href: link.getAttribute("href") || "#",
            name: link.textContent || "",
          }))
          return { label, items }
        })
      }
    } catch (error) {
      console.error("Error parsing content:", error)
    }
  }

  return (
      <footer className="pt-10 bg-blue-50">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="justify-between items-center gap-12 md:flex">
            <div className="flex-1 max-w-lg">
              <h3 className="text-2xl font-bold text-blue-950">{newsletterTitle}</h3>
            </div>
            <div className="flex-1 mt-6 md:mt-0">
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-x-3 md:justify-end">
                <div className="relative flex-1">
                  <svg
                      className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <Input
                      type="email"
                      required
                      placeholder={emailPlaceholder}
                      className="w-full pl-12 pr-3 py-2 text-gray-500 bg-white outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                  />
                </div>
                <Button
                    type="submit"
                    className="block w-auto py-3 px-4 font-medium text-sm text-center text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 active:shadow-none rounded-lg shadow"
                >
                  {subscribeButtonText}
                </Button>
              </form>
            </div>
          </div>
          <div className="flex-1 mt-16 space-y-6 justify-between sm:flex md:space-y-0">
            {footerNavs.map((item, idx) => (
                <ul className="space-y-4 text-gray-600" key={idx}>
                  <h4 className="text-blue-950 font-semibold sm:pb-2">{item.label}</h4>
                  {item.items.map((el, idx) => (
                      <li key={idx}>
                        <Link href={el.href} className="hover:text-blue-600 duration-150">
                          {el.name}
                        </Link>
                      </li>
                  ))}
                </ul>
            ))}
          </div>
          <div className="mt-10 py-10 border-t border-gray-300 items-center justify-between sm:flex">
            <p className="text-gray-600">{copyrightText}</p>
            <div className="flex items-center gap-x-6 text-gray-400 mt-6">
              <a href="#" className="hover:text-blue-600 duration-150">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="hover:text-blue-600 duration-150">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="hover:text-blue-600 duration-150">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
  )
}


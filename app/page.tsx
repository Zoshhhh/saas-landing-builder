"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import Preview from "@/components/Preview"
import { AppNavbar } from "@/components/app/Navbar"
import { SidebarNavigation } from "@/components/app/Sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import Hero1 from "@/components/templates/hero/Hero1"
import Hero2 from "@/components/templates/hero/Hero2"
import Header1 from "@/components/templates/header/Header1"
import Header2 from "@/components/templates/header/Header2"
import Footer1 from "@/components/templates/footer/Footer1"
import Footer2 from "@/components/templates/footer/Footer2"
import FAQ1 from "@/components/templates/faq/FAQ1"
import FAQ2 from "@/components/templates/faq/FAQ2"
import Pricing1 from "@/components/templates/pricing/Pricing1"
import Pricing2 from "@/components/templates/pricing/Pricing2"
import Pricing3 from "@/components/templates/pricing/Pricing3"
import { Download, Smartphone, Laptop } from "lucide-react"
import { ComponentDialog, COMPONENT_OPTIONS } from "@/components/app/ComponentDialog"

export default function Home() {
  const [selectedStyles, setSelectedStyles] = useState<{ [key: string]: string }>({})
  const [componentsOrder, setComponentsOrder] = useState<string[]>([])
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const handleAdd = (sectionId: string, style: string) => {
    setSelectedStyles((prev) => ({ ...prev, [sectionId]: style }))
    setComponentsOrder((prev) => [...prev, sectionId])
    setSelectedSection(sectionId)
  }

  const handleSelect = (sectionId: string) => {
    setSelectedSection(sectionId)
  }

  const handleDelete = (sectionId: string) => {
    setSelectedStyles((prev) => {
      const newStyles = { ...prev }
      delete newStyles[sectionId]
      return newStyles
    })
    setComponentsOrder((prev) => prev.filter((id) => id !== sectionId))
    setSelectedSection(null)
  }

  const handleMove = (sectionId: string, direction: "up" | "down") => {
    setComponentsOrder((prev) => {
      const index = prev.indexOf(sectionId)
      if (index === -1) return prev
      const newOrder = [...prev]
      if (direction === "up" && index > 0) {
        ;[newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
      } else if (direction === "down" && index < newOrder.length - 1) {
        ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
      }
      return newOrder
    })
  }

  const handleDownload = async () => {
    try {
      const response = await fetch("/api/generate-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedStyles, componentsOrder }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate project")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "landing-page-project.zip"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading project:", error)
    }
  }

  const sections = componentsOrder.map((id) => {
    const style = selectedStyles[id]
    const componentOption = COMPONENT_OPTIONS.find((option) => option.id === id)
    const variant = componentOption?.variants.find((v) => v.name === style)
    return {
      id,
      label: variant?.label || id.charAt(0).toUpperCase() + id.slice(1),
      style,
      darkMode: variant?.darkMode || false,
    }
  })

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <AppNavbar />
        <div className="flex-1 flex">
          <SidebarProvider defaultOpen>
            <div className="w-60 border-r bg-white">
              <SidebarNavigation
                sections={sections}
                onAdd={handleAdd}
                onSelect={handleSelect}
                onDelete={handleDelete}
                onMove={handleMove}
                selectedSection={selectedSection}
              />
            </div>
            <SidebarInset className="flex-1">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-r px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Laptop className={`h-5 w-5 ${!isMobile ? "text-blue-500" : "text-gray-400"}`} />
                    <Switch
                      checked={isMobile}
                      onCheckedChange={setIsMobile}
                      className="data-[state=checked]:bg-blue-500"
                    />
                    <Smartphone className={`h-5 w-5 ${isMobile ? "text-blue-500" : "text-gray-400"}`} />
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handleDownload} className="bg-blue-500 hover:bg-blue-600">
                        <Download className="mr-2 h-5 w-5" /> Download
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download the source code of your landing page</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex-1 overflow-auto p-6">
                  <Preview
                    selectedStyles={selectedStyles}
                    componentsOrder={componentsOrder}
                    components={{
                      Header1,
                      Header2,
                      Hero1,
                      Hero2,
                      Footer1,
                      Footer2,
                      FAQ1,
                      FAQ2,
                      Pricing1,
                      Pricing2,
                      Pricing3,
                    }}
                    isMobile={isMobile}
                  />
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </TooltipProvider>
  )
}


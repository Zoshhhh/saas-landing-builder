"use client"

import React, { useState, useEffect, useCallback } from "react"
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
import Testimonials1 from "@/components/templates/testimonials/Testimonials1"
import Testimonials2 from "@/components/templates/testimonials/Testimonials2"
import ImageGallery1 from "@/components/templates/gallery/ImageGallery1"
import ImageGallery2 from "@/components/templates/gallery/ImageGallery2"
import { Download, Smartphone, Laptop, LayoutTemplate } from "lucide-react"
import { ComponentDialog, COMPONENT_OPTIONS } from "@/components/app/ComponentDialog"
import { TextEditor } from "../components/TextEditor"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Text1 from "@/components/templates/text/Text1"
import Text2 from "@/components/templates/text/Text2"
import { TemplateDialog } from "@/components/app/TemplateDialog"
import Features from "@/components/templates/divers/Features"
import CTA from "@/components/templates/divers/CTA"
import Services from "@/components/templates/divers/Services"
import Contact from "@/components/templates/divers/Contact"
import About from "@/components/templates/divers/About"

export default function Home() {
  const [selectedStyles, setSelectedStyles] = useState<{ [key: string]: string }>({})
  const [componentsOrder, setComponentsOrder] = useState<string[]>([])
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [editableContent, setEditableContent] = useState<{ [key: string]: string }>({})
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [tempContent, setTempContent] = useState("")
  const [isComponentDialogOpen, setIsComponentDialogOpen] = useState(false)
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false) // Added state for template dialog

  useEffect(() => {
    console.log("State update:", { selectedStyles, componentsOrder, editableContent })
  }, [selectedStyles, componentsOrder, editableContent])

  const handleAdd = useCallback(
      (sectionId: string, style: string) => {
        if (!componentsOrder.includes(sectionId)) {
          setSelectedStyles((prev) => ({ ...prev, [sectionId]: style }))
          setComponentsOrder((prev) => [...prev, sectionId])
          setSelectedSection(sectionId)
          setEditableContent((prev) => ({ ...prev, [sectionId]: "Edit your content here" }))
          console.log(`Added new component: ${sectionId}, style: ${style}`)
        } else {
          console.log(`Component ${sectionId} already exists.`)
        }
      },
      [componentsOrder],
  )

  const handleSelect = useCallback((sectionId: string) => {
    setSelectedSection(sectionId)
  }, [])

  const handleDelete = useCallback((sectionId: string) => {
    setSelectedStyles((prev) => {
      const newStyles = { ...prev }
      delete newStyles[sectionId]
      return newStyles
    })
    setComponentsOrder((prev) => prev.filter((id) => id !== sectionId))
    setSelectedSection(null)
    setEditableContent((prev) => {
      const newContent = { ...prev }
      delete newContent[sectionId]
      return newContent
    })
  }, [])

  const handleMove = useCallback((sectionId: string, direction: "up" | "down") => {
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
  }, [])

  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch("/api/generate-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedStyles, componentsOrder, editableContent }),
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
  }, [selectedStyles, componentsOrder, editableContent])

  const handleContentChange = useCallback((content: string) => {
    setTempContent(content)
  }, [])

  const handleOpenEditor = useCallback(
      (sectionId: string) => {
        setSelectedSection(sectionId)
        setTempContent(editableContent[sectionId] || "")
        setIsEditorOpen(true)
      },
      [editableContent],
  )

  const handleSaveContent = useCallback(() => {
    if (selectedSection) {
      setEditableContent((prev) => ({ ...prev, [selectedSection]: tempContent }))
    }
    setIsEditorOpen(false)
  }, [selectedSection, tempContent])

  const handleCancelEdit = useCallback(() => {
    setTempContent("")
    setIsEditorOpen(false)
  }, [])

  const handleEditStart = useCallback((sectionId: string) => {
    // Editing starts directly in the component
  }, [])

  const handleEditEnd = useCallback((sectionId: string, content: string) => {
    setEditableContent((prev) => ({ ...prev, [sectionId]: content }))
  }, [])

  const handleSelectTemplate = useCallback((components: string[]) => {
    const newSelectedStyles: { [key: string]: string } = {}
    const newEditableContent: { [key: string]: string } = {}

    components.forEach((component) => {
      const componentOption = COMPONENT_OPTIONS.find((option) => option.id === component)
      if (componentOption) {
        newSelectedStyles[component] = componentOption.variants[0].name
        newEditableContent[component] = "Edit your content here"
      }
    })

    setSelectedStyles(newSelectedStyles)
    setComponentsOrder(components)
    setEditableContent(newEditableContent)
    setIsTemplateDialogOpen(false)
  }, [])

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
      <>
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
                      <Button onClick={() => setIsTemplateDialogOpen(true)} variant="outline" className="mr-2">
                        <LayoutTemplate className="mr-2 h-5 w-5" /> Templates
                      </Button>{" "}
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
                            Testimonials1,
                            Testimonials2,
                            ImageGallery1,
                            ImageGallery2,
                            Text1,
                            Text2,
                            Features,
                            CTA,
                            Services,
                            Contact,
                            About,
                          }}
                          isMobile={isMobile}
                          editableContent={editableContent}
                          onEditStart={handleEditStart}
                          onEditEnd={handleEditEnd}
                      />
                    </div>
                  </div>
                </SidebarInset>
              </SidebarProvider>
            </div>
          </div>
          <ComponentDialog
              open={isComponentDialogOpen}
              onOpenChange={setIsComponentDialogOpen}
              onSelect={handleAdd}
              existingComponents={componentsOrder}
          />
          <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
            <DialogContent className="max-w-3xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Edit Content</DialogTitle>
              </DialogHeader>
              <div className="mt-4 max-h-[60vh] overflow-y-auto">
                <TextEditor initialValue={tempContent} onChangeCallback={handleContentChange} />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button onClick={handleSaveContent}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
          <TemplateDialog
              open={isTemplateDialogOpen}
              onOpenChange={setIsTemplateDialogOpen}
              onSelectTemplate={handleSelectTemplate}
          />
        </TooltipProvider>
      </>
  )
}


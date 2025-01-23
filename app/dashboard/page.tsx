"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import Preview from "@/components/Preview"
import { AppNavbar } from "@/components/app/Navbar"
import { SidebarNavigation } from "@/components/app/Sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Download, Smartphone, Laptop, LayoutTemplate } from "lucide-react"
import { ComponentDialog, COMPONENT_OPTIONS } from "@/components/app/ComponentDialog"
import { TextEditor } from "@/components/TextEditor"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TemplateDialog } from "@/components/app/TemplateDialog"
import { InitialChoiceDialog } from "@/components/InitialChoiceDialog"
import dynamic from "next/dynamic"
import type { ComponentType } from "react"

interface ComponentProps {
    content?: string
    onEditStart?: (sectionId: string) => void
    onEditEnd?: (sectionId: string, content: string) => void
}

const componentImports: { [key: string]: ComponentType<ComponentProps> } = {
    Header1: dynamic(() => import("@/components/templates/header/Header1")),
    Header2: dynamic(() => import("@/components/templates/header/Header2")),
    Hero1: dynamic(() => import("@/components/templates/hero/Hero1")),
    Hero2: dynamic(() => import("@/components/templates/hero/Hero2")),
    Footer1: dynamic(() => import("@/components/templates/footer/Footer1")),
    Footer2: dynamic(() => import("@/components/templates/footer/Footer2")),
    FAQ1: dynamic(() => import("@/components/templates/faq/FAQ1")),
    FAQ2: dynamic(() => import("@/components/templates/faq/FAQ2")),
    Pricing1: dynamic(() => import("@/components/templates/pricing/Pricing1")),
    Pricing2: dynamic(() => import("@/components/templates/pricing/Pricing2")),
    Pricing3: dynamic(() => import("@/components/templates/pricing/Pricing3")),
    Testimonials1: dynamic(() => import("@/components/templates/testimonials/Testimonials1")),
    Testimonials2: dynamic(() => import("@/components/templates/testimonials/Testimonials2")),
    ImageGallery1: dynamic(() => import("@/components/templates/gallery/ImageGallery1")),
    ImageGallery2: dynamic(() => import("@/components/templates/gallery/ImageGallery2")),
    Text1: dynamic(() => import("@/components/templates/text/Text1")),
    Text2: dynamic(() => import("@/components/templates/text/Text2")),
    Features: dynamic(() => import("@/components/templates/divers/Features")),
    CTA: dynamic(() => import("@/components/templates/divers/CTA")),
    Services: dynamic(() => import("@/components/templates/divers/Services")),
    Contact: dynamic(() => import("@/components/templates/divers/Contact")),
    About: dynamic(() => import("@/components/templates/divers/About")),
    FeaturedPosts: dynamic(() => import("@/components/templates/divers/FeaturedPosts")),
    PostGrid: dynamic(() => import("@/components/templates/divers/PostGrid")),
    Newsletter: dynamic(() => import("@/components/templates/divers/Newsletter")),
    Schedule: dynamic(() => import("@/components/templates/event/Schedule")),
    Speakers: dynamic(() => import("@/components/templates/event/Speakers")),
    Registration: dynamic(() => import("@/components/templates/event/Registration")),
    Venue: dynamic(() => import("@/components/templates/event/Venue")),
}

export default function Home() {
    const [selectedStyles, setSelectedStyles] = useState<{ [key: string]: string }>({})
    const [componentsOrder, setComponentsOrder] = useState<string[]>([])
    const [selectedSection, setSelectedSection] = useState<string | null>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [editableContent, setEditableContent] = useState<{ [key: string]: string }>({})
    const [isEditorOpen, setIsEditorOpen] = useState(false)
    const [tempContent, setTempContent] = useState("")
    const [isComponentDialogOpen, setIsComponentDialogOpen] = useState(false)
    const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
    const [isInitialChoiceDialogOpen, setIsInitialChoiceDialogOpen] = useState(true)
    const [showStartMessage, setShowStartMessage] = useState(false)

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

    const handleSelectTemplate = useCallback((components: Array<{ id: string; variant: string }>) => {
        const newSelectedStyles: { [key: string]: string } = {}
        const newEditableContent: { [key: string]: string } = {}
        const newComponentsOrder: string[] = []

        components.forEach(({ id, variant }) => {
            newSelectedStyles[id] = variant
            newEditableContent[id] = "Edit your content here"
            newComponentsOrder.push(id)
        })

        setSelectedStyles(newSelectedStyles)
        setComponentsOrder(newComponentsOrder)
        setEditableContent(newEditableContent)
        setIsTemplateDialogOpen(false)
        setIsInitialChoiceDialogOpen(false)
    }, [])

    const handleChooseBlank = useCallback(() => {
        setIsInitialChoiceDialogOpen(false)
        setShowStartMessage(true)
    }, [])

    const handleChooseTemplate = useCallback(() => {
        setIsInitialChoiceDialogOpen(false)
        setIsTemplateDialogOpen(true)
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
                                            components={componentImports}
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
            </TooltipProvider>
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
            {isInitialChoiceDialogOpen && (
                <InitialChoiceDialog
                    open={isInitialChoiceDialogOpen}
                    onOpenChange={setIsInitialChoiceDialogOpen}
                    onChooseBlank={handleChooseBlank}
                    onChooseTemplate={handleChooseTemplate}
                />
            )}
        </>
    )
}


"use client"

import React, { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import {
  Plus,
  ChevronUp,
  ChevronDown,
  Trash2,
  Layout,
  Type,
  CreditCard,
  HelpCircle,
  FootprintsIcon as FooterIcon,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ComponentDialog } from "@/components/app/ComponentDialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarNavigationProps {
  sections: {
    id: string
    label: string
    style: string
    darkMode: boolean
  }[]
  onAdd: (sectionId: string, style: string) => void
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onMove: (id: string, direction: "up" | "down") => void
  selectedSection: string | null
}

const getIconForSection = (sectionId: string) => {
  switch (sectionId) {
    case "header":
      return <Layout className="h-4 w-4 mr-2" />
    case "hero":
      return <Type className="h-4 w-4 mr-2" />
    case "pricing":
      return <CreditCard className="h-4 w-4 mr-2" />
    case "faq":
      return <HelpCircle className="h-4 w-4 mr-2" />
    case "footer":
      return <FooterIcon className="h-4 w-4 mr-2" />
    default:
      return <Layout className="h-4 w-4 mr-2" />
  }
}

export function SidebarNavigation({
                                    sections,
                                    onAdd,
                                    onSelect,
                                    onDelete,
                                    onMove,
                                    selectedSection,
                                  }: SidebarNavigationProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSections = sections.filter((section) => section.label.toLowerCase().includes(searchTerm.toLowerCase()))

  useEffect(() => {
    console.log("Sections updated:", sections)
  }, [sections])

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update the order in the parent component
    items.forEach((item, index) => {
      if (index !== sections.indexOf(item)) {
        onMove(item.id, index > sections.indexOf(item) ? "down" : "up")
      }
    })
  }

  return (
      <>
        <div className="h-full flex flex-col w-full">
          <div className="border-b border-r px-2 py-2 pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Components</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Input
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4 text-gray-400" />}
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="components">
                {(provided) => (
                    <SidebarMenu {...provided.droppableProps} ref={provided.innerRef}>
                      {filteredSections.map((section, index) => (
                          <Draggable key={section.id} draggableId={section.id} index={index}>
                            {(provided) => (
                                <SidebarMenuItem
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                  <div
                                      onClick={() => onSelect(section.id)}
                                      className={cn(
                                          "flex items-center w-full px-2 py-2 hover:bg-gray-100 cursor-pointer rounded-md",
                                          selectedSection === section.id && "bg-gray-100",
                                      )}
                                  >
                                    <div className="flex items-center flex-1">
                                      {getIconForSection(section.id)}
                                      <span className="text-sm">{section.label}</span>
                                      {section.darkMode ? (
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-4 w-4 text-yellow-500 ml-2"
                                              viewBox="0 0 20 20"
                                              fill="currentColor"
                                          >
                                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                          </svg>
                                      ) : (
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-4 w-4 text-gray-400 ml-2"
                                              viewBox="0 0 20 20"
                                              fill="currentColor"
                                          >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                                clipRule="evenodd"
                                            />
                                          </svg>
                                      )}
                                    </div>
                                    <div className="flex transition-opacity ml-2">
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  onMove(section.id, "up")
                                                }}
                                            >
                                              <ChevronUp className="h-4 w-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Move up</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  onMove(section.id, "down")
                                                }}
                                            >
                                              <ChevronDown className="h-4 w-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Move down</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-red-500 hover:text-red-700"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  onDelete(section.id)
                                                }}
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Delete component</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  </div>
                                </SidebarMenuItem>
                            )}
                          </Draggable>
                      ))}
                      {provided.placeholder}
                    </SidebarMenu>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        <ComponentDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onSelect={onAdd}
            existingComponents={sections.map((s) => s.id)}
        />
      </>
  )
}


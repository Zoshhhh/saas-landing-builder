"use client"

import React, { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import {
  Plus,
  ChevronDown,
  Trash2,
  Layout,
  Type,
  CreditCard,
  HelpCircle,
  FootprintsIcon as FooterIcon,
  Search,
  Code,
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ComponentDialog } from "@/components/app/ComponentDialog"
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CodeViewer } from "@/components/CodeViewer"
import { ColorPickerDialog, ComponentColors } from "../ColorPickerDialog"

interface SidebarNavigationProps {
  sections: {
    id: string
    label: string
    style: string
    darkMode: boolean
    colors?: {
      textColor: string
      backgroundColor: string
      buttonColor: string
      buttonTextColor: string
    }
  }[]
  onAdd: (sectionId: string, style: string) => void
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onMove: (id: string, direction: "up" | "down") => void
  onUpdateColors: (id: string, colors: ComponentColors) => void
  selectedSection: string | null
}

const getIconForSection = (sectionId: string): React.ReactElement => {
  switch (sectionId.split("-")[0]) {
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

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
                                                                      sections,
                                                                      onAdd,
                                                                      onSelect,
                                                                      onDelete,
                                                                      onMove,
                                                                      selectedSection,
                                                                      onUpdateColors,
                                                                    }: SidebarNavigationProps) => {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [codeViewerOpen, setCodeViewerOpen] = useState(false)
  const [currentCode, setCurrentCode] = useState("")
  const [currentFileName, setCurrentFileName] = useState("")
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [colors, setColors] = useState<any>({});

  const handleOpenColorPicker = (sectionId: string) => {
    setSelectedComponentId(sectionId);
    if (!colors[sectionId]) {
      setColors((prev: any) => ({
        ...prev,
        [sectionId]: {
          textColor: '#000000',
          backgroundColor: '#ffffff',
          buttonColor: '#000000',
          buttonTextColor: '#ffffff'
        }
      }));
    }
    setColorPickerOpen(true);
  }
  console.log(colors)
  
  const handleSaveColors = (colors: ComponentColors) => {
    if (!selectedComponentId) return;
    
    console.log('Saving colors for component:', selectedComponentId, colors);
    onUpdateColors(selectedComponentId, colors);
    setColorPickerOpen(false);
  }

  const filteredSections = sections.filter((section) => section.label.toLowerCase().includes(searchTerm.toLowerCase()))

  useEffect(() => {
    console.log("Sections updated:", sections)
  }, [sections])

  const onDragEnd = (result: DropResult) => {
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

  const loadComponentCode = async (sectionId: string, style: string) => {
    try {
      const response = await fetch(`/api/component-code?id=${sectionId}&style=${style}`)
      if (!response.ok) throw new Error("Failed to fetch component code")
      const code = await response.text()
      setCurrentCode(code)
      setCurrentFileName(`${style}.tsx`)
      setCodeViewerOpen(true)
    } catch (error) {
      console.error("Error loading component code:", error)
    }
  }

  return (
      <>
        <div className="h-full flex flex-col w-full">
          <div className="border-b border-r px-2 py-2 pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">Components</span>
              <div className="flex items-center ml-auto space-x-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors duration-200"
                    onClick={() => setDialogOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
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
                                          "flex items-center w-full px-2 py-2 hover:bg-gray-100 cursor-pointer rounded-md group",
                                          selectedSection === section.id && "bg-gray-100",
                                      )}
                                  >
                                    <div className="flex items-center flex-1">
                                      {getIconForSection(section.id)}
                                      <span className="text-sm truncate max-w-[100px]">{section.label}</span>
                                    </div>
                                    <div className="flex items-center ml-auto space-x-1">
                                      <TooltipProvider>
                                      <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-6 w-6 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors duration-200"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                handleOpenColorPicker(section.id)
                                              }}
                                            >
                                              <Palette className="h-4 w-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Customize Colors</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors duration-200"
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
                                                className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors duration-200"
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
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors duration-200"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  loadComponentCode(section.id, section.style)
                                                }}
                                            >
                                              <Code className="h-4 w-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>View Source Code</p>
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
        <CodeViewer
            open={codeViewerOpen}
            onOpenChange={setCodeViewerOpen}
            code={currentCode}
            fileName={currentFileName}
        />
        <ColorPickerDialog
        open={colorPickerOpen}
        onOpenChange={setColorPickerOpen}
        onSave={handleSaveColors}
        colors={colors}
        setColors={setColors}
        componentId={selectedComponentId || ''}
      />
      </>
  )
}

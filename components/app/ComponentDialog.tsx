"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Layout,
  Type,
  CreditCard,
  HelpCircle,
  FootprintsIcon,
  MessageSquare,
  Image,
  Zap,
  PhoneCall,
  Info,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ComponentOption {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  variants: {
    name: string
    label: string
    darkMode: boolean
  }[]
}

export const COMPONENT_OPTIONS: ComponentOption[] = [
  {
    id: "header",
    label: "Header",
    icon: <Layout className="h-5 w-5" />,
    color: "bg-pink-100",
    variants: [
      { name: "Header1", label: "Simple", darkMode: true },
      { name: "Header2", label: "With Navigation", darkMode: true },
    ],
  },
  {
    id: "hero",
    label: "Hero",
    icon: <Type className="h-5 w-5" />,
    color: "bg-blue-100",
    variants: [
      { name: "Hero1", label: "Centered", darkMode: true },
      { name: "Hero2", label: "Split", darkMode: false },
    ],
  },
  {
    id: "gallery",
    label: "Image Gallery",
    icon: <Image className="h-5 w-5" />,
    color: "bg-green-100",
    variants: [
      { name: "ImageGallery1", label: "Featured Image", darkMode: false },
      { name: "ImageGallery2", label: "Grid with Lightbox", darkMode: false },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    icon: <CreditCard className="h-5 w-5" />,
    color: "bg-yellow-100",
    variants: [
      { name: "Pricing1", label: "Classic", darkMode: true },
      { name: "Pricing2", label: "Feature Comparison", darkMode: false },
      { name: "Pricing3", label: "Gradient", darkMode: false },
    ],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: <MessageSquare className="h-5 w-5" />,
    color: "bg-purple-100",
    variants: [
      { name: "Testimonials1", label: "Grid Layout", darkMode: false },
      { name: "Testimonials2", label: "Carousel", darkMode: false },
    ],
  },
  {
    id: "faq",
    label: "FAQ",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "bg-indigo-100",
    variants: [
      { name: "FAQ1", label: "Simple Accordion", darkMode: false },
      { name: "FAQ2", label: "Categorized with Links", darkMode: false },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    icon: <FootprintsIcon className="h-5 w-5" />,
    color: "bg-red-100",
    variants: [
      { name: "Footer1", label: "Simple", darkMode: true },
      { name: "Footer2", label: "With Links", darkMode: false },
    ],
  },
  {
    id: "text",
    label: "Text",
    icon: <Type className="h-5 w-5" />,
    color: "bg-purple-100",
    variants: [
      { name: "Text1", label: "Simple Text", darkMode: false },
      { name: "Text2", label: "Two-Column Text", darkMode: false },
    ],
  },
  {
    id: "divers",
    label: "Divers",
    icon: <Layout className="h-5 w-5" />,
    color: "bg-indigo-100",
    variants: [
      { name: "Features", label: "Feature Grid", darkMode: false },
      { name: "CTA", label: "Call to Action", darkMode: false },
      { name: "Services", label: "Service Cards", darkMode: false },
      { name: "Contact", label: "Contact Form", darkMode: false },
      { name: "About", label: "About Section", darkMode: false },
    ],
  },
  {
    id: "features",
    label: "Features",
    icon: <Zap className="h-5 w-5" />,
    color: "bg-yellow-100",
    variants: [{ name: "Features", label: "Feature Grid", darkMode: false }],
  },
]

interface ComponentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (componentId: string, variant: string) => void
  existingComponents: string[]
}

export function ComponentDialog({ open, onOpenChange, onSelect, existingComponents }: ComponentDialogProps) {
  const [selectedComponent, setSelectedComponent] = React.useState<ComponentOption | null>(null)
  const availableComponents = COMPONENT_OPTIONS.filter((component) => !existingComponents.includes(component.id))

  if (availableComponents.length === 0) {
    return null
  }

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="text-lg font-medium">Add a component</DialogTitle>
          </DialogHeader>
          <div className="flex flex-1 overflow-hidden">
            <div className="w-1/3 border-r">
              <ScrollArea className="h-full py-2">
                {availableComponents.map((component) => (
                    <ComponentButton
                        key={component.id}
                        component={component}
                        isSelected={selectedComponent?.id === component.id}
                        onClick={() => setSelectedComponent(component)}
                    />
                ))}
              </ScrollArea>
            </div>
            <div className="flex-1">
              <ScrollArea className="h-full p-4">
                <AnimatePresence mode="wait">
                  {selectedComponent ? (
                      <motion.div
                          key={selectedComponent.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                      >
                        <h3 className="text-sm font-medium text-gray-500">Select a variant</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedComponent.variants.map((variant) => (
                              <VariantCard
                                  key={variant.name}
                                  variant={variant}
                                  onClick={() => {
                                    onSelect(selectedComponent.id, variant.name)
                                    onOpenChange(false)
                                  }}
                              />
                          ))}
                        </div>
                      </motion.div>
                  ) : (
                      <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="h-full flex items-center justify-center text-gray-500 text-sm"
                      >
                        Select a component type
                      </motion.div>
                  )}
                </AnimatePresence>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  )
}

interface ComponentButtonProps {
  component: ComponentOption
  isSelected: boolean
  onClick: () => void
}

function ComponentButton({ component, isSelected, onClick }: ComponentButtonProps) {
  return (
      <button
          className={cn(
              "flex items-center w-full px-3 py-2 text-left transition-colors text-sm",
              isSelected ? "bg-gray-100" : "hover:bg-gray-50",
          )}
          onClick={onClick}
      >
        <span className={cn("p-1.5 rounded-md mr-2", component.color)}>{component.icon}</span>
        <span className="font-medium">{component.label}</span>
      </button>
  )
}

interface VariantCardProps {
  variant: {
    name: string
    label: string
    darkMode: boolean
  }
  onClick: (variantName: string) => void
}

function VariantCard({ variant, onClick }: VariantCardProps) {
  return (
      <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => onClick(variant.name)}
          className={cn(
              "w-full text-left rounded-lg overflow-hidden transition-colors hover:bg-gray-50",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
          )}
      >
        <div className="aspect-video w-full bg-gray-100 p-2">
          <div className="w-full h-full flex flex-col">
            <div className="h-2 w-16 bg-gray-300 rounded mb-2"></div>
            <div className="flex-1 flex space-x-2">
              <div className="w-2/3 bg-gray-300 rounded"></div>
              <div className="w-1/3 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        <div className="p-2">
          <span className="text-xs font-medium">{variant.label}</span>
        </div>
      </motion.button>
  )
}


"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

interface Template {
    name: string
    description: string
    components: string[]
}

const TEMPLATES: Template[] = [
    {
        name: "Basic Landing Page",
        description: "A simple and effective homepage to showcase your product or service.",
        components: ["header", "hero", "features", "cta", "footer"],
    },
    {
        name: "Product Page",
        description: "Highlight your product with a gallery, pricing, and testimonials.",
        components: ["header", "hero", "gallery", "features", "pricing", "testimonials", "cta", "faq", "footer"],
    },
    {
        name: "Service Page",
        description: "Present your services with detailed sections and calls to action.",
        components: ["header", "hero", "services", "features", "testimonials", "pricing", "cta", "contact", "footer"],
    },
    {
        name: "Portfolio",
        description: "Showcase your best work with an elegant and professional layout.",
        components: ["header", "hero", "gallery", "about", "contact", "footer"],
    },
    {
        name: "Blog",
        description: "A clean design to highlight your articles and engage your readers.",
        components: ["header", "featured-posts", "post-grid", "newsletter", "footer"],
    },
    {
        name: "Event",
        description: "Perfect for promoting your events and managing registrations.",
        components: ["header", "hero", "schedule", "speakers", "registration", "venue", "footer"],
    },
]

interface TemplateDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelectTemplate: (components: string[]) => void
}

export function TemplateDialog({ open, onOpenChange, onSelectTemplate }: TemplateDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Choose a Template</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TEMPLATES.map((template, index) => (
                            <motion.div
                                key={template.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <TemplateCard template={template} onSelect={onSelectTemplate} />
                            </motion.div>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

interface TemplateCardProps {
    template: Template
    onSelect: (components: string[]) => void
}

function TemplateCard({ template, onSelect }: TemplateCardProps) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col h-full">
            <Skeleton className="w-full h-48" />
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{template.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {template.components.map((component) => (
                        <span key={component} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {component}
            </span>
                    ))}
                </div>
            </div>
            <div className="p-4 bg-gray-50">
                <Button onClick={() => onSelect(template.components)} className="w-full">
                    Use this Template
                </Button>
            </div>
        </div>
    )
}


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
    components: Array<{
        id: string
        variant: string
    }>
}

const TEMPLATES: Template[] = [
    {
        name: "Basic Landing Page",
        description: "A simple and effective homepage to showcase your product or service.",
        components: [
            { id: "header", variant: "Header1" },
            { id: "hero", variant: "Hero1" },
            { id: "features", variant: "Features" },
            { id: "cta", variant: "CTA" },
            { id: "footer", variant: "Footer1" },
        ],
    },
    {
        name: "Product Page",
        description: "Highlight your product with a gallery, pricing, and testimonials.",
        components: [
            { id: "header", variant: "Header2" },
            { id: "hero", variant: "Hero2" },
            { id: "gallery", variant: "ImageGallery1" },
            { id: "features", variant: "Features" },
            { id: "pricing", variant: "Pricing1" },
            { id: "testimonials", variant: "Testimonials1" },
            { id: "cta", variant: "CTA" },
            { id: "faq", variant: "FAQ1" },
            { id: "footer", variant: "Footer2" },
        ],
    },
    {
        name: "Service Page",
        description: "Present your services with detailed sections and calls to action.",
        components: [
            { id: "header", variant: "Header1" },
            { id: "hero", variant: "Hero1" },
            { id: "services", variant: "Services" },
            { id: "features", variant: "Features" },
            { id: "testimonials", variant: "Testimonials2" },
            { id: "pricing", variant: "Pricing2" },
            { id: "cta", variant: "CTA" },
            { id: "contact", variant: "Contact" },
            { id: "footer", variant: "Footer1" },
        ],
    },
    {
        name: "Portfolio",
        description: "Showcase your best work with an elegant and professional layout.",
        components: [
            { id: "header", variant: "Header1" },
            { id: "hero", variant: "Hero1" },
            { id: "gallery", variant: "ImageGallery2" },
            { id: "about", variant: "About" },
            { id: "contact", variant: "Contact" },
            { id: "footer", variant: "Footer1" },
        ],
    },
    {
        name: "Blog",
        description: "A clean design to highlight your articles and engage your readers.",
        components: [
            { id: "header", variant: "Header1" },
            { id: "featured-posts", variant: "FeaturedPosts" },
            { id: "post-grid", variant: "PostGrid" },
            { id: "newsletter", variant: "Newsletter" },
            { id: "footer", variant: "Footer1" },
        ],
    },
    {
        name: "Event",
        description: "Perfect for promoting your events and managing registrations.",
        components: [
            { id: "header", variant: "Header1" },
            { id: "hero", variant: "Hero1" },
            { id: "schedule", variant: "Schedule" },
            { id: "speakers", variant: "Speakers" },
            { id: "registration", variant: "Registration" },
            { id: "venue", variant: "Venue" },
            { id: "footer", variant: "Footer1" },
        ],
    },
]

interface TemplateDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelectTemplate: (components: Array<{ id: string; variant: string }>) => void
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
    onSelect: (components: Array<{ id: string; variant: string }>) => void
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
                        <span key={component.id} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {component.id}
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


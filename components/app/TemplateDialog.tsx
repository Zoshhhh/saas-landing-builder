"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

interface Template {
    name: string
    description: string
    components: Array<{
        id: string
        variant: string
    }>
    image: string
    video: string
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
        image: "/basic.png",
        video: "/basic.mp4",
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
        image: "/product.png",
        video: "/product.mp4",
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
        image: "/service.png",
        video: "/service.mp4",
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
        image: "/portfolio.png",
        video: "/portfolio.mp4",
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
        image: "/blog.png",
        video: "/blog.mp4",
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
        image: "/event.png",
        video: "/event.mp4",
    },
    {
        name: "Crypto",
        description: "Il faut changer le text brother oublie pas :)",
        components: [
            { id: "header", variant: "HeaderCrypto" },
            { id: "hero", variant: "HeroCrypto" },
            { id: "features", variant: "FeaturesCrypto" },
            { id: "cta", variant: "CTACrypto" },
            { id: "image", variant: "ImageGalleryCrypto" },
            { id: "testimonials", variant: "TestimonialsCrypto" },
            { id: "footer", variant: "FooterCrypto" },
        ],
        image: "/event.png",
        video: "/event.mp4",
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
                <ScrollArea className="max-h-[calc(80vh-120px)] pr-4 mt-4">
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
    const [isHovering, setIsHovering] = React.useState(false)

    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col h-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="relative w-full h-36">
                <img src={template.image || "/placeholder.svg"} alt={template.name} className="w-full h-full object-cover" />
                {isHovering && (
                    <video
                        src={template.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-2 flex-grow">{template.description}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                    {template.components.map((component) => (
                        <span key={component.id} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {component.id}
            </span>
                    ))}
                </div>
                <Button
                    onClick={() => onSelect(template.components)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 py-1.5 text-sm font-medium rounded-md shadow-sm hover:shadow-md"
                >
                    Use this Template
                </Button>
            </div>
        </div>
    )
}


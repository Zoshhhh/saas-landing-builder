"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar"
import { ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input"

const chapters = [
    { id: "getting-started", title: "Getting Started" },
    { id: "components", title: "Components" },
    { id: "customization", title: "Customization" },
    { id: "deployment", title: "Deployment" },
    { id: "faq", title: "FAQ" },
]

export default function DocumentationPage() {
    const [activeChapter, setActiveChapter] = useState(chapters[0].id)

    return (
        <SidebarProvider>
            <div className="flex h-screen">
                <Sidebar className="w-64 border-r">
                    <SidebarHeader className="p-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Documentation</h2>
                        <Link href="/">
                            <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </SidebarHeader>
                    <div className="px-4 py-2">
                        <Input type="search" placeholder="Search documentation..." className="w-full" />
                    </div>
                    <SidebarContent>
                        <SidebarMenu>
                            {chapters.map((chapter) => (
                                <SidebarMenuItem key={chapter.id}>
                                    <SidebarMenuButton
                                        onClick={() => setActiveChapter(chapter.id)}
                                        isActive={activeChapter === chapter.id}
                                        className="w-full text-left px-4 py-2 rounded-md transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        {chapter.title}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
                <SidebarInset className="flex-1 overflow-auto">
                    <ScrollArea className="h-full">
                        <div className="p-8 w-full">
                            <nav className="flex mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                    <li className="inline-flex items-center">
                                        <Link href="#" className="hover:text-blue-600">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <span className="mx-2">/</span>
                                            <Link href="#" className="hover:text-blue-600">
                                                Documentation
                                            </Link>
                                        </div>
                                    </li>
                                    <li aria-current="page">
                                        <div className="flex items-center">
                                            <span className="mx-2">/</span>
                                            <span className="text-gray-700">{chapters.find((c) => c.id === activeChapter)?.title}</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                            <h1 className="text-3xl font-bold mb-6">{chapters.find((c) => c.id === activeChapter)?.title}</h1>
                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <h2 className="text-lg font-semibold mb-2">In this chapter:</h2>
                                <ul className="list-disc pl-5 space-y-1">
                                    {activeChapter === "getting-started" && (
                                        <>
                                            <li>
                                                <a href="#quick-start" className="text-blue-600 hover:underline">
                                                    Quick Start Guide
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#key-concepts" className="text-blue-600 hover:underline">
                                                    Key Concepts
                                                </a>
                                            </li>
                                        </>
                                    )}
                                    {activeChapter === "components" && (
                                        <>
                                            <li>
                                                <a href="#available-components" className="text-blue-600 hover:underline">
                                                    Available Components
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#customizing-components" className="text-blue-600 hover:underline">
                                                    Customizing Components
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#downloading-your-project" className="text-blue-600 hover:underline">
                                                    Downloading Your Project
                                                </a>
                                            </li>
                                        </>
                                    )}
                                    {/* Add more chapter-specific table of contents as needed */}
                                </ul>
                            </div>
                            <div className="prose prose-blue max-w-none">
                                <p className="text-lg text-gray-700 mb-6">
                                    Welcome to the {chapters.find((c) => c.id === activeChapter)?.title.toLowerCase()} section of our
                                    documentation. Here you'll find everything you need to know about using our Landing Page Generator.
                                </p>
                                {activeChapter === "getting-started" && (
                                    <>
                                        <h2 id="quick-start" className="text-2xl font-semibold mt-8 mb-4">
                                            Quick Start Guide
                                        </h2>
                                        <ol className="list-decimal pl-6 space-y-2 mb-8">
                                            <li>Navigate to the landing page generator interface.</li>
                                            <li>Choose a template or start with a blank page.</li>
                                            <li>Use the sidebar to add and customize components for your landing page.</li>
                                            <li>Preview your landing page and make any necessary adjustments.</li>
                                            <li>When satisfied, click "Download" to get the source code of your landing page.</li>
                                        </ol>
                                        <h2 id="key-concepts" className="text-2xl font-semibold mt-8 mb-4">
                                            Key Concepts
                                        </h2>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>
                                                <strong>Components:</strong> Building blocks of your landing page (e.g., headers, hero sections,
                                                features).
                                            </li>
                                            <li>
                                                <strong>Templates:</strong> Pre-designed layouts that you can use as a starting point for your
                                                landing page.
                                            </li>
                                            <li>
                                                <strong>Customization:</strong> Ability to modify colors, fonts, and content of each component.
                                            </li>
                                            <li>
                                                <strong>Preview:</strong> Real-time visualization of your landing page as you build it.
                                            </li>
                                            <li>
                                                <strong>Download:</strong> Option to get the complete source code of your landing page for
                                                further development or hosting.
                                            </li>
                                        </ul>
                                        {/* Ajout de contenu supplémentaire et de squelettes */}
                                        <h2 className="text-2xl font-semibold mt-8 mb-4">Additional Resources</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                            <div className="bg-gray-200 h-40 rounded-lg animate-pulse"></div>
                                            <div className="bg-gray-200 h-40 rounded-lg animate-pulse"></div>
                                        </div>
                                        <h2 className="text-2xl font-semibold mt-8 mb-4">Video Tutorial</h2>
                                        <div className="bg-gray-200 h-64 w-full rounded-lg animate-pulse mb-8"></div>
                                        <h2 className="text-2xl font-semibold mt-8 mb-4">Frequently Asked Questions</h2>
                                        <div className="space-y-4 mb-8">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="bg-gray-200 h-16 rounded-lg animate-pulse"></div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                {activeChapter === "components" && (
                                    <>
                                        <h2 id="available-components" className="text-2xl font-semibold mt-8 mb-4">
                                            Available Components
                                        </h2>
                                        <ul className="grid grid-cols-2 gap-4 mb-8">
                                            <li className="bg-white p-4 rounded-lg shadow">
                                                <h3 className="font-semibold mb-2">Headers</h3>
                                                <p className="text-sm text-gray-600">
                                                    Navigation and branding elements for the top of your page.
                                                </p>
                                            </li>
                                            <li className="bg-white p-4 rounded-lg shadow">
                                                <h3 className="font-semibold mb-2">Hero Sections</h3>
                                                <p className="text-sm text-gray-600">
                                                    Eye-catching introductions to capture visitor attention.
                                                </p>
                                            </li>
                                            <li className="bg-white p-4 rounded-lg shadow">
                                                <h3 className="font-semibold mb-2">Feature Lists</h3>
                                                <p className="text-sm text-gray-600">Highlight your product or service's key features.</p>
                                            </li>
                                            <li className="bg-white p-4 rounded-lg shadow">
                                                <h3 className="font-semibold mb-2">Pricing Tables</h3>
                                                <p className="text-sm text-gray-600">
                                                    Display your pricing options in a clear, attractive format.
                                                </p>
                                            </li>
                                            <li className="bg-white p-4 rounded-lg shadow">
                                                <h3 className="font-semibold mb-2">Testimonials</h3>
                                                <p className="text-sm text-gray-600">Showcase customer reviews and feedback.</p>
                                            </li>
                                            <li className="bg-white p-4 rounded-lg shadow">
                                                <h3 className="font-semibold mb-2">Contact Forms</h3>
                                                <p className="text-sm text-gray-600">
                                                    Allow visitors to get in touch or sign up for newsletters.
                                                </p>
                                            </li>
                                        </ul>
                                        <h2 id="customizing-components" className="text-2xl font-semibold mt-8 mb-4">
                                            Customizing Components
                                        </h2>
                                        <p className="mb-4">
                                            Each component can be easily customized to match your brand and requirements. Here's how:
                                        </p>
                                        <ol className="list-decimal pl-6 space-y-2 mb-8">
                                            <li>Select a component from the sidebar to add it to your landing page.</li>
                                            <li>Use the component settings panel to adjust colors, fonts, and content.</li>
                                            <li>Preview changes in real-time in the main editor area.</li>
                                            <li>Reorder components using the sidebar controls if needed.</li>
                                        </ol>
                                        <h2 id="downloading-your-project" className="text-2xl font-semibold mt-8 mb-4">
                                            Downloading Your Project
                                        </h2>
                                        <p className="mb-4">
                                            Once you've finished designing your landing page, you can easily download the complete source
                                            code:
                                        </p>
                                        <ol className="list-decimal pl-6 space-y-2 mb-8">
                                            <li>Click the "Download" button in the top right corner of the interface.</li>
                                            <li>Wait for the generator to compile your project.</li>
                                            <li>Save the downloaded ZIP file to your computer.</li>
                                            <li>Extract the ZIP file to access your project files.</li>
                                            <li>Use these files with your preferred development environment or hosting service.</li>
                                        </ol>
                                        {/* Ajout de contenu supplémentaire et de squelettes */}
                                        <h2 className="text-2xl font-semibold mt-8 mb-4">Additional Resources</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                            <div className="bg-gray-200 h-40 rounded-lg animate-pulse"></div>
                                            <div className="bg-gray-200 h-40 rounded-lg animate-pulse"></div>
                                        </div>
                                        <h2 className="text-2xl font-semibold mt-8 mb-4">Video Tutorial</h2>
                                        <div className="bg-gray-200 h-64 w-full rounded-lg animate-pulse mb-8"></div>
                                        <h2 className="text-2xl font-semibold mt-8 mb-4">Frequently Asked Questions</h2>
                                        <div className="space-y-4 mb-8">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="bg-gray-200 h-16 rounded-lg animate-pulse"></div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                {/* Add more content for other chapters as needed */}
                            </div>
                        </div>
                    </ScrollArea>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}


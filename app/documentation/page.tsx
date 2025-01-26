"use client"

import { useState, useEffect } from "react"
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
import { ChevronLeft, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"

const chapters = [
    { id: "getting-started", title: "Getting Started" },
    { id: "components", title: "Components" },
    { id: "customization", title: "Customization" },
    { id: "deployment", title: "Deployment" },
    { id: "faq", title: "FAQ" },
]

export default function DocumentationPage() {
    const [activeChapter, setActiveChapter] = useState(chapters[0].id)
    const [progress, setProgress] = useState(0)
    const [showScrollTop, setShowScrollTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const calculatedProgress = (scrollTop / scrollHeight) * 100
            setProgress(calculatedProgress)
            setShowScrollTop(scrollTop > 300)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const router = useRouter()

    const handleBackToDashboard = () => {
        // Tentative de fermeture de l'onglet
        window.close()

        // Si la fermeture échoue (bloquée par le navigateur), afficher un message
        setTimeout(() => {
            alert(
                "Impossible de fermer automatiquement l'onglet. Veuillez le fermer manuellement pour retourner au tableau de bord.",
            )
        }, 100)
    }

    return (
        <SidebarProvider>
            <div className="flex h-screen">
                <Sidebar className="w-64 border-r">
                    <SidebarHeader className="p-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Documentation</h2>
                        <Button
                            variant="default"
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={handleBackToDashboard}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
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
                <SidebarInset className="flex-1 overflow-auto relative">
                    <ScrollArea className="h-full">
                        <div className="p-8 w-full">
                            <nav className="flex mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                    <li className="inline-flex items-center">
                                        <Link href="/" className="hover:text-blue-600">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <span className="mx-2">/</span>
                                            <Link href="/documentation" className="hover:text-blue-600">
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
                            <Progress value={progress} className="w-full mb-6" />
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
                                            <li>
                                                <a href="#interactive-demo" className="text-blue-600 hover:underline">
                                                    Interactive Demo
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
                                                <a href="#component-best-practices" className="text-blue-600 hover:underline">
                                                    Component Best Practices
                                                </a>
                                            </li>
                                        </>
                                    )}
                                    {activeChapter === "customization" && (
                                        <>
                                            <li>
                                                <a href="#styling-options" className="text-blue-600 hover:underline">
                                                    Styling Options
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#content-editing" className="text-blue-600 hover:underline">
                                                    Content Editing
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#advanced-customization" className="text-blue-600 hover:underline">
                                                    Advanced Customization
                                                </a>
                                            </li>
                                        </>
                                    )}
                                    {activeChapter === "deployment" && (
                                        <>
                                            <li>
                                                <a href="#exporting-your-project" className="text-blue-600 hover:underline">
                                                    Exporting Your Project
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#hosting-options" className="text-blue-600 hover:underline">
                                                    Hosting Options
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#deployment-best-practices" className="text-blue-600 hover:underline">
                                                    Deployment Best Practices
                                                </a>
                                            </li>
                                        </>
                                    )}
                                    {activeChapter === "faq" && (
                                        <>
                                            <li>
                                                <a href="#frequently-asked-questions" className="text-blue-600 hover:underline">
                                                    Frequently Asked Questions
                                                </a>
                                            </li>
                                        </>
                                    )}
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
                                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                                            <p className="text-sm text-blue-700">
                                                <strong>Pro Tip:</strong> Start with a template that closely matches your vision to save time,
                                                then customize it to make it unique.
                                            </p>
                                        </div>
                                        <h2 id="key-concepts" className="text-2xl font-semibold mt-8 mb-4">
                                            Key Concepts
                                        </h2>
                                        <Tabs defaultValue="components" className="w-full mb-6">
                                            <TabsList>
                                                <TabsTrigger value="components">Components</TabsTrigger>
                                                <TabsTrigger value="templates">Templates</TabsTrigger>
                                                <TabsTrigger value="customization">Customization</TabsTrigger>
                                                <TabsTrigger value="preview">Preview</TabsTrigger>
                                                <TabsTrigger value="download">Download</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="components">
                                                <Card>
                                                    <CardContent className="pt-6">
                                                        <p>Building blocks of your landing page (e.g., headers, hero sections, features).</p>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="templates">
                                                <Card>
                                                    <CardContent className="pt-6">
                                                        <p>Pre-designed layouts that you can use as a starting point for your landing page.</p>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="customization">
                                                <Card>
                                                    <CardContent className="pt-6">
                                                        <p>Ability to modify colors, fonts, and content of each component.</p>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="preview">
                                                <Card>
                                                    <CardContent className="pt-6">
                                                        <p>Real-time visualization of your landing page as you build it.</p>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="download">
                                                <Card>
                                                    <CardContent className="pt-6">
                                                        <p>
                                                            Option to get the complete source code of your landing page for further development or
                                                            hosting.
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                        </Tabs>
                                        <h2 id="interactive-demo" className="text-2xl font-semibold mt-8 mb-4">
                                            Interactive Demo
                                        </h2>
                                        <div className="bg-gray-100 p-4 rounded-lg mb-8">
                                            <p className="text-center text-gray-500 mb-4">Interactive demo placeholder</p>
                                            <div className="flex justify-center">
                                                <Button>Try it out</Button>
                                            </div>
                                        </div>
                                        <h2 className="text-2xl font-semibold mt-8 mb-4">Video Tutorial</h2>
                                        <div className="aspect-w-16 aspect-h-9 mb-8">
                                            <iframe
                                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full"
                                            ></iframe>
                                        </div>
                                    </>
                                )}
                                {activeChapter === "components" && (
                                    <>
                                        <h2 id="available-components" className="text-2xl font-semibold mt-8 mb-4">
                                            Available Components
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                            {[
                                                { title: "Headers", desc: "Navigation and branding elements for the top of your page." },
                                                { title: "Hero Sections", desc: "Eye-catching introductions to capture visitor attention." },
                                                { title: "Feature Lists", desc: "Highlight your product or service's key features." },
                                                {
                                                    title: "Pricing Tables",
                                                    desc: "Display your pricing options in a clear, attractive format.",
                                                },
                                                { title: "Testimonials", desc: "Showcase customer reviews and feedback." },
                                                { title: "Contact Forms", desc: "Allow visitors to get in touch or sign up for newsletters." },
                                                { title: "Footers", desc: "Important links and information at the bottom of your page." },
                                                { title: "Galleries", desc: "Display images or products in an organized grid or slider." },
                                                { title: "Call-to-Action", desc: "Encourage visitors to take a specific action." },
                                            ].map((component, index) => (
                                                <Card key={index}>
                                                    <CardContent className="p-4">
                                                        <h3 className="font-semibold mb-2">{component.title}</h3>
                                                        <p className="text-sm text-gray-600">{component.desc}</p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
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
                                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                                            <p className="text-sm text-yellow-700">
                                                <strong>Note:</strong> Remember to maintain consistency in your design choices across all
                                                components for a cohesive look.
                                            </p>
                                        </div>
                                        <h2 id="component-best-practices" className="text-2xl font-semibold mt-8 mb-4">
                                            Component Best Practices
                                        </h2>
                                        <ul className="list-disc pl-6 space-y-2 mb-8">
                                            <li>Keep your content concise and focused on your main message.</li>
                                            <li>Use high-quality images that align with your brand and message.</li>
                                            <li>Ensure your call-to-action buttons are prominent and clearly labeled.</li>
                                            <li>Maintain a consistent color scheme and typography throughout your landing page.</li>
                                            <li>Optimize your components for mobile devices to ensure a responsive design.</li>
                                        </ul>
                                    </>
                                )}
                                {activeChapter === "customization" && (
                                    <>
                                        <h2 id="styling-options" className="text-2xl font-semibold mt-8 mb-4">
                                            Styling Options
                                        </h2>
                                        <p className="mb-4">
                                            Our Landing Page Generator offers a wide range of styling options to help you create a unique and
                                            branded experience:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2 mb-8">
                                            <li>Color Picker: Choose custom colors for text, backgrounds, and accents.</li>
                                            <li>Typography: Select from a variety of web-safe fonts or add your own custom fonts.</li>
                                            <li>Spacing Controls: Adjust padding and margins to fine-tune your layout.</li>
                                            <li>Background Options: Set solid colors, gradients, or background images.</li>
                                            <li>Border Customization: Modify border widths, colors, and styles.</li>
                                        </ul>
                                        <h2 id="content-editing" className="text-2xl font-semibold mt-8 mb-4">
                                            Content Editing
                                        </h2>
                                        <p className="mb-4">Easily edit the content of your landing page components:</p>
                                        <ol className="list-decimal pl-6 space-y-2 mb-8">
                                            <li>Click on any text element to edit it directly on the page.</li>
                                            <li>Use the rich text editor for more complex content blocks.</li>
                                            <li>Upload and manage images through the media library.</li>
                                            <li>Add or remove sections using the component sidebar.</li>
                                        </ol>
                                        <h2 id="advanced-customization" className="text-2xl font-semibold mt-8 mb-4">
                                            Advanced Customization
                                        </h2>
                                        <p className="mb-4">For users who need more control, we offer advanced customization options:</p>
                                        <ul className="list-disc pl-6 space-y-2 mb-8">
                                            <li>Custom CSS: Add your own CSS rules to override default styles.</li>
                                            <li>JavaScript Integration: Embed custom scripts for additional functionality.</li>
                                            <li>API Connections: Connect your landing page to external data sources or services.</li>
                                            <li>Custom Components: Create and save your own reusable components.</li>
                                        </ul>
                                    </>
                                )}
                                {activeChapter === "deployment" && (
                                    <>
                                        <h2 id="exporting-your-project" className="text-2xl font-semibold mt-8 mb-4">
                                            Exporting Your Project
                                        </h2>
                                        <p className="mb-4">
                                            Once you've finished designing your landing page, you can easily export it for deployment:
                                        </p>
                                        <ol className="list-decimal pl-6 space-y-2 mb-8">
                                            <li>Click the "Export" button in the top right corner of the interface.</li>
                                            <li>Choose between "Static HTML" or "React Project" export options.</li>
                                            <li>Wait for the generator to compile your project.</li>
                                            <li>Download the ZIP file containing your project files.</li>
                                        </ol>
                                        <h2 id="hosting-options" className="text-2xl font-semibold mt-8 mb-4">
                                            Hosting Options
                                        </h2>
                                        <p className="mb-4">You have several options for hosting your exported landing page:</p>
                                        <ul className="list-disc pl-6 space-y-2 mb-8">
                                            <li>
                                                Static Hosting: Use services like Netlify, Vercel, or GitHub Pages for static HTML exports.
                                            </li>
                                            <li>React Hosting: Deploy React projects to platforms like Vercel, Netlify, or AWS Amplify.</li>
                                            <li>Traditional Web Hosting: Upload static files to any web hosting provider.</li>
                                            <li>Content Delivery Networks (CDNs): Utilize CDNs for faster global content delivery.</li>
                                        </ul>
                                        <h2 id="deployment-best-practices" className="text-2xl font-semibold mt-8 mb-4">
                                            Deployment Best Practices
                                        </h2>
                                        <ul className="list-disc pl-6 space-y-2 mb-8">
                                            <li>Always test your landing page thoroughly before deploying to production.</li>
                                            <li>Use version control (e.g., Git) to manage your project files.</li>
                                            <li>Set up continuous deployment for seamless updates.</li>
                                            <li>Implement SSL certificates for secure HTTPS connections.</li>
                                            <li>Optimize assets (images, CSS, JavaScript) for faster load times.</li>
                                            <li>Set up proper redirects if you're replacing an existing page.</li>
                                        </ul>
                                    </>
                                )}
                                {activeChapter === "faq" && (
                                    <>
                                        <h2 id="frequently-asked-questions" className="text-2xl font-semibold mt-8 mb-4">
                                            Frequently Asked Questions
                                        </h2>
                                        <div className="space-y-4">
                                            <div className="border-b border-gray-200 pb-4">
                                                <h3 className="text-lg font-medium text-gray-900">What is a landing page generator?</h3>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    A landing page generator is a tool that allows you to create professional-looking landing
                                                    pages without coding skills. It typically offers pre-designed templates and a drag-and-drop
                                                    interface for customization.
                                                </p>
                                            </div>
                                            <div className="border-b border-gray-200 pb-4">
                                                <h3 className="text-lg font-medium text-gray-900">Do I need coding skills to use this tool?</h3>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    No, our landing page generator is designed to be user-friendly and accessible to people
                                                    without technical skills. However, if you have coding knowledge, you can further customize
                                                    your pages using custom CSS and JavaScript.
                                                </p>
                                            </div>
                                            <div className="border-b border-gray-200 pb-4">
                                                <h3 className="text-lg font-medium text-gray-900">Can I use my own branding and colors?</h3>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Yes, you can fully customize the appearance of your landing page to match your brand. Our tool
                                                    offers options to change colors, fonts, and add your own logo and images.
                                                </p>
                                            </div>
                                            <div className="border-b border-gray-200 pb-4">
                                                <h3 className="text-lg font-medium text-gray-900">Is the landing page mobile-responsive?</h3>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Yes, all landing pages created with our generator are responsive by default. You can preview
                                                    how your page looks on different devices directly in the editor.
                                                </p>
                                            </div>
                                            <div className="border-b border-gray-200 pb-4">
                                                <h3 className="text-lg font-medium text-gray-900">How do I publish my landing page?</h3>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    After designing your page, you can export the code and host it on any web hosting platform. We
                                                    also offer integrations with popular hosting services for one-click publishing.
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="mt-12 p-6 bg-gray-100 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">Was this section helpful?</h3>
                                    <div className="flex space-x-4">
                                        <Button variant="outline">Yes</Button>
                                        <Button variant="outline">No</Button>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-600">Your feedback helps us improve our documentation.</p>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    {showScrollTop && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="fixed bottom-8 right-8 rounded-full shadow-lg"
                                        onClick={scrollToTop}
                                    >
                                        <ChevronUp className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Scroll to top</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}


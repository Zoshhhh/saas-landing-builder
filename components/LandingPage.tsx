import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutTemplate, Zap, Palette, Globe } from "lucide-react"

export function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <LayoutTemplate className="h-8 w-8 text-blue-500 mr-2" />
                        <span className="text-xl font-bold text-gray-900">Landing Page Generator</span>
                    </div>
                    <nav>
                        <Link href="/dashboard">
                            <Button variant="ghost">Dashboard</Button>
                        </Link>
                        <Button variant="ghost">Documentation</Button>
                        <Button variant="ghost">Support</Button>
                    </nav>
                </div>
            </header>

            <main className="flex-grow">
                <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            Create stunning landing pages in minutes
                        </h1>
                        <p className="mt-6 text-xl max-w-3xl">
                            Whether you're starting from scratch or using a template, our intuitive builder makes it easy to design
                            professional landing pages that convert.
                        </p>
                        <div className="mt-10">
                            <Link href="/dashboard">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
                            Why choose our Landing Page Generator?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Zap,
                                    title: "Lightning Fast",
                                    description: "Create and publish your landing page in minutes, not hours.",
                                },
                                {
                                    icon: Palette,
                                    title: "Customizable",
                                    description: "Tailor every aspect to match your brand's unique style.",
                                },
                                {
                                    icon: Globe,
                                    title: "SEO Optimized",
                                    description: "Built-in best practices to help your page rank higher.",
                                },
                            ].map((feature, index) => (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider">Product</h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white">
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white">
                                        Careers
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white">
                                        Tutorials
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white">
                                        Terms of Service
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-700 pt-8 flex justify-between items-center">
                        <p className="text-gray-400">&copy; 2023 Landing Page Generator. All rights reserved.</p>
                        <div className="flex space-x-6">{/* Add social media icons here */}</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}


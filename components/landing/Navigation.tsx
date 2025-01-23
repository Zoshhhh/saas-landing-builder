"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, X, LayoutTemplate } from "lucide-react"

export function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="flex justify-center w-full py-4">
            <nav className="rounded-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-lg mx-4 my-2 w-full max-w-6xl z-50">
                <div className="flex h-16 items-center justify-between px-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <LayoutTemplate className="h-8 w-8 text-blue-500" />
                        <span className="font-bold text-xl text-blue-800">Landing Page Generator</span>
                    </Link>

                    {/* Desktop Navigation Menu */}
                    <div className="hidden lg:block">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {/* Products Dropdown */}
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-blue-800 hover:text-blue-600">Products</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                                            <li className="col-span-2">
                                                <Link
                                                    href="#"
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-blue-100 to-blue-50 p-6 no-underline outline-none focus:shadow-md"
                                                >
                                                    <div className="mb-2 mt-4 text-lg font-medium text-blue-800">Landing Page Generator</div>
                                                    <p className="text-sm leading-tight text-blue-600">
                                                        Create stunning landing pages in minutes with our intuitive builder.
                                                    </p>
                                                </Link>
                                            </li>
                                            <ListItem href="#" title="For Marketers">
                                                Streamlined tools to create high-converting landing pages.
                                            </ListItem>
                                            <ListItem href="#" title="For Developers">
                                                Customizable components and easy integration with your tech stack.
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                {/* Features */}
                                <NavigationMenuItem>
                                    <Link href="#features" className={navigationMenuTriggerStyle()}>
                                        Features
                                    </Link>
                                </NavigationMenuItem>

                                {/* Pricing */}
                                <NavigationMenuItem>
                                    <Link href="#pricing" className={navigationMenuTriggerStyle()}>
                                        Pricing
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* User Actions */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-blue-800 hover:text-blue-600">
                            Login
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden text-blue-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden px-6 py-4 space-y-4">
                        <Link href="#" className="block text-blue-800 hover:text-blue-600">
                            Products
                        </Link>
                        <Link href="#features" className="block text-blue-800 hover:text-blue-600">
                            Features
                        </Link>
                        <Link href="#pricing" className="block text-blue-800 hover:text-blue-600">
                            Pricing
                        </Link>
                        <Button variant="ghost" size="sm" className="w-full text-blue-800 hover:text-blue-600">
                            Login
                        </Button>
                        <Button size="sm" className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                            Get Started
                        </Button>
                    </div>
                )}
            </nav>
        </div>
    )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-800 focus:bg-blue-50 focus:text-blue-800",
                        className,
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none text-blue-800">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-blue-600">{children}</p>
                </a>
            </li>
        )
    },
)
ListItem.displayName = "ListItem"

function navigationMenuTriggerStyle() {
    return cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-800 focus:bg-blue-50 focus:text-blue-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-blue-100/50 data-[state=open]:bg-blue-100/50 text-blue-800",
    )
}


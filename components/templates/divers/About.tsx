import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function About() {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                    <p className="text-gray-600 mb-6">
                        Stay up to date with our latest articles, tips, and insights. We promise not to spam you!
                    </p>
                    <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="w-full sm:w-auto sm:flex-1 max-w-xs">
                            <Input type="email" placeholder="Enter your email address" className="w-full" />
                        </div>
                        <Button type="submit" className="w-full sm:w-auto">
                            Subscribe
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}


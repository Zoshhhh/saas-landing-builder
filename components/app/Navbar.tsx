import React from "react"
import { Button } from "@/components/ui/button"
import { Layers, UserCircle, HelpCircle, Settings } from "lucide-react"
import Link from "next/link"

export function AppNavbar() {
  return (
      <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Layers className="h-8 w-8 text-blue-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">LandingBuilder</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="text-gray-600 hover:text-blue-500 transition-colors">
                <Link href="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild className="text-gray-600 hover:text-blue-500 transition-colors">
                <Link href="/documentation">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Documentation
                </Link>
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-blue-500 transition-colors">
                <Settings className="mr-2 h-5 w-5" />
                Support
              </Button>
              <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-50">
                <UserCircle className="mr-2 h-5 w-5" />
                My Account
              </Button>
            </div>
          </div>
        </div>
      </nav>
  )
}


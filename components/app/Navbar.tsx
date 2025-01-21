import React from "react"
import { Button } from "@/components/ui/button"
import { Layers, UserCircle } from "lucide-react"

export function AppNavbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">LandingBuilder</span>
          </div>
          <div className="flex items-center">
            <Button variant="ghost">Documentation</Button>
            <Button variant="ghost">Support</Button>
            <Button variant="ghost">
              <UserCircle className="mr-2 h-4 w-4" />
              My Account
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}


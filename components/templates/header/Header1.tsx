import type React from "react"
import { Button } from "@/components/ui/button"
import { Layers } from "lucide-react"

type Header1Props = {}

export default function Header1(): JSX.Element {
  return (
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-semibold text-gray-800">Logo</span>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </header>
  )
}


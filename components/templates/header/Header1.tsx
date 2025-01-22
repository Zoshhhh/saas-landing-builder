import type React from "react"
import { Button } from "@/components/ui/button"
import { Layers } from "lucide-react"

interface Header1Props {
  content?: string
  onEditStart: (sectionId: string) => void
  onEditEnd: (sectionId: string, content: string) => void
}

export default function Header1({ content, onEditStart, onEditEnd }: Header1Props) {
  const handleEdit = () => {
    onEditStart("header")
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    onEditEnd("header", event.target.innerHTML)
  }

  return (
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-semibold text-gray-800">Logo</span>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
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
        <div
            contentEditable
            onFocus={handleEdit}
            onBlur={handleBlur}
            dangerouslySetInnerHTML={{ __html: content || "" }}
            className="mt-4 p-2 border border-dashed border-gray-300 rounded"
        />
      </header>
  )
}


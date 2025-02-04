import React, { useEffect, useRef, useState } from "react"
import type { ComponentType } from "react"
import { BrowserFrame } from "./BrowserFrame"
import { cn } from "@/lib/utils"

interface ComponentProps {
  content?: string
  colors?: any
  onEditStart?: (sectionId: string) => void
  onEditEnd?: (sectionId: string, content: string) => void
}

interface PreviewProps {
  selectedStyles: {
    [key: string]: string
  }
  componentsOrder: string[]
  components: {
    [key: string]: ComponentType<ComponentProps>
  }
  isMobile: boolean
  editableContent: {
    [key: string]: string
  }
  onEditStart: (sectionId: string) => void
  onEditEnd: (sectionId: string, content: string) => void
  componentsColors: any
  className?: string
}

export default function Preview({
  selectedStyles,
  componentsOrder,
  components,
  isMobile,
  editableContent,
  onEditStart,
  onEditEnd,
  componentsColors,
  className,
}: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeHeight, setIframeHeight] = useState("100vh")

  useEffect(() => {
    console.log("Preview update:", { componentsOrder, selectedStyles, editableContent })
    const updateIframeContent = () => {
      if (iframeRef.current) {
        const iframeDoc = iframeRef.current.contentDocument
        if (iframeDoc) {
          iframeDoc.open()
          iframeDoc.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                  body { 
                    margin: 0; 
                    font-family: system-ui, -apple-system, sans-serif;
                  }
                </style>
                <script src="https://cdn.tailwindcss.com"></script>
              </head>
              <body>
                <div id="root"></div>
              </body>
            </html>
          `)
          iframeDoc.close()

          const root = iframeDoc.getElementById("root")
          if (root) {
            import("react-dom/client").then(({ createRoot }) => {
              const reactRoot = createRoot(root)
              reactRoot.render(
                <React.StrictMode>
                  {componentsOrder.map((section, index) => {
                    const style = selectedStyles[section]
                    if (style) {
                      const Component = components[style]
                      if (Component) {
                        const content =
                          editableContent && editableContent[section] !== undefined ? editableContent[section] : ""
                        return (
                          <Component
                            key={`${section}-${style}-${index}`}
                            content={content}
                            colors={componentsColors}
                            onEditStart={() => onEditStart(section)}
                            onEditEnd={(newContent) => onEditEnd(section, newContent)}
                          />
                        )
                      } else {
                        console.warn(`Component not found for style: ${style}`)
                      }
                    } else {
                      console.warn(`Style not found for section: ${section}`)
                    }
                    return null
                  })}
                </React.StrictMode>,
              )
            })
          }
        }
      }
    }

    updateIframeContent()

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === iframeRef.current) {
          setIframeHeight(`${entry.contentRect.height}px`)
        }
      }
    })

    if (iframeRef.current) {
      resizeObserver.observe(iframeRef.current)
    }

    return () => {
      if (iframeRef.current) {
        resizeObserver.unobserve(iframeRef.current)
      }
    }
  }, [selectedStyles, componentsOrder, components, editableContent, onEditStart, onEditEnd, componentsColors])

  return (
    <div className={cn("w-full h-full flex items-center justify-center bg-gray-100 p-6", className)}>
      <div
        className={cn(
          "relative transition-all duration-300 ease-in-out shadow-2xl",
          isMobile ? "w-[390px]" : "w-full max-w-[1280px] min-w-[800px]",
        )}
      >
        <BrowserFrame isMobile={isMobile}>
          <iframe
            ref={iframeRef}
            title="Preview"
            className="w-full h-full border-0 transition-all duration-300"
            style={{ height: iframeHeight }}
          />
        </BrowserFrame>
      </div>
    </div>
  )
}
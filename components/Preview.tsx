import React, { useEffect, useRef, useState } from "react"
import type { ComponentType } from "react"

interface PreviewProps {
  selectedStyles: {
    [key: string]: string
  }
  componentsOrder: string[]
  components: {
    [key: string]: ComponentType
  }
  isMobile: boolean
}

export default function Preview({ selectedStyles, componentsOrder, components, isMobile }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeHeight, setIframeHeight] = useState("100vh")

  useEffect(() => {
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
                  body { margin: 0; font-family: sans-serif; }
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
                  {componentsOrder.map((section) => {
                    const style = selectedStyles[section]
                    if (style) {
                      const Component = components[style]
                      return Component ? <Component key={`${section}-${style}`} /> : null
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
  }, [selectedStyles, componentsOrder, components])

  return (
    <div
      className={`w-full h-full overflow-hidden transition-all duration-300 ease-in-out ${
        isMobile ? "max-w-sm mx-auto" : ""
      }`}
    >
      <iframe ref={iframeRef} title="Preview" className="w-full h-full border-0 transition-all duration-300" />
    </div>
  )
}


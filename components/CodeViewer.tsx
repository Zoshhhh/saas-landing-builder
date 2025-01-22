import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Copy } from "lucide-react"

interface CodeViewerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    code: string
    fileName: string
}

export function CodeViewer({ open, onOpenChange, code, fileName }: CodeViewerProps) {
    const [copied, setCopied] = React.useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    React.useEffect(() => {
        const style = document.createElement("style")
        style.textContent = scrollbarStyles
        document.head.appendChild(style)
        return () => {
            document.head.removeChild(style)
        }
    }, [])

    const scrollbarStyles = `
  .scrollbar-custom::-webkit-scrollbar {
    width: 8px;
  }
  .scrollbar-custom::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .scrollbar-custom::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  .scrollbar-custom::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Source Code: {fileName}</DialogTitle>
                </DialogHeader>
                <div className="flex justify-end mb-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                        {copied ? (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Code
                            </>
                        )}
                    </Button>
                </div>
                <ScrollArea className="flex-grow relative scrollbar-custom">
          <pre className="p-4 bg-gray-100 rounded-md">
            <code className="text-sm font-mono">{code}</code>
          </pre>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}


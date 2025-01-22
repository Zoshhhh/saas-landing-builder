import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Copy } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col bg-white">
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
                <ScrollArea className="flex-grow relative bg-gray-100 p-4 rounded-md">
                    <SyntaxHighlighter
                        language="typescript"
                        style={vscDarkPlus}
                        customStyle={{
                            margin: 0,
                            padding: "1rem",
                            backgroundColor: "#1E1E1E",
                            borderRadius: "0.5rem",
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}


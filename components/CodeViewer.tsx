import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Copy, FileCode } from "lucide-react"
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
            <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col bg-white transition-all duration-300 ease-in-out">
                <DialogHeader className="border-b pb-2">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="flex items-center space-x-2 text-sm">
                            <FileCode className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{fileName}</span>
                            <span className="text-xs text-gray-500">({code.split("\n").length} lines)</span>
                        </DialogTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={copyToClipboard}
                            className="h-8 w-8 text-gray-500 hover:text-gray-700"
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </DialogHeader>
                <ScrollArea className="flex-grow relative bg-gray-100 p-4 rounded-md">
                    <SyntaxHighlighter
                        language="typescript"
                        style={vscDarkPlus}
                        customStyle={{
                            margin: 0,
                            padding: "0.75rem",
                            backgroundColor: "#1E1E1E",
                            borderRadius: "0.5rem",
                            fontSize: "13px",
                            lineHeight: 1.5,
                        }}
                        showLineNumbers={true}
                        lineNumberStyle={{ minWidth: "2em", paddingRight: "0.5em", color: "#606366", fontSize: "12px" }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}


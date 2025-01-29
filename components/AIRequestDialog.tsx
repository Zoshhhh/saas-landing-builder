import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AIRequestDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (request: string) => void
}

export function AIRequestDialog({ open, onOpenChange, onSubmit }: AIRequestDialogProps) {
    const [request, setRequest] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [characterCount, setCharacterCount] = useState(0)
    const maxCharacters = 500

    useEffect(() => {
        setCharacterCount(request.length)
    }, [request])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (request.trim() === "") return

        setIsLoading(true)
        try {
            await onSubmit(request)
        } finally {
            setIsLoading(false)
            setRequest("")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-center space-x-2 text-2xl font-bold text-blue-600">
                        <Sparkles className="h-6 w-6" />
                        <span>AI Landing Page Generator</span>
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="request" className="text-sm font-medium text-gray-700">
                            Describe your landing page
                        </Label>
                        <Textarea
                            id="request"
                            placeholder="E.g., Create a landing page for a fitness app with a hero section, features list, and pricing table..."
                            value={request}
                            onChange={(e) => setRequest(e.target.value)}
                            className="h-32 resize-none"
                            maxLength={maxCharacters}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
              <span>
                {characterCount} / {maxCharacters} characters
              </span>
                            <span>{maxCharacters - characterCount} characters remaining</span>
                        </div>
                    </div>
                    <AnimatePresence>
                        {request.trim() !== "" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            Generate Landing Page
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </DialogContent>
        </Dialog>
    )
}


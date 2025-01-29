import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AIRequestDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (components: any[]) => void
    existingComponents: Array<{ id: string; label: string; content?: string }>
}

export function AIRequestDialog({ open, onOpenChange, onSubmit, existingComponents }: AIRequestDialogProps) {
    const [request, setRequest] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [characterCount, setCharacterCount] = useState(0)
    const [generatedComponents, setGeneratedComponents] = useState<any[]>([])
    const [step, setStep] = useState<"input" | "preview" | "complete">("input")
    const maxCharacters = 500

    useEffect(() => {
        setCharacterCount(request.length)
    }, [request])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (request.trim() === "") return

        setIsLoading(true)
        try {
            const response = await fetch("/api/generate-ai-landing-page", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    request,
                    existingComponents,
                }),
            })

            const data = await response.json()
            if (!data.components) throw new Error("No content generated")

            setGeneratedComponents(data.components)
            setStep("preview")
        } catch (error) {
            console.error("Error generating content:", error)
            alert("Failed to generate content. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleConfirm = () => {
        onSubmit(generatedComponents)
        setStep("complete")
        setTimeout(() => {
            onOpenChange(false)
            setStep("input")
            setRequest("")
            setGeneratedComponents([])
        }, 2000)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-center space-x-2 text-2xl font-bold text-blue-600">
                        <Sparkles className="h-6 w-6" />
                        <span>AI Content Generator</span>
                    </DialogTitle>
                </DialogHeader>
                <AnimatePresence mode="wait">
                    {step === "input" && (
                        <motion.form
                            key="input"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="request" className="text-sm font-medium text-gray-700">
                                    What kind of landing page would you like to generate?
                                </Label>
                                <Textarea
                                    id="request"
                                    placeholder="E.g., Generate a landing page for a car dealership..."
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
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={isLoading || request.trim() === ""}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Generate Content
                                    </>
                                )}
                            </Button>
                        </motion.form>
                    )}
                    {step === "preview" && (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className="max-h-[300px] overflow-y-auto space-y-4 border rounded-md">
                                {generatedComponents.map((component, index) => (
                                    <div key={index} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
                                        <h3 className="font-semibold text-blue-600 mb-2">
                                            {component.id.charAt(0).toUpperCase() + component.id.slice(1)} ({component.variant})
                                        </h3>
                                        <div className="prose prose-sm max-w-none">
                                            <p className="text-gray-600 whitespace-pre-wrap">{component.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={() => setStep("input")} variant="outline" className="flex-1">
                                    Back to Edit
                                </Button>
                                <Button onClick={handleConfirm} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                                    Apply Changes
                                </Button>
                            </div>
                        </motion.div>
                    )}
                    {step === "complete" && (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex flex-col items-center justify-center space-y-4"
                        >
                            <Check className="h-16 w-16 text-green-500" />
                            <p className="text-xl font-semibold text-green-700">Content Generated and Applied!</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
}


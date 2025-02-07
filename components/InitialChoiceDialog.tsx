import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { LayoutTemplate, FileText, ArrowRight, X } from "lucide-react"

interface InitialChoiceDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onChooseBlank: () => void
    onChooseTemplate: () => void
    onClose: () => void
}

export function InitialChoiceDialog({
                                        open,
                                        onOpenChange,
                                        onChooseBlank,
                                        onChooseTemplate,
                                        onClose,
                                    }: InitialChoiceDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px]" onInteractOutside={onClose} onEscapeKeyDown={onClose}>
                <DialogHeader>
                    <div className="flex justify-between items-center">
                        <DialogTitle className="text-2xl">Welcome to QuickLau.ch</DialogTitle>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <DialogDescription>Choose how you'd like to start building your landing page</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="min-h-[400px] relative">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileText className="h-6 w-6 mr-2 text-blue-500" />
                                    Blank Page
                                </CardTitle>
                                <CardDescription>Start from scratch</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-16">
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li>Full creative control</li>
                                    <li>Build your page step-by-step</li>
                                    <li>Ideal for unique designs</li>
                                </ul>
                            </CardContent>
                            <CardFooter className="absolute bottom-0 left-0 right-0 p-4">
                                <Button
                                    onClick={onChooseBlank}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg"
                                >
                                    Start Blank <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="min-h-[400px] relative">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <LayoutTemplate className="h-6 w-6 mr-2 text-green-500" />
                                    Template
                                </CardTitle>
                                <CardDescription>Choose a pre-designed layout</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-16">
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li>Quick start with professional designs</li>
                                    <li>Customizable templates</li>
                                    <li>Variety of layouts for different needs</li>
                                </ul>
                            </CardContent>
                            <CardFooter className="absolute bottom-0 left-0 right-0 p-4">
                                <Button
                                    onClick={onChooseTemplate}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg"
                                >
                                    Browse Templates <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}


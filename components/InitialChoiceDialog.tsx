import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LayoutTemplate, FileText } from "lucide-react"

interface InitialChoiceDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onChooseBlank: () => void
    onChooseTemplate: () => void
}

export function InitialChoiceDialog({ open, onOpenChange, onChooseBlank, onChooseTemplate }: InitialChoiceDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Welcome to Landing Page Generator</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <p className="text-center text-sm text-gray-500">Choose how you'd like to start your project:</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            onClick={onChooseBlank}
                            className="h-24 flex flex-col items-center justify-center"
                            variant="outline"
                        >
                            <FileText className="h-8 w-8 mb-2" />
                            Start with Blank Page
                        </Button>
                        <Button
                            onClick={onChooseTemplate}
                            className="h-24 flex flex-col items-center justify-center"
                            variant="outline"
                        >
                            <LayoutTemplate className="h-8 w-8 mb-2" />
                            Start with Template
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}


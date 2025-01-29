import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AIRequestDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (request: string) => void
}

export function AIRequestDialog({ open, onOpenChange, onSubmit }: AIRequestDialogProps) {
    const [request, setRequest] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(request)
        setRequest("")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ask AI to generate a landing page</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Describe your landing page needs..."
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                    />
                    <Button type="submit" className="w-full">
                        Generate Landing Page
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}


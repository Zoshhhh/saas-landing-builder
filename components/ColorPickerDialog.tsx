"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

interface ColorPickerDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (updatedColors: ColorState) => void
    colors: ColorState
    setColors: React.Dispatch<React.SetStateAction<ColorState>>
    componentId: string
}

export interface ComponentColors {
    textColor: string
    backgroundColor: string
    buttonColor: string
    buttonTextColor: string
    borderColor?: string
    highlightColor?: string
}

interface ColorState {
    [componentId: string]: ComponentColors
}

const DEFAULT_COLORS: ComponentColors = {
    textColor: "#000000",
    backgroundColor: "#ffffff",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    borderColor: "#cccccc",
    highlightColor: "#ffcc00",
}

const COLOR_TEMPLATES: { [key: string]: ComponentColors } = {
    Light: {
        textColor: "#000000",
        backgroundColor: "#ffffff",
        buttonColor: "#0070f3",
        buttonTextColor: "#ffffff",
        borderColor: "#e5e7eb",
        highlightColor: "#f3f4f6",
    },
    Dark: {
        textColor: "#ffffff",
        backgroundColor: "#1f2937",
        buttonColor: "#3b82f6",
        buttonTextColor: "#ffffff",
        borderColor: "#374151",
        highlightColor: "#374151",
    },
    Earthy: {
        textColor: "#4b5563",
        backgroundColor: "#faf5ef",
        buttonColor: "#8b5cf6",
        buttonTextColor: "#ffffff",
        borderColor: "#d1d5db",
        highlightColor: "#e5e7eb",
    },
}

// Helper function to validate hex color
const isValidHex = (hex: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)

const ColorInput = React.memo(
    ({
         id,
         label,
         value,
         onChange,
     }: {
        id: string
        label: string
        value: string
        onChange: (value: string) => void
    }) => {
        const [hexValue, setHexValue] = React.useState(value)

        React.useEffect(() => {
            setHexValue(value)
        }, [value])

        const handleHexChange = (hex: string) => {
            setHexValue(hex)
            if (isValidHex(hex)) {
                onChange(hex)
            }
        }

        return (
            <div className="w-full space-y-1">
                <Label htmlFor={id} className="text-xs font-semibold">
                    {label}
                </Label>
                <div className="flex gap-2 items-center">
                    <Input
                        id={`${id}-hex`}
                        type="text"
                        value={hexValue}
                        onChange={(e) => handleHexChange(e.target.value)}
                        className={`w-full text-xs font-mono px-2 py-1 ${!isValidHex(hexValue) ? "border-red-500" : ""}`}
                        placeholder="#000000"
                    />
                    <Input
                        id={id}
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-9 h-9 cursor-pointer border rounded-md"
                    />
                </div>
            </div>
        )
    },
)

ColorInput.displayName = "ColorInput"

export const ColorPickerDialog = React.memo(
    ({ open, onOpenChange, onSave, colors, setColors, componentId }: ColorPickerDialogProps) => {
        const currentColors = React.useMemo(() => colors[componentId] || DEFAULT_COLORS, [colors, componentId])

        const handleColorChange = React.useCallback(
            (field: keyof ComponentColors, value: string) => {
                setColors((prev) => ({
                    ...prev,
                    [componentId]: {
                        ...(prev[componentId] || DEFAULT_COLORS),
                        [field]: value,
                    },
                }))
            },
            [componentId, setColors],
        )

        const handleSave = React.useCallback(() => {
            onSave({ ...colors, [componentId]: currentColors })
            onOpenChange(false)
        }, [colors, currentColors, onSave, onOpenChange, componentId])

        const handleTemplateSelect = (templateName: string) => {
            const template = COLOR_TEMPLATES[templateName]
            if (template) {
                setColors((prev) => ({
                    ...prev,
                    [componentId]: template,
                }))
            }
        }

        const handleResetColors = () => {
            setColors((prev) => ({
                ...prev,
                [componentId]: DEFAULT_COLORS,
            }))
        }

        const PreviewSection = () => (
            <div
                className="p-4 rounded-lg border shadow-sm"
                style={{
                    backgroundColor: currentColors.backgroundColor,
                    borderColor: currentColors.borderColor,
                }}
            >
                <h3 className="text-lg font-semibold mb-2" style={{ color: currentColors.textColor }}>
                    Preview
                </h3>
                <p className="text-sm mb-4" style={{ color: currentColors.textColor }}>
                    This is how your component will look with the selected colors.
                </p>
                <div className="flex items-center gap-2">
                    <button
                        className="py-2 px-4 rounded-md transition-colors"
                        style={{
                            backgroundColor: currentColors.buttonColor,
                            color: currentColors.buttonTextColor,
                        }}
                    >
                        Primary Button
                    </button>
                    <button
                        className="py-2 px-4 rounded-md transition-colors border"
                        style={{
                            backgroundColor: "transparent",
                            color: currentColors.buttonColor,
                            borderColor: currentColors.buttonColor,
                        }}
                    >
                        Secondary Button
                    </button>
                </div>
                <p
                    className="mt-4 text-sm font-semibold"
                    style={{
                        color: currentColors.highlightColor,
                    }}
                >
                    Highlighted text example
                </p>
            </div>
        )

        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[420px]">
                    <DialogHeader>
                        <DialogTitle className="text-lg">Customize Colors</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <PreviewSection />
                        <Tabs defaultValue="templates" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
                                <TabsTrigger
                                    value="templates"
                                    className="px-3 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                                >
                                    Templates
                                </TabsTrigger>
                                <TabsTrigger
                                    value="custom"
                                    className="px-3 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                                >
                                    Custom
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="templates" className="mt-2">
                                <div className="grid grid-cols-3 gap-2">
                                    {Object.entries(COLOR_TEMPLATES).map(([name, colors]) => (
                                        <button
                                            key={name}
                                            className="p-2 rounded-md text-xs font-medium transition-all hover:scale-105 active:scale-95"
                                            style={{
                                                backgroundColor: colors.backgroundColor,
                                                color: colors.textColor,
                                                border: `1px solid ${colors.borderColor}`,
                                            }}
                                            onClick={() => handleTemplateSelect(name)}
                                        >
                                            {name}
                                            {JSON.stringify(currentColors) === JSON.stringify(colors) && (
                                                <Check className="absolute top-1 right-1 w-3 h-3" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="custom" className="mt-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <ColorInput
                                        id="textColor"
                                        label="Text"
                                        value={currentColors.textColor}
                                        onChange={(value) => handleColorChange("textColor", value)}
                                    />
                                    <ColorInput
                                        id="backgroundColor"
                                        label="Background"
                                        value={currentColors.backgroundColor}
                                        onChange={(value) => handleColorChange("backgroundColor", value)}
                                    />
                                    <ColorInput
                                        id="buttonColor"
                                        label="Button"
                                        value={currentColors.buttonColor}
                                        onChange={(value) => handleColorChange("buttonColor", value)}
                                    />
                                    <ColorInput
                                        id="buttonTextColor"
                                        label="Button Text"
                                        value={currentColors.buttonTextColor}
                                        onChange={(value) => handleColorChange("buttonTextColor", value)}
                                    />
                                    <ColorInput
                                        id="borderColor"
                                        label="Border"
                                        value={currentColors.borderColor || "#cccccc"}
                                        onChange={(value) => handleColorChange("borderColor", value)}
                                    />
                                    <ColorInput
                                        id="highlightColor"
                                        label="Highlight"
                                        value={currentColors.highlightColor || "#ffcc00"}
                                        onChange={(value) => handleColorChange("highlightColor", value)}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" className="text-sm" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button variant="outline" className="text-sm" onClick={handleResetColors}>
                            Reset
                        </Button>
                        <Button className="text-sm" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    },
)

ColorPickerDialog.displayName = "ColorPickerDialog"


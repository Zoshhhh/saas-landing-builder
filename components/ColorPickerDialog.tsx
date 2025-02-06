"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Check, Palette } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ScrollArea } from "./ui/scroll-area"

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
    "Modern Light": {
        textColor: "#1a1a1a",
        backgroundColor: "#ffffff",
        buttonColor: "#2563eb",
        buttonTextColor: "#ffffff",
        borderColor: "#e5e7eb",
        highlightColor: "#3b82f6",
    },
    "Modern Dark": {
        textColor: "#ffffff",
        backgroundColor: "#111827",
        buttonColor: "#3b82f6",
        buttonTextColor: "#ffffff",
        borderColor: "#374151",
        highlightColor: "#60a5fa",
    },
    "Forest": {
        textColor: "#1e3a1e",
        backgroundColor: "#f0f7f0",
        buttonColor: "#2d5a27",
        buttonTextColor: "#ffffff",
        borderColor: "#c1d9bf",
        highlightColor: "#4a9c44",
    },
    "Ocean": {
        textColor: "#1e3a5f",
        backgroundColor: "#f0f7ff",
        buttonColor: "#0369a1",
        buttonTextColor: "#ffffff",
        borderColor: "#bae6fd",
        highlightColor: "#0284c7",
    },
    "Sunset": {
        textColor: "#451a1a",
        backgroundColor: "#fff5f5",
        buttonColor: "#dc2626",
        buttonTextColor: "#ffffff",
        borderColor: "#fecaca",
        highlightColor: "#ef4444",
    },
    "Royal": {
        textColor: "#2e1065",
        backgroundColor: "#faf5ff",
        buttonColor: "#7c3aed",
        buttonTextColor: "#ffffff",
        borderColor: "#ddd6fe",
        highlightColor: "#8b5cf6",
    },
    "Minimal": {
        textColor: "#262626",
        backgroundColor: "#fafafa",
        buttonColor: "#404040",
        buttonTextColor: "#ffffff",
        borderColor: "#d4d4d4",
        highlightColor: "#525252",
    },
    "Vibrant": {
        textColor: "#3b0764",
        backgroundColor: "#fdf4ff",
        buttonColor: "#d946ef",
        buttonTextColor: "#ffffff",
        borderColor: "#f5d0fe",
        highlightColor: "#e879f9",
    },
}

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
            <div className="flex flex-col gap-1.5 w-full">
                <Label htmlFor={id} className="text-sm font-medium flex items-center gap-2">
                    {label}
                    <div
                        className="w-4 h-4 rounded-full border shadow-sm"
                        style={{ backgroundColor: value }}
                    />
                </Label>
                <div className="flex gap-2 items-center">
                    <Input
                        id={`${id}-hex`}
                        type="text"
                        value={hexValue}
                        onChange={(e) => handleHexChange(e.target.value)}
                        className={`flex-1 font-mono text-sm ${!isValidHex(hexValue) ? "border-red-500" : ""}`}
                        placeholder="#000000"
                    />
                    <Input
                        id={id}
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-10 h-10 p-1 cursor-pointer border rounded-md"
                    />
                </div>
            </div>
        )
    }
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

        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0 gap-0">
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            <Palette className="w-5 h-5" />
                            Customize Colors
                        </DialogTitle>
                    </DialogHeader>

                    <ScrollArea className="flex-1 px-6 pb-2">
                        <div className="grid gap-6">
                            <div
                                className="p-6 rounded-lg border shadow-sm"
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

                            <Tabs defaultValue="templates" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="templates">Color Templates</TabsTrigger>
                                    <TabsTrigger value="custom">Custom Colors</TabsTrigger>
                                </TabsList>

                                <TabsContent value="templates" className="mt-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        {Object.entries(COLOR_TEMPLATES).map(([name, colors]) => (
                                            <button
                                                key={name}
                                                className="relative p-3 rounded-lg text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] group"
                                                style={{
                                                    backgroundColor: colors.backgroundColor,
                                                    color: colors.textColor,
                                                    border: `1px solid ${colors.borderColor}`,
                                                }}
                                                onClick={() => handleTemplateSelect(name)}
                                            >
                                                <span className="relative z-10">{name}</span>
                                                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/5" />
                                                {JSON.stringify(currentColors) === JSON.stringify(colors) && (
                                                    <Check className="absolute top-2 right-2 w-4 h-4" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="custom" className="mt-4 relative">
                                    <div className="grid gap-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <ColorInput
                                                id="textColor"
                                                label="Text Color"
                                                value={currentColors.textColor}
                                                onChange={(value) => handleColorChange("textColor", value)}
                                            />
                                            <ColorInput
                                                id="backgroundColor"
                                                label="Background Color"
                                                value={currentColors.backgroundColor}
                                                onChange={(value) => handleColorChange("backgroundColor", value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <ColorInput
                                                id="buttonColor"
                                                label="Button Color"
                                                value={currentColors.buttonColor}
                                                onChange={(value) => handleColorChange("buttonColor", value)}
                                            />
                                            <ColorInput
                                                id="buttonTextColor"
                                                label="Button Text Color"
                                                value={currentColors.buttonTextColor}
                                                onChange={(value) => handleColorChange("buttonTextColor", value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <ColorInput
                                                id="borderColor"
                                                label="Border Color"
                                                value={currentColors.borderColor || "#cccccc"}
                                                onChange={(value) => handleColorChange("borderColor", value)}
                                            />
                                            <ColorInput
                                                id="highlightColor"
                                                label="Highlight Color"
                                                value={currentColors.highlightColor || "#ffcc00"}
                                                onChange={(value) => handleColorChange("highlightColor", value)}
                                            />
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </ScrollArea>

                    <div className="flex items-center justify-end gap-2 p-6 pt-4 border-t">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button variant="outline" onClick={handleResetColors}>
                            Reset
                        </Button>
                        <Button onClick={handleSave}>
                            Save Changes
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
)

ColorPickerDialog.displayName = "ColorPickerDialog"
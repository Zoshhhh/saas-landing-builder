"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ColorPickerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (updatedColors: ColorState) => void;
    colors: ColorState;
    setColors: React.Dispatch<React.SetStateAction<ColorState>>;
    componentId: string;
}

export interface ComponentColors {
    textColor: string;
    backgroundColor: string;
    buttonColor: string;
    buttonTextColor: string;
    borderColor?: string;
    highlightColor?: string;
}

interface ColorState {
    [componentId: string]: ComponentColors;
}

const DEFAULT_COLORS: ComponentColors = {
    textColor: "#000000",
    backgroundColor: "#ffffff",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    borderColor: "#cccccc",
    highlightColor: "#ffcc00",
};

// Helper function to validate hex color
const isValidHex = (hex: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);

const ColorInput = React.memo(
    ({
         id,
         label,
         value,
         onChange,
     }: {
        id: string;
        label: string;
        value: string;
        onChange: (value: string) => void;
    }) => {
        const [hexValue, setHexValue] = React.useState(value);

        React.useEffect(() => {
            setHexValue(value);
        }, [value]);

        const handleHexChange = (hex: string) => {
            setHexValue(hex);
            if (isValidHex(hex)) {
                onChange(hex);
            }
        };

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
                        className={`w-full text-xs font-mono px-2 py-1 ${
                            !isValidHex(hexValue) ? "border-red-500" : ""
                        }`}
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
        );
    }
);

ColorInput.displayName = "ColorInput";

export const ColorPickerDialog = React.memo(
    ({
         open,
         onOpenChange,
         onSave,
         colors,
         setColors,
         componentId,
     }: ColorPickerDialogProps) => {
        const currentColors = React.useMemo(
            () => colors[componentId] || DEFAULT_COLORS,
            [colors, componentId]
        );

        const handleColorChange = React.useCallback(
            (field: keyof ComponentColors, value: string) => {
                setColors((prev) => ({
                    ...prev,
                    [componentId]: {
                        ...(prev[componentId] || DEFAULT_COLORS),
                        [field]: value,
                    },
                }));
            },
            [componentId, setColors]
        );

        const handleSave = React.useCallback(() => {
            // ✅ Corrige l'erreur TypeScript et met à jour toutes les couleurs
            onSave({ ...colors, [componentId]: currentColors });
            onOpenChange(false);
        }, [colors, currentColors, onSave, onOpenChange]);

        // Preview section
        const PreviewSection = () => (
            <div
                className="p-3 rounded-lg border shadow-sm text-center"
                style={{
                    backgroundColor: currentColors.backgroundColor,
                    borderColor: currentColors.borderColor,
                }}
            >
                <p className="text-sm mb-2" style={{ color: currentColors.textColor }}>
                    Preview Text
                </p>
                <button
                    className="py-1 px-3 rounded-md transition-colors border"
                    style={{
                        backgroundColor: currentColors.buttonColor,
                        color: currentColors.buttonTextColor,
                        borderColor: currentColors.borderColor,
                    }}
                >
                    Preview Button
                </button>
                <p
                    className="mt-2 text-xs font-semibold"
                    style={{
                        color: currentColors.highlightColor,
                    }}
                >
                    Highlight Text
                </p>
            </div>
        );

        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[380px]">
                    <DialogHeader>
                        <DialogTitle className="text-lg">Customize Colors</DialogTitle>
                    </DialogHeader>

                    {/* Optimisation UX - Suppression de la scrollbar */}
                    <div className="grid gap-3 py-2">
                        <PreviewSection />
                        <div className="grid grid-cols-2 gap-3">
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
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" className="text-sm" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button className="text-sm" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
);

ColorPickerDialog.displayName = "ColorPickerDialog";
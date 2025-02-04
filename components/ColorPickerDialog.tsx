import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ColorPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (colors: ComponentColors) => void;
  colors: ColorState;
  setColors: React.Dispatch<React.SetStateAction<ColorState>>;
  componentId: string;
}

export interface ComponentColors {
  textColor: string;
  backgroundColor: string;
  buttonColor: string;
  buttonTextColor: string;
}

interface ColorState {
  [componentId: string]: ComponentColors;
}

const DEFAULT_COLORS: ComponentColors = {
  textColor: '#000000',
  backgroundColor: '#ffffff',
  buttonColor: '#000000',
  buttonTextColor: '#ffffff'
};

// Helper function to validate hex color
const isValidHex = (hex: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);

// Memoized color input component with hex support
const ColorInput = React.memo(({
                                 id,
                                 label,
                                 value,
                                 onChange
                               }: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [hexValue, setHexValue] = React.useState(value);

  // Update hex input when color picker changes
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
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
                id={`${id}-hex`}
                type="text"
                value={hexValue}
                onChange={(e) => handleHexChange(e.target.value)}
                className={`pl-8 font-mono ${!isValidHex(hexValue) ? 'border-red-500' : ''}`}
                placeholder="#000000"
            />
            <div
                className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border"
                style={{ backgroundColor: isValidHex(hexValue) ? hexValue : '#ffffff' }}
            />
          </div>
          <Input
              id={id}
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-9 p-1 cursor-pointer"
          />
        </div>
      </div>
  );
});

ColorInput.displayName = 'ColorInput';

export const ColorPickerDialog = React.memo(({
                                               open,
                                               onOpenChange,
                                               onSave,
                                               colors,
                                               setColors,
                                               componentId,
                                             }: ColorPickerDialogProps) => {
  const currentColors = React.useMemo(() =>
          colors[componentId] || DEFAULT_COLORS,
      [colors, componentId]
  );

  const handleColorChange = React.useCallback((field: keyof ComponentColors, value: string) => {
    setColors((prev) => ({
      ...prev,
      [componentId]: {
        ...(prev[componentId] || DEFAULT_COLORS),
        [field]: value
      }
    }));
  }, [componentId, setColors]);

  const handleSave = React.useCallback(() => {
    onSave(colors as any);
    onOpenChange(false);
  }, [colors, onSave, onOpenChange]);

  // Preview section
  const PreviewSection = () => (
      <div
          className="p-4 rounded-lg mt-4 mb-2"
          style={{ backgroundColor: currentColors.backgroundColor }}
      >
        <p className="text-center mb-3" style={{ color: currentColors.textColor }}>
          Preview Text
        </p>
        <button
            className="w-full py-2 px-4 rounded-md transition-colors"
            style={{
              backgroundColor: currentColors.buttonColor,
              color: currentColors.buttonTextColor
            }}
        >
          Preview Button
        </button>
      </div>
  );

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Customize Colors</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <PreviewSection />
            <ColorInput
                id="textColor"
                label="Text Color"
                value={currentColors.textColor}
                onChange={(value) => handleColorChange('textColor', value)}
            />
            <ColorInput
                id="backgroundColor"
                label="Background Color"
                value={currentColors.backgroundColor}
                onChange={(value) => handleColorChange('backgroundColor', value)}
            />
            <ColorInput
                id="buttonColor"
                label="Button Color"
                value={currentColors.buttonColor}
                onChange={(value) => handleColorChange('buttonColor', value)}
            />
            <ColorInput
                id="buttonTextColor"
                label="Button Text Color"
                value={currentColors.buttonTextColor}
                onChange={(value) => handleColorChange('buttonTextColor', value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Colors</Button>
          </div>
        </DialogContent>
      </Dialog>
  );
});

ColorPickerDialog.displayName = 'ColorPickerDialog';
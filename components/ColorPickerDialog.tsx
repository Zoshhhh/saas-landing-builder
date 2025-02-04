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

// Memoized color input component
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
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
));

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
  }, [colors, onSave]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customize Colors</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
        <Button onClick={handleSave}>Save Colors</Button>
      </DialogContent>
    </Dialog>
  );
});

ColorPickerDialog.displayName = 'ColorPickerDialog';
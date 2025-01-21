import React from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface StyleSelectorProps {
  section: string
  selectedStyle: string
  onSelect: (style: string) => void
  onDelete: () => void
}

export default function StyleSelector({ section, selectedStyle, onSelect, onDelete }: StyleSelectorProps) {
  const styles =
    section === "hero" ? ["Hero1", "Hero2"] : section === "header" ? ["Header1", "Header2"] : ["Footer1", "Footer2"]

  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold capitalize text-gray-800">{section}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition-colors duration-300"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <RadioGroup value={selectedStyle} onValueChange={onSelect} className="grid grid-cols-2 gap-4">
          {styles.map((style) => (
            <Label
              key={style}
              htmlFor={style}
              className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedStyle === style
                  ? "bg-indigo-100 border-2 border-indigo-500 shadow-md"
                  : "bg-white border-2 border-gray-200 hover:border-indigo-300 hover:shadow-sm"
              }`}
            >
              <RadioGroupItem value={style} id={style} className="sr-only" />
              <div className="w-full h-24 bg-gray-200 rounded mb-2 overflow-hidden">
                <img
                  src={`/previews/${style.toLowerCase()}.png`}
                  alt={`Preview of ${style}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-700">{`Style ${style.slice(-1)}`}</span>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}


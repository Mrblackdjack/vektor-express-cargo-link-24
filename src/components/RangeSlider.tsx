
import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  unit: string;
  className?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onValueChange,
  unit,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        className="relative flex items-center select-none touch-none w-full h-5"
      >
        <SliderPrimitive.Track className="bg-gray-200 dark:bg-gray-700 relative grow rounded-full h-2">
          <SliderPrimitive.Range className="absolute bg-blue-600 dark:bg-blue-400 rounded-full h-full" />
        </SliderPrimitive.Track>
        {value.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block w-5 h-5 bg-white dark:bg-gray-100 shadow border border-gray-200 rounded-full hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>
          {value[0]} {unit}
        </span>
        <span>
          {value[1]} {unit}
        </span>
      </div>
    </div>
  );
};

export default RangeSlider;

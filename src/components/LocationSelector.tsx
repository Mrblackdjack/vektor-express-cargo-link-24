
import React, { useState } from "react";
import { MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface LocationSelectorProps {
  placeholder?: string;
  onSelect: (location: string) => void;
  selectedLocations: string[];
  onRemove: (location: string) => void;
  className?: string;
}

// Mock cities data for autocomplete
const CITIES = [
  "Москва",
  "Санкт-Петербург",
  "Нижний Новгород",
  "Екатеринбург",
  "Новосибирск",
  "Казань",
  "Самара",
  "Омск",
  "Челябинск",
  "Ростов-на-Дону",
  "Уфа",
  "Волгоград",
  "Пермь",
  "Красноярск",
  "Воронеж",
];

const LocationSelector: React.FC<LocationSelectorProps> = ({
  placeholder = "Введите город",
  onSelect,
  selectedLocations,
  onRemove,
  className,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      const filtered = CITIES.filter(
        (city) =>
          city.toLowerCase().includes(value.toLowerCase()) &&
          !selectedLocations.includes(city)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectLocation = (location: string) => {
    if (!selectedLocations.includes(location)) {
      onSelect(location);
    }
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
        <div className="pl-3">
          <MapPin className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (query.length > 1) setShowSuggestions(true);
          }}
          onBlur={() => {
            // Delayed hide to allow click on suggestion
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {suggestions.map((location) => (
              <li
                key={location}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onMouseDown={() => handleSelectLocation(location)}
              >
                {location}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedLocations.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedLocations.map((location) => (
            <Badge
              key={location}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              <MapPin className="h-3 w-3" />
              {location}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => onRemove(location)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;

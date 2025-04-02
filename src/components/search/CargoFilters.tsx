
import React, { useState } from "react";
import { Package, Calendar, TruckIcon, AlertTriangle } from "lucide-react";
import RangeSlider from "@/components/RangeSlider";
import DateRangePicker from "@/components/DateRangePicker";
import LocationSelector from "@/components/LocationSelector";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export interface CargoFiltersProps {
  onApplyFilters: (filters: any) => void;
  onReset: () => void;
  onClose?: () => void;
}

const CargoFilters: React.FC<CargoFiltersProps> = ({
  onApplyFilters,
  onReset,
  onClose,
}) => {
  // Filter states
  const [cargoType, setCargoType] = useState<string>("");
  const [weightRange, setWeightRange] = useState<number[]>([0, 40]);
  const [volumeRange, setVolumeRange] = useState<number[]>([0, 100]);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [locations, setLocations] = useState<string[]>([]);
  const [hazardous, setHazardous] = useState<boolean>(false);
  const [perishable, setPerishable] = useState<boolean>(false);
  const [oversized, setOversized] = useState<boolean>(false);
  const [avoidTollRoads, setAvoidTollRoads] = useState<boolean>(false);

  const handleLocationAdd = (location: string) => {
    if (locations.length < 5) {
      setLocations([...locations, location]);
    } else {
      toast.error("Можно добавить не более 5 локаций");
    }
  };

  const handleLocationRemove = (location: string) => {
    setLocations(locations.filter((loc) => loc !== location));
  };

  const handleApplyFilters = () => {
    const filters = {
      cargoType,
      weightRange,
      volumeRange,
      dateRange,
      locations,
      hazardous,
      perishable,
      oversized,
      avoidTollRoads,
    };
    onApplyFilters(filters);
    if (onClose) onClose();
  };

  const handleReset = () => {
    setCargoType("");
    setWeightRange([0, 40]);
    setVolumeRange([0, 100]);
    setDateRange({ from: undefined, to: undefined });
    setLocations([]);
    setHazardous(false);
    setPerishable(false);
    setOversized(false);
    setAvoidTollRoads(false);
    onReset();
  };

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Фильтры грузов</h3>
        
        <div className="space-y-2">
          <Label htmlFor="cargo-type">Тип груза</Label>
          <Select value={cargoType} onValueChange={setCargoType}>
            <SelectTrigger id="cargo-type">
              <SelectValue placeholder="Выбрать тип груза" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">Генеральный груз</SelectItem>
              <SelectItem value="hazardous">Опасный груз</SelectItem>
              <SelectItem value="perishable">Скоропортящийся</SelectItem>
              <SelectItem value="oversized">Негабаритный</SelectItem>
              <SelectItem value="bulk">Насыпной</SelectItem>
              <SelectItem value="liquid">Наливной</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label>Вес (тонны)</Label>
          <RangeSlider
            min={0}
            max={40}
            step={0.5}
            value={weightRange}
            onValueChange={setWeightRange}
            unit="т"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Объем (м³)</Label>
          <RangeSlider
            min={0}
            max={100}
            step={1}
            value={volumeRange}
            onValueChange={setVolumeRange}
            unit="м³"
          />
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label>Период погрузки</Label>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            label="Выбрать период погрузки"
          />
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label>Маршрут (города)</Label>
          <LocationSelector
            placeholder="Город погрузки/выгрузки"
            selectedLocations={locations}
            onSelect={handleLocationAdd}
            onRemove={handleLocationRemove}
          />
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label className="mb-2 block">Дополнительно</Label>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hazardous"
                checked={hazardous}
                onCheckedChange={(checked) => setHazardous(!!checked)}
              />
              <Label htmlFor="hazardous" className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                Опасные грузы
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="perishable"
                checked={perishable}
                onCheckedChange={(checked) => setPerishable(!!checked)}
              />
              <Label htmlFor="perishable" className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                Скоропортящиеся
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="oversized"
                checked={oversized}
                onCheckedChange={(checked) => setOversized(!!checked)}
              />
              <Label htmlFor="oversized" className="flex items-center">
                <Package className="h-4 w-4 mr-1 text-purple-500" />
                Негабаритные
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="avoid-toll"
                checked={avoidTollRoads}
                onCheckedChange={(checked) => setAvoidTollRoads(!!checked)}
              />
              <Label htmlFor="avoid-toll" className="flex items-center">
                <TruckIcon className="h-4 w-4 mr-1 text-green-500" />
                Объезд платных дорог
              </Label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={handleReset}>
          Сбросить
        </Button>
        <Button onClick={handleApplyFilters}>Применить</Button>
      </div>
    </div>
  );
};

export default CargoFilters;

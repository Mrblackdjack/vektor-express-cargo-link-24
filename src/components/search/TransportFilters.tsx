
import React, { useState } from "react";
import { Truck, Calendar, MapPin, Wifi } from "lucide-react";
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

export interface TransportFiltersProps {
  onApplyFilters: (filters: any) => void;
  onReset: () => void;
  onClose?: () => void;
}

const TransportFilters: React.FC<TransportFiltersProps> = ({
  onApplyFilters,
  onReset,
  onClose,
}) => {
  // Filter states
  const [vehicleType, setVehicleType] = useState<string>("");
  const [capacityRange, setCapacityRange] = useState<number[]>([0, 40]);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [locations, setLocations] = useState<string[]>([]);
  const [hasGps, setHasGps] = useState<boolean>(false);
  const [hasRamp, setHasRamp] = useState<boolean>(false);
  const [hasRefrigerator, setHasRefrigerator] = useState<boolean>(false);
  const [hasHydroboard, setHasHydroboard] = useState<boolean>(false);

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
      vehicleType,
      capacityRange,
      dateRange,
      locations,
      hasGps,
      hasRamp,
      hasRefrigerator,
      hasHydroboard,
    };
    onApplyFilters(filters);
    if (onClose) onClose();
  };

  const handleReset = () => {
    setVehicleType("");
    setCapacityRange([0, 40]);
    setDateRange({ from: undefined, to: undefined });
    setLocations([]);
    setHasGps(false);
    setHasRamp(false);
    setHasRefrigerator(false);
    setHasHydroboard(false);
    onReset();
  };

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Фильтры транспорта</h3>
        
        <div className="space-y-2">
          <Label htmlFor="vehicle-type">Тип транспорта</Label>
          <Select value={vehicleType} onValueChange={setVehicleType}>
            <SelectTrigger id="vehicle-type">
              <SelectValue placeholder="Выбрать тип транспорта" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="van">Малотоннажный (до 3.5т)</SelectItem>
              <SelectItem value="truck">Фура</SelectItem>
              <SelectItem value="refrigerator">Рефрижератор</SelectItem>
              <SelectItem value="tank">Цистерна</SelectItem>
              <SelectItem value="tilt">Тент</SelectItem>
              <SelectItem value="flatbed">Борт</SelectItem>
              <SelectItem value="container">Контейнеровоз</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label>Грузоподъемность (тонны)</Label>
          <RangeSlider
            min={0}
            max={40}
            step={0.5}
            value={capacityRange}
            onValueChange={setCapacityRange}
            unit="т"
          />
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label>Доступность транспорта</Label>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            label="Выбрать период доступности"
          />
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label>Локации (города)</Label>
          <LocationSelector
            placeholder="Местонахождение транспорта"
            selectedLocations={locations}
            onSelect={handleLocationAdd}
            onRemove={handleLocationRemove}
          />
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label className="mb-2 block">Дополнительное оборудование</Label>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-gps"
                checked={hasGps}
                onCheckedChange={(checked) => setHasGps(!!checked)}
              />
              <Label htmlFor="has-gps" className="flex items-center">
                <Wifi className="h-4 w-4 mr-1 text-blue-500" />
                GPS-трекер
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-ramp"
                checked={hasRamp}
                onCheckedChange={(checked) => setHasRamp(!!checked)}
              />
              <Label htmlFor="has-ramp" className="flex items-center">
                <Truck className="h-4 w-4 mr-1 text-green-500" />
                Гидроборт
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-refrigerator"
                checked={hasRefrigerator}
                onCheckedChange={(checked) => setHasRefrigerator(!!checked)}
              />
              <Label htmlFor="has-refrigerator" className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                Холодильная установка
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-hydroboard"
                checked={hasHydroboard}
                onCheckedChange={(checked) => setHasHydroboard(!!checked)}
              />
              <Label htmlFor="has-hydroboard" className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-amber-500" />
                Гидролифт
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

export default TransportFilters;

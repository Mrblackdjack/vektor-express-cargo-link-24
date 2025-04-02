
import React from 'react';
import { MapPin, Calendar, Package, Filter, Truck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterButtonsProps {
  activeTab: 'cargo' | 'transport';
  onOpenFilters: () => void;
  hasAppliedFilters: boolean;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  activeTab, 
  onOpenFilters, 
  hasAppliedFilters 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {activeTab === 'cargo' ? (
        <>
          <Button variant="outline" size="sm" className="flex items-center" onClick={onOpenFilters}>
            <MapPin className="h-4 w-4 mr-1" />
            Маршрут
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Дата
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Package className="h-4 w-4 mr-1" />
            Тип груза
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" size="sm" className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            Локация
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Дата
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Truck className="h-4 w-4 mr-1" />
            Тип ТС
          </Button>
        </>
      )}
      <Button variant="outline" size="sm" className="flex items-center" onClick={onOpenFilters}>
        <Filter className="h-4 w-4 mr-1" />
        Фильтры
        {hasAppliedFilters && (
          <Badge className="ml-1 bg-blue-500 h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
            !
          </Badge>
        )}
      </Button>
    </div>
  );
};

export default FilterButtons;

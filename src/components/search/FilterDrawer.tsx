
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CargoFilters, { CargoFiltersProps } from "@/components/search/CargoFilters";
import TransportFilters, { TransportFiltersProps } from "@/components/search/TransportFilters";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: "cargo" | "transport";
  onApplyCargoFilters: CargoFiltersProps["onApplyFilters"];
  onApplyTransportFilters: TransportFiltersProps["onApplyFilters"];
  onResetFilters: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onApplyCargoFilters,
  onApplyTransportFilters,
  onResetFilters,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[90%] sm:w-[450px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {activeTab === "cargo" ? "Фильтр грузов" : "Фильтр транспорта"}
          </SheetTitle>
        </SheetHeader>
        
        {activeTab === "cargo" ? (
          <CargoFilters 
            onApplyFilters={onApplyCargoFilters}
            onReset={onResetFilters}
            onClose={onClose}
          />
        ) : (
          <TransportFilters 
            onApplyFilters={onApplyTransportFilters}
            onReset={onResetFilters}
            onClose={onClose}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawer;

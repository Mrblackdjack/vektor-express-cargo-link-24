
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterDrawer from '@/components/search/FilterDrawer';
import SearchInput from '@/components/search/SearchInput';
import FilterButtons from '@/components/search/FilterButtons';
import CargoResults from '@/components/search/CargoResults';
import TransportResults from '@/components/search/TransportResults';
import { toast } from 'sonner';

const SearchPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'cargo' | 'transport'>('cargo');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });
  
  // Filter states
  const [appliedFilters, setAppliedFilters] = useState<{
    cargo: any;
    transport: any;
  }>({
    cargo: null,
    transport: null
  });
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const toggleAuthModal = (tab: 'login' | 'register') => {
    setAuthModalOpen(true);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as 'cargo' | 'transport');
  };
  
  const handleLocationAdd = (location: string) => {
    setSelectedLocations(prev => [...prev, location]);
  };
  
  const handleLocationRemove = (location: string) => {
    setSelectedLocations(prev => prev.filter(loc => loc !== location));
  };
  
  const handleOpenFilters = () => {
    setFilterDrawerOpen(true);
  };
  
  const handleApplyCargoFilters = (filters: any) => {
    setAppliedFilters(prev => ({
      ...prev,
      cargo: filters
    }));
    searchWithFilters(filters);
  };
  
  const handleApplyTransportFilters = (filters: any) => {
    setAppliedFilters(prev => ({
      ...prev,
      transport: filters
    }));
    searchWithFilters(filters);
  };
  
  const handleResetFilters = () => {
    setAppliedFilters(prev => ({
      ...prev,
      [activeTab]: null
    }));
    
    // Reset UI state also
    setSelectedLocations([]);
    setDateRange({from: undefined, to: undefined});
    
    // Search without filters
    searchWithFilters(null);
  };
  
  const searchWithFilters = (filters: any) => {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      
      if (filters) {
        toast.success("Фильтры применены");
      } else {
        toast.info("Фильтры сброшены");
      }
    }, 1000);
  };
  
  // Handle search on query change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length > 2) {
        setIsLoading(true);
        // Simulate search API call
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  
  return (
    <div className="container mx-auto max-w-md bg-background min-h-screen relative pb-16">
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={isLoggedIn}
        toggleAuthModal={toggleAuthModal}
      />
      
      <main className="pb-20">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Поиск</h1>
          
          <SearchInput 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <Tabs defaultValue="cargo" value={activeTab} onValueChange={handleTabChange} className="mb-6">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="cargo">Грузы</TabsTrigger>
              <TabsTrigger value="transport">Транспорт</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cargo">
              <FilterButtons 
                activeTab="cargo"
                onOpenFilters={handleOpenFilters}
                hasAppliedFilters={!!appliedFilters.cargo}
              />
              <CargoResults isLoading={isLoading} />
            </TabsContent>
            
            <TabsContent value="transport">
              <FilterButtons 
                activeTab="transport"
                onOpenFilters={handleOpenFilters}
                hasAppliedFilters={!!appliedFilters.transport}
              />
              <TransportResults isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <BottomNavigation />
      
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        activeTab={activeTab}
        onApplyCargoFilters={handleApplyCargoFilters}
        onApplyTransportFilters={handleApplyTransportFilters}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
};

export default SearchPage;

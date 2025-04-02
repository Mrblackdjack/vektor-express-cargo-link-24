
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import SearchInput from '@/components/search/SearchInput';
import OrderHistory from '@/components/dashboard/OrderHistory';

// Sample data
const activeOrders = [
  {
    id: '123456',
    status: 'in_progress' as const,
    fromCity: 'Москва',
    toCity: 'Санкт-Петербург',
    date: '12 мая 2025',
    cargoType: 'Бытовая техника',
    price: 15000,
  },
  {
    id: '123457',
    status: 'pending' as const,
    fromCity: 'Новосибирск',
    toCity: 'Краснодар',
    date: '15 мая 2025',
    cargoType: 'Мебель',
    price: 45000,
  },
];

const completedOrders = [
  {
    id: '123458',
    status: 'completed' as const,
    fromCity: 'Москва',
    toCity: 'Казань',
    date: '5 апреля 2025',
    cargoType: 'Стройматериалы',
    price: 12000,
  },
  {
    id: '123459',
    status: 'completed' as const,
    fromCity: 'Екатеринбург',
    toCity: 'Сочи',
    date: '28 марта 2025',
    cargoType: 'Продукты питания',
    price: 35000,
  },
  {
    id: '123460',
    status: 'cancelled' as const,
    fromCity: 'Москва',
    toCity: 'Нижний Новгород',
    date: '15 марта 2025',
    cargoType: 'Медицинское оборудование',
    price: 22000,
  }
];

const OrdersPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Filter orders based on search query
  const filteredActiveOrders = activeOrders.filter(order =>
    order.fromCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.toCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.includes(searchQuery)
  );
  
  const filteredCompletedOrders = completedOrders.filter(order =>
    order.fromCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.toCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.includes(searchQuery)
  );
  
  return (
    <div className="container mx-auto max-w-md bg-background min-h-screen pb-20">
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={true}
        toggleAuthModal={() => {}}
      />
      
      <main className="p-4">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/profile')}
            className="mr-2"
          >
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-bold">Мои заказы</h1>
        </div>
        
        <SearchInput 
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Поиск по номеру заказа или маршруту"
        />
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="active">Активные</TabsTrigger>
            <TabsTrigger value="completed">Завершенные</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <OrderHistory 
              orders={filteredActiveOrders}
              title="Активные заказы"
            />
            
            {filteredActiveOrders.length === 0 && searchQuery && (
              <div className="text-center py-6 text-gray-500">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p>По запросу "{searchQuery}" ничего не найдено</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery('')}>
                  Сбросить поиск
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            <OrderHistory 
              orders={filteredCompletedOrders}
              title="Завершенные заказы"
            />
            
            {filteredCompletedOrders.length === 0 && searchQuery && (
              <div className="text-center py-6 text-gray-500">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p>По запросу "{searchQuery}" ничего не найдено</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery('')}>
                  Сбросить поиск
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default OrdersPage;

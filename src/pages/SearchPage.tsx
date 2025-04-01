
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Search, Filter, MapPin, Calendar, Truck, Package, ArrowUpDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SearchPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('cargo');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const toggleAuthModal = (tab: 'login' | 'register') => {
    setAuthModalOpen(true);
  };
  
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
          
          <div className="relative mb-4">
            <Input
              placeholder="Номер заказа, маршрут, груз..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <Tabs defaultValue="cargo" className="mb-6">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="cargo">Грузы</TabsTrigger>
              <TabsTrigger value="transport">Транспорт</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cargo">
              <div className="flex flex-wrap gap-2 mb-4">
                <Button variant="outline" size="sm" className="flex items-center">
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
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-1" />
                  Фильтры
                </Button>
              </div>
              
              <div className="space-y-4">
                {/* Cargo Cards */}
                {[1, 2, 3, 4, 5].map((item) => (
                  <div 
                    key={item}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/cargo/${item}`)}
                  >
                    <div className="flex justify-between mb-2">
                      <div className="flex space-x-1 items-center">
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-normal">
                          {Math.floor(Math.random() * 20) + 1}т
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 font-normal">
                          {Math.floor(Math.random() * 100) + 10}м³
                        </Badge>
                      </div>
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        {(Math.floor(Math.random() * 50) + 10) * 1000} ₽
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
                          <p className="font-medium dark:text-white truncate">Москва</p>
                        </div>
                        <div className="ml-1 border-l border-dashed border-gray-300 dark:border-gray-600 h-4"></div>
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-600 mr-2"></div>
                          <p className="font-medium dark:text-white truncate">
                            {["Санкт-Петербург", "Казань", "Нижний Новгород", "Екатеринбург", "Новосибирск"][item-1]}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {Math.floor(Math.random() * 1000) + 100} км
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600 dark:text-gray-400">
                        Загрузка: 25.05.2024
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Выгрузка: 27.05.2024
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="transport">
              <div className="flex flex-wrap gap-2 mb-4">
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
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-1" />
                  Фильтры
                </Button>
              </div>
              
              <div className="space-y-4">
                {/* Transport Cards */}
                {[1, 2, 3, 4].map((item) => (
                  <div 
                    key={item}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/transport/${item}`)}
                  >
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium dark:text-white">
                        {["Тент", "Рефрижератор", "Изотерм", "Борт"][item-1]}
                      </h3>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-normal">
                        Свободен
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex space-x-1 items-center">
                        <ArrowUpDown className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {Math.floor(Math.random() * 20) + 5}т
                        </span>
                      </div>
                      <div className="flex space-x-1 items-center">
                        <Package className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {Math.floor(Math.random() * 100) + 20}м³
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {["Москва", "Санкт-Петербург", "Казань", "Нижний Новгород"][item-1]}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Доступен с 25.05.2024
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default SearchPage;

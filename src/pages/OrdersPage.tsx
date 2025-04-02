
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Search, Filter, Calendar, Tag, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import SearchInput from '@/components/search/SearchInput';
import OrderHistory from '@/components/dashboard/OrderHistory';
import OrderDetailsPanel from '@/components/orders/OrderDetailsPanel';

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

// More detailed sample data for order details
const detailedOrderData = {
  '123456': {
    id: '123456',
    status: 'in_progress' as const,
    fromCity: 'Москва',
    toCity: 'Санкт-Петербург',
    createdDate: '12 мая 2025',
    deliveryDate: '14 мая 2025',
    cargoType: 'Бытовая техника',
    weight: '450 кг',
    volume: '1.2 м³',
    price: 15000,
    documents: [
      { id: 'doc1', name: 'Накладная №123456', status: 'signed', date: '12 мая 2025' },
      { id: 'doc2', name: 'Договор перевозки', status: 'pending', date: '12 мая 2025' },
    ],
    comments: [
      { 
        id: 'comment1', 
        author: 'Менеджер Иван', 
        text: 'Груз принят на склад отправителя, ожидает загрузки', 
        date: '12 мая 2025, 14:30',
      }
    ],
    history: [
      { id: 'hist1', action: 'Заказ создан', user: 'Система', date: '12 мая 2025, 10:15' },
      { id: 'hist2', action: 'Заказ принят в работу', user: 'Менеджер Иван', date: '12 мая 2025, 14:30' },
    ]
  },
  '123457': {
    id: '123457',
    status: 'pending' as const,
    fromCity: 'Новосибирск',
    toCity: 'Краснодар',
    createdDate: '15 мая 2025',
    deliveryDate: '20 мая 2025',
    cargoType: 'Мебель',
    weight: '850 кг',
    volume: '4.5 м³',
    price: 45000,
    documents: [
      { id: 'doc1', name: 'Накладная №123457', status: 'pending', date: '15 мая 2025' },
    ],
    comments: [],
    history: [
      { id: 'hist1', action: 'Заказ создан', user: 'Система', date: '15 мая 2025, 09:45' },
    ]
  },
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(orderId || null);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleShowFilters = () => {
    setShowFilters(!showFilters);
    if (!showFilters) {
      toast.info('Открытие панели фильтров');
    }
  };
  
  const handleSelectDateFilter = () => {
    toast.info('Открытие выбора даты для фильтрации');
  };
  
  const handleSelectCargoTypeFilter = () => {
    toast.info('Открытие выбора типа груза для фильтрации');
  };
  
  const handleSelectLocationFilter = () => {
    toast.info('Открытие выбора местоположения для фильтрации');
  };
  
  const handleOrderSelect = (id: string) => {
    setSelectedOrder(id);
    navigate(`/orders/${id}`);
  };
  
  const handleBackToList = () => {
    setSelectedOrder(null);
    navigate('/orders');
  };
  
  // Filter orders based on search query
  const filteredActiveOrders = activeOrders.filter(order =>
    order.fromCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.toCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.includes(searchQuery) ||
    order.cargoType.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredCompletedOrders = completedOrders.filter(order =>
    order.fromCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.toCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.includes(searchQuery) ||
    order.cargoType.toLowerCase().includes(searchQuery.toLowerCase())
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
        {selectedOrder && detailedOrderData[selectedOrder as keyof typeof detailedOrderData] ? (
          <>
            <div className="flex items-center mb-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBackToList}
                className="mr-2"
              >
                <ChevronLeft />
              </Button>
              <h1 className="text-xl font-bold">Детали заказа</h1>
            </div>
            
            <OrderDetailsPanel {...detailedOrderData[selectedOrder as keyof typeof detailedOrderData]} />
          </>
        ) : (
          <>
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
            
            <div className="mb-4">
              <SearchInput 
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Поиск по номеру заказа или маршруту"
              />
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Button variant="outline" size="sm" className="flex items-center" onClick={handleSelectDateFilter}>
                <Calendar size={16} className="mr-1" />
                Дата
              </Button>
              <Button variant="outline" size="sm" className="flex items-center" onClick={handleSelectCargoTypeFilter}>
                <Tag size={16} className="mr-1" />
                Тип груза
              </Button>
              <Button variant="outline" size="sm" className="flex items-center" onClick={handleSelectLocationFilter}>
                <MapPin size={16} className="mr-1" />
                Маршрут
              </Button>
              <Button 
                variant={showFilters ? "default" : "outline"} 
                size="sm" 
                className="flex items-center ml-auto" 
                onClick={handleShowFilters}
              >
                <Filter size={16} className="mr-1" />
                Фильтры
              </Button>
            </div>
            
            {/* Advanced filters panel */}
            {showFilters && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mb-4 animate-fade-in">
                <h3 className="font-medium mb-3">Расширенные фильтры</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Статус заказа</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Button size="sm" variant="outline" className="text-xs">Все</Button>
                      <Button size="sm" variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">В пути</Button>
                      <Button size="sm" variant="outline" className="text-xs">Ожидает</Button>
                      <Button size="sm" variant="outline" className="text-xs">Завершен</Button>
                      <Button size="sm" variant="outline" className="text-xs">Отменен</Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Период времени</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Button size="sm" variant="outline" className="text-xs">За все время</Button>
                      <Button size="sm" variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">Текущий месяц</Button>
                      <Button size="sm" variant="outline" className="text-xs">Прошлый месяц</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button size="sm" variant="outline">Сбросить</Button>
                    <Button size="sm">Применить</Button>
                  </div>
                </div>
              </div>
            )}
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="active">Активные</TabsTrigger>
                <TabsTrigger value="completed">Завершенные</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <OrderHistory 
                  orders={filteredActiveOrders}
                  title="Активные заказы"
                  onOrderClick={handleOrderSelect}
                />
                
                {filteredActiveOrders.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    {searchQuery ? (
                      <>
                        <Search className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <p>По запросу "{searchQuery}" ничего не найдено</p>
                        <Button variant="outline" className="mt-4" onClick={() => setSearchQuery('')}>
                          Сбросить поиск
                        </Button>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <p>У вас нет активных заказов</p>
                        <Button className="mt-4" onClick={() => navigate('/new-cargo')}>
                          Создать заказ
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed">
                <OrderHistory 
                  orders={filteredCompletedOrders}
                  title="Завершенные заказы"
                  onOrderClick={handleOrderSelect}
                />
                
                {filteredCompletedOrders.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    {searchQuery ? (
                      <>
                        <Search className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <p>По запросу "{searchQuery}" ничего не найдено</p>
                        <Button variant="outline" className="mt-4" onClick={() => setSearchQuery('')}>
                          Сбросить поиск
                        </Button>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <p>У вас нет завершенных заказов</p>
                      </>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default OrdersPage;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, MapPin, Package, Truck, Calendar, Info, MessageSquare, Clock } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import DeliveryMap, { WaypointType } from '@/components/tracking/DeliveryMap';
import DeliveryStatus from '@/components/tracking/DeliveryStatus';
import DeliveryActions from '@/components/tracking/DeliveryActions';
import DeliveryDetails from '@/components/tracking/DeliveryDetails';

const TrackingPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  
  const [orderDetails, setOrderDetails] = useState({
    id: orderId || 'VE123456',
    status: 'в пути',
    originCity: 'Москва',
    destinationCity: 'Казань',
    distance: '820 км',
    currentLocation: 'Нижний Новгород',
    departureDate: '20 мая 2025, 10:00',
    estimatedArrival: '22 мая 2025, 18:30',
    completionPercentage: 60,
    lastUpdated: '21 мая 2025, 14:35',
    cargoType: 'Электроника',
    weight: '1200 кг',
    volume: '3.5 м³',
    route: [
      { city: 'Москва', time: '20 мая 2025, 10:00', status: 'completed' as const },
      { city: 'Владимир', time: '20 мая 2025, 13:45', status: 'completed' as const },
      { city: 'Нижний Новгород', time: '21 мая 2025, 14:30', status: 'current' as const },
      { city: 'Чебоксары', time: '21 мая 2025, 19:00', status: 'pending' as const },
      { city: 'Казань', time: '22 мая 2025, 18:30', status: 'pending' as const }
    ],
    updates: [
      { 
        id: '1',
        time: '21 мая 2025, 14:35', 
        message: 'Транспорт прибыл в Нижний Новгород', 
        location: 'Нижний Новгород'
      },
      { 
        id: '2',
        time: '20 мая 2025, 13:45', 
        message: 'Транспорт прошел Владимир', 
        location: 'Владимир'
      },
      { 
        id: '3',
        time: '20 мая 2025, 10:00', 
        message: 'Груз принят и отправлен со склада в Москве', 
        location: 'Москва'
      },
      { 
        id: '4',
        time: '19 мая 2025, 16:20', 
        message: 'Заказ оформлен и ожидает отправки', 
        location: 'Москва'
      },
    ],
    driver: {
      name: 'Александр Петров',
      phone: '+7 (925) 123-4567',
      rating: 4.8,
      vehicle: 'Volvo FH16 - Т777МП77'
    },
    documents: [
      { id: 'doc1', name: 'Накладная №12345', status: 'Подписана' },
      { id: 'doc2', name: 'Договор поставки', status: 'Подписан' },
      { id: 'doc3', name: 'Сертификат соответствия', status: 'В обработке' },
    ]
  });
  const [activeTab, setActiveTab] = useState<'map' | 'details' | 'updates'>('map');
  
  useEffect(() => {
    console.log(`Fetching tracking data for order ID: ${orderId}`);
    // Here you would fetch real data
    // For demo purposes, we're using the static data from state
  }, [orderId]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };
  
  const handleCopyTrackingNumber = () => {
    navigator.clipboard.writeText(orderDetails.id);
    toast.success('Номер отслеживания скопирован');
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Отслеживание груза ${orderDetails.id}`,
        text: `Отслеживание груза из ${orderDetails.originCity} в ${orderDetails.destinationCity}`,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      handleCopyTrackingNumber();
      toast.info('Ссылка скопирована. Теперь вы можете поделиться ею.');
    }
  };
  
  const handleContact = (type: 'call' | 'message') => {
    if (type === 'call') {
      window.location.href = `tel:${orderDetails.driver.phone}`;
    } else {
      toast.info('Открытие чата с водителем');
    }
  };
  
  const handleExpandStatusAction = () => {
    setActiveTab('updates');
  };
  
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
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ChevronLeft />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Отслеживание</h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>№ {orderDetails.id}</span>
              <button 
                onClick={handleCopyTrackingNumber}
                className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Копировать
              </button>
              <button 
                onClick={handleShare}
                className="ml-4 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Поделиться
              </button>
            </div>
          </div>
        </div>
        
        {/* Status Overview */}
        <DeliveryStatus
          status={orderDetails.status}
          completionPercentage={orderDetails.completionPercentage}
          originCity={orderDetails.originCity}
          destinationCity={orderDetails.destinationCity}
          lastUpdated={orderDetails.lastUpdated}
          onExpandAction={handleExpandStatusAction}
        />
        
        {/* Actions */}
        <DeliveryActions
          onCall={() => handleContact('call')}
          onMessage={() => handleContact('message')}
          onSupport={() => toast.info('Открытие чата с поддержкой')}
        />
        
        {/* Tabs */}
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="mt-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="map">Карта</TabsTrigger>
            <TabsTrigger value="details">Детали</TabsTrigger>
            <TabsTrigger value="updates">Обновления</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map">
            <DeliveryMap
              origin={orderDetails.originCity}
              destination={orderDetails.destinationCity}
              currentLocation={orderDetails.currentLocation}
              waypoints={orderDetails.route as WaypointType[]}
            />
            
            <Card className="mt-4 mb-4">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <div className="text-xs text-gray-500">Ожидаемое время прибытия</div>
                    <div className="font-medium">{orderDetails.estimatedArrival}</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 text-right">Расстояние</div>
                  <div className="font-medium">{orderDetails.distance}</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            <DeliveryDetails
              cargoType={orderDetails.cargoType}
              weight={orderDetails.weight}
              volume={orderDetails.volume}
              departureDate={orderDetails.departureDate}
              estimatedArrival={orderDetails.estimatedArrival}
              driver={orderDetails.driver}
              documents={orderDetails.documents}
            />
          </TabsContent>
          
          <TabsContent value="updates">
            <div className="space-y-3">
              {orderDetails.updates.map(update => (
                <Card key={update.id} className="relative">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium">{update.message}</div>
                        <div className="text-xs text-gray-500 mt-1">{update.time}</div>
                        <div className="flex items-center mt-1 text-xs text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {update.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default TrackingPage;

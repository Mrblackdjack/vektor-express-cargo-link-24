import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, MapPin, Package, Truck, Calendar, Info, MessageSquare, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import DeliveryMap from '@/components/tracking/DeliveryMap';
import DeliveryStatus from '@/components/tracking/DeliveryStatus';
import DeliveryDetails from '@/components/tracking/DeliveryDetails';
import DeliveryActions from '@/components/tracking/DeliveryActions';

// Sample data - in a real app, this would come from an API
const orderDetails = {
  id: "VE123456",
  status: "in_progress",
  originCity: "Москва",
  destinationCity: "Санкт-Петербург",
  currentLocation: {
    city: "Тверь",
    coordinates: { lat: 56.859611, lng: 35.911896 }
  },
  departureDate: "25 мая 2023, 08:30",
  estimatedArrival: "25 мая 2023, 18:30",
  distance: "697 км",
  timeLeft: "4 часа 12 минут",
  distanceLeft: "302 км",
  cargoType: "Бытовая техника",
  weight: "5.2 тонны",
  volume: "18 м³",
  driver: {
    name: "Алексей Смирнов",
    phone: "+7 (900) 123-45-67",
    rating: 4.8,
    vehicle: "Mercedes Actros"
  },
  documents: [
    { id: "doc1", name: "ТТН", status: "подписана" },
    { id: "doc2", name: "Договор", status: "ожидает подписания" }
  ],
  route: [
    { city: "Москва", time: "08:30", status: "completed" },
    { city: "Тверь", time: "12:15", status: "current" },
    { city: "Великий Новгород", time: "15:45", status: "pending" },
    { city: "Санкт-Петербург", time: "18:30", status: "pending" }
  ],
  updates: [
    { time: "08:30", message: "Груз принят водителем" },
    { time: "08:45", message: "Транспорт выехал с точки погрузки" },
    { time: "12:15", message: "Остановка в Твери, техническая пауза 30 минут" }
  ]
};

const TrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  const [activeTab, setActiveTab] = useState<'map' | 'details' | 'updates'>('map');
  
  useEffect(() => {
    console.log(`Fetching tracking data for order ID: ${orderId}`);
    // Here you would fetch real data
    // setOrderData(fetchedData)
  }, [orderId]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleContactDriver = () => {
    toast.info("Открытие чата с водителем");
    navigate(`/messages?driver=${orderDetails.driver.name}`);
  };

  const handleViewDocuments = () => {
    toast.info("Переход к документам заказа");
    navigate(`/documents?order=${orderDetails.id}`);
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
          <h1 className="text-xl font-bold">Отслеживание заказа</h1>
        </div>
        
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Номер заказа</span>
              <span className="font-semibold">{orderDetails.id}</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <MapPin size={16} className="text-blue-600 mr-1" />
                  <span className="font-medium">{orderDetails.originCity}</span>
                </div>
                <div className="flex items-center mt-1">
                  <MapPin size={16} className="text-red-600 mr-1" />
                  <span className="font-medium">{orderDetails.destinationCity}</span>
                </div>
              </div>
              <DeliveryStatus status={orderDetails.status} />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex space-x-2 mb-4">
          <Button 
            variant={activeTab === 'map' ? 'default' : 'outline'}
            onClick={() => setActiveTab('map')}
            className="flex-1"
          >
            Карта
          </Button>
          <Button 
            variant={activeTab === 'details' ? 'default' : 'outline'}
            onClick={() => setActiveTab('details')}
            className="flex-1"
          >
            Детали
          </Button>
          <Button 
            variant={activeTab === 'updates' ? 'default' : 'outline'}
            onClick={() => setActiveTab('updates')}
            className="flex-1"
          >
            Обновления
          </Button>
        </div>
        
        {activeTab === 'map' && (
          <>
            <DeliveryMap 
              origin={orderDetails.originCity}
              destination={orderDetails.destinationCity}
              currentLocation={orderDetails.currentLocation}
              waypoints={orderDetails.route as any}
            />
            
            <Card className="mt-4 mb-4">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Осталось</div>
                    <div className="font-semibold flex items-center">
                      <Clock size={16} className="mr-1 text-blue-600" />
                      {orderDetails.timeLeft}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Расстояние</div>
                    <div className="font-semibold flex items-center">
                      <Truck size={16} className="mr-1 text-blue-600" />
                      {orderDetails.distanceLeft}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
        {activeTab === 'details' && (
          <DeliveryDetails 
            cargoType={orderDetails.cargoType}
            weight={orderDetails.weight}
            volume={orderDetails.volume}
            departureDate={orderDetails.departureDate}
            estimatedArrival={orderDetails.estimatedArrival}
            driver={orderDetails.driver}
            documents={orderDetails.documents}
          />
        )}
        
        {activeTab === 'updates' && (
          <div className="space-y-4">
            {orderDetails.updates.map((update, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                      <Info size={16} className="text-blue-600 dark:text-blue-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">{update.time}</p>
                      <p className="font-medium">{update.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <DeliveryActions 
          onContactDriver={handleContactDriver}
          onViewDocuments={handleViewDocuments}
        />
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default TrackingPage;

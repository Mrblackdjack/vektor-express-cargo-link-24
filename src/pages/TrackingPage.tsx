
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, MessageSquare, Clock, Package, Truck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert"; // Fixed import from alert.tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

// Type definitions for the components
interface DeliveryStatusProps {
  status: string;
  completionPercentage: number; // Added this property to match usage
  originCity: string;
  destinationCity: string;
  lastUpdated: string;
  onExpandAction: () => void;
}

interface DeliveryActionsProps {
  onCall: () => void; // Added these properties to match usage
  onMessage: () => void;
  onSupport: () => void;
}

interface WaypointType {
  location: string;
  status: "completed" | "current" | "upcoming";
  timestamp?: string;
}

interface DeliveryDetailsProps {
  trackingNumber: string;
  driverName: string;
  driverPhone: string;
  vehicleInfo: string;
  estimatedArrival: string;
  waypoints: WaypointType[];
}

interface DeliveryMapProps {
  waypoints: WaypointType[];
  currentLocation?: { lat: number; lng: number };
}

// Components
const DeliveryStatus: React.FC<DeliveryStatusProps> = ({
  status,
  completionPercentage,
  originCity,
  destinationCity,
  lastUpdated,
  onExpandAction
}) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Статус доставки: {status}</CardTitle>
        <CardDescription>Обновлено: {lastUpdated}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={completionPercentage} className="h-2 mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {originCity}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {destinationCity}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onExpandAction} variant="outline" className="w-full">
          Подробная информация
        </Button>
      </CardFooter>
    </Card>
  );
};

const DeliveryActions: React.FC<DeliveryActionsProps> = ({
  onCall,
  onMessage,
  onSupport
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Действия</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-2">
        <Button onClick={onCall} variant="outline" className="flex flex-col items-center py-4 h-auto">
          <Phone className="h-6 w-6 mb-1" />
          <span className="text-xs">Позвонить</span>
        </Button>
        <Button onClick={onMessage} variant="outline" className="flex flex-col items-center py-4 h-auto">
          <MessageSquare className="h-6 w-6 mb-1" />
          <span className="text-xs">Сообщение</span>
        </Button>
        <Button onClick={onSupport} variant="outline" className="flex flex-col items-center py-4 h-auto">
          <MapPin className="h-6 w-6 mb-1" />
          <span className="text-xs">Поддержка</span>
        </Button>
      </CardContent>
    </Card>
  );
};

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({
  trackingNumber,
  driverName,
  driverPhone,
  vehicleInfo,
  estimatedArrival,
  waypoints
}) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Информация о доставке</CardTitle>
        <CardDescription>Заказ #{trackingNumber}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium mb-1">Водитель</p>
            <p className="text-sm text-muted-foreground">{driverName}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Телефон</p>
            <p className="text-sm text-muted-foreground">{driverPhone}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Транспорт</p>
            <p className="text-sm text-muted-foreground">{vehicleInfo}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Ожидаемое прибытие</p>
            <p className="text-sm text-muted-foreground">{estimatedArrival}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Маршрут</p>
          <div className="space-y-2">
            {waypoints.map((point, index) => (
              <div key={index} className={`flex items-center p-2 rounded-md ${
                point.status === "completed" ? "bg-green-50" :
                point.status === "current" ? "bg-blue-50" : "bg-gray-50"
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  point.status === "completed" ? "bg-green-100 text-green-700" :
                  point.status === "current" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{point.location}</p>
                  {point.timestamp && <p className="text-xs text-muted-foreground">{point.timestamp}</p>}
                </div>
                {point.status === "completed" && (
                  <div className="text-green-600 text-xs font-medium">Выполнено</div>
                )}
                {point.status === "current" && (
                  <div className="text-blue-600 text-xs font-medium">Текущий</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DeliveryMap: React.FC<DeliveryMapProps> = ({ waypoints, currentLocation }) => {
  return (
    <Card className="mb-4 overflow-hidden">
      <div className="bg-gray-100 h-40 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Карта маршрута</p>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="text-xs text-muted-foreground">
          {waypoints.filter(w => w.status === "completed").length} из {waypoints.length} пунктов доставки завершены
        </div>
      </CardContent>
    </Card>
  );
};

// Loading skeleton
const TrackingLoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[180px] w-full" />
      <Skeleton className="h-[120px] w-full" />
      <Skeleton className="h-[200px] w-full" />
    </div>
  );
};

const TrackingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const mockWaypoints: WaypointType[] = [
    { location: "Москва, ул. Ленина 10", status: "completed", timestamp: "10 мая, 08:30" },
    { location: "Владимир, Складская 5", status: "current", timestamp: "10 мая, 16:45" },
    { location: "Нижний Новгород, пр. Гагарина 25", status: "upcoming" },
  ];
  
  const handleCall = () => {
    console.log("Calling driver...");
  };
  
  const handleMessage = () => {
    console.log("Opening message dialog...");
  };
  
  const handleSupport = () => {
    console.log("Opening support chat...");
    return 1;  // This now returns a number, matching the component prop type
  };
  
  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Отслеживание заказа</h1>
      
      {isLoading ? (
        <TrackingLoadingSkeleton />
      ) : (
        <>
          <Alert className="mb-4">
            <Package className="h-5 w-5" />
            <AlertDescription>
              Ваш заказ в пути. Ожидаемое время прибытия: сегодня, 18:30-19:00
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="status" className="mb-6">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="status">Статус</TabsTrigger>
              <TabsTrigger value="details">Детали</TabsTrigger>
            </TabsList>
            <TabsContent value="status">
              <DeliveryStatus 
                status="В пути" 
                completionPercentage={65}
                originCity="Москва" 
                destinationCity="Нижний Новгород" 
                lastUpdated="10 мая, 16:45"
                onExpandAction={() => setShowDetails(true)}
              />
              
              <DeliveryMap 
                waypoints={mockWaypoints as WaypointType[]}
              />
              
              <DeliveryActions 
                onCall={handleCall}
                onMessage={handleMessage}
                onSupport={handleSupport}
              />
            </TabsContent>
            <TabsContent value="details">
              <DeliveryDetails 
                trackingNumber="TRK-12345"
                driverName="Иванов Иван"
                driverPhone="+7 (900) 123-45-67"
                vehicleInfo="Газель, А123БВ 77"
                estimatedArrival="Сегодня, 18:30-19:00"
                waypoints={mockWaypoints}
              />
            </TabsContent>
          </Tabs>
          
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Подробная информация</DialogTitle>
                <DialogDescription>
                  Детальная информация о вашем заказе и его текущем статусе
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Номер заказа</p>
                    <p className="text-sm text-muted-foreground">TRK-12345</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Создан</p>
                    <p className="text-sm text-muted-foreground">10 мая 2023</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Тип груза</p>
                    <p className="text-sm text-muted-foreground">Стандартный</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Вес</p>
                    <p className="text-sm text-muted-foreground">150 кг</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default TrackingPage;


import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { toast } from 'sonner';

interface LiveTrackingMapProps {
  originCity: string;
  destinationCity: string;
  currentLocation?: { lat: number; lng: number };
  eta?: string;
  distance?: string;
}

const LiveTrackingMap: React.FC<LiveTrackingMapProps> = ({
  originCity = "Москва",
  destinationCity = "Казань",
  currentLocation,
  eta = "22 мая, 18:30",
  distance = "820 км"
}) => {
  const [progress, setProgress] = useState(0);
  
  // Simulate truck movement
  useEffect(() => {
    // Animate progress from 0 to actual value
    const timer = setTimeout(() => {
      setProgress(65); // Assume we're 65% of the way there
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleMapClick = () => {
    toast.info("Полная версия карты доступна в премиум-подписке");
  };
  
  const handleOriginClick = () => {
    toast.info(`Информация о пункте отправления: ${originCity}`);
  };
  
  const handleDestinationClick = () => {
    toast.info(`Информация о пункте назначения: ${destinationCity}`);
  };
  
  const handleDistanceClick = () => {
    toast.info(`Расстояние маршрута: ${distance}`);
  };
  
  const handleETAClick = () => {
    toast.info(`Расчетное время прибытия: ${eta}`);
  };
  
  return (
    <section className="p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
      <h3 className="font-bold text-lg mb-3 dark:text-white">Отслеживание груза</h3>
      
      {/* Map placeholder */}
      <div className="relative rounded-lg overflow-hidden mb-4">
        <div 
          className="h-40 bg-blue-50 dark:bg-gray-700 rounded-lg cursor-pointer"
          onClick={handleMapClick}
        >
          {/* This would be a real map in production */}
          <div className="h-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=55.7558,37.6176&zoom=5&size=600x400&maptype=roadmap&path=color:0x0000ff|weight:5|56.5,37.6|55.5,49.1&markers=color:red|label:A|56.5,37.6&markers=color:blue|label:B|55.5,49.1&key=DEMO_KEY')] opacity-50 bg-cover bg-center"></div>
            <div className="text-center relative z-10 bg-white/70 dark:bg-gray-800/70 p-2 rounded">
              <p className="text-sm font-medium">Карта доступна в полной версии</p>
            </div>
          </div>
        </div>
        
        {/* Origin and destination */}
        <div className="flex justify-between items-center my-2">
          <div 
            className="flex items-center cursor-pointer"
            onClick={handleOriginClick}
          >
            <MapPin className="text-blue-600 h-5 w-5 mr-1" />
            <span className="text-sm font-medium dark:text-white">{originCity}</span>
          </div>
          <div className="flex-1 mx-2 h-1 bg-gray-200 dark:bg-gray-600 relative">
            <div 
              className="absolute h-full bg-blue-600 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
            <div 
              className="absolute h-3 w-3 bg-blue-600 rounded-full top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out flex items-center justify-center animate-pulse"
              style={{ left: `${progress}%` }}
            >
              <Navigation className="text-white h-2 w-2" />
            </div>
          </div>
          <div 
            className="flex items-center cursor-pointer"
            onClick={handleDestinationClick}
          >
            <MapPin className="text-red-600 h-5 w-5 mr-1" />
            <span className="text-sm font-medium dark:text-white">{destinationCity}</span>
          </div>
        </div>
        
        {/* Details row */}
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <div 
            className="cursor-pointer"
            onClick={handleDistanceClick}
          >
            <span className="block">Расстояние:</span>
            <span className="font-medium text-gray-900 dark:text-white">{distance}</span>
          </div>
          <div 
            className="text-right cursor-pointer"
            onClick={handleETAClick}
          >
            <span className="block">Прибытие:</span>
            <span className="font-medium text-gray-900 dark:text-white">{eta}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveTrackingMap;

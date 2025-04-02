
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { toast } from 'sonner';

export interface WaypointType {
  city: string;
  time: string;
  status: 'completed' | 'current' | 'pending';
}

interface DeliveryMapProps {
  origin: string;
  destination: string;
  currentLocation?: string;
  waypoints?: WaypointType[];
}

const DeliveryMap: React.FC<DeliveryMapProps> = ({
  origin,
  destination,
  currentLocation,
  waypoints = []
}) => {
  const handleShareLocation = () => {
    toast.info('Функция поделиться местоположением вызвана');
  };

  return (
    <div className="space-y-4">
      {/* Map View - In a real app, you would integrate with Google Maps or similar */}
      <div className="relative border border-gray-200 dark:border-gray-700 rounded-md h-56 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-gray-500 dark:text-gray-400 text-sm">Интерактивная карта для отслеживания</span>
          <span className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            {origin} → {destination}
          </span>
        </div>

        {/* Fake map pins - replace with real map implementation */}
        <div className="absolute top-1/4 left-1/4">
          <MapPin className="h-6 w-6 text-blue-500" />
        </div>
        <div className="absolute top-1/4 right-1/4">
          <MapPin className="h-6 w-6 text-red-500" />
        </div>
        {currentLocation && (
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
            <Navigation className="h-6 w-6 text-green-500" />
          </div>
        )}
      </div>

      {/* Route Timeline */}
      <div className="space-y-1">
        <div className="flex items-center justify-between px-1 text-sm font-medium">
          <span>Маршрут</span>
          <button 
            className="text-blue-600 dark:text-blue-400 text-xs hover:underline"
            onClick={handleShareLocation}
          >
            Поделиться местоположением
          </button>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
          <div className="relative">
            {waypoints.map((waypoint, index) => (
              <div 
                key={index} 
                className={`flex items-center border-b border-gray-200 dark:border-gray-700 ${
                  waypoint.status === 'current' ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                } ${
                  waypoint.status === 'completed' ? 'text-gray-500' : ''
                }`}
              >
                <div className="flex-shrink-0 w-10 flex justify-center">
                  {waypoint.status === 'completed' && (
                    <div className="h-4 w-4 rounded-full bg-green-500 mt-4 mb-4"></div>
                  )}
                  {waypoint.status === 'current' && (
                    <div className="h-4 w-4 rounded-full bg-blue-500 animate-pulse mt-4 mb-4"></div>
                  )}
                  {waypoint.status === 'pending' && (
                    <div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-600 mt-4 mb-4"></div>
                  )}
                </div>
                <div className="flex-grow py-3 px-2">
                  <div className="font-medium">{waypoint.city}</div>
                  <div className="text-xs text-gray-500">{waypoint.time}</div>
                </div>
              </div>
            ))}
            {/* Vertical line connecting waypoints */}
            {waypoints.length > 1 && (
              <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gray-300 dark:bg-gray-700" style={{ transform: 'translateX(-50%)' }}></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMap;

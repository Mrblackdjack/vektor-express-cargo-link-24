
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { toast } from 'sonner';

interface WaypointType {
  city: string;
  time: string;
  status: 'completed' | 'current' | 'pending';
}

interface DeliveryMapProps {
  origin: string;
  destination: string;
  currentLocation: {
    city: string;
    coordinates: { lat: number; lng: number };
  };
  waypoints: WaypointType[];
}

const DeliveryMap: React.FC<DeliveryMapProps> = ({
  origin,
  destination,
  currentLocation,
  waypoints
}) => {
  const [progress, setProgress] = useState(0);
  
  // Calculate progress based on waypoints
  useEffect(() => {
    const totalWaypoints = waypoints.length;
    const completedWaypoints = waypoints.filter(wp => wp.status === 'completed').length;
    const currentIndex = waypoints.findIndex(wp => wp.status === 'current');
    
    if (currentIndex >= 0) {
      // If we're at a waypoint, calculate progress
      const progressPercent = ((completedWaypoints + 0.5) / totalWaypoints) * 100;
      setProgress(progressPercent);
    } else if (completedWaypoints > 0) {
      // If we've completed some waypoints but aren't at another yet
      const progressPercent = (completedWaypoints / totalWaypoints) * 100;
      setProgress(progressPercent);
    } else {
      // Default starting progress
      setProgress(5);
    }
  }, [waypoints]);
  
  const handleMapClick = () => {
    toast.info("Открытие полной карты маршрута");
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
      {/* Map placeholder */}
      <div 
        className="relative h-52 bg-blue-50 dark:bg-gray-700 cursor-pointer"
        onClick={handleMapClick}
      >
        <div className="h-full flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=56.5,37.6&zoom=7&size=600x400&maptype=roadmap&path=color:0x0000ff|weight:5|55.7558,37.6176|56.8596,35.9119|58.5213,31.2716|59.9386,30.3141&markers=color:red|label:A|55.7558,37.6176&markers=color:blue|label:B|59.9386,30.3141&markers=color:green|label:C|56.8596,35.9119&key=DEMO_KEY')] bg-cover bg-center opacity-70"></div>
          
          {/* Current location indicator */}
          <div className="absolute" style={{ left: `${progress}%`, top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="bg-blue-600 text-white p-1 rounded-full animate-pulse">
              <Navigation className="h-5 w-5" />
            </div>
          </div>
          
          {/* Semi-transparent overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none"></div>
        </div>
      </div>
      
      {/* Waypoints progress bar */}
      <div className="px-4 py-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <MapPin className="text-blue-600 h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{origin}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="text-red-600 h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{destination}</span>
          </div>
        </div>
        
        {/* Progress bar with waypoints */}
        <div className="relative h-5 mb-3">
          <div className="h-1 bg-gray-200 dark:bg-gray-600 absolute top-1/2 transform -translate-y-1/2 w-full rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Render waypoint markers */}
          {waypoints.map((waypoint, index) => {
            const position = (index / (waypoints.length - 1)) * 100;
            const isCompleted = waypoint.status === 'completed';
            const isCurrent = waypoint.status === 'current';
            
            return (
              <div 
                key={index}
                className="absolute transform -translate-x-1/2"
                style={{ left: `${position}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
                title={`${waypoint.city} - ${waypoint.time}`}
              >
                <div 
                  className={`w-3 h-3 rounded-full ${
                    isCurrent ? 'bg-blue-600 animate-pulse' : 
                    isCompleted ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-500'
                  }`}
                ></div>
              </div>
            );
          })}
        </div>
        
        {/* Current location text */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          Текущее местоположение: <span className="font-medium">{currentLocation.city}</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMap;

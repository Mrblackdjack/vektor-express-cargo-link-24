
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpDown, Package, MapPin, Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import SearchResultSkeleton from '@/components/search/SearchResultSkeleton';

interface TransportResultsProps {
  isLoading: boolean;
}

const TransportResults: React.FC<TransportResultsProps> = ({ isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <SearchResultSkeleton key={item} />
        ))}
      </div>
    );
  }

  return (
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
            {item === 2 && (
              <Badge variant="outline" className="border-blue-500 text-blue-600 dark:text-blue-400">
                GPS
              </Badge>
            )}
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
  );
};

export default TransportResults;

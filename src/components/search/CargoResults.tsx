
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import SearchResultSkeleton from '@/components/search/SearchResultSkeleton';

interface CargoResultsProps {
  isLoading: boolean;
}

const CargoResults: React.FC<CargoResultsProps> = ({ isLoading }) => {
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
              {item === 1 && (
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 font-normal ml-1">
                  Срочно
                </Badge>
              )}
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
  );
};

export default CargoResults;


import React from 'react';
import { useNavigate } from 'react-router-dom';

interface StatisticsSectionProps {
  monthOrders?: number;
  totalIncome?: number;
  monthDistance?: number;
  progressPercent?: number;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  monthOrders = 14,
  totalIncome = 142500,
  monthDistance = 3840,
  progressPercent = 80
}) => {
  const navigate = useNavigate();
  
  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Статистика</h2>
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div 
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded transition-colors"
            onClick={() => navigate('/statistics/orders')}
          >
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{monthOrders}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">За текущий месяц</p>
          </div>
          <div 
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded transition-colors"
            onClick={() => navigate('/statistics/income')}
          >
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalIncome.toLocaleString('ru-RU')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Общий доход, ₽</p>
          </div>
          <div 
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded transition-colors"
            onClick={() => navigate('/statistics/distance')}
          >
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{monthDistance.toLocaleString('ru-RU')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Км за месяц</p>
          </div>
        </div>
        
        <div 
          className="mt-4 cursor-pointer"
          onClick={() => navigate('/statistics/progress')}
        >
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-300">Выполнено в мае</span>
            <span className="text-blue-600 dark:text-blue-400">{progressPercent}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;

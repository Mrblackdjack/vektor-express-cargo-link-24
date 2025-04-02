
import React from 'react';
import { CheckCircle, Clock, Truck } from 'lucide-react';

interface DeliveryStatusProps {
  status: string;
}

const DeliveryStatus: React.FC<DeliveryStatusProps> = ({ status }) => {
  let statusText = '';
  let statusColor = '';
  let StatusIcon = Clock;
  
  switch (status) {
    case 'pending':
      statusText = 'Ожидается';
      statusColor = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      StatusIcon = Clock;
      break;
    case 'in_progress':
      statusText = 'В пути';
      statusColor = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      StatusIcon = Truck;
      break;
    case 'completed':
      statusText = 'Доставлено';
      statusColor = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      StatusIcon = CheckCircle;
      break;
    case 'cancelled':
      statusText = 'Отменено';
      statusColor = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      break;
    default:
      statusText = 'Обрабатывается';
      statusColor = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
  
  return (
    <div className={`px-2 py-1 rounded-full flex items-center ${statusColor}`}>
      <StatusIcon className="h-3.5 w-3.5 mr-1" />
      <span className="text-sm font-medium">{statusText}</span>
    </div>
  );
};

export default DeliveryStatus;

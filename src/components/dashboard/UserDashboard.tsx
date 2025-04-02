
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, FileText, CreditCard, MessageCircle, User, Bell, Map } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  count?: number;
  highlighted?: boolean;
}

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeOrders] = useState(3);
  const [unreadMessages] = useState(2);
  
  const dashboardItems: DashboardItem[] = [
    {
      id: 'orders',
      title: 'Мои заказы',
      description: 'История заказов и текущие перевозки',
      icon: <Package size={24} />,
      path: '/orders',
      count: activeOrders
    },
    {
      id: 'tracking',
      title: 'Отслеживание',
      description: 'Отслеживание текущих перевозок',
      icon: <Map size={24} />,
      path: '/tracking/VE123456',
      highlighted: true
    },
    {
      id: 'cargo',
      title: 'Создать заявку',
      description: 'Оформление новой перевозки',
      icon: <Truck size={24} />,
      path: '/new-cargo'
    },
    {
      id: 'templates',
      title: 'Мои шаблоны',
      description: 'Сохраненные шаблоны заказов',
      icon: <FileText size={24} />,
      path: '/templates'
    },
    {
      id: 'wallet',
      title: 'Кошелек',
      description: 'Платежи и история операций',
      icon: <CreditCard size={24} />,
      path: '/wallet'
    },
    {
      id: 'messages',
      title: 'Сообщения',
      description: 'Чат с менеджером и поддержкой',
      icon: <MessageCircle size={24} />,
      path: '/messages',
      count: unreadMessages
    },
    {
      id: 'profile',
      title: 'Личные данные',
      description: 'Управление профилем',
      icon: <User size={24} />,
      path: '/profile/personal-data'
    },
    {
      id: 'notifications',
      title: 'Уведомления',
      description: 'Настройка уведомлений',
      icon: <Bell size={24} />,
      path: '/notifications'
    }
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {dashboardItems.map((item) => (
        <Card 
          key={item.id} 
          className={`cursor-pointer transition-all ${
            item.highlighted ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-md' : 'hover:shadow-md'
          }`}
          onClick={() => handleItemClick(item.path)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className={`rounded-full p-2 ${
                item.highlighted 
                  ? 'bg-blue-200 dark:bg-blue-800 text-blue-600 dark:text-blue-300' 
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
              }`}>
                {item.icon}
              </div>
              {item.count !== undefined && (
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {item.count}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg mb-1">{item.title}</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserDashboard;

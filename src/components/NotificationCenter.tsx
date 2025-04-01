
import React, { useState } from 'react';
import { Bell, Check, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  actionUrl?: string;
}

interface NotificationCenterProps {
  notifications?: Notification[];
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications: initialNotifications = [
    {
      id: 'n1',
      title: 'Новый заказ',
      message: 'Вам предложен новый заказ #VE789456',
      time: '10 мин назад',
      read: false,
      type: 'info',
      actionUrl: '/orders/VE789456'
    },
    {
      id: 'n2',
      title: 'Документ подписан',
      message: 'Клиент подписал договор №890',
      time: '2 часа назад',
      read: true,
      type: 'success',
      actionUrl: '/documents/890'
    },
    {
      id: 'n3',
      title: 'Предупреждение',
      message: 'Срок подачи ТС через 24 часа',
      time: '3 часа назад',
      read: false,
      type: 'warning',
      actionUrl: '/orders/VE456722'
    }
  ]
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const navigate = useNavigate();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    toast.success("Отмечено как прочитанное");
  };
  
  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success("Уведомление удалено");
  };
  
  const handleNotificationClick = (notification: Notification) => {
    if (notification.actionUrl) {
      toast.info(`Переход: ${notification.actionUrl}`);
      // Actually navigate only if we have a valid route
      if (notification.actionUrl.includes('/orders/')) {
        toast.info(`Просмотр заказа ${notification.actionUrl.split('/').pop()}`);
      } else if (notification.actionUrl.includes('/documents/')) {
        toast.info(`Просмотр документа №${notification.actionUrl.split('/').pop()}`);
      }
    }
  };
  
  const handleViewAllNotifications = () => {
    toast.info("Просмотр всех уведомлений");
    // navigate('/notifications');
  };
  
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'success':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      case 'warning':
        return 'border-l-amber-500 bg-amber-50 dark:bg-amber-900/20';
      case 'error':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-700';
    }
  };
  
  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold dark:text-white">Уведомления</h2>
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {notifications.length > 0 && (
          <button 
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            onClick={handleViewAllNotifications}
          >
            Все
          </button>
        )}
      </div>
      
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map(notification => (
            <div 
              key={notification.id}
              className={`border-l-4 p-3 rounded-r-lg cursor-pointer hover:shadow-md transition-shadow ${getNotificationColor(notification.type)}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`font-medium ${notification.read ? 'text-gray-600 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                </div>
                <div className="flex">
                  {!notification.read && (
                    <button 
                      className="text-blue-600 dark:text-blue-400 p-1 hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded-full"
                      onClick={(e) => markAsRead(notification.id, e)}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button 
                    className="text-red-600 dark:text-red-400 p-1 hover:bg-red-100 dark:hover:bg-red-800/30 rounded-full ml-1"
                    onClick={(e) => removeNotification(notification.id, e)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {notification.actionUrl && (
                <div className="flex justify-end mt-1">
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          <Bell className="h-12 w-12 mx-auto mb-2 opacity-30" />
          <p>Нет новых уведомлений</p>
        </div>
      )}
    </section>
  );
};

export default NotificationCenter;

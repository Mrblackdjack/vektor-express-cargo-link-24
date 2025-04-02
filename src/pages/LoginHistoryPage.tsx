import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { History, ChevronLeft, Info, Lock, Laptop, Smartphone, Tablet } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';

interface LoginRecord {
  id: number;
  device: {
    type: 'desktop' | 'mobile' | 'tablet';
    name: string;
  };
  location: string;
  ip: string;
  date: string;
  isCurrentSession: boolean;
  ended?: boolean;
}

const LoginHistoryPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  
  const [loginHistory, setLoginHistory] = useState<LoginRecord[]>([
    {
      id: 1,
      device: { type: 'mobile', name: 'iPhone 13 Pro' },
      location: 'Москва, Россия',
      ip: '192.168.1.1',
      date: '15 мая 2024, 14:30',
      isCurrentSession: true
    },
    {
      id: 2,
      device: { type: 'desktop', name: 'Chrome на Windows' },
      location: 'Санкт-Петербург, Россия',
      ip: '192.168.1.2',
      date: '14 мая 2024, 10:15',
      isCurrentSession: false
    },
    {
      id: 3,
      device: { type: 'tablet', name: 'iPad Air' },
      location: 'Москва, Россия',
      ip: '192.168.1.3',
      date: '10 мая 2024, 20:45',
      isCurrentSession: false
    },
    {
      id: 4,
      device: { type: 'desktop', name: 'Firefox на macOS' },
      location: 'Казань, Россия',
      ip: '192.168.1.4',
      date: '05 мая 2024, 09:20',
      isCurrentSession: false
    }
  ]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleEndOtherSessions = () => {
    setLoginHistory(prev => 
      prev.map(session => 
        session.isCurrentSession ? session : { ...session, ended: true }
      )
    );
    toast.success('Все другие сессии завершены');
  };

  const renderDeviceIcon = (type: 'desktop' | 'mobile' | 'tablet') => {
    switch (type) {
      case 'desktop':
        return <Laptop className="h-5 w-5" />;
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
      case 'tablet':
        return <Tablet className="h-5 w-5" />;
      default:
        return <Laptop className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto max-w-md bg-background min-h-screen pb-20">
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={true}
        toggleAuthModal={() => {}}
      />
      
      <main className="p-4">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/profile')}
            className="mr-2"
          >
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-bold">История входов</h1>
        </div>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Lock className="mr-2 h-5 w-5 text-blue-500" />
              Активные сессии
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Список устройств, с которых был выполнен вход в ваш аккаунт. Вы можете завершить все сессии, кроме текущей.
            </p>
            
            <div className="space-y-4">
              {loginHistory
                .filter(session => !session.ended)
                .map(session => (
                <div key={session.id} className="flex items-start">
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                    {renderDeviceIcon(session.device.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{session.device.name}</p>
                        <p className="text-sm text-gray-500">{session.location}</p>
                        <p className="text-xs text-gray-400">IP: {session.ip}</p>
                        <p className="text-xs text-gray-400">{session.date}</p>
                      </div>
                      
                      {session.isCurrentSession && (
                        <Badge className="bg-green-500">Текущая</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full mt-4"
              variant="outline"
              onClick={handleEndOtherSessions}
            >
              Завершить все другие сессии
            </Button>
          </CardContent>
        </Card>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <History className="mr-2 h-5 w-5 text-blue-500" />
              Последние входы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loginHistory.map(session => (
                <div key={session.id} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                        {renderDeviceIcon(session.device.type)}
                      </div>
                      <div>
                        <p className="font-medium">{session.device.name}</p>
                        <p className="text-sm text-gray-500">{session.location}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm">{session.date}</p>
                      <p className="text-xs text-gray-500">{session.ip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 flex items-start">
          <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Безопасность</p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Если вы не узнаете какое-либо устройство в списке, немедленно смените пароль и включите двухфакторную аутентификацию.
            </p>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default LoginHistoryPage;

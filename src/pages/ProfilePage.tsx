
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Shield, 
  CreditCard, 
  FileText, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Lock, 
  Truck, 
  Map, 
  Building, 
  Package, 
  Users, 
  Globe, 
  Moon, 
  Sun, 
  HelpCircle,
  CheckCircle,
  Star,
  Plus,
  Edit
} from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';

interface MenuGroup {
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

interface MenuItem {
  title: string;
  description?: string;
  icon: React.ReactNode;
  onClick: () => void;
  badge?: string;
  rightElement?: React.ReactNode;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock state for authentication
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    newOrders: true,
    statusChanges: true,
    payments: false
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogoutDialog(false);
    toast.success('Вы успешно вышли из системы');
    // In a real app, you would clear authentication state here
  };

  // Handle login/register
  const handleAuth = (type: 'login' | 'register') => {
    navigate('/');
    // This would typically open the auth modal, but for now we'll just navigate home
  };

  // Create menu groups based on the requested structure
  const menuGroups: MenuGroup[] = [
    // Account Group
    {
      title: 'Аккаунт',
      icon: <User size={20} />,
      items: [
        {
          title: 'Мои данные',
          description: 'Контакты, юридические данные, адреса',
          icon: <User size={20} />,
          onClick: () => navigate('/profile/personal-data'),
          rightElement: <ChevronRight size={18} />
        },
        {
          title: 'Роли и доступы',
          description: 'Управление ролями и командой',
          icon: <Users size={20} />,
          onClick: () => navigate('/profile/roles'),
          rightElement: <ChevronRight size={18} />
        }
      ]
    },
    // Security Group
    {
      title: 'Безопасность',
      icon: <Shield size={20} />,
      items: [
        {
          title: 'Двухфакторная аутентификация',
          icon: <Lock size={20} />,
          onClick: () => setIs2FAEnabled(!is2FAEnabled),
          rightElement: <Switch checked={is2FAEnabled} onCheckedChange={setIs2FAEnabled} />
        },
        {
          title: 'История входов',
          description: 'Устройства, даты, IP-адреса',
          icon: <Shield size={20} />,
          onClick: () => navigate('/profile/login-history'),
          rightElement: <ChevronRight size={18} />
        },
        {
          title: 'Сменить пароль',
          icon: <Lock size={20} />,
          onClick: () => navigate('/profile/change-password'),
          rightElement: <ChevronRight size={18} />
        },
        {
          title: 'Удалить аккаунт',
          icon: <Shield size={20} className="text-red-500" />,
          onClick: () => setShowDeleteAccountDialog(true),
          rightElement: <ChevronRight size={18} className="text-red-500" />
        }
      ]
    },
    // Finance Group
    {
      title: 'Финансы',
      icon: <CreditCard size={20} />,
      items: [
        {
          title: 'Баланс и пополнение',
          description: 'Текущий баланс и пополнение счета',
          icon: <CreditCard size={20} />,
          onClick: () => navigate('/profile/balance'),
          badge: 'В обработке: 12,500 ₽',
          rightElement: <ChevronRight size={18} />
        },
        {
          title: 'Реквизиты',
          description: 'Банковские карты и счета',
          icon: <CreditCard size={20} />,
          onClick: () => navigate('/profile/payment-methods'),
          rightElement: <ChevronRight size={18} />
        },
        {
          title: 'История транзакций',
          icon: <CreditCard size={20} />,
          onClick: () => navigate('/profile/transactions'),
          rightElement: <ChevronRight size={18} />
        }
      ]
    },
    // Documents Group
    {
      title: 'Документы',
      icon: <FileText size={20} />,
      items: [
        {
          title: 'Персональные документы',
          description: 'Паспорт, водительское удостоверение',
          icon: <FileText size={20} />,
          onClick: () => navigate('/profile/personal-documents'),
          rightElement: <ChevronRight size={18} />
        },
        {
          title: 'Бизнес-документы',
          description: 'Договоры, страховки, лицензии',
          icon: <FileText size={20} />,
          onClick: () => navigate('/profile/business-documents'),
          rightElement: <ChevronRight size={18} />
        }
      ]
    },
    // Notifications Group
    {
      title: 'Уведомления',
      icon: <Bell size={20} />,
      items: [
        {
          title: 'Новые заказы',
          icon: <Bell size={20} />,
          onClick: () => setNotificationSettings({...notificationSettings, newOrders: !notificationSettings.newOrders}),
          rightElement: <Switch checked={notificationSettings.newOrders} onCheckedChange={(checked) => 
            setNotificationSettings({...notificationSettings, newOrders: checked})} />
        },
        {
          title: 'Изменения статуса',
          icon: <Bell size={20} />,
          onClick: () => setNotificationSettings({...notificationSettings, statusChanges: !notificationSettings.statusChanges}),
          rightElement: <Switch checked={notificationSettings.statusChanges} onCheckedChange={(checked) => 
            setNotificationSettings({...notificationSettings, statusChanges: checked})} />
        },
        {
          title: 'Платежи',
          icon: <Bell size={20} />,
          onClick: () => setNotificationSettings({...notificationSettings, payments: !notificationSettings.payments}),
          rightElement: <Switch checked={notificationSettings.payments} onCheckedChange={(checked) => 
            setNotificationSettings({...notificationSettings, payments: checked})} />
        }
      ]
    },
    // Transporter Context Block
    {
      title: 'Перевозчик',
      icon: <Truck size={20} />,
      items: [
        {
          title: 'Мой транспорт',
          description: 'Управление автопарком',
          icon: <Truck size={20} />,
          onClick: () => navigate('/profile/transport'),
          rightElement: <ChevronRight size={18} />
        },
        {
          title: 'Статистика рейсов',
          description: 'Маршруты, доходность, пробег',
          icon: <Map size={20} />,
          onClick: () => navigate('/profile/trip-statistics'),
          rightElement: <ChevronRight size={18} />
        }
      ]
    },
    // Cargo Owner Context Block
    {
      title: 'Грузовладелец',
      icon: <Package size={20} />,
      items: [
        {
          title: 'Мои заказы',
          description: 'Активные и завершенные перевозки',
          icon: <Package size={20} />,
          onClick: () => navigate('/profile/orders'),
          rightElement: <ChevronRight size={18} />
        },
        {
          title: 'Контрагенты',
          description: 'Список проверенных перевозчиков',
          icon: <Building size={20} />,
          onClick: () => navigate('/profile/contractors'),
          rightElement: <ChevronRight size={18} />
        }
      ]
    },
    // System Settings
    {
      title: 'Настройки',
      icon: <Settings size={20} />,
      items: [
        {
          title: 'Язык и регион',
          icon: <Globe size={20} />,
          onClick: () => navigate('/profile/language'),
          rightElement: <ChevronRight size={18} />
        },
        {
          title: 'Темная тема',
          icon: isDarkMode ? <Moon size={20} /> : <Sun size={20} />,
          onClick: toggleDarkMode,
          rightElement: <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
        },
        {
          title: 'Справка',
          icon: <HelpCircle size={20} />,
          onClick: () => navigate('/profile/help'),
          rightElement: <ChevronRight size={18} />
        }
      ]
    }
  ];

  const renderProfileHeader = () => {
    if (!isLoggedIn) {
      return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Подключитесь к крупнейшей логистической сети СНГ</h2>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handleAuth('login')}
            >
              Войти
            </Button>
            <Button 
              className="flex-1 bg-vektor-primary hover:bg-blue-700"
              onClick={() => handleAuth('register')}
            >
              Зарегистрироваться
            </Button>
          </div>
        </div>
      );
    }

    // For logged in users
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start">
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-blue-500">
                <AvatarImage src="https://randomuser.me/api/portraits/men/42.jpg" alt="Иван Петров" />
                <AvatarFallback>ИП</AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="secondary" 
                className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 shadow-md"
                onClick={() => toast.info('Редактирование аватара будет доступно в следующем обновлении')}
              >
                <Edit size={16} />
              </Button>
              <Badge className="absolute top-0 right-0 bg-green-500">Online</Badge>
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold dark:text-white">Иван Петров</h2>
                  <div className="flex items-center">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Перевозчик | Москва</span>
                    <Badge variant="outline" className="ml-2 flex items-center text-xs">
                      <CheckCircle size={12} className="mr-1 text-blue-500" />
                      Проверен
                    </Badge>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4].map((i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                      <Star size={14} fill="currentColor" className="text-yellow-400 opacity-50" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 ml-1 text-xs">(12 отзывов)</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="text-sm flex justify-between mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Доступно</span>
                  <span className="font-medium dark:text-white">25,640 ₽</span>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500 dark:text-gray-400">Прогресс заполнения профиля</span>
                  <span className="text-blue-600 dark:text-blue-400">75%</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline"
            className="w-full mt-4"
            onClick={() => navigate('/profile/edit')}
          >
            Редактировать профиль
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto max-w-md bg-background min-h-screen pb-20">
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={isLoggedIn}
        toggleAuthModal={() => handleAuth('login')}
      />
      
      <main className="p-4">
        {renderProfileHeader()}
        
        <div className="space-y-6 pb-24">
          {menuGroups.map((group, groupIndex) => (
            <div key={`group-${groupIndex}`}>
              <h3 className="text-lg font-semibold mb-2 flex items-center dark:text-white">
                {group.icon}
                <span className="ml-2">{group.title}</span>
              </h3>
              
              <Card>
                {group.items.map((item, itemIndex) => (
                  <React.Fragment key={`item-${groupIndex}-${itemIndex}`}>
                    {itemIndex > 0 && <Separator />}
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={item.onClick}
                    >
                      <div className="flex items-center">
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{item.title}</p>
                          {item.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        {item.badge && (
                          <Badge variant="outline" className="mr-2">
                            {item.badge}
                          </Badge>
                        )}
                        {item.rightElement}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </Card>
            </div>
          ))}
          
          {isLoggedIn && (
            <Button 
              variant="outline" 
              className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut size={18} className="mr-2" />
              Выйти
            </Button>
          )}
        </div>
      </main>
      
      <BottomNavigation />
      
      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Выход из аккаунта</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите выйти из своего аккаунта?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleLogout}>Выйти</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Account Dialog */}
      <Dialog open={showDeleteAccountDialog} onOpenChange={setShowDeleteAccountDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удаление аккаунта</DialogTitle>
            <DialogDescription>
              Это действие необратимо. После удаления аккаунта, все ваши данные будут потеряны.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 mb-4">
            <label className="text-sm font-medium">Введите пароль для подтверждения</label>
            <input 
              type="password" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
              placeholder="Ваш пароль"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={() => {
                toast.success('Запрос на удаление аккаунта отправлен');
                setShowDeleteAccountDialog(false);
              }}
            >
              Удалить аккаунт
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;

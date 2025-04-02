
import React, { useState } from 'react';
import { toast } from 'sonner';

import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import UserDashboard from '@/components/dashboard/UserDashboard';
import OrderHistory from '@/components/dashboard/OrderHistory';
import AuthModal from '@/components/AuthModal';

// Sample data
const recentOrders = [
  {
    id: '123456',
    status: 'in_progress' as const,
    fromCity: 'Москва',
    toCity: 'Санкт-Петербург',
    date: '12 мая 2025',
    cargoType: 'Бытовая техника',
    price: 15000,
  },
  {
    id: '123457',
    status: 'pending' as const,
    fromCity: 'Новосибирск',
    toCity: 'Краснодар',
    date: '15 мая 2025',
    cargoType: 'Мебель',
    price: 45000,
  },
];

const ProfilePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For demo purposes
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<'login' | 'register'>('login');
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };
  
  const toggleAuthModal = (tab: 'login' | 'register') => {
    setActiveAuthTab(tab);
    setAuthModalOpen(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.success('Вы успешно вышли из системы');
  };
  
  return (
    <div className="container mx-auto max-w-md bg-background min-h-screen relative pb-20">
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={isLoggedIn}
        toggleAuthModal={toggleAuthModal}
      />
      
      <main>
        {isLoggedIn ? (
          <>
            <div className="p-4 bg-blue-600 text-white">
              <h1 className="text-xl font-bold mb-1">Иван Петров</h1>
              <p className="text-sm opacity-80">ivan.petrov@example.com</p>
            </div>
            
            <UserDashboard />
            
            <div className="px-4">
              <OrderHistory 
                orders={recentOrders}
                title="Последние заказы"
              />
            </div>
          </>
        ) : (
          <div className="p-4 text-center py-20">
            <h1 className="text-2xl font-bold mb-6">Личный кабинет</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Для доступа к личному кабинету необходимо авторизоваться
            </p>
            <div className="space-y-4">
              <button 
                onClick={() => toggleAuthModal('login')}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Войти
              </button>
              <button 
                onClick={() => toggleAuthModal('register')}
                className="w-full py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        )}
      </main>
      
      <BottomNavigation />
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={activeAuthTab}
      />
    </div>
  );
};

export default ProfilePage;

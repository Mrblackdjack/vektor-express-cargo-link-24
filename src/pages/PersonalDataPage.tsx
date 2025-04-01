
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, Phone, Building, MapPin, ChevronLeft, Save } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';

const PersonalDataPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleSave = () => {
    toast.success('Данные успешно сохранены');
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
          <h1 className="text-xl font-bold">Мои данные</h1>
        </div>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Личная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Имя</label>
              <input 
                type="text" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                defaultValue="Иван"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Фамилия</label>
              <input 
                type="text" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                defaultValue="Петров"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Телефон</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input 
                  type="tel" 
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm"
                  defaultValue="+7 (999) 123-45-67"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input 
                  type="email" 
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm"
                  defaultValue="ivan.petrov@example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Юридические данные</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">ИНН</label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm"
                  defaultValue="7712345678"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">ОГРН</label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm"
                  defaultValue="1234567890123"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Компания</label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm"
                  defaultValue="ИП Петров"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Адреса</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Адрес регистрации</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm"
                  defaultValue="г. Москва, ул. Ленина, д. 10, кв. 5"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Фактический адрес</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm"
                  defaultValue="г. Москва, ул. Пушкина, д. 15, офис 301"
                />
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <MapPin className="mr-2 h-4 w-4" />
              Добавить адрес
            </Button>
          </CardContent>
        </Card>
        
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleSave}
        >
          <Save className="mr-2 h-4 w-4" />
          Сохранить изменения
        </Button>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default PersonalDataPage;

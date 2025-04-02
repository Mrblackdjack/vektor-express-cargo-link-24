
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }
    
    // Login logic - simulated for now
    toast.success('Вход выполнен успешно!');
    
    // Redirect to profile page after login
    setTimeout(() => navigate('/profile'), 1000);
  };
  
  const handleForgotPassword = () => {
    toast.info('Инструкция для восстановления пароля отправлена на указанный email');
  };
  
  return (
    <div className="container mx-auto max-w-md bg-background min-h-screen pb-20">
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={false}
        toggleAuthModal={() => {}}
      />
      
      <main className="p-4">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="mr-2"
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-xl font-bold">Вход в аккаунт</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Добро пожаловать в VektorExpress</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="example@mail.ru"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Пароль</Label>
                  <button 
                    type="button"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    onClick={handleForgotPassword}
                  >
                    Забыли пароль?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Запомнить меня
                </label>
              </div>
              
              <Button type="submit" className="w-full">
                Войти
              </Button>
              
              <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Нет аккаунта? {' '}
                <button 
                  type="button"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => navigate('/register')}
                >
                  Зарегистрироваться
                </button>
              </div>
              
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">Или войти через</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <Button type="button" variant="outline" className="w-full">
                  Google
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  Telegram
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default LoginPage;

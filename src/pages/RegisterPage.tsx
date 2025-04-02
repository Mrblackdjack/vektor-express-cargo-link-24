
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, Phone, User, Lock, ArrowLeft } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [step, setStep] = useState(1);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Пожалуйста, заполните все поля');
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Введите корректный email');
      return false;
    }
    
    // Simple phone validation
    const phoneRegex = /^\+?[0-9\s-()]{10,17}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Введите корректный номер телефона');
      return false;
    }
    
    return true;
  };
  
  const validateStep2 = () => {
    if (!formData.password || !formData.confirmPassword) {
      toast.error('Пожалуйста, заполните все поля');
      return false;
    }
    
    if (formData.password.length < 8) {
      toast.error('Пароль должен содержать не менее 8 символов');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Пароли не совпадают');
      return false;
    }
    
    return true;
  };
  
  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };
  
  const handlePrevStep = () => {
    setStep(1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    // Registration logic - simulated for now
    toast.success('Регистрация успешна! Подтвердите ваш email.');
    
    // Redirect to login page after registration
    setTimeout(() => navigate('/login'), 2000);
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
          <h1 className="text-xl font-bold">Регистрация</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Создайте учетную запись в VektorExpress</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
              {step === 1 ? (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя и фамилия</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="Иван Иванов"
                        />
                      </div>
                    </div>
                    
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
                      <Label htmlFor="phone">Телефон</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button type="button" onClick={handleNextStep} className="w-full mt-6">
                    Продолжить
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Пароль</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="Минимум 8 символов"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="Повторите пароль"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <Button type="button" variant="outline" className="flex-1" onClick={handlePrevStep}>
                      Назад
                    </Button>
                    <Button type="submit" className="flex-1">
                      Зарегистрироваться
                    </Button>
                  </div>
                </>
              )}
              
              <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Уже есть аккаунт? {' '}
                <button 
                  type="button"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => navigate('/login')}
                >
                  Войти
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default RegisterPage;

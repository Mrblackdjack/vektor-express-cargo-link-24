
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ChevronLeft, Lock, Eye, EyeOff, Key } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formValid, setFormValid] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  // Validate form on input change
  React.useEffect(() => {
    const isValid = 
      currentPassword.length >= 6 && 
      newPassword.length >= 8 && 
      newPassword === confirmPassword;
    
    setFormValid(isValid);
  }, [currentPassword, newPassword, confirmPassword]);

  const handleChangePassword = () => {
    if (!formValid) {
      toast.error('Пожалуйста, проверьте правильность заполнения полей');
      return;
    }
    
    // Here you would typically make an API call to change the password
    toast.success('Пароль успешно изменен');
    navigate('/profile');
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
          <h1 className="text-xl font-bold">Сменить пароль</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Lock className="mr-2 h-5 w-5 text-blue-500" />
              Изменение пароля
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Текущий пароль</label>
              <div className="relative">
                <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input 
                  type={showCurrentPassword ? "text" : "password"} 
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Введите текущий пароль"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-2.5"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Новый пароль</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input 
                  type={showNewPassword ? "text" : "password"} 
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Не менее 8 символов"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-2.5"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {newPassword && newPassword.length < 8 && (
                <p className="text-xs text-red-500">Пароль должен содержать не менее 8 символов</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Подтверждение пароля</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Повторите новый пароль"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-2.5"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-500">Пароли не совпадают</p>
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Требования к паролю:</p>
              <ul className="text-xs text-gray-500 space-y-1 pl-5 list-disc">
                <li>Не менее 8 символов</li>
                <li>Хотя бы одна заглавная буква</li>
                <li>Хотя бы одна цифра</li>
                <li>Не должен совпадать с предыдущими паролями</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleChangePassword}
          disabled={!formValid}
        >
          Сменить пароль
        </Button>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ChangePasswordPage;


import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose,
  initialTab = 'login'
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('shipper');
  
  if (!isOpen) return null;
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }
    
    // Simulating successful login
    toast.success('Вы успешно вошли в систему!');
    onClose();
    
    // In a real app you would:
    // 1. Call an API to validate credentials
    // 2. Store auth token
    // 3. Update auth context/state
    // 4. Redirect user
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }
    
    // Simulating successful registration
    toast.success('Регистрация прошла успешно! Добро пожаловать в VektorExpress!');
    onClose();
    
    // In a real app you would:
    // 1. Call an API to register the user
    // 2. Store auth token
    // 3. Update auth context/state
    // 4. Redirect user
  };
  
  const handleForgotPassword = () => {
    toast.info('Функция восстановления пароля будет доступна в следующем обновлении');
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 animate-slide-in">
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
          <div 
            className={`cursor-pointer px-4 py-2 ${activeTab === 'login' ? 'border-b-2 border-blue-600 dark:border-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={() => setActiveTab('login')}
          >
            Вход
          </div>
          <div 
            className={`cursor-pointer px-4 py-2 ${activeTab === 'register' ? 'border-b-2 border-blue-600 dark:border-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={() => setActiveTab('register')}
          >
            Регистрация
          </div>
          <button 
            onClick={onClose} 
            className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X size={18} />
          </button>
        </div>
        
        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="Ваш email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Пароль
              </label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="Ваш пароль"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Войти
            </button>
            
            <div className="text-center mt-4">
              <button 
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Забыли пароль?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Имя
              </label>
              <input 
                type="text" 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="Ваше имя"
              />
            </div>
            
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input 
                type="email" 
                id="reg-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="Ваш email"
              />
            </div>
            
            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Пароль
              </label>
              <input 
                type="password" 
                id="reg-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="Придумайте пароль"
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Подтвердите пароль
              </label>
              <input 
                type="password" 
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="Повторите пароль"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Я хочу:
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              >
                <option value="shipper">Заказывать перевозки</option>
                <option value="carrier">Быть перевозчиком</option>
              </select>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Зарегистрироваться
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;


import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, FileText, BarChart, User } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navigateTo = (path: string) => {
    navigate(path);
  };
  
  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center p-2 z-10">
      <button 
        className={`p-2 flex flex-col items-center transition-colors ${
          isActive('/') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
        onClick={() => navigateTo('/')}
      >
        <Home size={20} />
        <span className="text-xs mt-1">Главная</span>
      </button>
      
      <button 
        className={`p-2 flex flex-col items-center transition-colors ${
          isActive('/search') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
        onClick={() => navigateTo('/search')}
      >
        <Search size={20} />
        <span className="text-xs mt-1">Поиск</span>
      </button>
      
      <button 
        className={`p-2 flex flex-col items-center transition-colors ${
          location.pathname.includes('/documents') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
        onClick={() => navigateTo('/documents')}
      >
        <FileText size={20} />
        <span className="text-xs mt-1">Документы</span>
      </button>
      
      <button 
        className={`p-2 flex flex-col items-center transition-colors ${
          location.pathname.includes('/stats') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
        onClick={() => navigateTo('/stats')}
      >
        <BarChart size={20} />
        <span className="text-xs mt-1">Аналитика</span>
      </button>
      
      <button 
        className={`p-2 flex flex-col items-center transition-colors ${
          location.pathname.includes('/profile') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
        onClick={() => navigateTo('/profile')}
      >
        <User size={20} />
        <span className="text-xs mt-1">Профиль</span>
      </button>
    </nav>
  );
};

export default BottomNavigation;

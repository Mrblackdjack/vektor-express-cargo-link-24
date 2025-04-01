
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, FileText, BarChart2, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center p-2 z-10">
      <button 
        className={`p-2 flex flex-col items-center transition-colors ${isActive('/') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
        onClick={() => navigate('/')}
      >
        <Home className="h-5 w-5 mb-1" />
        <span className="text-xs">Главная</span>
      </button>
      
      <button 
        className={`p-2 flex flex-col items-center transition-colors ${isActive('/search') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
        onClick={() => navigate('/search')}
      >
        <Search className="h-5 w-5 mb-1" />
        <span className="text-xs">Поиск</span>
      </button>
      
      <button 
        className={`p-2 flex flex-col items-center transition-colors ${isActive('/documents') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
        onClick={() => navigate('/documents')}
      >
        <FileText className="h-5 w-5 mb-1" />
        <span className="text-xs">Документы</span>
      </button>
      
      <button 
        className={`p-2 flex flex-col items-center transition-colors ${isActive('/analytics') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
        onClick={() => navigate('/analytics')}
      >
        <BarChart2 className="h-5 w-5 mb-1" />
        <span className="text-xs">Аналитика</span>
      </button>
      
      <button 
        className={`p-2 flex flex-col items-center transition-colors ${isActive('/profile') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
        onClick={() => navigate('/profile')}
      >
        <User className="h-5 w-5 mb-1" />
        <span className="text-xs">Профиль</span>
      </button>
    </nav>
  );
};

export default BottomNavigation;

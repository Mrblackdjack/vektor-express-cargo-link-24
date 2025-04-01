
import React, { useState } from 'react';
import { Bell, ChevronDown, Moon, Sun, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isLoggedIn: boolean;
  toggleAuthModal: (tab: 'login' | 'register') => void;
  username?: string;
  userImage?: string;
  notificationCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
  isLoggedIn,
  toggleAuthModal,
  username = "Иван Петров",
  userImage = "https://randomuser.me/api/portraits/men/42.jpg",
  notificationCount = 3
}) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const handleLogout = () => {
    // Handle logout logic
    navigate('/');
    window.location.reload();
    setShowUserMenu(false);
  };
  
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h1 className="text-xl font-bold">VektorExpress</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        {!isLoggedIn ? (
          <div>
            <button 
              onClick={() => toggleAuthModal('login')}
              className="px-3 py-1 text-sm bg-white text-blue-600 rounded hover:bg-blue-50 transition-colors"
            >
              Вход
            </button>
            <button 
              onClick={() => toggleAuthModal('register')}
              className="px-3 py-1 text-sm bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors ml-2"
            >
              Регистрация
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <button 
              className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors mr-2"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <div className="relative mr-3">
              <button 
                className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors relative"
                onClick={() => navigate('/notifications')}
              >
                <Bell size={18} />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-xs">
                    {notificationCount}
                  </Badge>
                )}
              </button>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 outline-none">
                <img src={userImage} alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mt-1">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Профиль</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  Настройки
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                  Выход
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

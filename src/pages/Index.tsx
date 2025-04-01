
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import ProfileSection from '@/components/ProfileSection';
import QuickActions from '@/components/QuickActions';
import DocumentsList from '@/components/DocumentsList';
import ActiveLoadsList from '@/components/ActiveLoadsList';
import StatisticsSection from '@/components/StatisticsSection';
import LiveTrackingMap from '@/components/LiveTrackingMap';
import NotificationCenter from '@/components/NotificationCenter';
import AuthModal from '@/components/AuthModal';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<'login' | 'register'>('login');
  
  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const toggleAuthModal = (tab: 'login' | 'register') => {
    setActiveAuthTab(tab);
    setAuthModalOpen(true);
  };
  
  const handleCreateOrder = () => {
    if (isLoggedIn) {
      navigate('/new-order');
    } else {
      toast.error('Необходимо войти в систему', {
        description: 'Для создания заказа необходимо авторизоваться',
        action: {
          label: 'Войти',
          onClick: () => toggleAuthModal('login')
        }
      });
    }
  };
  
  return (
    <div className="container mx-auto max-w-md bg-background min-h-screen relative pb-16">
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={isLoggedIn}
        toggleAuthModal={toggleAuthModal}
      />
      
      <main className="pb-20">
        <ProfileSection />
        <QuickActions />
        <LiveTrackingMap />
        <NotificationCenter />
        <DocumentsList />
        <ActiveLoadsList />
        <StatisticsSection />
      </main>
      
      <BottomNavigation />
      
      {/* Floating Action Button */}
      <button 
        className="fixed right-4 bottom-20 bg-vektor-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors animate-pulse"
        onClick={handleCreateOrder}
      >
        <Plus size={24} />
      </button>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={activeAuthTab}
      />
    </div>
  );
};

export default Index;

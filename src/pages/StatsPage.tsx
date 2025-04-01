
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import StatisticsSection from '@/components/StatisticsSection';
import { BarChart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const StatsPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto max-w-md bg-background min-h-screen relative pb-16">
      <Header 
        isDarkMode={false}
        toggleDarkMode={() => {}}
        isLoggedIn={true}
        toggleAuthModal={() => {}}
      />
      
      <main className="pb-20">
        <div className="p-4">
          <h1 className="text-2xl font-bold flex items-center mb-4">
            <BarChart className="mr-2" />
            Аналитика
          </h1>
          
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <Button variant="outline" onClick={() => toast.info("Текущий месяц")}>
              Месяц
            </Button>
            <Button variant="outline" onClick={() => toast.info("Текущий квартал")}>
              Квартал
            </Button>
            <Button variant="outline" onClick={() => toast.info("Текущий год")}>
              Год
            </Button>
            <Button variant="outline" className="flex items-center" onClick={() => toast.info("Выбор периода")}>
              <Calendar className="h-4 w-4 mr-1" />
              Выбрать период
            </Button>
          </div>
          
          <Separator className="mb-6" />
          
          <StatisticsSection />
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default StatsPage;


import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Truck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const VehiclesPage = () => {
  const navigate = useNavigate();
  
  const handleAddVehicle = () => {
    toast.info("Функция добавления транспорта будет доступна в следующем обновлении");
  };
  
  return (
    <div className="container mx-auto max-w-md bg-background min-h-screen relative pb-16">
      <Header 
        isDarkMode={false}
        toggleDarkMode={() => {}}
        isLoggedIn={true}
        toggleAuthModal={() => {}}
      />
      
      <main className="p-4 pb-20">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold">Мой транспорт</h1>
        </div>
        
        <Button onClick={handleAddVehicle} className="w-full mb-4">
          <Plus className="mr-2" />
          Добавить транспорт
        </Button>
        
        <Card className="mb-4 p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
              <Truck className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h3 className="font-medium">Mercedes Actros 2545</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Г/п 20т | Тент 82м³ | A123BC777</p>
              <div className="mt-1">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  Свободен
                </span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="mb-4 p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
              <Truck className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h3 className="font-medium">Volvo FH 460</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Г/п 18т | Рефрижератор 64м³ | B456DE777</p>
              <div className="mt-1">
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                  В рейсе
                </span>
              </div>
            </div>
          </div>
        </Card>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default VehiclesPage;

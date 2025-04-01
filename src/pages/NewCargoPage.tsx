
import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Package, 
  Truck, 
  DollarSign, 
  Info,
  Camera
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const NewCargoPage = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Заявка на перевозку успешно создана");
    setTimeout(() => navigate('/'), 1500);
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
          <h1 className="text-2xl font-bold">Новая перевозка</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-6 p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="mr-2" />
              Маршрут
            </h2>
            
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Откуда</label>
                <Input placeholder="Город, адрес" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Куда</label>
                <Input placeholder="Город, адрес" />
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm flex items-start mb-2">
              <Info className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-blue-500" />
              <p className="text-blue-700 dark:text-blue-300">Расстояние: ~550 км</p>
            </div>
          </Card>
          
          <Card className="mb-6 p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="mr-2" />
              Даты
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Дата загрузки</label>
                <Input type="date" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Дата выгрузки</label>
                <Input type="date" />
              </div>
            </div>
          </Card>
          
          <Card className="mb-6 p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Package className="mr-2" />
              Информация о грузе
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Наименование груза</label>
                <Input placeholder="Например: мебель, стройматериалы и т.д." />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Вес, т</label>
                  <Input type="number" placeholder="0.00" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Объем, м³</label>
                  <Input type="number" placeholder="0.00" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Добавить фото груза</label>
                <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Нажмите, чтобы загрузить</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="mb-6 p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Truck className="mr-2" />
              Требования к транспорту
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Тип кузова</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">Выберите тип кузова</option>
                  <option value="tent">Тент</option>
                  <option value="ref">Рефрижератор</option>
                  <option value="isoterm">Изотермический</option>
                  <option value="open">Открытый</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Способ загрузки</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">Выберите способ загрузки</option>
                  <option value="top">Сверху</option>
                  <option value="side">Сбоку</option>
                  <option value="back">Сзади</option>
                </select>
              </div>
            </div>
          </Card>
          
          <Card className="mb-6 p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <DollarSign className="mr-2" />
              Оплата
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Предлагаемая стоимость, ₽</label>
                <Input type="number" placeholder="0" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Способ оплаты</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">Выберите способ оплаты</option>
                  <option value="cash">Наличные</option>
                  <option value="card">Безналичный расчет</option>
                  <option value="platform">Через платформу</option>
                </select>
              </div>
            </div>
          </Card>
          
          <Button type="submit" className="w-full">
            Разместить груз
          </Button>
        </form>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default NewCargoPage;


import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RatingPage = () => {
  const navigate = useNavigate();
  
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
          <h1 className="text-2xl font-bold">Рейтинг и отзывы</h1>
        </div>
        
        <Card className="mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Ваш рейтинг</h2>
              <div className="flex items-center mt-1">
                <span className="text-3xl font-bold mr-2">4.7</span>
                <div className="flex">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 opacity-50" />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">12 отзывов</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-24 text-sm">Пунктуальность</span>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mx-2">
                <div className="h-full bg-blue-600 dark:bg-blue-400 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <span className="text-sm font-medium">4.9</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-sm">Качество</span>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mx-2">
                <div className="h-full bg-blue-600 dark:bg-blue-400 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm font-medium">4.6</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-sm">Коммуникация</span>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mx-2">
                <div className="h-full bg-blue-600 dark:bg-blue-400 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <span className="text-sm font-medium">4.5</span>
            </div>
          </div>
        </Card>
        
        <h2 className="text-xl font-bold mb-4">Последние отзывы</h2>
        
        <Card className="mb-4 p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <h3 className="font-medium">ООО "Логистика+"</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">15.05.2024</p>
              </div>
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-sm">Отличный перевозчик! Груз был доставлен вовремя и в идеальном состоянии. Рекомендую сотрудничество.</p>
          <div className="flex items-center mt-2">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-xs text-gray-600 dark:text-gray-300">Заказ #VE456123</span>
          </div>
        </Card>
        
        <Card className="mb-4 p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <h3 className="font-medium">ИП Сидоров А.В.</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">10.05.2024</p>
              </div>
            </div>
            <div className="flex">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
              <Star className="h-4 w-4 text-gray-300" />
            </div>
          </div>
          <p className="text-sm">Хорошая работа, но был небольшой сдвиг по времени прибытия. В целом все хорошо.</p>
          <div className="flex items-center mt-2">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-xs text-gray-600 dark:text-gray-300">Заказ #VE455987</span>
          </div>
        </Card>
        
        <Button variant="outline" onClick={() => navigate('/reviews')} className="w-full">
          Смотреть все отзывы
        </Button>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default RatingPage;


import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReviewsPage = () => {
  const navigate = useNavigate();
  
  const renderReview = (name: string, date: string, rating: number, text: string, orderId: string) => (
    <Card className="mb-4 p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{date}</p>
          </div>
        </div>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
      </div>
      <p className="text-sm">{text}</p>
      <div className="flex items-center mt-2">
        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
        <span className="text-xs text-gray-600 dark:text-gray-300">Заказ #{orderId}</span>
      </div>
    </Card>
  );
  
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
          <h1 className="text-2xl font-bold">Отзывы</h1>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-3xl font-bold">4.7</span>
            <span className="text-gray-600 dark:text-gray-300 ml-2">из 5</span>
          </div>
          <div className="flex">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            ))}
            <Star className="h-6 w-6 text-yellow-400 fill-yellow-400 opacity-50" />
          </div>
          <span className="text-gray-600 dark:text-gray-300">12 отзывов</span>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">Все</TabsTrigger>
            <TabsTrigger value="positive" className="flex-1">Положительные</TabsTrigger>
            <TabsTrigger value="critical" className="flex-1">Критические</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {renderReview(
              "ООО \"Логистика+\"", 
              "15.05.2024", 
              5, 
              "Отличный перевозчик! Груз был доставлен вовремя и в идеальном состоянии. Рекомендую сотрудничество.",
              "VE456123"
            )}
            {renderReview(
              "ИП Сидоров А.В.", 
              "10.05.2024", 
              4, 
              "Хорошая работа, но был небольшой сдвиг по времени прибытия. В целом все хорошо.",
              "VE455987"
            )}
            {renderReview(
              "ООО \"ТрансЛогистик\"", 
              "05.05.2024", 
              5, 
              "Все отлично! Перевозчик ответственный, груз доставлен в срок и в сохранности.",
              "VE455612"
            )}
            {renderReview(
              "ИП Козлов С.И.", 
              "01.05.2024", 
              5, 
              "Надежный перевозчик, всегда на связи. Работаем не первый раз и всегда все идеально.",
              "VE455234"
            )}
            {renderReview(
              "ООО \"ГрузМастер\"", 
              "25.04.2024", 
              3, 
              "Груз доставлен с небольшими повреждениями упаковки. Вопрос решили полюбовно.",
              "VE454890"
            )}
          </TabsContent>
          
          <TabsContent value="positive" className="mt-4">
            {renderReview(
              "ООО \"Логистика+\"", 
              "15.05.2024", 
              5, 
              "Отличный перевозчик! Груз был доставлен вовремя и в идеальном состоянии. Рекомендую сотрудничество.",
              "VE456123"
            )}
            {renderReview(
              "ООО \"ТрансЛогистик\"", 
              "05.05.2024", 
              5, 
              "Все отлично! Перевозчик ответственный, груз доставлен в срок и в сохранности.",
              "VE455612"
            )}
            {renderReview(
              "ИП Козлов С.И.", 
              "01.05.2024", 
              5, 
              "Надежный перевозчик, всегда на связи. Работаем не первый раз и всегда все идеально.",
              "VE455234"
            )}
          </TabsContent>
          
          <TabsContent value="critical" className="mt-4">
            {renderReview(
              "ИП Сидоров А.В.", 
              "10.05.2024", 
              4, 
              "Хорошая работа, но был небольшой сдвиг по времени прибытия. В целом все хорошо.",
              "VE455987"
            )}
            {renderReview(
              "ООО \"ГрузМастер\"", 
              "25.04.2024", 
              3, 
              "Груз доставлен с небольшими повреждениями упаковки. Вопрос решили полюбовно.",
              "VE454890"
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ReviewsPage;

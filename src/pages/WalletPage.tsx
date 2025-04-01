
import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, CreditCard, ArrowDown, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const WalletPage = () => {
  const navigate = useNavigate();
  
  const handleDeposit = () => {
    toast.info("Функция пополнения счета будет доступна в следующем обновлении");
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
          <h1 className="text-2xl font-bold">Баланс и платежи</h1>
        </div>
        
        <Card className="mb-6 p-6">
          <h2 className="text-sm text-gray-600 dark:text-gray-300 mb-1">Доступно средств</h2>
          <p className="text-3xl font-bold mb-2">25 640 ₽</p>
          <p className="text-sm text-amber-600 dark:text-amber-400 mb-4">В обработке: 12 500 ₽</p>
          <Button onClick={handleDeposit} className="w-full">
            <Plus className="mr-2" />
            Пополнить
          </Button>
        </Card>
        
        <h2 className="text-xl font-bold mb-4">Способы оплаты</h2>
        
        <Card className="mb-6 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="font-medium">**** 5678</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Сбербанк • 05/25</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => toast.info("Редактирование карты")}>
              Изменить
            </Button>
          </div>
        </Card>
        
        <Button variant="outline" onClick={() => toast.info("Добавление карты")} className="w-full mb-6">
          <Plus className="mr-2" />
          Добавить карту
        </Button>
        
        <h2 className="text-xl font-bold mb-4">История операций</h2>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">Все</TabsTrigger>
            <TabsTrigger value="income" className="flex-1">Поступления</TabsTrigger>
            <TabsTrigger value="expense" className="flex-1">Списания</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                    <ArrowDown className="h-5 w-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h3 className="font-medium">Оплата заказа №VE456789</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">20.05.2024</p>
                  </div>
                </div>
                <p className="font-semibold text-green-600 dark:text-green-400">+28 500 ₽</p>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full mr-3">
                    <ArrowUp className="h-5 w-5 text-red-600 dark:text-red-300" />
                  </div>
                  <div>
                    <h3 className="font-medium">Комиссия платформы</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">19.05.2024</p>
                  </div>
                </div>
                <p className="font-semibold text-red-600 dark:text-red-400">-1 425 ₽</p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="income" className="mt-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                    <ArrowDown className="h-5 w-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h3 className="font-medium">Оплата заказа №VE456789</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">20.05.2024</p>
                  </div>
                </div>
                <p className="font-semibold text-green-600 dark:text-green-400">+28 500 ₽</p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="expense" className="mt-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full mr-3">
                    <ArrowUp className="h-5 w-5 text-red-600 dark:text-red-300" />
                  </div>
                  <div>
                    <h3 className="font-medium">Комиссия платформы</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">19.05.2024</p>
                  </div>
                </div>
                <p className="font-semibold text-red-600 dark:text-red-400">-1 425 ₽</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default WalletPage;

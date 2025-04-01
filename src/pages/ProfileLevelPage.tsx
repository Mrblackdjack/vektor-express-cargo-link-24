
import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ChevronDown, ChevronUp, Shield, CheckCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProfileLevelPage = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    documents: true,
    verification: false,
    experience: false
  });
  
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleVerifyAction = () => {
    toast.info("Верификация будет доступна в следующем обновлении");
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
          <h1 className="text-2xl font-bold">Уровень профиля</h1>
        </div>
        
        <Card className="mb-6 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Доверенный партнер</h2>
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Прогресс профиля</span>
            <span className="text-sm font-medium">75%</span>
          </div>
          
          <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-blue-600 dark:bg-blue-400 rounded-full" style={{ width: '75%' }}></div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Чем выше уровень профиля, тем больше доверия к вам у заказчиков и больше преимуществ на платформе.
          </p>
          
          <div className="flex justify-between text-sm">
            <div className="text-center">
              <p className="font-bold">75%</p>
              <p className="text-gray-600 dark:text-gray-300">Текущий</p>
            </div>
            <div className="text-center">
              <p className="font-bold">90%</p>
              <p className="text-gray-600 dark:text-gray-300">Продвинутый</p>
            </div>
            <div className="text-center">
              <p className="font-bold">100%</p>
              <p className="text-gray-600 dark:text-gray-300">Максимальный</p>
            </div>
          </div>
        </Card>
        
        <h2 className="text-xl font-bold mb-4">Что улучшить</h2>
        
        <Collapsible 
          open={openSections.documents} 
          onOpenChange={() => toggleSection('documents')}
          className="mb-4"
        >
          <Card className="p-4">
            <CollapsibleTrigger className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-medium text-left">Документы</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-left">75% заполнено</p>
                </div>
              </div>
              {openSections.documents ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="doc1" checked />
                <label htmlFor="doc1" className="text-sm">Паспорт водителя</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="doc2" checked />
                <label htmlFor="doc2" className="text-sm">Водительское удостоверение</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="doc3" checked />
                <label htmlFor="doc3" className="text-sm">Свидетельство о регистрации ТС</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="doc4" />
                <label htmlFor="doc4" className="text-sm">Страховой полис</label>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => navigate('/documents')}
              >
                Загрузить документы
              </Button>
            </CollapsibleContent>
          </Card>
        </Collapsible>
        
        <Collapsible 
          open={openSections.verification} 
          onOpenChange={() => toggleSection('verification')}
          className="mb-4"
        >
          <Card className="p-4">
            <CollapsibleTrigger className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                  <Info className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                </div>
                <div>
                  <h3 className="font-medium text-left">Верификация</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-left">Не пройдена</p>
                </div>
              </div>
              {openSections.verification ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Пройдите верификацию для повышения доверия к вашему профилю. Вам потребуется прислать селфи с документом.
              </p>
              <Button size="sm" onClick={handleVerifyAction}>
                Пройти верификацию
              </Button>
            </CollapsibleContent>
          </Card>
        </Collapsible>
        
        <Collapsible 
          open={openSections.experience} 
          onOpenChange={() => toggleSection('experience')}
          className="mb-4"
        >
          <Card className="p-4">
            <CollapsibleTrigger className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                  <Info className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className="font-medium text-left">Опыт работы</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-left">Не указан</p>
                </div>
              </div>
              {openSections.experience ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Добавьте информацию о вашем опыте работы в сфере перевозок для повышения доверия к профилю.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/profile')}
              >
                Добавить информацию
              </Button>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfileLevelPage;

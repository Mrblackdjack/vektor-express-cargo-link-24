
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, MapPin, Calendar, Package, Edit, Plus, Trash2, Copy } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import SearchInput from '@/components/search/SearchInput';

interface Template {
  id: string;
  name: string;
  fromCity: string;
  toCity: string;
  cargoType: string;
  weight: number;
  volume: number;
  date: string;
}

const sampleTemplates: Template[] = [
  {
    id: '1',
    name: 'Доставка мебели СПб',
    fromCity: 'Москва',
    toCity: 'Санкт-Петербург',
    cargoType: 'Мебель',
    weight: 500,
    volume: 6,
    date: '15.04.2025'
  },
  {
    id: '2',
    name: 'Стройматериалы в Казань',
    fromCity: 'Москва',
    toCity: 'Казань',
    cargoType: 'Стройматериалы',
    weight: 2000,
    volume: 12,
    date: '20.04.2025'
  }
];

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [templates, setTemplates] = useState<Template[]>(sampleTemplates);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.fromCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.toCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.cargoType.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCreateFromTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      toast.success(`Создан заказ на основе шаблона "${template.name}"`);
      // In a real app, we would navigate to order creation with template data
      navigate('/new-cargo');
    }
  };
  
  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    toast.success('Шаблон успешно удален');
  };
  
  const handleEditTemplate = (templateId: string) => {
    toast.info('Редактирование шаблона');
    // In a real app, we would navigate to template editing form
  };
  
  const handleCreateTemplate = () => {
    toast.info('Создание нового шаблона');
    // In a real app, we would navigate to template creation form
  };
  
  return (
    <div className="container mx-auto max-w-md bg-background min-h-screen pb-20">
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={true}
        toggleAuthModal={() => {}}
      />
      
      <main className="p-4">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/profile')}
            className="mr-2"
          >
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-bold">Мои шаблоны</h1>
        </div>
        
        <SearchInput 
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Поиск по названию или маршруту"
        />
        
        <div className="mb-4">
          <Button 
            onClick={handleCreateTemplate}
            className="w-full flex items-center justify-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Создать новый шаблон
          </Button>
        </div>
        
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery ? 'По запросу ничего не найдено' : 'У вас пока нет шаблонов'}
            </p>
            {searchQuery && (
              <Button variant="outline" className="mt-4" onClick={() => setSearchQuery('')}>
                Сбросить поиск
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTemplates.map(template => (
              <Card key={template.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{template.fromCity} → {template.toCity}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">
                          {template.cargoType}, {template.weight} кг, {template.volume} м³
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{template.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="default" 
                        className="flex-1"
                        onClick={() => handleCreateFromTemplate(template.id)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Использовать
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleEditTemplate(template.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default TemplatesPage;

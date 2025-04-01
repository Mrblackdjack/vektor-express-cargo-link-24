
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import DocumentsList from '@/components/DocumentsList';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const DocumentsPage = () => {
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
            <FileText className="mr-2" />
            Документы
          </h1>
          
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <Button variant="outline" onClick={() => toast.info("Все документы")}>
              Все
            </Button>
            <Button variant="outline" onClick={() => toast.info("Показаны ТТН")}>
              ТТН
            </Button>
            <Button variant="outline" onClick={() => toast.info("Показаны Договоры")}>
              Договоры
            </Button>
            <Button variant="outline" onClick={() => toast.info("Показаны Акты")}>
              Акты
            </Button>
            <Button variant="outline" onClick={() => toast.info("Показаны Счета")}>
              Счета
            </Button>
          </div>
          
          <Separator className="mb-6" />
          
          <DocumentsList />
          
          <div className="mt-6">
            <Button 
              className="w-full" 
              onClick={() => toast.info("Создание нового документа")}
            >
              Создать новый документ
            </Button>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default DocumentsPage;

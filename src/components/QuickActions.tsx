
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, FileText, Wallet } from 'lucide-react';
import { toast } from 'sonner';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNewCargo = () => {
    toast.info("Открытие формы размещения груза");
    navigate('/new-cargo');
  };
  
  const handleFindCargo = () => {
    toast.info("Переход к поиску грузов");
    navigate('/search');
  };
  
  const handleDocuments = () => {
    toast.info("Переход к документам");
    navigate('/documents');
  };
  
  const handlePayments = () => {
    toast.info("Открытие раздела платежей");
    navigate('/wallet');
  };
  
  return (
    <section className="px-4 py-6 bg-gray-50 dark:bg-gray-850 border-t border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Быстрые действия</h2>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div 
          className="flex flex-col items-center cursor-pointer"
          onClick={handleNewCargo}
        >
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-14 h-14 mb-2 flex items-center justify-center">
            <Package className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <span className="text-xs text-gray-700 dark:text-gray-300">Разместить груз</span>
        </div>
        
        <div 
          className="flex flex-col items-center cursor-pointer"
          onClick={handleFindCargo}
        >
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-14 h-14 mb-2 flex items-center justify-center">
            <Truck className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <span className="text-xs text-gray-700 dark:text-gray-300">Найти груз</span>
        </div>
        
        <div 
          className="flex flex-col items-center cursor-pointer"
          onClick={handleDocuments}
        >
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-14 h-14 mb-2 flex items-center justify-center">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <span className="text-xs text-gray-700 dark:text-gray-300">Документы</span>
        </div>
        
        <div 
          className="flex flex-col items-center cursor-pointer"
          onClick={handlePayments}
        >
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-14 h-14 mb-2 flex items-center justify-center">
            <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <span className="text-xs text-gray-700 dark:text-gray-300">Платежи</span>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;

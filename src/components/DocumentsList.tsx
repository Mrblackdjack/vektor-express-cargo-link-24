
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, FileContract, Receipt } from 'lucide-react';

interface Document {
  id: string;
  type: 'ttn' | 'contract' | 'receipt';
  title: string;
  description: string;
  status: 'signed' | 'pending' | 'requires_edit';
}

interface DocumentsListProps {
  documents?: Document[];
}

const DocumentsList: React.FC<DocumentsListProps> = ({
  documents = [
    {
      id: 'doc1',
      type: 'ttn',
      title: 'ТТН №4521',
      description: 'Москва → Санкт-Петербург',
      status: 'signed'
    },
    {
      id: 'doc2',
      type: 'contract',
      title: 'Договор №890',
      description: 'ООО "Грузовые решения"',
      status: 'pending'
    },
    {
      id: 'doc3',
      type: 'receipt',
      title: 'Акт №234',
      description: 'ИП Сидоров А.В.',
      status: 'requires_edit'
    }
  ]
}) => {
  const navigate = useNavigate();
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'signed':
        return <span className="text-green-500 text-sm font-medium">Подписано</span>;
      case 'pending':
        return <span className="text-blue-500 text-sm font-medium">На подписании</span>;
      case 'requires_edit':
        return <span className="text-red-500 text-sm font-medium">Требуется правка</span>;
      default:
        return null;
    }
  };
  
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'ttn':
        return (
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
          </div>
        );
      case 'contract':
        return (
          <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full mr-3">
            <FileContract className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
          </div>
        );
      case 'receipt':
        return (
          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-3">
            <Receipt className="h-5 w-5 text-purple-600 dark:text-purple-300" />
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3">
            <FileText className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </div>
        );
    }
  };
  
  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Документы</h2>
        <button 
          className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
          onClick={() => navigate('/documents')}
        >
          Все
        </button>
      </div>
      
      <div className="space-y-3">
        {documents.map(doc => (
          <div 
            key={doc.id}
            className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/documents/${doc.id}`)}
          >
            {getDocumentIcon(doc.type)}
            <div className="flex-grow">
              <p className="font-medium dark:text-white">{doc.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{doc.description}</p>
            </div>
            {getStatusText(doc.status)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DocumentsList;

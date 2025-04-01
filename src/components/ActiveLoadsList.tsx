
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

interface Load {
  id: string;
  orderNumber: string;
  route: string;
  status: 'in_transit' | 'waiting' | 'completed' | 'cancelled';
  client: string;
  dates: string;
  price: number;
  description: string;
}

interface ActiveLoadsListProps {
  loads?: Load[];
}

const ActiveLoadsList: React.FC<ActiveLoadsListProps> = ({
  loads = [
    {
      id: 'load1',
      orderNumber: 'VE456789',
      route: 'Москва → Казань',
      status: 'in_transit',
      client: 'ООО "ТрансЛогистик"',
      dates: '20.05.2024 - 22.05.2024',
      price: 28500,
      description: 'Мебель, 5т, 15м³'
    },
    {
      id: 'load2',
      orderNumber: 'VE456788',
      route: 'Екатеринбург → Челябинск',
      status: 'waiting',
      client: 'ИП Козлов С.И.',
      dates: '24.05.2024 - 25.05.2024',
      price: 12000,
      description: 'Стройматериалы, 8т, 34м³'
    }
  ]
}) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_transit':
        return <span className="vektor-badge-green">В пути</span>;
      case 'waiting':
        return <span className="vektor-badge-blue">Ожидание</span>;
      case 'completed':
        return <span className="vektor-badge-amber">Завершен</span>;
      case 'cancelled':
        return <span className="vektor-badge-red">Отменен</span>;
      default:
        return null;
    }
  };
  
  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Активные заказы</h2>
        <button 
          className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
          onClick={() => navigate('/orders')}
        >
          Все
        </button>
      </div>
      
      <div className="space-y-3">
        {loads.map(load => (
          <div 
            key={load.id}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/orders/${load.id}`)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold dark:text-white">#{load.orderNumber}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{load.route}</p>
              </div>
              {getStatusBadge(load.status)}
            </div>
            
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-2">
                <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </div>
              <p className="dark:text-white">{load.client}</p>
            </div>
            
            <div className="flex items-center justify-between text-sm mb-2">
              <p className="text-gray-600 dark:text-gray-300">{load.dates}</p>
              <p className="font-bold dark:text-white">{load.price.toLocaleString('ru-RU')} ₽</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded text-sm">
              <p className="dark:text-white">{load.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActiveLoadsList;

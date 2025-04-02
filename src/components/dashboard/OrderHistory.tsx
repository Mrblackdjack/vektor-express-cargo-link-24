
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Truck, Package, ChevronRight } from 'lucide-react';

interface Order {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  fromCity: string;
  toCity: string;
  date: string;
  cargoType: string;
  price: number;
}

interface OrderHistoryProps {
  orders: Order[];
  title?: string;
}

const getStatusLabel = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return { label: 'Ожидает', color: 'bg-yellow-500' };
    case 'in_progress':
      return { label: 'В пути', color: 'bg-blue-500' };
    case 'completed':
      return { label: 'Доставлено', color: 'bg-green-500' };
    case 'cancelled':
      return { label: 'Отменен', color: 'bg-red-500' };
    default:
      return { label: 'Неизвестно', color: 'bg-gray-500' };
  }
};

const OrderHistory: React.FC<OrderHistoryProps> = ({ 
  orders,
  title = 'История заказов'
}) => {
  const navigate = useNavigate();
  
  const handleOrderClick = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };
  
  if (orders.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p>У вас еще нет заказов</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order) => {
            const status = getStatusLabel(order.status);
            return (
              <div 
                key={order.id} 
                className="p-4 flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleOrderClick(order.id)}
              >
                <div className="mr-4">
                  <Badge className={`${status.color} text-white`}>
                    {status.label}
                  </Badge>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm">{order.fromCity} → {order.toCity}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-xs text-gray-500">{order.date}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Truck className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-xs text-gray-500">{order.cargoType}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{order.price.toLocaleString()} ₽</div>
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-auto mt-2" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderHistory;

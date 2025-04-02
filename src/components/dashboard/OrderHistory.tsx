
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from 'lucide-react';

interface OrderHistoryOrder {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  fromCity: string;
  toCity: string;
  date: string;
  cargoType: string;
  price: number;
}

interface OrderHistoryProps {
  orders: OrderHistoryOrder[];
  title: string;
  maxItems?: number;
  onOrderClick?: (orderId: string) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ 
  orders, 
  title, 
  maxItems,
  onOrderClick 
}) => {
  const displayedOrders = maxItems ? orders.slice(0, maxItems) : orders;
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Ожидает</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">В пути</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Завершен</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Отменен</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleOrderClick = (orderId: string) => {
    if (onOrderClick) {
      onOrderClick(orderId);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-sm text-gray-500">{orders.length} {orders.length === 1 ? 'заказ' : 'заказов'}</span>
      </div>
      
      {displayedOrders.length > 0 ? (
        <div className="space-y-3">
          {displayedOrders.map(order => (
            <Card 
              key={order.id}
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={() => handleOrderClick(order.id)}
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">№{order.id}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {order.fromCity} → {order.toCity}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    {getStatusBadge(order.status)}
                    <div className="text-sm font-medium mt-1">
                      {order.price.toLocaleString()} ₽
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm text-gray-500 pt-1 border-t">
                  <div>{order.date}</div>
                  <div className="flex items-center">
                    <span>{order.cargoType}</span>
                    <ArrowRight size={14} className="ml-1 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-400">
          Заказы отсутствуют
        </div>
      )}
    </div>
  );
};

export default OrderHistory;


import React from 'react';
import { 
  Calendar, Clock, FilePenLine, FileCheck, FileMinus, MessageSquare, ArrowUpDown, 
  Printer, Copy, Share2, AlertCircle, Package, Truck, MapPin 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

interface OrderDocument {
  id: string;
  name: string;
  status: 'signed' | 'pending' | 'rejected';
  date: string;
}

interface OrderComment {
  id: string;
  author: string;
  text: string;
  date: string;
  avatar?: string;
}

interface OrderHistory {
  id: string;
  action: string;
  user: string;
  date: string;
}

export interface OrderDetailsProps {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  fromCity: string;
  toCity: string;
  createdDate: string;
  deliveryDate: string;
  cargoType: string;
  weight: string;
  volume: string;
  price: number;
  documents: OrderDocument[];
  comments: OrderComment[];
  history: OrderHistory[];
}

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

const getDocumentStatusBadge = (status: string) => {
  switch (status) {
    case 'signed':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Подписан</Badge>;
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Ожидает</Badge>;
    case 'rejected':
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Отклонен</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const OrderDetailsPanel: React.FC<OrderDetailsProps> = ({
  id,
  status,
  fromCity,
  toCity,
  createdDate,
  deliveryDate,
  cargoType,
  weight,
  volume,
  price,
  documents,
  comments,
  history
}) => {
  const navigate = useNavigate();
  
  const handleTrackOrder = () => {
    navigate(`/tracking/${id}`);
  };
  
  const handlePrintOrder = () => {
    toast.info('Подготовка заказа к печати...');
    setTimeout(() => {
      toast.success('Документ отправлен на печать');
    }, 1500);
  };
  
  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(id);
    toast.success('Номер заказа скопирован');
  };
  
  const handleShareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: `Заказ ${id}`,
        text: `Информация о грузоперевозке из ${fromCity} в ${toCity}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Ссылка на заказ скопирована');
    }
  };
  
  const handleCancelOrder = () => {
    toast({
      title: "Отменить заказ?",
      description: "Это действие нельзя будет отменить",
      action: {
        label: "Отменить заказ",
        onClick: () => {
          toast.success("Заказ отменен");
          // Here you would update the order status
        },
      },
    });
  };
  
  const handleDuplicateOrder = () => {
    toast.success("Заказ скопирован, перенаправление на оформление");
    // In a real app, you would navigate to the new order form with prefilled data
  };
  
  const handleAddComment = () => {
    toast.info("Открытие формы для добавления комментария");
  };
  
  const handleOpenDocument = (docId: string) => {
    toast.info(`Открытие документа ${docId}`);
  };
  
  return (
    <div className="space-y-4">
      {/* Order Header */}
      <div className="flex flex-wrap justify-between items-start gap-2">
        <div>
          <h1 className="text-xl font-bold">Заказ #{id}</h1>
          <div className="flex items-center mt-1">
            {getStatusBadge(status)}
            <span className="text-sm text-gray-500 ml-2">от {createdDate}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <Button size="sm" variant="outline" onClick={handleTrackOrder}>
            <MapPin size={16} />
            Отследить
          </Button>
          <Button size="sm" variant="outline" onClick={handlePrintOrder}>
            <Printer size={16} />
          </Button>
          <Button size="sm" variant="outline" onClick={handleCopyOrderNumber}>
            <Copy size={16} />
          </Button>
          <Button size="sm" variant="outline" onClick={handleShareOrder}>
            <Share2 size={16} />
          </Button>
        </div>
      </div>
      
      {/* Order Route */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs text-gray-500">Откуда</div>
              <div className="font-medium">{fromCity}</div>
            </div>
            <ArrowUpDown className="h-5 w-5 text-gray-400 mx-4" />
            <div className="flex-1 text-right">
              <div className="text-xs text-gray-500">Куда</div>
              <div className="font-medium">{toCity}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-xs text-gray-500">Дата создания</div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                <span className="font-medium">{createdDate}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Дата доставки</div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-500 mr-1" />
                <span className="font-medium">{deliveryDate}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Order Details & Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Order Details */}
        <div className="sm:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Информация о грузе</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Тип груза</div>
                  <div className="font-medium">{cargoType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Стоимость</div>
                  <div className="font-medium">{price.toLocaleString()} ₽</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Вес</div>
                  <div className="font-medium">{weight}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Объем</div>
                  <div className="font-medium">{volume}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Additional information in tabs */}
          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="documents">Документы</TabsTrigger>
              <TabsTrigger value="comments">Комментарии</TabsTrigger>
              <TabsTrigger value="history">История</TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents" className="border rounded-md mt-2 p-4">
              {documents.length > 0 ? (
                <div className="space-y-2">
                  {documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 cursor-pointer" onClick={() => handleOpenDocument(doc.id)}>
                      <div className="flex items-center">
                        {doc.status === 'signed' ? (
                          <FileCheck className="h-5 w-5 text-green-500 mr-2" />
                        ) : doc.status === 'rejected' ? (
                          <FileMinus className="h-5 w-5 text-red-500 mr-2" />
                        ) : (
                          <FilePenLine className="h-5 w-5 text-yellow-500 mr-2" />
                        )}
                        <span>{doc.name}</span>
                      </div>
                      <div className="flex items-center">
                        {getDocumentStatusBadge(doc.status)}
                        <span className="ml-2 text-xs text-gray-500">{doc.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">Документы отсутствуют</div>
              )}
            </TabsContent>
            
            <TabsContent value="comments" className="border rounded-md mt-2 p-4">
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="border rounded-md p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center overflow-hidden">
                        {comment.avatar ? (
                          <img src={comment.avatar} alt={comment.author} className="w-full h-full object-cover" />
                        ) : (
                          <User size={16} />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{comment.author}</div>
                        <div className="text-xs text-gray-500">{comment.date}</div>
                      </div>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleAddComment}
                >
                  <MessageSquare size={16} />
                  Добавить комментарий
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="border rounded-md mt-2 p-4">
              <div className="space-y-2">
                {history.map(item => (
                  <div key={item.id} className="p-2 border-b last:border-b-0">
                    <div className="text-sm">{item.action}</div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">{item.user}</span>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Actions Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={handleTrackOrder} variant="info">
                <MapPin size={16} />
                Отследить груз
              </Button>
              
              {status === 'pending' && (
                <Button className="w-full" variant="destructive" onClick={handleCancelOrder}>
                  <AlertCircle size={16} />
                  Отменить заказ
                </Button>
              )}
              
              <Button className="w-full" variant="outline" onClick={handleDuplicateOrder}>
                <Copy size={16} />
                Дублировать заказ
              </Button>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Статус заказа</span>
                  {getStatusBadge(status)}
                </div>
                <div className="text-xs text-gray-500">
                  {status === 'pending' && 'Заказ создан и ожидает обработки'}
                  {status === 'in_progress' && 'Заказ принят и находится в пути'}
                  {status === 'completed' && 'Заказ успешно выполнен'}
                  {status === 'cancelled' && 'Заказ отменен'}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Информационная панель</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center">
                <Package className="h-4 w-4 text-gray-500 mr-2" />
                <span>Отправитель: ООО "Компания"</span>
              </div>
              <div className="flex items-center">
                <Truck className="h-4 w-4 text-gray-500 mr-2" />
                <span>Перевозчик: АО "Транспорт"</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-blue-600 cursor-pointer hover:underline">Нужна помощь?</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPanel;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import OrderDetailsPanel, { OrderStatus } from "@/components/orders/OrderDetailsPanel";

// Type definition for an order in the list
interface OrderListItem {
  id: string;
  fromCity: string;
  toCity: string;
  createdDate: string;
  deliveryDate: string;
  status: OrderStatus;
  price: number;
}

// OrderTable component
const OrderTable: React.FC<{
  orders: OrderListItem[];
  onOrderSelect: (id: string) => void;
}> = ({ orders, onOrderSelect }) => {
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b bg-muted/50">
        <div className="col-span-1">ID</div>
        <div className="col-span-2">Маршрут</div>
        <div className="col-span-1">Дата создания</div>
        <div className="col-span-1">Доставка до</div>
        <div className="col-span-1">Статус</div>
        <div className="col-span-1">Цена</div>
      </div>
      {orders.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          Нет заказов для отображения
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-7 gap-4 p-4 border-b last:border-0 hover:bg-muted/50 cursor-pointer"
            onClick={() => onOrderSelect(order.id)}
          >
            <div className="col-span-1 font-medium">{order.id}</div>
            <div className="col-span-2">{`${order.fromCity} → ${order.toCity}`}</div>
            <div className="col-span-1">{order.createdDate}</div>
            <div className="col-span-1">{order.deliveryDate}</div>
            <div className="col-span-1">
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium 
                ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                order.status === "in_progress" ? "bg-blue-100 text-blue-800" : 
                order.status === "completed" ? "bg-green-100 text-green-800" : 
                "bg-red-100 text-red-800"}`}
              >
                {order.status === "pending" && "Ожидает"}
                {order.status === "in_progress" && "В процессе"}
                {order.status === "completed" && "Завершен"}
                {order.status === "cancelled" && "Отменен"}
              </span>
            </div>
            <div className="col-span-1">{order.price} ₽</div>
          </div>
        ))
      )}
    </div>
  );
};

// OrdersPage component
const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Mock data for orders
  const mockOrders: OrderListItem[] = [
    {
      id: "ORD-1001",
      fromCity: "Москва",
      toCity: "Санкт-Петербург",
      createdDate: "10.05.2023",
      deliveryDate: "15.05.2023",
      status: "in_progress",
      price: 15000,
    },
    {
      id: "ORD-1002",
      fromCity: "Екатеринбург",
      toCity: "Казань",
      createdDate: "08.05.2023",
      deliveryDate: "16.05.2023",
      status: "pending",
      price: 12000,
    },
    {
      id: "ORD-1003",
      fromCity: "Новосибирск",
      toCity: "Красноярск",
      createdDate: "05.05.2023",
      deliveryDate: "12.05.2023",
      status: "completed",
      price: 9000,
    },
    {
      id: "ORD-1004",
      fromCity: "Ростов-на-Дону",
      toCity: "Краснодар",
      createdDate: "01.05.2023",
      deliveryDate: "08.05.2023",
      status: "cancelled",
      price: 7500,
    },
  ];

  // Filter orders based on search term and status filter
  const filteredOrders = mockOrders.filter(
    (order) =>
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.fromCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.toCity.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || order.status === statusFilter)
  );

  // Mock detailed order data (would typically come from an API call)
  const getMockOrderDetails = (id: string) => {
    const order = mockOrders.find((o) => o.id === id);
    if (!order) return null;

    return {
      ...order,
      cargoType: "Стандартный",
      weight: "1500 кг",
      volume: "12 м³",
      documents: [
        {
          id: "DOC-1",
          name: "Договор перевозки.pdf",
          status: "signed" as "pending" | "signed" | "rejected", // Fixed to use proper type
          date: "09.05.2023",
        },
        {
          id: "DOC-2",
          name: "Транспортная накладная.pdf",
          status: "pending" as "pending" | "signed" | "rejected", // Fixed to use proper type
          date: "09.05.2023",
        },
        {
          id: "DOC-3",
          name: "Счет на оплату.pdf",
          status: "pending" as "pending" | "signed" | "rejected", // Fixed to use proper type
          date: "10.05.2023",
        },
      ],
      comments: [
        {
          id: "CMT-1",
          author: "Менеджер Андрей",
          authorAvatar: "",
          text: "Заказ подтвержден, ожидаем подписания документов.",
          date: "09.05.2023 14:30",
        },
        {
          id: "CMT-2",
          author: "Система",
          text: "Водитель Иван Петров назначен на заказ.",
          date: "10.05.2023 09:15",
        },
      ],
      history: [
        {
          id: "HST-1",
          action: "Заказ создан",
          date: "08.05.2023 16:45",
          user: "Клиент",
        },
        {
          id: "HST-2",
          action: "Заказ подтвержден",
          date: "09.05.2023 14:30",
          user: "Менеджер Андрей",
        },
        {
          id: "HST-3",
          action: "Назначен водитель",
          date: "10.05.2023 09:15",
          user: "Система",
        },
      ],
    };
  };

  const selectedOrderDetails = selectedOrderId ? getMockOrderDetails(selectedOrderId) : null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Мои заказы</h1>

      <div className="flex justify-between mb-6">
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Поиск заказов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="pending">Ожидает</SelectItem>
              <SelectItem value="in_progress">В процессе</SelectItem>
              <SelectItem value="completed">Завершен</SelectItem>
              <SelectItem value="cancelled">Отменен</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Создать заказ</Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Все заказы</TabsTrigger>
            <TabsTrigger value="active">Активные</TabsTrigger>
            <TabsTrigger value="completed">Завершенные</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardContent className="p-0">
                <OrderTable
                  orders={filteredOrders}
                  onOrderSelect={setSelectedOrderId}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active">
            <Card>
              <CardContent className="p-0">
                <OrderTable
                  orders={filteredOrders.filter(
                    (o) => o.status === "pending" || o.status === "in_progress"
                  )}
                  onOrderSelect={setSelectedOrderId}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card>
              <CardContent className="p-0">
                <OrderTable
                  orders={filteredOrders.filter(
                    (o) => o.status === "completed" || o.status === "cancelled"
                  )}
                  onOrderSelect={setSelectedOrderId}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {selectedOrderDetails && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="bg-white w-full max-w-2xl h-full">
            {selectedOrderDetails && (
              <OrderDetailsPanel
                {...selectedOrderDetails}
                onClose={() => setSelectedOrderId(null)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

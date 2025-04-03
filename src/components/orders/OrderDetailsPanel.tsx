
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, FileText, FileCheck, FileX, Clock, CheckCircle, XCircle, MessageCircle } from "lucide-react";
import { formatDate, formatCurrency, getStatusColor } from "@/lib/utils";

// Define types
export type OrderStatus = "pending" | "in_progress" | "completed" | "cancelled";

export interface OrderDocument {
  id: string;
  name: string;
  status: "pending" | "signed" | "rejected"; // Fixed to use specific string literal types
  date: string;
}

export interface OrderComment {
  id: string;
  author: string;
  authorAvatar?: string;
  text: string;
  date: string;
}

export interface OrderHistoryItem {
  id: string;
  action: string;
  date: string;
  user: string;
}

export interface OrderDetailsProps {
  id: string;
  status: OrderStatus;
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
  history: OrderHistoryItem[];
  onClose?: () => void;
}

// Document item component
const DocumentItem: React.FC<{ document: OrderDocument }> = ({ document }) => {
  // Map the document status to the appropriate icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "signed":
        return <FileCheck className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <FileX className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
      <div className="flex items-center gap-2">
        {getStatusIcon(document.status)}
        <span className="text-sm">{document.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">{document.date}</span>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Paperclip className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Comment item component
const CommentItem: React.FC<{ comment: OrderComment }> = ({ comment }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1">
        <Avatar className="h-6 w-6">
          <AvatarImage src={comment.authorAvatar} />
          <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <span className="text-sm font-medium">{comment.author}</span>
          <span className="text-xs text-gray-500 ml-2">{comment.date}</span>
        </div>
      </div>
      <div className="pl-8">
        <p className="text-sm">{comment.text}</p>
      </div>
    </div>
  );
};

// History item component
const HistoryItem: React.FC<{ item: OrderHistoryItem }> = ({ item }) => {
  return (
    <div className="flex items-start gap-3 mb-3">
      <div className="mt-1">
        <Clock className="h-4 w-4 text-gray-400" />
      </div>
      <div>
        <p className="text-sm">{item.action}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-gray-500">{item.date}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{item.user}</span>
        </div>
      </div>
    </div>
  );
};

// Add Comment Dialog
const AddCommentDialog: React.FC<{ orderId: string; onCommentAdded: () => void }> = ({
  orderId,
  onCommentAdded,
}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment.trim()) {
      // Here you would typically submit the comment to your API
      console.log("Submitting comment for order", orderId, comment);
      onCommentAdded();
      setComment("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <MessageCircle className="h-4 w-4" />
          <span>Добавить комментарий</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить комментарий</DialogTitle>
          <DialogDescription>
            Оставьте комментарий к заказу #{orderId}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <textarea
            className="w-full border rounded-md p-2 h-32"
            placeholder="Введите ваш комментарий..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setComment("")}>Отмена</Button>
          <Button onClick={handleSubmit}>Отправить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main OrderDetailsPanel component
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
  history,
  onClose,
}) => {
  return (
    <div className="bg-white h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Заказ #{id}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={status === "completed" ? "default" : status === "cancelled" ? "destructive" : "outline"}>
              {status === "pending" && "Ожидает"}
              {status === "in_progress" && "В процессе"}
              {status === "completed" && "Завершен"}
              {status === "cancelled" && "Отменен"}
            </Badge>
            <span className="text-sm text-gray-500">
              Создан {createdDate}
            </span>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        )}
      </div>

      <Tabs defaultValue="info" className="flex-1 flex flex-col">
        <div className="border-b">
          <TabsList className="px-4">
            <TabsTrigger value="info">Информация</TabsTrigger>
            <TabsTrigger value="documents">Документы</TabsTrigger>
            <TabsTrigger value="comments">Комментарии</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="info" className="p-4 h-full">
            <Card>
              <CardHeader>
                <CardTitle>Детали заказа</CardTitle>
                <CardDescription>
                  Основная информация о заказе и его параметрах
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Маршрут</p>
                  <p className="text-sm text-muted-foreground">
                    {fromCity} → {toCity}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Дата доставки</p>
                  <p className="text-sm text-muted-foreground">
                    {deliveryDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Тип груза</p>
                  <p className="text-sm text-muted-foreground">
                    {cargoType}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Вес</p>
                  <p className="text-sm text-muted-foreground">
                    {weight}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Объем</p>
                  <p className="text-sm text-muted-foreground">
                    {volume}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Стоимость</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(price)}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-end gap-2">
                  {status === "pending" && (
                    <>
                      <Button variant="outline" size="sm">
                        <XCircle className="h-4 w-4 mr-1" />
                        Отменить заказ
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Подтвердить
                      </Button>
                    </>
                  )}
                  {status === "in_progress" && (
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Завершить
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="p-4 h-full">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Документы</CardTitle>
                <CardDescription>
                  Документы, связанные с заказом
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-1">
                    {documents.map(doc => (
                      <DocumentItem key={doc.id} document={doc} />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <Paperclip className="h-4 w-4 mr-1" />
                  Загрузить документ
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="comments" className="p-4 h-full">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Комментарии</CardTitle>
                  <CardDescription>
                    Обсуждение заказа
                  </CardDescription>
                </div>
                <AddCommentDialog 
                  orderId={id} 
                  onCommentAdded={() => console.log("Comment added")} 
                />
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  {comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Нет комментариев</p>
                      <p className="text-sm">Будьте первым, кто оставит комментарий</p>
                    </div>
                  ) : (
                    comments.map(comment => (
                      <CommentItem key={comment.id} comment={comment} />
                    ))
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="p-4 h-full">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>История</CardTitle>
                <CardDescription>
                  История изменений заказа
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  {history.map(item => (
                    <HistoryItem key={item.id} item={item} />
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

// Define user type to fix the error
interface UserType {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default OrderDetailsPanel;

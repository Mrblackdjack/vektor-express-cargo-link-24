
import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, FileText } from 'lucide-react';
import { toast } from "sonner";

interface DeliveryActionsProps {
  onContactDriver: () => void;
  onViewDocuments: () => void;
}

const DeliveryActions: React.FC<DeliveryActionsProps> = ({
  onContactDriver,
  onViewDocuments
}) => {
  const handleCall = () => {
    toast.info("Вызов водителя...");
  };
  
  return (
    <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
      <div className="container max-w-md mx-auto flex space-x-2">
        <Button variant="outline" size="icon" onClick={handleCall}>
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="outline" className="flex-1" onClick={onContactDriver}>
          <MessageSquare className="h-5 w-5 mr-2" />
          Написать водителю
        </Button>
        <Button className="flex-1" onClick={onViewDocuments}>
          <FileText className="h-5 w-5 mr-2" />
          Документы
        </Button>
      </div>
    </div>
  );
};

export default DeliveryActions;

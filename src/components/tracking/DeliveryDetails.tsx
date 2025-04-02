
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Package, Weight, Box, Calendar, Clock, User, Truck, FileText } from 'lucide-react';

interface DriverType {
  name: string;
  phone: string;
  rating: number;
  vehicle: string;
}

interface DocumentType {
  id: string;
  name: string;
  status: string;
}

interface DeliveryDetailsProps {
  cargoType: string;
  weight: string;
  volume: string;
  departureDate: string;
  estimatedArrival: string;
  driver: DriverType;
  documents: DocumentType[];
}

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({
  cargoType,
  weight,
  volume,
  departureDate,
  estimatedArrival,
  driver,
  documents
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Информация о грузе</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Package className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">Тип груза</div>
                <div className="font-medium">{cargoType}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Weight className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">Вес</div>
                <div className="font-medium">{weight}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Box className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">Объем</div>
                <div className="font-medium">{volume}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Сроки доставки</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">Отправление</div>
                <div className="font-medium">{departureDate}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">Ожидаемое прибытие</div>
                <div className="font-medium">{estimatedArrival}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Информация о перевозчике</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">Водитель</div>
                <div className="font-medium">{driver.name}</div>
                <div className="text-xs text-gray-500">{driver.phone}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">Транспорт</div>
                <div className="font-medium">{driver.vehicle}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Документы</h3>
          <div className="space-y-2">
            {documents.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="font-medium">{doc.name}</span>
                </div>
                <span className="text-xs text-gray-500">{doc.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryDetails;

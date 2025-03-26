
import React from 'react';
import { CarFront, Clock, User, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type ServiceStatus = 'pending' | 'in-progress' | 'completed' | 'delayed';

interface ServiceCardProps {
  id: string;
  licensePlate: string;
  vehicleType: string;
  clientName: string;
  serviceType: string;
  entryTime: string;
  estimatedTime: string;
  assignedTo?: string;
  status: ServiceStatus;
  onMarkComplete?: (id: string) => void;
  onAssign?: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  licensePlate,
  vehicleType,
  clientName,
  serviceType,
  entryTime,
  estimatedTime,
  assignedTo,
  status,
  onMarkComplete,
  onAssign,
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">En proceso</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Completado</Badge>;
      case 'delayed':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Retrasado</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold">{licensePlate}</h3>
              {getStatusBadge()}
            </div>
            <p className="text-sm text-muted-foreground">{serviceType}</p>
          </div>
          {status === 'delayed' && (
            <div className="text-destructive">
              <AlertCircle size={18} />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <CarFront size={16} className="mr-2 text-muted-foreground" />
            <span>{vehicleType}</span>
          </div>
          <div className="flex items-center text-sm">
            <User size={16} className="mr-2 text-muted-foreground" />
            <span>{clientName}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock size={16} className="mr-2 text-muted-foreground" />
            <span>Entrada: {entryTime} | Estimado: {estimatedTime}</span>
          </div>
          {assignedTo && (
            <div className="flex items-center text-sm">
              <User size={16} className="mr-2 text-muted-foreground" />
              <span>Asignado a: {assignedTo}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2 justify-end">
        {status !== 'completed' && !assignedTo && (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onAssign && onAssign(id)}
          >
            Asignar
          </Button>
        )}
        {status === 'in-progress' && (
          <Button 
            size="sm" 
            onClick={() => onMarkComplete && onMarkComplete(id)}
          >
            <Check size={16} className="mr-1" />
            Completar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;

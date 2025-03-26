
import React, { useState } from 'react';
import { Search, Filter, CarFront, ArrowDownUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ServiceCard, { ServiceStatus } from '@/components/ServiceCard';
import { toast } from 'sonner';

// Mock data
const initialServices = [
  {
    id: '1',
    licensePlate: 'ABC123',
    vehicleType: 'Sedán',
    clientName: 'Juan Pérez',
    serviceType: 'Lavado Premium',
    entryTime: '08:30',
    estimatedTime: '09:15',
    assignedTo: 'Carlos Rodríguez',
    status: 'in-progress' as ServiceStatus,
  },
  {
    id: '2',
    licensePlate: 'XYZ789',
    vehicleType: 'SUV',
    clientName: 'María García',
    serviceType: 'Lavado Completo',
    entryTime: '09:00',
    estimatedTime: '09:45',
    status: 'pending' as ServiceStatus,
  },
  {
    id: '3',
    licensePlate: 'DEF456',
    vehicleType: 'Pickup',
    clientName: 'Roberto Sánchez',
    serviceType: 'Lavado de Motor',
    entryTime: '08:15',
    estimatedTime: '09:30',
    status: 'delayed' as ServiceStatus,
  },
  {
    id: '4',
    licensePlate: 'GHI789',
    vehicleType: 'Sedán',
    clientName: 'Ana López',
    serviceType: 'Lavado Básico',
    entryTime: '10:00',
    estimatedTime: '10:30',
    assignedTo: 'María López',
    status: 'in-progress' as ServiceStatus,
  },
  {
    id: '5',
    licensePlate: 'JKL012',
    vehicleType: 'Motocicleta',
    clientName: 'Luis Torres',
    serviceType: 'Lavado Completo',
    entryTime: '10:15',
    estimatedTime: '10:45',
    status: 'pending' as ServiceStatus,
  },
  {
    id: '6',
    licensePlate: 'MNO345',
    vehicleType: 'SUV',
    clientName: 'Carmen Ruiz',
    serviceType: 'Lavado Premium',
    entryTime: '09:45',
    estimatedTime: '10:45',
    assignedTo: 'Juan Pérez',
    status: 'in-progress' as ServiceStatus,
  },
];

const employees = [
  { id: 'emp1', name: 'Carlos Rodríguez' },
  { id: 'emp2', name: 'María López' },
  { id: 'emp3', name: 'Juan Pérez' },
];

const PendingServices = () => {
  const [services, setServices] = useState(initialServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleMarkComplete = (id: string) => {
    setServices(prev => 
      prev.map(service => 
        service.id === id ? { ...service, status: 'completed' as ServiceStatus } : service
      )
    );
    toast.success('Servicio marcado como completado');
  };

  const handleAssign = (id: string) => {
    // In a real app, this would open a modal to select an employee
    // For demo purposes, we'll just assign to the first employee
    setServices(prev => 
      prev.map(service => 
        service.id === id ? { ...service, assignedTo: 'Carlos Rodríguez', status: 'in-progress' as ServiceStatus } : service
      )
    );
    toast.success('Servicio asignado a Carlos Rodríguez');
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Servicios Pendientes</h1>
        <p className="text-muted-foreground mt-1">
          Gestione los vehículos en proceso de lavado.
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative w-full sm:w-auto grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por placa o cliente"
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="in-progress">En proceso</SelectItem>
              <SelectItem value="delayed">Retrasado</SelectItem>
              <SelectItem value="completed">Completado</SelectItem>
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hora de entrada (más reciente)</DropdownMenuItem>
              <DropdownMenuItem>Hora de entrada (más antigua)</DropdownMenuItem>
              <DropdownMenuItem>Tiempo estimado (menor)</DropdownMenuItem>
              <DropdownMenuItem>Tiempo estimado (mayor)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Service Cards */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-10">
          <CarFront className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No hay servicios que coincidan con tu búsqueda</h3>
          <p className="mt-1 text-muted-foreground">Prueba con diferentes filtros o términos de búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <ServiceCard 
              key={service.id} 
              {...service} 
              onMarkComplete={handleMarkComplete}
              onAssign={handleAssign}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingServices;

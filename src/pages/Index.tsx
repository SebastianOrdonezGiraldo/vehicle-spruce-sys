
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CarFront, 
  Users, 
  Clock, 
  DollarSign, 
  PackageOpen,
  ArrowRight,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/StatCard';
import ServiceCard from '@/components/ServiceCard';

// Mock data
const quickStats = [
  { 
    title: 'Vehículos Pendientes', 
    value: '23', 
    icon: CarFront, 
    trend: 'up' as const, 
    trendValue: '+5 hoy' 
  },
  { 
    title: 'Empleados Activos', 
    value: '8', 
    icon: Users 
  },
  { 
    title: 'Tiempo Promedio', 
    value: '45 min', 
    icon: Clock, 
    trend: 'down' as const, 
    trendValue: '-3 min' 
  },
  { 
    title: 'Ingresos del Día', 
    value: '$2,450', 
    icon: DollarSign, 
    trend: 'up' as const, 
    trendValue: '+15%' 
  },
];

const pendingServices = [
  {
    id: '1',
    licensePlate: 'ABC123',
    vehicleType: 'Sedán',
    clientName: 'Juan Pérez',
    serviceType: 'Lavado Premium',
    entryTime: '08:30',
    estimatedTime: '09:15',
    assignedTo: 'Carlos Rodríguez',
    status: 'in-progress' as const,
  },
  {
    id: '2',
    licensePlate: 'XYZ789',
    vehicleType: 'SUV',
    clientName: 'María García',
    serviceType: 'Lavado Completo',
    entryTime: '09:00',
    estimatedTime: '09:45',
    status: 'pending' as const,
  },
  {
    id: '3',
    licensePlate: 'DEF456',
    vehicleType: 'Pickup',
    clientName: 'Roberto Sánchez',
    serviceType: 'Lavado de Motor',
    entryTime: '08:15',
    estimatedTime: '09:30',
    status: 'delayed' as const,
  },
];

const lowStockItems = [
  { name: 'Champú para autos', currentStock: 5, threshold: 10 },
  { name: 'Cera para pulir', currentStock: 3, threshold: 8 },
  { name: 'Desengrasante', currentStock: 2, threshold: 5 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Bienvenido al sistema de gestión de lavado de vehículos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Services */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Servicios Pendientes</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/pending-services" className="flex items-center">
                Ver todos
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingServices.slice(0, 2).map((service) => (
              <ServiceCard 
                key={service.id} 
                {...service} 
                onMarkComplete={(id) => console.log('Complete', id)}
                onAssign={(id) => console.log('Assign', id)}
              />
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Alertas de Inventario</h2>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Insumos con Stock Bajo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-red-100/50">
                      <PackageOpen size={16} className="text-red-700" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Stock: {item.currentStock} / {item.threshold}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                    Bajo
                  </span>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/inventory" className="flex items-center justify-center">
                  <span>Gestionar Inventario</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="default" className="w-full justify-between" asChild>
                <Link to="/vehicle-registration">
                  Registrar Nuevo Vehículo
                  <ArrowUpRight size={16} />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link to="/reports">
                  Ver Reportes
                  <ArrowUpRight size={16} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import React from 'react';
import { User, Check, X, Clock, Calendar, PhoneCall, Mail, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock employee data
const employees = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    position: 'Técnico de Lavado',
    email: 'carlos@example.com',
    phone: '555-123-4567',
    status: 'active',
    currentLoad: 3,
    maxLoad: 5,
    schedule: 'Lun-Vie: 8:00 - 17:00',
    assignedVehicles: [
      { licensePlate: 'ABC123', serviceType: 'Lavado Premium' },
      { licensePlate: 'DEF456', serviceType: 'Lavado de Motor' },
      { licensePlate: 'GHI789', serviceType: 'Lavado Básico' },
    ]
  },
  {
    id: 2,
    name: 'María López',
    position: 'Técnico de Lavado',
    email: 'maria@example.com',
    phone: '555-234-5678',
    status: 'active',
    currentLoad: 2,
    maxLoad: 5,
    schedule: 'Lun-Vie: 9:00 - 18:00',
    assignedVehicles: [
      { licensePlate: 'JKL012', serviceType: 'Lavado Completo' },
      { licensePlate: 'MNO345', serviceType: 'Lavado Premium' },
    ]
  },
  {
    id: 3,
    name: 'Juan Pérez',
    position: 'Técnico de Lavado',
    email: 'juan@example.com',
    phone: '555-345-6789',
    status: 'inactive',
    currentLoad: 0,
    maxLoad: 5,
    schedule: 'Mar-Sáb: 8:00 - 17:00',
    assignedVehicles: []
  },
  {
    id: 4,
    name: 'Ana Martínez',
    position: 'Recepcionista',
    email: 'ana@example.com',
    phone: '555-456-7890',
    status: 'active',
    currentLoad: 0,
    maxLoad: 0,
    schedule: 'Lun-Vie: 8:00 - 17:00',
    assignedVehicles: []
  },
];

const Employees = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Empleados</h1>
          <p className="text-muted-foreground mt-1">
            Gestione los empleados y sus asignaciones de trabajo.
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Empleado
        </Button>
      </div>
      
      {/* Employee Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Empleados</p>
                <h3 className="text-2xl font-bold mt-1">4</h3>
              </div>
              <div className="p-2 rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Empleados Activos</p>
                <h3 className="text-2xl font-bold mt-1">3</h3>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <Check className="h-5 w-5 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Empleados Inactivos</p>
                <h3 className="text-2xl font-bold mt-1">1</h3>
              </div>
              <div className="p-2 rounded-full bg-red-100">
                <X className="h-5 w-5 text-red-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Carga Promedio</p>
                <h3 className="text-2xl font-bold mt-1">65%</h3>
              </div>
              <div className="p-2 rounded-full bg-blue-100">
                <Clock className="h-5 w-5 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Employees List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Lista de Empleados</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {employees.map((employee) => (
            <Card key={employee.id} className="overflow-hidden">
              <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-medium">{employee.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{employee.position}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    employee.status === 'active' 
                      ? "bg-green-100 text-green-800 hover:bg-green-100" 
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }
                >
                  {employee.status === 'active' ? 'Activo' : 'Inactivo'}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center text-sm">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <PhoneCall className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{employee.schedule}</span>
                  </div>
                </div>
                
                {/* Workload (only for technicians) */}
                {employee.maxLoad > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Carga de trabajo</span>
                      <span className="font-medium">{employee.currentLoad}/{employee.maxLoad}</span>
                    </div>
                    <Progress 
                      value={(employee.currentLoad / employee.maxLoad) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
                
                {/* Assigned Vehicles (if applicable) */}
                {employee.assignedVehicles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Vehículos asignados</p>
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Placa</TableHead>
                            <TableHead>Servicio</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {employee.assignedVehicles.map((vehicle, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
                              <TableCell>{vehicle.serviceType}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Employees;

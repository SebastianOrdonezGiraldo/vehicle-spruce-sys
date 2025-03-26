
import React, { useState } from 'react';
import { 
  Package2, 
  Plus, 
  Search, 
  AlertTriangle,
  ArrowUpDown,
  MoreHorizontal
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

// Mock inventory data
const inventoryItems = [
  { 
    id: '1', 
    name: 'Champú para autos', 
    category: 'Limpieza', 
    currentStock: 5, 
    threshold: 10, 
    unit: 'Galón', 
    lastUpdated: '2023-09-15',
    price: 25.99,
  },
  { 
    id: '2', 
    name: 'Cera para pulir', 
    category: 'Acabado', 
    currentStock: 3, 
    threshold: 8, 
    unit: 'Bote', 
    lastUpdated: '2023-09-10',
    price: 32.50,
  },
  { 
    id: '3', 
    name: 'Desengrasante', 
    category: 'Limpieza', 
    currentStock: 2, 
    threshold: 5, 
    unit: 'Litro', 
    lastUpdated: '2023-09-12',
    price: 18.75,
  },
  { 
    id: '4', 
    name: 'Limpiador de llantas', 
    category: 'Limpieza', 
    currentStock: 12, 
    threshold: 8, 
    unit: 'Botella', 
    lastUpdated: '2023-09-14',
    price: 15.99,
  },
  { 
    id: '5', 
    name: 'Paños de microfibra', 
    category: 'Material', 
    currentStock: 45, 
    threshold: 20, 
    unit: 'Unidad', 
    lastUpdated: '2023-09-08',
    price: 2.50,
  },
  { 
    id: '6', 
    name: 'Abrillantador de interiores', 
    category: 'Acabado', 
    currentStock: 8, 
    threshold: 6, 
    unit: 'Botella', 
    lastUpdated: '2023-09-11',
    price: 22.99,
  },
  { 
    id: '7', 
    name: 'Limpiador de vidrios', 
    category: 'Limpieza', 
    currentStock: 7, 
    threshold: 5, 
    unit: 'Botella', 
    lastUpdated: '2023-09-13',
    price: 12.50,
  },
];

// Mock usage history data
const usageHistoryData = [
  { id: '1', productName: 'Champú para autos', quantity: 0.5, service: 'Lavado Premium', employee: 'Carlos Rodríguez', date: '2023-09-15 10:30' },
  { id: '2', productName: 'Cera para pulir', quantity: 0.25, service: 'Lavado Premium', employee: 'Ana Martínez', date: '2023-09-15 11:15' },
  { id: '3', productName: 'Desengrasante', quantity: 0.3, service: 'Lavado de Motor', employee: 'Carlos Rodríguez', date: '2023-09-15 09:45' },
  { id: '4', productName: 'Champú para autos', quantity: 0.5, service: 'Lavado Completo', employee: 'Luis Gómez', date: '2023-09-14 16:20' },
  { id: '5', productName: 'Paños de microfibra', quantity: 2, service: 'Lavado Básico', employee: 'Ana Martínez', date: '2023-09-14 14:10' },
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('inventory');
  const { toast } = useToast();

  // Filter inventory items based on search term
  const filteredItems = inventoryItems.filter(
    item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count low stock items
  const lowStockCount = inventoryItems.filter(item => item.currentStock < item.threshold).length;

  const handleAddStock = (itemId: string) => {
    toast({
      title: "Acción pendiente",
      description: "Funcionalidad para añadir stock en desarrollo.",
    });
  };

  const handleRemoveStock = (itemId: string) => {
    toast({
      title: "Acción pendiente",
      description: "Funcionalidad para reducir stock en desarrollo.",
    });
  };

  const handleEditItem = (itemId: string) => {
    toast({
      title: "Editar producto",
      description: "Funcionalidad para editar producto en desarrollo.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
        <p className="text-muted-foreground mt-1">
          Gestione los insumos y materiales utilizados en el servicio de lavado.
        </p>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="inventory" className="relative">
              Inventario
              {lowStockCount > 0 && (
                <Badge variant="destructive" className="ml-2 absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {lowStockCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="usage">Historial de Uso</TabsTrigger>
            <TabsTrigger value="orders">Órdenes de Compra</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar producto..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </div>
        </div>

        <TabsContent value="inventory" className="space-y-4">
          {lowStockCount > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <p className="text-red-600 font-medium">
                    {lowStockCount} producto(s) con stock bajo necesitan reposición.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">
                      <div className="flex items-center space-x-1">
                        <span>Producto</span>
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Stock Actual</TableHead>
                    <TableHead className="text-right">Umbral</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead className="text-right">Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No se encontraron productos.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <div className="bg-muted p-2 rounded-md">
                              <Package2 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-muted-foreground">
                                Última actualización: {item.lastUpdated}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">{item.currentStock} {item.unit}</TableCell>
                        <TableCell className="text-right">{item.threshold} {item.unit}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Badge 
                            variant={item.currentStock < item.threshold ? "destructive" : "success"}
                          >
                            {item.currentStock < item.threshold ? "Stock Bajo" : "Disponible"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleAddStock(item.id)}>
                                Añadir Stock
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRemoveStock(item.id)}>
                                Reducir Stock
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditItem(item.id)}>
                                Editar Producto
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Uso de Insumos</CardTitle>
              <CardDescription>
                Registro de insumos utilizados en los servicios.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Fecha y Hora</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usageHistoryData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.productName}</TableCell>
                      <TableCell>{record.quantity}</TableCell>
                      <TableCell>{record.service}</TableCell>
                      <TableCell>{record.employee}</TableCell>
                      <TableCell>{record.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package2 className="h-16 w-16 text-muted-foreground/40 mb-6" />
              <h3 className="text-xl font-medium mb-2">Módulo de Órdenes en Desarrollo</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Estamos trabajando en el módulo de órdenes de compra que permitirá gestionar 
                las solicitudes de reposición de insumos.
              </p>
              <Button disabled>
                <Plus className="mr-2 h-4 w-4" />
                Crear Orden de Compra
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;

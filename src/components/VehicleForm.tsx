
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CarFront, User, Calendar, Clock, Check } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const formSchema = z.object({
  licensePlate: z.string().min(4, {
    message: "La placa debe tener al menos 4 caracteres.",
  }),
  vehicleType: z.string({
    required_error: "Seleccione el tipo de vehículo",
  }),
  clientName: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres.",
  }),
  clientPhone: z.string().min(7, {
    message: "El teléfono debe tener al menos 7 caracteres.",
  }),
  serviceType: z.string({
    required_error: "Seleccione el tipo de servicio",
  }),
  employeeId: z.string({
    required_error: "Seleccione el empleado",
  }),
});

// Dummy data for the form selects
const vehicleTypes = [
  { id: 'sedan', name: 'Sedán' },
  { id: 'suv', name: 'SUV' },
  { id: 'pickup', name: 'Camioneta' },
  { id: 'motorcycle', name: 'Motocicleta' },
];

const serviceTypes = [
  { id: 'basic', name: 'Lavado Básico' },
  { id: 'complete', name: 'Lavado Completo' },
  { id: 'premium', name: 'Lavado Premium' },
  { id: 'engine', name: 'Lavado de Motor' },
];

const employees = [
  { id: 'emp1', name: 'Carlos Rodríguez' },
  { id: 'emp2', name: 'María López' },
  { id: 'emp3', name: 'Juan Pérez' },
];

const VehicleForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensePlate: '',
      clientName: '',
      clientPhone: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast.success('Vehículo registrado correctamente');
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Registro de Vehículo</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* License Plate */}
              <FormField
                control={form.control}
                name="licensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <CarFront className="mr-2 h-4 w-4" />
                      Placa
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese la placa" {...field} className="capitalize" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Vehicle Type */}
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <CarFront className="mr-2 h-4 w-4" />
                      Tipo de Vehículo
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione el tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Client Name */}
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Nombre del Cliente
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Client Phone */}
              <FormField
                control={form.control}
                name="clientPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Teléfono del Cliente
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Teléfono del cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Service Type */}
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Tipo de Servicio
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione el servicio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Employee */}
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Empleado que Recibe
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione empleado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="flex justify-end px-0 pb-0">
              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? (
                  <>Registrando...</>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Registrar Vehículo
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VehicleForm;

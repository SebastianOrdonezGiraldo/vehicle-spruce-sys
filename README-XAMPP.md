
# Configuración de la Base de Datos con XAMPP

Este documento proporciona instrucciones para configurar la base de datos del sistema Vehicle Spruce System utilizando XAMPP.

## Prerrequisitos

1. Tener XAMPP instalado en tu computadora. Puedes descargarlo desde [https://www.apachefriends.org/es/index.html](https://www.apachefriends.org/es/index.html)

## Pasos para configurar la base de datos

### 1. Iniciar los servicios de XAMPP

1. Abre el Panel de Control de XAMPP
2. Inicia los servicios de Apache y MySQL haciendo clic en los botones "Start"
3. Verifica que ambos servicios estén en estado "Running"

### 2. Crear la base de datos

1. Abre tu navegador y ve a [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. En phpMyAdmin, puedes crear la base de datos de dos maneras:

#### Opción 1: Crear manualmente
1. Haz clic en "New" en el panel izquierdo
2. Escribe "vehicle_spruce_system" como nombre de la base de datos
3. Selecciona "utf8mb4_general_ci" como cotejamiento
4. Haz clic en "Create"

#### Opción 2: Importar el archivo SQL (Recomendado)
1. Selecciona la pestaña "Import" en la página principal de phpMyAdmin
2. Haz clic en "Choose File" y selecciona el archivo `src/database/vehicle_spruce_system.sql`
3. Asegúrate de que el formato está establecido en "SQL"
4. Haz clic en "Go" en la parte inferior de la página

### 3. Verificar la instalación

1. En el panel izquierdo de phpMyAdmin, deberías ver la base de datos "vehicle_spruce_system"
2. Al hacer clic en ella, deberías ver las tablas creadas:
   - customers
   - vehicles
   - services
   - service_categories
   - work_orders
   - order_services
   - employees
   - inventory
   - order_parts

### 4. Conexión desde la aplicación

La aplicación está configurada para conectarse automáticamente a la base de datos con los siguientes parámetros:
- Host: localhost
- Usuario: root
- Contraseña: (vacía, por defecto en XAMPP)
- Base de datos: vehicle_spruce_system
- Puerto: 3306

Si has modificado alguno de estos parámetros en tu instalación de XAMPP, deberás actualizar la configuración en el archivo `src/config/dbConfig.ts`.

## Solución de problemas comunes

### Error de conexión a la base de datos

Si la aplicación no puede conectarse a la base de datos, verifica:
1. Que los servicios de XAMPP estén en ejecución
2. Que la base de datos "vehicle_spruce_system" exista
3. Que las credenciales de conexión sean correctas
4. Que no haya reglas de firewall bloqueando la conexión al puerto 3306

### Error al importar el archivo SQL

Si encuentras errores al importar el archivo SQL:
1. Verifica que el archivo no esté corrupto
2. Intenta importar el archivo por partes, comenzando por la creación de la base de datos
3. Verifica la versión de MySQL en tu XAMPP (el script está optimizado para MySQL 5.7 o superior)

## Respaldo de la base de datos

Es recomendable realizar respaldos periódicos de la base de datos:
1. En phpMyAdmin, selecciona la base de datos "vehicle_spruce_system"
2. Haz clic en la pestaña "Export"
3. Selecciona "Quick" para una exportación rápida o "Custom" para opciones avanzadas
4. Haz clic en "Go" para descargar el archivo SQL de respaldo

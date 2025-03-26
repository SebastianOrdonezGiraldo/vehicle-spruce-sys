
-- Database creation
CREATE DATABASE IF NOT EXISTS vehicle_spruce_system;
USE vehicle_spruce_system;

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    vin VARCHAR(17) UNIQUE,
    color VARCHAR(30),
    last_service_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    estimated_hours DECIMAL(4, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Service categories
CREATE TABLE IF NOT EXISTS service_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add category to services
ALTER TABLE services ADD COLUMN category_id INT;
ALTER TABLE services ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES service_categories(category_id);

-- Work orders table
CREATE TABLE IF NOT EXISTS work_orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    start_date DATE,
    completion_date DATE,
    total_cost DECIMAL(10, 2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id)
);

-- Order_services junction table
CREATE TABLE IF NOT EXISTS order_services (
    order_service_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    service_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    FOREIGN KEY (order_id) REFERENCES work_orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(service_id)
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    hire_date DATE NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inventory (parts) table
CREATE TABLE IF NOT EXISTS inventory (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    quantity INT NOT NULL DEFAULT 0,
    cost_price DECIMAL(10, 2) NOT NULL,
    selling_price DECIMAL(10, 2) NOT NULL,
    reorder_level INT DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Parts used in work orders
CREATE TABLE IF NOT EXISTS order_parts (
    order_part_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES work_orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES inventory(item_id)
);

-- Insert some sample data for service categories
INSERT INTO service_categories (name, description) VALUES
('Mantenimiento regular', 'Servicios de mantenimiento programado'),
('Reparación mecánica', 'Reparaciones del sistema mecánico'),
('Sistema eléctrico', 'Servicios relacionados con el sistema eléctrico'),
('Aire acondicionado', 'Servicios de aire acondicionado y calefacción'),
('Frenos', 'Servicios del sistema de frenado');

-- Insert some sample services
INSERT INTO services (name, description, base_price, estimated_hours, category_id) VALUES
('Cambio de aceite', 'Cambio de aceite y filtro', 45.00, 0.5, 1),
('Alineación de ruedas', 'Alineación de las 4 ruedas', 80.00, 1.0, 1),
('Cambio de pastillas de freno', 'Reemplazo de pastillas de freno', 120.00, 1.5, 5),
('Diagnóstico de motor', 'Diagnóstico completo del sistema de motor', 90.00, 1.0, 2),
('Recarga de aire acondicionado', 'Recarga de refrigerante de aire acondicionado', 65.00, 0.75, 4),
('Cambio de batería', 'Reemplazo e instalación de batería', 40.00, 0.5, 3),
('Cambio de discos de freno', 'Reemplazo de discos de freno', 200.00, 2.0, 5),
('Reparación de alternador', 'Diagnóstico y reparación de alternador', 250.00, 2.5, 3),
('Cambio de filtro de aire', 'Reemplazo de filtro de aire del motor', 25.00, 0.25, 1),
('Cambio de bujías', 'Reemplazo de bujías', 80.00, 1.0, 2);

-- Insert some sample inventory items
INSERT INTO inventory (name, description, quantity, cost_price, selling_price, reorder_level) VALUES
('Filtro de aceite - estándar', 'Filtro de aceite para vehículos comunes', 25, 5.00, 12.00, 10),
('Aceite de motor 5W-30 (1L)', 'Aceite de motor sintético 5W-30', 40, 6.00, 15.00, 15),
('Pastillas de freno - Toyota', 'Juego de pastillas de freno para Toyota', 8, 25.00, 60.00, 5),
('Batería 12V estándar', 'Batería estándar para vehículos', 6, 45.00, 100.00, 3),
('Refrigerante AC R-134a', 'Refrigerante para aire acondicionado', 12, 20.00, 40.00, 5),
('Bujías estándar', 'Bujías estándar para vehículos comunes', 30, 2.50, 8.00, 10),
('Discos de freno - Honda', 'Par de discos de freno para Honda', 4, 35.00, 85.00, 2),
('Filtro de aire - universal', 'Filtro de aire para vehículos comunes', 15, 8.00, 20.00, 7);

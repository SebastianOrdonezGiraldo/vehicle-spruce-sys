
// Database configuration for connection with MySQL via XAMPP
export const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",  // Default XAMPP MySQL password is empty
  database: "vehicle_spruce_system",
  port: 3306
};

// Instructions for connecting to the database:
// 1. Start XAMPP Control Panel
// 2. Start Apache and MySQL services
// 3. Open http://localhost/phpmyadmin in your browser
// 4. Import the SQL file from src/database/vehicle_spruce_system.sql

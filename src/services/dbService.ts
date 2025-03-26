
import mysql from 'mysql2/promise';
import { dbConfig } from '../config/dbConfig';

// Create a connection pool
const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to execute SQL queries
export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Check database connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Example functions for common operations

// Get all records from a table
export async function getAll(table: string) {
  return query(`SELECT * FROM ${table}`);
}

// Get a record by id
export async function getById(table: string, idField: string, id: number | string) {
  return query(`SELECT * FROM ${table} WHERE ${idField} = ?`, [id]);
}

// Insert a record
export async function insert(table: string, data: Record<string, any>) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');
  
  const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
  return query(sql, values);
}

// Update a record
export async function update(table: string, idField: string, id: number | string, data: Record<string, any>) {
  const sets = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(data), id];
  
  const sql = `UPDATE ${table} SET ${sets} WHERE ${idField} = ?`;
  return query(sql, values);
}

// Delete a record
export async function remove(table: string, idField: string, id: number | string) {
  return query(`DELETE FROM ${table} WHERE ${idField} = ?`, [id]);
}

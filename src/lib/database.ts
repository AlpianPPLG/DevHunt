/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql from "mysql2/promise"

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "devhunt_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Create connection pool for better performance
const pool = mysql.createPool(dbConfig)

// Helper function to execute queries
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(query, params)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Helper function to get a single row
export async function queryRow(query: string, params: any[] = []) {
  const results = (await executeQuery(query, params)) as any[]
  return results[0] || null
}

// Helper function to get multiple rows
export async function queryRows(query: string, params: any[] = []) {
  const results = (await executeQuery(query, params)) as any[]
  return results
}

export default pool

// server/config/database.js
import pkg from 'pg';
import { AppError } from '../utils/AppError.js';

const { Pool } = pkg;
// Create our pool for data operation
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASSWORD),
    port: process.env.DB_PORT || 5432
  });
  // Logging to check if it exist
  console.log({
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
  });
  // Check for success
  pool.on('connect', () => console.log('Connected to PostgreSQL'));
  pool.on('error', (err) => {
    console.error('❌ Unexpected database error', err);
    throw new AppError.INTERNAL_ERROR('Database connection failed');
  });
  
  export default pool;
// server/config/database.js
import pkg from 'pg';
import { AppError } from '../utils/appError.js';

const { Pool } = pkg;
// Create our pool for data operation
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432
  });
  // Check for success
  pool.on('connect', () => console.log('Connected to PostgreSQL'));
  pool.on('error', (err) => {
    console.error('❌ Unexpected database error', err);
    throw new AppError.INTERNAL_ERROR('Database connection failed');
  });
  
  export default pool;
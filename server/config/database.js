// server/config/database.js
import pkg from 'pg';
import { AppError } from '../utils/AppError.js';
import { config } from './config.js';

const { Pool } = pkg;
// Create our pool for data operation
const pool = new Pool({
    user: config.db.user,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port,
    database: config.db.name
  });
  // Check for success
  pool.on('connect', () => console.log('Connected to PostgreSQL'));
  pool.on('error', (err) => {
    console.error('❌ Unexpected database error', err);
    throw new AppError.INTERNAL_ERROR('Database connection failed');
  });
  
  export default pool;
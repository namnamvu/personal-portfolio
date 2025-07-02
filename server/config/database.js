import pkg from 'pg';
import { AppError } from '../utils/AppError.js';
import { config } from './config.js';

const { Pool } = pkg;

// Use DATABASE_URL env variable with SSL for Render deployment
const pool = process.env.DATABASE_URL
  // For production when database URL exist
  ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})
  // For development
: new Pool({
  user: config.db.user,
  password: config.db.password,
  host: config.db.host,
  port: config.db.port,
  database: config.db.name,
});

pool.on('connect', () => console.log('✅ Connected to PostgreSQL'));
pool.on('error', (err) => {
  console.error('❌ Unexpected database error', err);
  throw new AppError.INTERNAL_ERROR('Database connection failed');
});

export default pool;




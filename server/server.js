import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import contactRoutes from './routes/contactRoutes.js';
import { config } from './config/config.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

app.use(cors({
  origin: config.cors.origin,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: false,
}));

app.use(helmet());
app.use(morgan('dev'));

// API routes
app.use('/api/contact', contactRoutes);

if (process.env.NODE_ENV === 'production') {
  // Serve static frontend
  app.use(express.static(path.join(__dirname, 'dist')));

  // SPA fallback for React Router (only in production)
  app.get('/{*splat}', (req, res, next) => {
    console.log('Fallback route triggered for:', req.originalUrl);
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // Local test route
  app.get('/', (req, res) => {
    res.send('Server is running locally');
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🧠 Environment: ${process.env.NODE_ENV}`);
});

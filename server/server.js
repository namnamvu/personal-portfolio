import 'dotenv/config';

import express from 'express';
import helmet from 'helmet'
import morgan from 'morgan';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js'
import { config } from './config/config.js';


// Create an instance of express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware needed to parse json request from client
app.use(express.json());

// Allow frontend to interact with backend without getting block by cors
app.use(cors({
    origin: config.cors.origin, // Frontend link
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: false
  }));

// Security amiddleware to protect app by setting HTTP headers
app.use(helmet());
// Log the request
app.use(morgan("dev"));

app.use('/api/contact', contactRoutes)

// Add a test root route
app.get('/', (req, res) => {
    res.send('Server is running');
  });  

app.listen(PORT, () => {
    console.log("Server is runnning on port " + PORT)
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
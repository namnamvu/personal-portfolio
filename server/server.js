import express from 'express';
import helmet from 'helmet'
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes.js'

// Allow PORT to be used fron .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Allow frontend to interact with backend without getting block by cors
app.use(cors());

// Security amiddleware to protect app by setting HTTP headers
app.use(helmet());
// Log the request
app.use(morgan("dev"));

app.use('/api/contact', contactRoutes)

app.listen(PORT, () => {
    console.log("Server is runnning on port " + PORT)
});
import express from 'express';
import helmet from 'helmet'
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

// Security amiddleware to protect app by setting HTTP headers
app.use(helmet());
// Log the request
app.use(morgan("dev"));

app.get("/test", (req, res) => {
    console.log(res.getHeaders())
    res.send("Hello from the backend")
});

app.listen(3000, () => {
    console.log("Server is runnning on this port")
});
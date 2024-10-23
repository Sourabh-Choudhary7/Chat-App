import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from 'dotenv';
import errorMiddleware from './middlewares/error.middleware.js';
import userRoutes from './routes/user.routes.js';

config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))

app.use(cookieParser());

app.use('/ping', function (req, res) {
    res.send('/pong');
})

app.use(morgan('dev'));

// routes
app.use('/api/v2/users',userRoutes);

app.all('*', (req, res) => {
    res.status(404).send('Page not found');
})

app.use(errorMiddleware);

export default app;
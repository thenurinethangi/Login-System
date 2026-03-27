import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRouter from './routes/authRoute.js';
import { authorize } from './middlewares/autherization.js';
import { Role } from './models/User.js';
import { authenticate } from './middlewares/authentication.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const dbUrl = (process.env.DATABASE_URL as string) || 'mongodb://localhost:27017/loginSystem';

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

app.use('/api/auth', authRouter);

app.use(authenticate);
app.use(authorize([Role.USER]));

app.use('/api/', (req, res) => {
  res.json({ message: 'Welcome to Login System Backend' });
});

mongoose.connect(dbUrl)
    .then(() => {
        console.log('Database connected!');
    })
    .catch((err) => {
        console.error('Database connection fail: ', err);
        process.exit(1);
    })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

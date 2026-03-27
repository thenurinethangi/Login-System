import express from 'express';
import { register, login, handleGoogleAuth } from '../controllers/authController.js';
import { generateAccessToken } from '../utils/jwt.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/google/callback', handleGoogleAuth);
authRouter.get('/accessToken', generateAccessToken);

export default authRouter;

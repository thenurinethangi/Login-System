import { Request, Response } from 'express';
import { User, Role, Status, IUser } from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken, verifyAccessToken } from '../utils/jwt.js';
import { OAuth2Client } from 'google-auth-library';

export const register = async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        res.status(400).json({ message: 'Please provide fullName, email, and password', data: null });
        return;
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: 'Email already registered', data: null });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            method: 'email-password',
            roles: [Role.USER],
            status: Status.ACTIVE,
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: 'User registered successfully!',
            data: {
                id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Registration failed', data: error.message });
    }
};

export const handleGoogleAuth = async (req: Request, res: Response) => {
    const { token, mode } = req.body;

    if (!token || !mode) {
        res.status(400).json({ message: 'Please provide token and mode', data: null });
        return;
    }

    if (mode !== 'signin' && mode !== 'signup') {
        res.status(400).json({ message: 'Mode must be signin or signup', data: null });
        return;
    }

    try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const fullName = payload?.name || '';
        const email = payload?.email || '';

        if (!fullName || !email) {
            res.status(400).json({ message: 'Invalid Google token', data: null });
            return;
        }

        let user = await User.findOne({ email });

        if (mode === 'signup') {
            if (user) {
                if (user.method === 'google') {
                    res.status(400).json({ message: 'User already registered with Google', data: null });
                    return;
                }
                user.method = 'google';
                await user.save();
            } else {
                const newUser = new User({
                    fullName,
                    email,
                    password: null,
                    method: 'google',
                    roles: [Role.USER],
                    status: Status.ACTIVE,
                });
                user = await newUser.save();
            }

            res.status(201).json({
                message: 'Sign up successful!',
                data: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                },
            });
        } else if (mode === 'signin') {
            if (!user) {
                res.status(401).json({ message: 'User not found. Please sign up first', data: null });
                return;
            }

            if (user.method !== 'google') {
                if (user.method === 'email-password') {
                    res.status(400).json({ message: 'This account is registered with email and password. Please use email login', data: null });
                    return;
                }
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.cookie('accessToken', accessToken, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            });

            res.cookie('refreshToken', refreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            });

            res.status(200).json({
                message: 'Sign in successful!',
                data: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    roles: user.roles,
                },
            });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Google authentication failed', data: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Please provide email and password', data: null });
        return;
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
        res.status(400).json({ message: 'Email and password must be strings', data: null });
        return;
    }

    if (password.length < 6) {
        res.status(400).json({ message: 'Password must be at least 6 characters', data: null });
        return;
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ message: 'Invalid credentials', data: null });
            return;
        }

        if (user.method === 'google') {
            res.status(400).json({ message: 'This account is registered with Google. Please use Google login', data: null });
            return;
        }

        if (!user.password) {
            res.status(401).json({ message: 'Invalid credentials', data: null });
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            res.status(401).json({ message: 'Invalid credentials', data: null });
            return;
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('accessToken', accessToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        res.cookie('refreshToken', refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        res.status(200).json({
            message: 'Login successful!',
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                roles: user.roles,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Login failed', data: error.message });
    }
};

export const generateNewAccessToken = async (req: Request, res: Response) => {

    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            res.status(401).json({ message: 'Unauthenticated! No access token provided. Please login!', data: null });
            return;
        }

        const payload = verifyAccessToken(refreshToken);

        if (!payload || !payload.sub) {
            res.status(401).json({ message: 'Unauthenticated! Invalid refresh token!', data: null });
            return;
        }

        const user = await User.findById(payload.sub);

        if (!user) {
            res.status(401).json({ message: 'User not found', data: null });
            return;
        }

        const accessToken = generateAccessToken(user as IUser);

        if (!accessToken) {
            res.status(500).json({ message: 'Failed to generate access token', data: null });
            return;
        }

        res.cookie('accessToken', accessToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        res.status(200).json({
            message: 'new access token successfully generated!',
            data: null,
        });
    }
    catch (error: any) {
        res.status(500).json({ message: 'Login failed', data: error.message });
    }

};

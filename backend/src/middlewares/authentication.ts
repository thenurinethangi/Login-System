import express, { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';
import { Role } from '../models/User.js';

export interface AuthRequest extends Request {
  sub?: string,
  roles?: Role[]
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    res.status(401).json({ message: 'Unauthenticated! No access token provided. Please login!', data: null });
    return;
  }

  const payload = verifyAccessToken(accessToken);

  if (!payload) {
    res.status(401).json({ message: 'Unauthenticated! Invalid access token!', data: null });
    return;
  }

  req.sub = payload.sub;
  req.roles = payload.roles;

  next();
}

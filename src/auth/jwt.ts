import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = 'your_jwt_secret';
const JWT_EXPIRATION = '1h';
const REFRESH_TOKEN_EXPIRATION = '7d';

export const generateAccessToken = (user: any) => {
  return jwt.sign({
    email: user.email,
    username: user.username,
    group: user.group,
    avatarUrl: user.avatarUrl
  }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1] || req.cookies.accessToken;
  if (!token) {
    console.log('No token found');
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
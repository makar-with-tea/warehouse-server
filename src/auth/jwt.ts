import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../utils/firebaseConfig';

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

export const generateRefreshToken = async (user: any) => {
    const refreshToken = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await db.collection('refreshTokens').doc(user.email).set({ token: hashedToken });
    return refreshToken;
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

  export const verifyRefreshToken = async (refreshToken: string) => {
    const decoded: any = jwt.verify(refreshToken, JWT_SECRET);
    const doc = await db.collection('refreshTokens').doc(decoded.email).get();
    if (!doc.exists) throw new Error('Invalid refresh token');
    const isValid = await bcrypt.compare(refreshToken, doc.data()?.token);
    if (!isValid) throw new Error('Invalid refresh token');
    return decoded;
  };
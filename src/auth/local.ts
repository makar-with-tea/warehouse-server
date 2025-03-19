import { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken } from './jwt';
import { db } from '../utils/firebaseConfig';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log('User is trying to log in');

  const userDoc = await db.collection('users').doc(email).get();
  if (!userDoc.exists) return res.status(401).json({ message: 'Invalid credentials' });

  const user = userDoc.data();
  const isPasswordValid = await bcrypt.compare(password, user?.password);
  if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  res.cookie('accessToken', accessToken, { httpOnly: true });
  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  res.json({ accessToken, refreshToken });
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    const decoded: any = jwt.verify(refreshToken, JWT_SECRET);
    await db.collection('refreshTokens').doc(decoded.email).delete();
  }
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.sendStatus(204);
};
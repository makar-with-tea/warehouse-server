import { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from './jwt';
import { db } from '../utils/firebaseConfig';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const JWT_SECRET = 'your_jwt_secret';

export const register = async (req: Request, res: Response) => {
  const user: User = req.body;
  console.log('User is trying to register');
  const userDoc = await db.collection('users').doc(user.email).get();
  if (userDoc.exists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(user.password, 10);
  await db.collection('users').doc(user.email).set({ email: user.email, password: hashedPassword, group: user.group, name: user.name, avatarUrl: user.avatarUrl });
  res.status(201).json({ message: 'User created' });
};

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
  res.json({ accessToken, refreshToken, user });
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    try {
      const decoded: any = jwt.verify(refreshToken, JWT_SECRET);
      await db.collection('refreshTokens').doc(decoded.email).delete();
    } catch (error) {
      console.error('Error during logout:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.sendStatus(204);
};
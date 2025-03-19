import { Router } from 'express';
import { login, logout, register } from '../auth/local';
import { authenticateToken } from '../auth/jwt';

const router = Router();

router.post('/login', login);
router.post('/logout', authenticateToken, logout);
router.post('/register', register);

export default router;
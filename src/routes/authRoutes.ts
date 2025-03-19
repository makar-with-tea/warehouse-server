import { Router } from 'express';
import { login, logout } from '../auth/local';
import { authenticateToken } from '../auth/jwt';

const router = Router();

router.post('/login', login);
router.post('/logout', authenticateToken, logout);

export default router;
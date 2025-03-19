import { Router } from 'express';
import { categoryController } from '../controllers/categoryController';
import { authenticateToken } from '../auth/jwt';

const router = Router();

router.post('/categories', authenticateToken, categoryController.createCategory);
router.get('/categories', authenticateToken, categoryController.getCategories);
router.get('/categories/:id', authenticateToken, categoryController.getCategoryById);
router.put('/categories/:id', authenticateToken, categoryController.updateCategory);
router.delete('/categories/:id', authenticateToken, categoryController.deleteCategory);

export default router;
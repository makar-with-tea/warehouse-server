import { Router } from 'express';
import { productController } from '../controllers/productController';
import { authenticateToken } from '../auth/jwt';

const router = Router();

router.post('/products', authenticateToken, productController.createProduct);
router.get('/products', authenticateToken, productController.getProducts);
router.get('/products/:id', authenticateToken, productController.getProductById);
router.put('/products/:id', authenticateToken, productController.updateProduct);
router.delete('/products/:id', authenticateToken, productController.deleteProduct);

export default router;
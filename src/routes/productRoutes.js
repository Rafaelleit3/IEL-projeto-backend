import express from 'express';
import { searchProducts, getProductById , createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

//Criar endpoint para obter uma lista de produtos
router.get('/search', searchProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;

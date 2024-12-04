import express from 'express';
import * as productController from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

//Criar endpoint para obter uma lista de produtos
router.get('/v1/product/search', productController.searchProducts);
router.get('/v1/product/:id', productController.getProductById);
router.post('/v1/product', authMiddleware, productController.createProduct);
router.put('/v1/product/:id', authMiddleware, productController.updateProduct);
router.delete('/v1/product/:id', authMiddleware, productController.deleteProduct);

export default router;

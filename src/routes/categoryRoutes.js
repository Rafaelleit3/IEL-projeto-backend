import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

//Criar endpoint para obter uma lista de categorias
router.get('/v1/category/search', categoryController.searchCategories);
router.get('/v1/category/:id', categoryController.getCategoryById);
router.post('/v1/category', authMiddleware, categoryController.createCategory);
router.put('/v1/category/:id', authMiddleware, categoryController.updateCategory);
router.delete('/v1/category/:id', authMiddleware, categoryController.deleteCategory);

export default router;

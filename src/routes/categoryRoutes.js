import express from 'express';
import { searchCategories, getCategoryById , createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

//Criar endpoint para obter uma lista de categorias
router.get('/search', searchCategories);
router.get('/:id', getCategoryById);
router.post('/', authMiddleware, createCategory);
router.put('/:id', authMiddleware, updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);

export default router;

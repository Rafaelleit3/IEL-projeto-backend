import express from 'express';
import { getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Obter usuário por ID
router.get('/:id', getUserById);

// Cadastro de usuário
router.post('/', createUser);

// Atualizar usuário
router.put('/:id', authMiddleware, updateUser);

// Deletar usuário
router.delete('/:id', authMiddleware, deleteUser);

export default router;

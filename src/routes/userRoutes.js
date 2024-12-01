const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Obter usuário por ID
router.get('/v1/user/:id', userController.getUserById);

// Cadastro de usuário
router.post('/v1/user', userController.createUser);

// Atualizar usuário
router.put('/v1/user/:id', authMiddleware, userController.updateUser);

// Deletar usuário
router.delete('/v1/user/:id', authMiddleware, userController.deleteUser);

module.exports = router;

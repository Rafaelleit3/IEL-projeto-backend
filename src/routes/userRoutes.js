const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rotas para CRUD de usuários
router.get("/:id", userController.getUserById); // Obter usuário por ID
router.post("/", userController.createUser); // Cadastro de usuário
router.put("/:id", userController.updateUser); // Atualizar usuário
router.delete("/:id", userController.deleteUser); // Deletar usuário
router.put("/:id", authMiddleware.authenticate, userController.updateUser);
router.delete("/:id", authMiddleware.authenticate, userController.deleteUser);

module.exports = router;

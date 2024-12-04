import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// Requisito 01 - Obter informações do usuário
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      id: user.id,
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Requisito 02 - Cadastro de usuário
const createUser = async (req, res) => {
  const { firstname, surname, email, password, confirmPassword } = req.body;

  // Validação simples de campos obrigatórios
  if (!firstname || !surname || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      surname,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: newUser.id,
      firstname: newUser.firstname,
      surname: newUser.surname,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Requisito 04 - Atualizar usuário
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, surname, email } = req.body;

  if (!firstname || !surname || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ firstname, surname, email });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Requisito 05 - Deletar usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { getUserById, createUser, updateUser, deleteUser };

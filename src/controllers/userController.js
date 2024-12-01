const { User } = require("../models");

// Requisito 01 - Obter informações do usuário pelo ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["id", "firstname", "surname", "email"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Requisito 02 - Cadastro de usuário
exports.createUser = async (req, res) => {
  try {
    const { firstname, surname, email, password, confirmPassword } = req.body;

    if (!firstname || !surname || !email || !password || password !== confirmPassword) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const newUser = await User.create({
      firstname,
      surname,
      email,
      password,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Requisito 04 - Atualizar usuário
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, surname, email } = req.body;

    if (!firstname || !surname || !email) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({ firstname, surname, email });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Requisito 05 - Deletar usuário
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

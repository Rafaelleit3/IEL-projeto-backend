import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de autorização não enviado ou inválido' });
  }

  try {
    const secret = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id; // Armazena o ID do usuário decodificado no request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default authMiddleware;


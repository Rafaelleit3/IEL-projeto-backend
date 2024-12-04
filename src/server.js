import app from './app.js'; // Importe o app.js
import dotenv from 'dotenv'; // Para gerenciar variáveis de ambiente
dotenv.config();

const PORT = process.env.PORT || 3000; // Defina a porta do servidor

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});




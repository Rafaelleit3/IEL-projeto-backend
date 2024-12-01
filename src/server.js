const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes'); // Altere para o caminho correto das suas rotas

// Configuração do middleware
app.use(express.json());

// Rotas
app.use('/v1/user', userRoutes);

// Porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


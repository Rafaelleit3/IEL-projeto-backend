import express from 'express';
import productRoutes from './routes/productRoutes.js'; // Importe as rotas de produto
import authMiddleware from './middlewares/authMiddleware.js'; // Middleware de autenticação
import bodyParser from 'body-parser'; // Para analisar o corpo das requisições
import cors from 'cors'; // Para habilitar o CORS, se necessário

const app = express();

// Middlewares
app.use(cors()); // Permite requisições de outros domínios
app.use(bodyParser.json()); // Para analisar o corpo das requisições como JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para analisar dados de formulários

// Rotas
app.use('/api', productRoutes); // Definindo prefixo para as rotas de produto

// Rota para testar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Middleware de erro (catch-all)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

export default app;

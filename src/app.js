import express from 'express';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors()); // Permite requisições de outros domínios
app.use(bodyParser.json()); // Para analisar o corpo das requisições como JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para analisar dados de formulários

// Rotas
app.use('/v1/product', productRoutes);
app.use('/v1/category', categoryRoutes);
app.use('/v1/user', userRoutes);

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

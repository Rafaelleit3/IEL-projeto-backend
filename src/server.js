const express = require('express');
const userRoutes = require('./routes/userRoutes');
const connection = require('./config/connection');

const server = express();
server.use(express.json());

server.use(userRoutes);

server.listen(3000, async () => {
  try {
    await connection.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed', error);
  }
  console.log('Server is running on port 3000');
});



const { Sequelize } = require("sequelize");

// Configuração da conexão
const connection = new Sequelize("database_development", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false, // Desativa logs de SQL (opcional, remova se quiser ver as queries no console)
});

// Função para testar a conexão
(async () => {
  try {
    await connection.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar-se ao banco de dados:", error);
  }
})();

module.exports = connection;



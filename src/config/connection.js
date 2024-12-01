const { Sequelize } = require("sequelize");


const sequelize = new Sequelize("database_development", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false, 
});


(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar-se ao banco de dados:", error);
  }
})();

module.exports = sequelize;




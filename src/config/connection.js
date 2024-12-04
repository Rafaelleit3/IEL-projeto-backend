import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
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

export default sequelize;




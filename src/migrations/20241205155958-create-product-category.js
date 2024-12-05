import { INTEGER } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productCategory', {
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products', // nome da tabela de produtos
          key: 'id',
        },
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories', // nome da tabela de categorias
          key: 'id',
        },
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('productCategory');
  }
};

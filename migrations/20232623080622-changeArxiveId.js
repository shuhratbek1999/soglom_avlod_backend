'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('registration_arxiv', 'id', {
      type: 'int',
      autoIncrement: false, // Remove auto-increment
    });
  },

  down: async (queryInterface, Sequelize) => {
    // In the down migration, you don't need to change the primary key status
  },
};

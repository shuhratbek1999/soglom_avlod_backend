'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('registration_arxiv', 'imtiyoz_type');

      await queryInterface.addColumn('registration_arxiv', 'tramma_type', {
        type: 'string',
      });

    } catch (errors) {
      throw errors;
    }
  },

};


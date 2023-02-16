'use strict';

const { userSchema, USER_TABLE } = require('./../models/userModel')

module.exports = {
  async up (queryInterface) {
  await queryInterface.addColumn(USER_TABLE, 'role', userSchema.role);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};

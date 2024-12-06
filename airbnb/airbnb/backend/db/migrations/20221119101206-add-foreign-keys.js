'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Adding a foreign key from Reviews table to Users table
    await queryInterface.addConstraint('Reviews', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_reviews_users', // Custom constraint name
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    // Adding a foreign key from Reviews table to Spots table
    await queryInterface.addConstraint('Reviews', {
      fields: ['spotId'],
      type: 'foreign key',
      name: 'fk_reviews_spots',
      references: {
        table: 'Spots',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    // Repeat similar blocks for other foreign key constraints
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('Reviews', 'fk_reviews_users');
    await queryInterface.removeConstraint('Reviews', 'fk_reviews_spots');
    // Repeat for other constraints
  },
};
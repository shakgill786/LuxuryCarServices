'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define schema for production
}
options.tableName = 'Spots';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: '123 Ocean Drive',
          city: 'Miami',
          state: 'Florida',
          country: 'USA',
          name: 'Ocean Breeze Villa',
          description: 'A luxurious villa by the sea.',
          price: 500.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 2,
          address: '789 Mountain Road',
          city: 'Denver',
          state: 'Colorado',
          country: 'USA',
          name: 'Rustic Mountain Cabin',
          description: 'Experience the serene mountains.',
          price: 300.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 3,
          address: '456 Urban Ave',
          city: 'New York',
          state: 'New York',
          country: 'USA',
          name: 'City Lights Apartment',
          description: 'An elegant apartment in the heart of NYC.',
          price: 400.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: ['Ocean Breeze Villa', 'Rustic Mountain Cabin', 'City Lights Apartment'],
        },
      },
      {}
    );
  },
};
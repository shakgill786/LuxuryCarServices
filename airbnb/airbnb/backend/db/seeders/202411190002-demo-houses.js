'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define schema for production
}
options.tableName = 'Houses';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      options,
      [
        {
          name: 'Seaside Villa',
          location: '123 Ocean Drive, Miami, Florida, USA',
          pricePerNight: 500.0,
          description: 'A luxurious villa overlooking the ocean with stunning views and modern amenities.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mountain Retreat',
          location: '456 Mountain Trail, Denver, Colorado, USA',
          pricePerNight: 300.0,
          description: 'A cozy mountain retreat with rustic charm and breathtaking views.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Urban Loft',
          location: '789 City Street, New York, New York, USA',
          pricePerNight: 400.0,
          description: 'An elegant and modern loft in the heart of New York City.',
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
          [Op.in]: ['Seaside Villa', 'Mountain Retreat', 'Urban Loft'],
        },
      },
      {}
    );
  },
};
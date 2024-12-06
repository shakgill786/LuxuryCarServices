'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define schema for production
}
options.tableName = 'Bookings';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          spotId: 1,
          startDate: new Date('2024-12-01'),
          endDate: new Date('2024-12-07'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          spotId: 2,
          startDate: new Date('2024-11-20'),
          endDate: new Date('2024-11-25'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          spotId: 3,
          startDate: new Date('2024-11-15'),
          endDate: new Date('2024-11-18'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {});
  },
};
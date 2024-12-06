'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define schema for production
}
options.tableName = 'Images';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: 'https://example.com/images/spot1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          url: 'https://example.com/images/spot2.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          url: 'https://example.com/images/spot3.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  },
};
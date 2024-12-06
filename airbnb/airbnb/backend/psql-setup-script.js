const { sequelize } = require('./db/models');

// Script to ensure the schema exists in the database
sequelize
  .showAllSchemas({ logging: false })
  .then(async (data) => {
    if (!data.includes(process.env.SCHEMA)) {
      await sequelize.createSchema(process.env.SCHEMA);
      console.log(`Schema ${process.env.SCHEMA} created!`);
    } else {
      console.log(`Schema ${process.env.SCHEMA} already exists.`);
    }
  })
  .catch((error) => {
    console.error('Error checking or creating schema:', error);
  });
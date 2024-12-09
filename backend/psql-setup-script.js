const { sequelize } = require('./db/models');

(async () => {
  try {
    const schemas = await sequelize.showAllSchemas({ logging: false });

    if (process.env.NODE_ENV === 'production' && !schemas.includes(process.env.SCHEMA)) {
      console.log(`Creating schema: ${process.env.SCHEMA}`);
      await sequelize.createSchema(process.env.SCHEMA);
    } else {
      console.log('Schema already exists or not in production.');
    }
  } catch (error) {
    console.error('Error setting up schema:', error.message);
  }
})();
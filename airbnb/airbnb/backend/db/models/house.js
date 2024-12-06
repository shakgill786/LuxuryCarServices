'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class House extends Model {}

House.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pricePerNight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  { sequelize, modelName: 'House' }
);

module.exports = House;
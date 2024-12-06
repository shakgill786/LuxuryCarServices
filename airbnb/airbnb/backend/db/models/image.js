'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Spot, { foreignKey: 'spotId', allowNull: true });
      Image.belongsTo(models.Review, { foreignKey: 'reviewId', allowNull: true });
    }
  }
  Image.init(
    {
      spotId: { type: DataTypes.INTEGER, allowNull: true },
      reviewId: { type: DataTypes.INTEGER, allowNull: true },
      url: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Image',
    }
  );
  return Image;
};
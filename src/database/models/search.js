'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Search extends Model {
    static associate(models) {}
  }
  Search.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      searchQuery: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      snippet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Search',
    }
  );
  return Search;
};

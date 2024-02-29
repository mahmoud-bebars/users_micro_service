"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  Country.init(
    {
      name: DataTypes.STRING,
      dial_code: DataTypes.STRING,
      country_code: DataTypes.STRING,
      allowed_phone_length: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Country",
      tableName: "countries",
      timestamps: false,
    }
  );
  return Country;
};

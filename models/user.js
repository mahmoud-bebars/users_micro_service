"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role, Country }) {
      this.belongsTo(Role, {
        foreignKey: "role_id",
        targetKey: "id",
        as: "role",
      });
      this.belongsTo(Country, {
        foreignKey: "country_id",
        targetKey: "id",
        as: "country",
      });
    }
  }
  User.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "/public/assets/avatars/placeholder.png",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      log_limits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
    }
  );
  return User;
};

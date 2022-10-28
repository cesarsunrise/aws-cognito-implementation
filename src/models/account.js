"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Account.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      last_name: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      phone_number: {
        type: DataTypes.BIGINT(11),
        allowNull: true,
        defaultValue: null,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts",
      underscored: true,
    }
  );

  return Account;
};

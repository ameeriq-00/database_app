const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Dispatch = sequelize.define(
  "Dispatch",
  {
    T: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name_accused: DataTypes.STRING,
    saved_numbers: DataTypes.STRING,
    saved_name: DataTypes.STRING,
    saved_info: DataTypes.STRING,
    city: DataTypes.STRING,
  },
  {
    tableName: "Dispatch",
    timestamps: true,
  }
);

module.exports = Dispatch;

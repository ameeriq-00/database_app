const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Dispatch = sequelize.define("Dispatch", {
  T: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name_accused: {
    type: DataTypes.STRING,
  },
  saved_numbers: {
    type: DataTypes.STRING,
  },
  saved_name: {
    type: DataTypes.STRING,
  },
  saved_info: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
});

module.exports = Dispatch;
